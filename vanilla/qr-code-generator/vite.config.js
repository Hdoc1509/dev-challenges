import { resolve } from "node:path";
import { defineConfig } from "vite";
import {
  buildInjectScripts,
  serverInjectScripts,
} from "./plugin/inject-scripts";
// import { createHtmlPlugin } from "vite-plugin-html";

const BASE_URL = "/dev-challenges/qr-code-generator";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [createHtmlPlugin({ minify: true })],
  plugins: [serverInjectScripts(BASE_URL), buildInjectScripts(BASE_URL)],
  base: BASE_URL,
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
