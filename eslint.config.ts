import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import css from '@eslint/css'

const vueEssential = pluginVue.configs['flat/essential'][0]; // Get the config object

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  {
    name: 'vue-rules',
    files: ['**/*.vue'],
    languageOptions: vueEssential.languageOptions,
    plugins: vueEssential.plugins,
    rules: {
      ...vueEssential.rules,
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    name: 'css-rules',
    files: ['**/*.css'],
    plugins: {
      css,
    },
    rules: {
      ...css.configs.recommended.rules,
    },
  },

  skipFormatting
)
