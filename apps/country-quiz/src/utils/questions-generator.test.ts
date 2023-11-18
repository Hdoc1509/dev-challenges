import { describe, expect, it } from "vitest";
import { generateQuestions } from "./questions-generator"

describe("questions generator", () => {
  it("no countries no questions", () => {
    expect(generateQuestions([])).toEqual([]);
  });
})
