module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    "@typescript-eslint/indent": [2, 2],
    "brace-style": ["error", "stroustrup"],
    "comma-dangle": ["error", "never"],
    "no-unused-vars": ["warn"],
    "no-var": ["off"],
    "one-var": ["off"],
    "no-tabs": ["off"],
    // indent: ["error", "tab"],
    "no-console": ["off"],
    "import/no-unresolved": ["off"],
    "dot-notation": ["off"],
    "prefer-destructuring": ["off"],
    "no-param-reassign": ["off"],
    "no-case-declarations": ["off"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "mjs": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  }
};
