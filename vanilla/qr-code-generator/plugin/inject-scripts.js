/** @typedef {import("vite").Plugin} Plugin */

const BASE_URL = "/dev-challenges/qr-code-generator";
const QR_CODE_PAGE_TITLE = "Qr Code Generator | QR Code - DevChallenges";

const redirectTagScript = /** @type {const} */ ({
  tag: "script",
  attrs: {
    src: `${BASE_URL}/redirect.js`,
  },
  injectTo: "head-prepend",
});

/** @param {string} html */
const isQRCodePage = (html) =>
  html.includes(`<title>${QR_CODE_PAGE_TITLE}</title>`);

/** @returns {Plugin} */
export const serverInjectScripts = () => ({
  name: "server-inject-scripts",
  apply: "serve",
  transformIndexHtml(html) {
    if (!isQRCodePage(html)) return;

    return {
      html,
      tags: [
        redirectTagScript,
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
});

/** @returns {Plugin} */
export const buildInjectScripts = () => ({
  name: "build-inject-scripts",
  apply: "build",
  transformIndexHtml(html) {
    if (!isQRCodePage(html)) return;

    return {
      html,
      tags: [
        redirectTagScript,
        {
          tag: "script",
          attrs: {
            // NOTE: scripts/copy-qrcodejs.sh is the responsible for
            // copying the file to the build folder.
            src: `${BASE_URL}/assets/qrcode.min.js`,
          },
          injectTo: "head-prepend",
        },
      ],
    };
  },
});
