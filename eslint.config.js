import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 🔒 Ignore dist files early
  {
    ignores: ["dist/**/*"]
  },

  // ✅ Base JS/TS config
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      ...js.plugins
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[0].rules
    }
  },

  // ✅ Vue config scoped only to .vue files
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      ...pluginVue.configs["flat/essential"].rules,
      // Disable problematic rule (optional)
      "vue/multi-word-component-names": "off"
    }
  },

  // ✅ CSS config
  {
    files: ["**/*.css"],
    languageOptions: {
      language: "css"
    },
    plugins: {
      css
    },
    rules: {
      ...css.configs.recommended.rules
    }
  }
]);
