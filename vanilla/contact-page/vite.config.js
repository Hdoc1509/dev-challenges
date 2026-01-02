import { defineConfig } from "vite";
import { htmlMinifierPlugin } from "vite-plugin-html-minifier";

// https://vite.dev/config/
export default defineConfig({
  plugins: [htmlMinifierPlugin()],
  base: "/dev-challenges/contact-page",
});
