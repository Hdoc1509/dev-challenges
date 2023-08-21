// https://vitejs.dev/config/
import { defineConfig } from "vite";
import { resolve } from "node:path";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ["lib/main.ts", "lib/ThemeButton.tsx"] }),
  ],
  build: {
    lib: {
      entry: {
        ["react-toggle-theme"]: resolve(__dirname, "lib/main.ts"),
        ["load-theme"]: resolve(__dirname, "lib/load-theme.ts"),
      },
      formats: ["es"],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
