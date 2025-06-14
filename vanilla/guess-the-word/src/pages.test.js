import { describe, expect, it } from "vitest";

const createPages = () => {
  return { TestPages: { totalPages: 0 } };
};

describe("Pages", () => {
  it.todo("sets initial `.totalPages` correctlty", () => {
    const { TestPages } = createPages();

    expect(TestPages.totalPages).toBe(0);
  });
});
