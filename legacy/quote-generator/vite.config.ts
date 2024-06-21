import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  base: "/dev-challenges/legacy/quote-generator",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
