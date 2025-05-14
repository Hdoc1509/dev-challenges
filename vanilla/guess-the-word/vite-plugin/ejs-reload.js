/** @param {{ dirname: string }} params
 * @return {import("vite").Plugin} */
export function ejsReloadPlugin({ dirname }) {
  return {
    name: "ejs-reload",
    apply: "serve",
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".ejs")) {
        const filePath = file.split(dirname)[1];

        server.config.logger.info(`[ejs-reload] ${filePath}`, {
          timestamp: true,
        });
        server.ws.send({ type: "full-reload" });
      }
    },
  };
}
