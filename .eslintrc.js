module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
        'airbnb-typescript',
        'prettier',
      ],
      plugins: ['react-hooks', '@typescript-eslint/eslint-plugin', 'prettier'],
      excludedFiles: ['*.js'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
      rules: {
        'prettier/prettier': ['error', { usePrettierrc: true }],
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off',
        'consistent-return': 'off',
        // TODO: fix this
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: null,
            selector: 'default',
            leadingUnderscore: 'allow',
          },
        ],
      },
    },
    {
      files: ['*.js'],
      excludedFiles: ['*.ts', '*.tsx'],
      parser: '@babel/eslint-parser',
      extends: ['plugin:import/recommended', 'airbnb', 'prettier'],
      plugins: ['react-hooks', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off',
        // TODO: fix this
        'import/no-extraneous-dependencies': 'off',
        'global-require': 'off',
        'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      },
    },
  ],
};
