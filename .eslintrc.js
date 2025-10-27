module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:n8n-nodes-base/community'],
  rules: {
    'n8n-nodes-base/node-param-display-name-miscased': 'warn',
    'n8n-nodes-base/node-param-description-missing-final-period': 'warn',
  },
};

