module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:astro/recommended',
  ],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    }
  ]
}
