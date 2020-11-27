module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],

  parserOptions: {
    ecmaVersion: 2020
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  },

  'extends': [
    // 'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ]
}
