import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [createHtmlPlugin({ minify: true })],
  base: "/dev-challenges/contact-page",
});
