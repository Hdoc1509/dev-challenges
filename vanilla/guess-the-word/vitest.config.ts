import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.js"],
    // NOTE: happy-dom does not support :scope selector
    // until https://github.com/capricorn86/happy-dom/pull/1771 has been merged
    environment: "jsdom",
  },
});

// TEST: add tests
// - use `@testing-library/dom` to test each DOM library
//   - `Pages`, `Pagination`, `Tabs`, `CountdownBar`, `@lib/step-indicator` and
//     `@lib/alert`
//   - references:
//     - https://stevekinney.com/courses/testing/testing-the-dom-example
//     - https://stevekinney.com/courses/testing/testing-local-storage
//     - https://stevekinney.com/courses/testing/testing-library
//     - https://testing-library.com/docs/dom-testing-library/example-intro
//     - https://testing-library.com/docs/user-event/intro/
// - use `playwright` to test interactions between components in a real usage
// flow
