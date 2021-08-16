module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/eslint')],
    "rules": {
        "quotes": [2, "single", { "avoidEscape": true }]
    },
    globals: {
        ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
        page: true,
        REACT_APP_ENV: true,
    },
}