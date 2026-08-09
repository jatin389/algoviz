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
    },
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
