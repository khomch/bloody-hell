module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'import/no-named-as-default': 0,
  },
};
