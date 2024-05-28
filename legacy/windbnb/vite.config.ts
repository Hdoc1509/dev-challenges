import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  base: "/dev-challenges/legacy/windbnb/",
  resolve: {
    alias: {
      "@scss": resolve(__dirname, "src/scss"),
    },
  },
});
