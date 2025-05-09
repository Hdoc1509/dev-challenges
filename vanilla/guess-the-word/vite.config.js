import { resolve } from "node:path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { DIFFICULTY } from "./src/consts/difficulty";
import { STATS_CATEGORY_TOTAL } from "./src/consts/stats";

const STATS_CATEGORIES = /** @type {const} */ ([
  STATS_CATEGORY_TOTAL,
  ...Object.values(DIFFICULTY),
]);

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
        data: {
          capitalize: (word) => word[0].toUpperCase() + word.slice(1),
          DIFFICULTY,
          STATS_CATEGORIES,
        },
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
        manualChunks(id) {
          if (id.includes("libs")) return "libs";
          if (id.includes("src/ui") && id.match(/timer|resets|stats/) == null)
            return "ui";
          if (
            id.includes("src/events/handlers") &&
            id.match(/letter-focus|difficulty-complete/) == null
          )
            return "event-handlers";
          if (id.includes("src/events/listeners")) return "event-listeners";
          if (id.includes("src/consts") && !id.includes("src/consts/words"))
            return "consts";
          if (id.includes("src/utils")) return "utils";
          if (id.includes("mocks/definitions")) return "definitions";
        },
      },
    },
  },
  resolve: {
    alias: {
      // https://nodejs.org/api/esm.html#importmetadirname
      "@": resolve(__dirname, "src"),
    },
  },
});
