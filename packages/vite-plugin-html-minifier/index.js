import { minify } from "html-minifier-next";

/** @type {import("html-minifier-next").MinifierOptions} */
const defaultConfig = {
  collapseWhitespace: true,
  keepClosingSlash: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
};

/** @param {import("html-minifier-next").MinifierOptions} config
 * @return {import("vite").Plugin} */
export function htmlMinifierPlugin(config) {
  return {
    name: "vite-plugin-html-minifier",
    enforce: "post",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler: (html) => minify(html, { ...defaultConfig, ...config }),
    },
  };
}
