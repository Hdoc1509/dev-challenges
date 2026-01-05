import { resolve } from "node:path";
import { defineConfig } from "vite";
import { htmlMinifierPlugin } from "vite-plugin-html-minifier";

// https://vite.dev/config/
export default defineConfig({
  plugins: [htmlMinifierPlugin()],
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
