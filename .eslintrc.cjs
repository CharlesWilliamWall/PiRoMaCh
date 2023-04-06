/* eslint-disable prettier/prettier */
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,

    env: {
        browser: true,
        es2021: true,
        node: true,
    },

    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],

    parser: "vue-eslint-parser",

    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module",
    },

    plugins: ["vue", "@typescript-eslint"],

    rules: {
        // override/add rules settings here, such as:
        indent: ["warn", 4],
        "prettier/prettier": ["warn"],
        "vue/html-indent": ["warn", 4],
        "vue/require-default-prop": "off",
        "vue/singleline-html-element-content-newline": 0,
        "vue/component-name-in-template-casing": ["warn", "PascalCase"],
        "vue/no-unused-vars": "warn",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "vue/multi-word-component-names": "off",
    },
};
