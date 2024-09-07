module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // Añade aquí tus reglas personalizadas
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        // Tus reglas para TypeScript
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: ['src/index.tsx'], // Ignora el archivo problemático si no es esencial
};
