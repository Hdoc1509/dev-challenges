export const BUILD_CONFIG = {
  /** @param {string} id */
  manualChunks(id) {
    if (id.includes("libs") && id.match(/alert|fetcher/) == null) return "libs";
    if (id.includes("src/ui") && id.match(/timer|resets|stats/) == null)
      return "ui";
    if (
      id.includes("src/events/handlers") &&
      id.match(/letter-focus|difficulty-complete/) == null
    )
      return "event-handlers";
    if (id.includes("src/events/listeners")) return "event-listeners";
    if (id.includes("src/consts") && !id.includes("src/consts/words"))
      return "consts";
    if (id.includes("src/utils")) return "utils";
    if (id.includes("mocks/definitions")) return "definitions";
  },
};
