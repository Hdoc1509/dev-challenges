import { minify } from "html-minifier-next";

// TODO: externalize to /packages/vite-plugin-html-minifier/

/** @param {import("html-minifier-next").MinifierOptions} config
 * @return {import("vite").Plugin} */
export function htmlMinifierPlugin(config) {
  return {
    name: "vite-plugin-html-minifier",
    enforce: "post",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler: (html) => minify(html, config),
    },
  };
}
