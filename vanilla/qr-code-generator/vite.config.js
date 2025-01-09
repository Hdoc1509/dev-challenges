import { resolve } from "node:path";
import { defineConfig } from "vite";
// import { createHtmlPlugin } from "vite-plugin-html";

const BASE_URL = "/dev-challenges/qr-code-generator";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [createHtmlPlugin({ minify: true })],
  plugins: [
    {
      name: "qrcodejs-script-server",
      apply: "serve",
      transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              tag: "script",
              attrs: {
                src: `${BASE_URL}/node_modules/qrcodejs/qrcode.min.js`,
              },
              injectTo: "head-prepend",
            },
          ],
        };
      },
    },
    {
      name: "qrcodejs-script-build",
      apply: "build",
      transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              tag: "script",
              attrs: {
                // NOTE: ./scripts/copy-qrcodejs.sh is the responsible for
                // copying the file to the build folder.
                src: `${BASE_URL}/assets/qrcode.min.js`,
              },
              injectTo: "head-prepend",
            },
          ],
        };
      },
    },
  ],
  base: BASE_URL,
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        qr_code: "qr-code/index.html",
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
