import { resolve } from "node:path";
import { defineConfig } from "vite";
// import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [createHtmlPlugin({ minify: true })],
  base: "/dev-challenges/qr-code-generator",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        qr_code: "qr-code/index.html",
      },
    },
  },
  resolve: {
    alias: {
      // https://nodejs.org/api/esm.html#importmetadirname
      "@": resolve(import.meta.dirname, "src"),
    },
  },
});
