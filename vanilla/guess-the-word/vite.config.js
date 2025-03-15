import { resolve } from "node:path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [createHtmlPlugin({ minify: true })],
  base: "/dev-challenges/guess-the-word",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("libs")) return "libs";
          if (id.includes("src/events")) return "events";
          if (id.includes("src/constants")) return "constants";
          if (id.includes("mocks/words/easy")) return "words-easy";
          if (id.includes("mocks/words/normal")) return "words-normal";
          if (id.includes("mocks/words/extreme")) return "words-extreme";
          if (id.includes("mocks/words/why")) return "words-why";
          if (id.includes("mocks/definitions")) return "definitions";
        },
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
