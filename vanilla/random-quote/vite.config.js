import { resolve } from "node:path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [createHtmlPlugin({ minify: true })],
  base: "/dev-challenges/random-quote",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
          if (id.includes("libs")) return "libs";
          if (id.includes("src/events")) return "events";
          if (id.includes("src/services")) return "services";
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
