import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/dev-challenges/random-quote",
  resolve: {
    alias: {
      // https://nodejs.org/api/esm.html#importmetadirname
      "@": resolve(import.meta.dirname, "src"),
    },
  },
});