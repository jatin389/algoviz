#!/usr/bin/env bash
#
# Resolves where a branch belongs on the gh-pages branch and writes the result
# to $GITHUB_OUTPUT as `path`, `base` and `url`.
#
# A repository has exactly one GitHub Pages site, so branches cannot each get
# their own deployment — they share the site and are separated by directory:
#
#   /                    <- main
#   /preview/<slug>/     <- every other branch
#
# Input (environment):
#   BRANCH   branch name, e.g. "main" or "feat/new-sort"
#
set -euo pipefail

: "${BRANCH:?BRANCH is required}"
: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
: "${GITHUB_OUTPUT:?GITHUB_OUTPUT is required}"

owner=${GITHUB_REPOSITORY%%/*}
repo=${GITHUB_REPOSITORY#*/}

if [[ "$BRANCH" == "main" ]]; then
  path=""
  base="/$repo/"
else
  # Branch names allow characters that are awkward or ambiguous in a URL path
  # ('/' most of all, which would nest previews inside each other), so flatten
  # them to a single lowercase path segment.
  slug=$(printf '%s' "$BRANCH" | tr '[:upper:]' '[:lower:]' | sed 's#[^a-z0-9._-]#-#g')
  path="preview/$slug"
  base="/$repo/preview/$slug/"
fi

{
  echo "path=$path"
  echo "base=$base"
  echo "url=https://$owner.github.io$base"
} >>"$GITHUB_OUTPUT"
