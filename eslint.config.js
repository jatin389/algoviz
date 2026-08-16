import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,ts,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**'],
  },

  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  // Must come after the configs above so it can switch their formatting rules
  // back off — Prettier owns formatting, ESLint owns correctness.
  skipFormatting,

  {
    name: 'app/language-options',
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser },
    },
  },

  {
    name: 'app/rules',
    rules: {
      // App.vue and the *View.vue files are intentionally single-word; the
      // naming convention here is carried by directory structure instead.
      'vue/multi-word-component-names': 'off',

      // Left at the config default (on): every <script> block must declare
      // lang="ts". This is the component-side twin of allowJs: false — it is
      // what stops a .vue file from quietly regressing to plain JS.

      // The AlgorithmMeta generic is bounded by AlgorithmFn<any, any> on
      // purpose — five registries hold generators with different call
      // signatures. Warn so new `any` still gets noticed.
      '@typescript-eslint/no-explicit-any': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Tailwind class lists run long; how they wrap is Prettier's call.
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',

      // Colour must come from the semantic tokens, never from Tailwind's stock
      // palette. The app previously carried ~950 palette literals and ~390
      // `dark:` variants, which is precisely why it could not express a third
      // theme; without a rule holding the line, that state grows back one
      // convenient `text-slate-400` at a time.
      //
      // Use `canvas`/`surface`/`line`/`ink`/`accent` for chrome, `ok`/`warn`/
      // `danger` for UI status, and the seven tones in src/theme/tones.ts for
      // anything that represents algorithm state.
      'no-restricted-syntax': [
        'error',
        {
          selector: `Literal[value=/\\b(bg|text|border|fill|stroke|ring|from|to|via|shadow|divide|outline|accent|placeholder|decoration|caret)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\\d{2,3}\\b/]`,
          message:
            'Use a semantic token instead of a Tailwind palette colour (see src/theme/tones.ts and the token list in src/style.css).',
        },
        {
          selector: `Literal[value=/\\bdark:/]`,
          message:
            'The `dark:` variant no longer exists — there are eight themes, not two. Use a semantic token, which resolves per theme.',
        },
      ],
    },
  },

  // Vue templates are compiled to render functions, so the class strings in
  // markup are not `Literal` nodes the rule above can see. `vue/no-restricted-class`
  // covers them, using the same palette list.
  {
    name: 'app/no-palette-literals-in-templates',
    files: ['**/*.vue'],
    rules: {
      'vue/no-restricted-class': [
        'error',
        ...['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'].flatMap(
          (hue) =>
            ['bg', 'text', 'border', 'fill', 'stroke', 'ring', 'shadow', 'divide', 'outline', 'decoration', 'from', 'to', 'via'].map(
              (prefix) => `/^${prefix}-${hue}-\\d{2,3}$/`,
            ),
        ),
      ],
    },
  },

  // This file necessarily contains the very patterns it bans, since the rule is
  // defined by spelling them out.
  {
    name: 'app/eslint-config-self',
    files: ['eslint.config.js'],
    rules: { 'no-restricted-syntax': 'off' },
  },

  {
    name: 'app/test-files',
    files: ['**/*.test.{js,ts}'],
    languageOptions: { globals: { ...globals.node } },
  },

  // Standalone Node scripts (e.g. backlog/generate-board.mjs) run outside the
  // browser-targeted app bundle, so they need Node globals like `process`.
  {
    name: 'app/node-scripts',
    files: ['**/*.mjs'],
    languageOptions: { globals: { ...globals.node } },
  },
);
