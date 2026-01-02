import type { MinifierOptions } from "html-minifier-next";
import type { Plugin } from "vite";

/** By default, this plugin sets the following options:
 * `collapseWhitespace: true`
 * `keepClosingSlash: true`
 * `removeComments: true`
 * `removeRedundantAttributes: true`
 * `removeScriptTypeAttributes: true`
 * `removeStyleLinkTypeAttributes: true`
 * `useShortDoctype: true`
 * `minifyCSS: true`
 */
export function htmlMinifierPlugin(config?: MinifierOptions): Plugin;
