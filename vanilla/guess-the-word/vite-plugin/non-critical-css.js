/** @typedef {(baseUrl: string) => import("vite").Plugin} InjectScriptPlugin */

/** @param {string} baseUrl */
const createLinkTag = (baseUrl) =>
  /** @type {const} */ ({
    tag: "link",
    attrs: {
      rel: "preload",
      as: "style",
      onload: "this.onload=null;this.rel='stylesheet'",
      href: `${baseUrl}/non-critical/main.css`,
    },
    injectTo: "head",
  });

/** @param {string} baseUrl */
const createNoscriptTag = (baseUrl) =>
  /** @type {const} */ ({
    tag: "noscript",
    children: [
      {
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: `${baseUrl}/non-critical/main.css`,
        },
      },
      createLinkTag(baseUrl),
    ],
    injectTo: "head",
  });

/** @type {InjectScriptPlugin} */
const serverInjection = (baseUrl) => {
  return {
    name: "defer-non-critical-css",
    apply: "serve",
    transformIndexHtml(html) {
      const targetBaseUrl = `${baseUrl}/src/styles`;

      return {
        html,
        tags: [createLinkTag(targetBaseUrl), createNoscriptTag(targetBaseUrl)],
      };
    },
  };
};

// NOTE: looks like I will need to build non-critical/main.css separately

/** @param {string} baseUrl */
export const createNonCriticalCssPlugin = (baseUrl) => [
  serverInjection(baseUrl),
];
