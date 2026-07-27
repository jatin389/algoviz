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

      // MIGRATION: vueTsConfigs.recommended turns this on, but the .vue files
      // stay on plain JS until Phase 3 converts them. Re-enable in Phase 6,
      // where it becomes the tripwire against a component regressing to JS.
      'vue/block-lang': 'off',

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
);
