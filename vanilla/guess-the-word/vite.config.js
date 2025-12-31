import { resolve } from "node:path";
import { defineConfig } from "vite";
import { ejsPlugin } from "./vite-plugin/ejs.js";
import { ejsReloadPlugin } from "./vite-plugin/ejs-reload.js";
import { htmlMinifierPlugin } from "./vite-plugin/html-minifier.js";
import { BUILD_CONFIG } from "./vite-config/build.js";
import { EJS_CONFIG } from "./vite-config/ejs.js";

// https://nodejs.org/api/esm.html#importmetadirname
const __dirname = import.meta.dirname;

// TODO: try to write custom vite plugin to use index.ejs as entry point
// references:
// https://github.com/donnikitos/vite-plugin-php

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ejsPlugin({
      data: EJS_CONFIG.data,
      options: {
        views: [resolve(__dirname, "components")],
      },
    }),
    htmlMinifierPlugin({
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeComments: true,
      removeEmptyAttributes: (attribute) => attribute === "ejs",
      removeRedundantAttributes: true,
    }),
    ejsReloadPlugin({ dirname: __dirname }),
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
