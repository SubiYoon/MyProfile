module.exports = {
    plugins: ['prettier'],
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
    rules: {
        // override/add rules settings here, such as:
        'no-unused-vars': 'warn',
        'no-unused-labels': 'warn',
        'no-useless-escape': 'warn',
        'vue/no-unused-vars': 'warn',
        'vue/multi-word-component-names': 'off',
        'no-prototype-builtins': 'error',
        indent: ['error', 4],
    },
    overrides: [
        {
            files: ['**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
}
