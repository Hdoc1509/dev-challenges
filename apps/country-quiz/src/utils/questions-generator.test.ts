import { describe, expect, it, vi } from "vitest";
import { generateQuestions } from "./questions-generator";
import { countries } from "../mocks/countries";
import { getRandomValues } from "crypto";

const cryptoMock = { getRandomValues };
vi.stubGlobal("crypto", cryptoMock);

describe("questions generator", () => {
  it("list without countries does not return questions", () => {
    expect(generateQuestions([])).toEqual([]);
  });

  it("questions should have unique ids", () => {
    const ids = generateQuestions(countries).map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
