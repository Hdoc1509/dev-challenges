// https://vitejs.dev/config/
import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react-swc";

import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ["lib"] })],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
