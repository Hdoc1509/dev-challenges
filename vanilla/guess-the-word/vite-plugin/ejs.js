import * as ejs from "ejs";

/** @param {{data: Record<string, any>, options: import("ejs").Options}} pluginConfig
 * @return {import("vite").Plugin} */
export function ejsPlugin(pluginConfig) {
  /** @type {import("vite").ResolvedConfig} */
  let config;
  // TODO: allow `data` and `options` as functions that returns an object
  // reference: https://github.com/trapcodeio/vite-plugin-ejs/blob/main/index.ts

  return {
    name: "vite-plugin-ejs",
    enforce: "pre",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    transformIndexHtml: {
      order: "pre",
      handler: (html) =>
        ejs.render(
          html,
          {
            NODE_END: config.mode,
            isDev: config.mode === "development",
            ...pluginConfig.data,
          },
          { ...pluginConfig.options, async: false },
        ),
    },
  };
}
