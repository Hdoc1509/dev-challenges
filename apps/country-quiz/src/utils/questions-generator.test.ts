import { describe, expect, it, vi } from "vitest";
import { QUESTION, generateQuestions } from "./questions-generator";
import { countries } from "../mocks/countries";
import { getRandomValues } from "crypto";
import { QuestionCategories } from "../constants";

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

  it("questions should have valid categories", () => {
    const validCategories = new Set(Object.values(QuestionCategories));
    const categories = new Set(
      generateQuestions(countries).map((q) => q.category),
    );

    expect(categories).toEqual(validCategories);
  });

  it("country without capital should not have question about capital", () => {
    const countryWithoutCapital = countries.find(
      (c) => c.capital.length === 0,
    )!;
    const questions = generateQuestions([countryWithoutCapital]);
    const capitalQuestion = questions.filter(
      (q) => q.category === QuestionCategories.CountryOfCapital,
    );

    expect(questions.length).toBe(Object.values(QuestionCategories).length - 1);
    expect(capitalQuestion.length).toBe(0);
  });

  it("should generate valid questions", () => {
    const country = countries.find((c) => c.capital.length === 1)!;
    const questions = generateQuestions([country]);

    expect(questions.length).toBe(Object.values(QuestionCategories).length);
    expect(
      questions.find((q) => q.category === QuestionCategories.CountryOfCapital)!
        .question,
    ).toBe(QUESTION[QuestionCategories.CountryOfCapital](country.capital[0]));
    expect(
      questions.find((q) => q.category === QuestionCategories.FlagOfCountry)!
        .question,
    ).toBe(QUESTION[QuestionCategories.FlagOfCountry]());
    expect(
      questions.find((q) => q.category === QuestionCategories.Region)!.question,
    ).toBe(QUESTION[QuestionCategories.Region](country.name));
  });

  it("questions should have valid answer options", () => {
    const country = countries.find((c) => c.capital.length === 1)!;
    const questions = generateQuestions(countries);
    const { answerOptions: capitalAnswers } = questions.find(
      (q) => q.category === QuestionCategories.CountryOfCapital,
    )!;
    const { answerOptions: flagAnswers } = questions.find(
      (q) => q.category === QuestionCategories.FlagOfCountry,
    )!;
    const { answerOptions: regionAnswers } = questions.find(
      (q) => q.category === QuestionCategories.Region,
    )!;

    expect(capitalAnswers).toContain(country.name);
    expect(capitalAnswers.filter((a) => a === country.name)).toHaveLength(1);
    expect(capitalAnswers.length).toBeGreaterThanOrEqual(4);

    expect(flagAnswers).toContain(country.name);
    expect(flagAnswers.filter((a) => a === country.name)).toHaveLength(1);
    expect(flagAnswers.length).toBeGreaterThanOrEqual(4);

    expect(regionAnswers).toContain(country.region);
    expect(regionAnswers.filter((a) => a === country.region)).toHaveLength(1);
    expect(regionAnswers.length).toBeGreaterThanOrEqual(4);
  });
});
