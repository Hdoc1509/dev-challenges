/** @typedef {import("vite").Plugin} Plugin */
/** @typedef {(baseUrl: string) => Plugin} InjectScriptPlugin */

const QR_CODE_PAGE_TITLE = "QR Code Generator | QR Code - DevChallenges";

/** @param {string} baseUrl */
const redirectTagScript = (baseUrl) =>
  /** @type {const} */ ({
    tag: "script",
    attrs: {
      src: `${baseUrl}/redirect.js`,
    },
    injectTo: "head-prepend",
  });

/** @param {string} html */
const isQRCodePage = (html) =>
  html.includes(`<title>${QR_CODE_PAGE_TITLE}</title>`);

/** @type {InjectScriptPlugin} */
export const serverInjectScripts = (baseUrl) => ({
  name: "server-inject-scripts",
  apply: "serve",
  transformIndexHtml(html) {
    if (!isQRCodePage(html)) return;

    return {
      html,
      tags: [
        redirectTagScript(baseUrl),
        {
          tag: "script",
          attrs: {
            src: `${baseUrl}/node_modules/qrcodejs/qrcode.min.js`,
          },
          injectTo: "head-prepend",
        },
      ],
    };
  },
});

/** @type {InjectScriptPlugin} */
export const buildInjectScripts = (baseUrl) => ({
  name: "build-inject-scripts",
  apply: "build",
  transformIndexHtml(html) {
    if (!isQRCodePage(html)) return;

    return {
      html,
      tags: [
        redirectTagScript(baseUrl),
        {
          tag: "script",
          attrs: {
            // NOTE: scripts/copy-qrcodejs.sh is the responsible for
            // copying the file to the build folder.
            src: `${baseUrl}/assets/qrcode.min.js`,
          },
          injectTo: "head-prepend",
        },
      ],
    };
  },
});
