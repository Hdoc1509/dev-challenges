export default {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: ["*.astro"],
      options: {
        parser: "astro",
      },
    },
    {
      files: ["./vanilla/guess-the-word/index.html"],
      options: {
        plugins: ["prettier-plugin-ejs"],
      },
    },
  ],
};
