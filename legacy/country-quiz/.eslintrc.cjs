module.exports = {
  // NOTE: this is required to tell to ESLint to use tsconfig.json of this
  // project instead of the one in the workspace root, allowing to resolve path
  // aliases in tsconfig.json
  // see comment https://github.com/typescript-eslint/typescript-eslint/issues/2327#issuecomment-664069270
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
