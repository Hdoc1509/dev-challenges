import { resolve } from "node:path";
import { defineConfig } from "vite";
import { htmlMinifierPlugin } from "vite-plugin-html-minifier";

// https://vite.dev/config/
export default defineConfig({
  plugins: [htmlMinifierPlugin()],
  base: "/dev-challenges/multi-step-form",
  resolve: {
    alias: {
      // https://nodejs.org/api/esm.html#importmetadirname
      "@": resolve(import.meta.dirname, "src"),
    },
  },
});
