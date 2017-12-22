module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "ecmaVersion": 8,
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module"
  },
  "rules": {
        "indent": [
            "off",
            "tab"
        ],
        "no-mixed-spaces-and-tabs": [
            "off"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-debugger": [
            "warn"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "no-console": [
            "off"
        ],
        "no-unused-vars": [
            "off"
        ]
    }
};