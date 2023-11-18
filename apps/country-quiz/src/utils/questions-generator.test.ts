import { describe, expect, it } from "vitest";
import { generateQuestions } from "./questions-generator";

describe("questions generator", () => {
  it("list without countries does not return questions", () => {
    expect(generateQuestions([])).toEqual([]);
  });
});
