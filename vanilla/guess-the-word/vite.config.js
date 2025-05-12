import { resolve } from "node:path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { BUILD_CONFIG } from "./vite-config/build.js";
import { EJS_CONFIG } from "./vite-config/ejs.js";

// https://nodejs.org/api/esm.html#importmetadirname
const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: (attribute) => attribute === "ejs",
      },
      inject: {
        data: EJS_CONFIG.data,
        ejsOptions: {
          views: [resolve(__dirname, "components")],
        },
      },
    }),
  ],
  base: "/dev-challenges/guess-the-word",
  build: {
    rollupOptions: {
      output: {
        manualChunks: BUILD_CONFIG.manualChunks,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
