// eslint.config.js

import tsParser from '@typescript-eslint/parser'
import pluginTs from '@typescript-eslint/eslint-plugin'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

/** @type {import('eslint').ESLint.ConfigData} */
export default {
  ignores: ['node_modules/**', 'dist/**'],

  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
  },

  plugins: {
    '@typescript-eslint': pluginTs,
    react: pluginReact,
    'react-hooks': pluginReactHooks,
  },

  settings: {
    react: { version: 'detect' },
  },

  rules: {
    // you can add / tweak rules here
    // e.g. '@typescript-eslint/no-unused-vars': 'warn'
  },
}
