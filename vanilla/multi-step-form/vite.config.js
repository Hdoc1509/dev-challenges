import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: "/dev-challenges/multi-step-form",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
