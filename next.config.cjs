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
      // Ignorar errores en este archivo específico
      files: ['src/app/api/auth/[...nextauth]/route.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off', // Desactiva una regla específica
        'no-console': 'off', // Puedes desactivar otras reglas específicas si lo necesitas
      },
    },
  ],
};
