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
            "warn",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
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