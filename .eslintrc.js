module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "process": true,
        "require" : true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "import"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "treatUndefinedAsUnspecified": 0,
        'import/no-unresolved': 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/react-in-jsx-scope": 1,
        "no-console": "off",
        "arrow-body-style": [2, "as-needed"],
    "class-methods-use-this": 0,
    "comma-dangle": [2, "always-multiline"],
    "import/imports-first": 0,

    },
};