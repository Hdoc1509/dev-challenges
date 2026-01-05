import { resolve } from "node:path";
import { defineConfig } from "vite";
import {
  buildInjectScripts,
  serverInjectScripts,
} from "./plugin/inject-scripts";
import { htmlMinifierPlugin } from "vite-plugin-html-minifier";

const BASE_URL = "/dev-challenges/qr-code-generator";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // TODO: merge inject plugins into one plugin that returns an array of plugins
    serverInjectScripts(BASE_URL),
    buildInjectScripts(BASE_URL),
    htmlMinifierPlugin(),
  ],
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
