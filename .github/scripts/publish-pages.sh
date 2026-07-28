#!/usr/bin/env bash
#
# Writes a build into (or deletes a folder from) the gh-pages branch, which is
# what GitHub Pages serves. See pages-target.sh for the directory layout.
#
# The branch is rebuilt from scratch in a scratch clone on every run rather
# than kept as a worktree, because several branches can be deploying at once
# and each needs to land on top of whatever the others just pushed.
#
# Inputs (environment):
#   TARGET_PATH   path within the branch to write; empty means the site root
#   SRC_DIR       directory to publish; unset/empty deletes TARGET_PATH instead
#   COMMIT_NOTE   short description used in the commit message
#
set -euo pipefail

: "${GITHUB_TOKEN:?GITHUB_TOKEN is required}"
: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"

TARGET_PATH=${TARGET_PATH-}
SRC_DIR=${SRC_DIR-}
COMMIT_NOTE=${COMMIT_NOTE:-manual run}

if [[ -z "$SRC_DIR" && -z "$TARGET_PATH" ]]; then
  echo "refusing to delete the site root" >&2
  exit 1
fi

if [[ -n "$SRC_DIR" ]]; then
  src_abs=$(cd "$SRC_DIR" && pwd)
  action="deploy ${TARGET_PATH:-/}"
else
  src_abs=""
  action="remove $TARGET_PATH"
fi

work="${RUNNER_TEMP:-/tmp}/gh-pages-publish"
remote="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

# Rebuilds $work from the current tip of gh-pages.
fetch_branch() {
  rm -rf "$work"
  mkdir -p "$work"
  git -C "$work" init -q -b gh-pages
  git -C "$work" remote add origin "$remote"
  # A missing gh-pages branch is the first-run case, not a failure: the repo
  # stays on the unborn branch and the first commit below creates it.
  if git -C "$work" fetch -q --depth 1 origin gh-pages 2>/dev/null; then
    git -C "$work" checkout -q -B gh-pages FETCH_HEAD
  fi
}

apply_changes() {
  if [[ -z "$src_abs" ]]; then
    rm -rf "${work:?}/$TARGET_PATH"
  elif [[ -n "$TARGET_PATH" ]]; then
    rm -rf "${work:?}/$TARGET_PATH"
    mkdir -p "$work/$TARGET_PATH"
    cp -R "$src_abs/." "$work/$TARGET_PATH/"
  else
    # Replace the root build, but leave preview/ alone: those folders belong
    # to other branches and must survive a deploy of main.
    find "$work" -mindepth 1 -maxdepth 1 \
      ! -name .git ! -name preview -exec rm -rf {} +
    cp -R "$src_abs/." "$work/"
  fi
  # Without this, Pages runs the tree through Jekyll, which drops files and
  # directories whose names start with an underscore.
  touch "$work/.nojekyll"
}

for attempt in 1 2 3 4 5; do
  fetch_branch
  apply_changes

  git -C "$work" add -A
  if git -C "$work" diff --quiet --cached; then
    echo "gh-pages already matches ${TARGET_PATH:-/}, nothing to push"
    exit 0
  fi

  git -C "$work" \
    -c user.name="github-actions[bot]" \
    -c user.email="41898282+github-actions[bot]@users.noreply.github.com" \
    commit -q -m "$action ($COMMIT_NOTE)"

  if git -C "$work" push -q origin gh-pages; then
    echo "pushed to gh-pages: $action"
    exit 0
  fi

  # Another branch's deploy landed first. Re-fetch and reapply on top of it
  # instead of forcing, which would drop that branch's preview.
  echo "push rejected (attempt $attempt/5), retrying on the new tip"
  sleep $((attempt * 3))
done

echo "gave up pushing to gh-pages after 5 attempts" >&2
exit 1
