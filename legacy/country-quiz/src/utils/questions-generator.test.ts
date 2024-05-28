import { describe, expect, it, vi } from "vitest";
import { QUESTION, generateQuestions } from "./questions-generator";
import { countries } from "../mocks/countries";
import { getRandomValues } from "crypto";
import { QuestionCategories } from "../constants";
import type { Question } from "../types";

const cryptoMock = { getRandomValues };
vi.stubGlobal("crypto", cryptoMock);

describe("questions generator", () => {
  const getCapitalQuestion = (questions: Question[]) =>
    questions.find((q) => q.category === QuestionCategories.CountryOfCapital);
  const getFlagQuestion = (questions: Question[]) =>
    questions.find((q) => q.category === QuestionCategories.FlagOfCountry);
  const getRegionQuestion = (questions: Question[]) =>
    questions.find((q) => q.category === QuestionCategories.Region);

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
    const capitalQuestion = getCapitalQuestion(questions);

    expect(questions.length).toBe(Object.values(QuestionCategories).length - 1);
    expect(capitalQuestion).toBeUndefined();
  });

  it("question about flag should have flagUrl", () => {
    const country = countries.find((c) => c.capital.length === 1)!;
    const question = getFlagQuestion(generateQuestions([country]))!;

    expect(question).toHaveProperty("flagUrl");
  });

  it("should generate valid questions", () => {
    const country = countries.find((c) => c.capital.length === 1)!;
    const questions = generateQuestions([country]);

    expect(questions.length).toBe(Object.values(QuestionCategories).length);
    expect(getCapitalQuestion(questions)!.question).toBe(
      QUESTION[QuestionCategories.CountryOfCapital](country.capital[0]),
    );
    expect(getFlagQuestion(questions)!.question).toBe(
      QUESTION[QuestionCategories.FlagOfCountry](),
    );
    expect(getRegionQuestion(questions)!.question).toBe(
      QUESTION[QuestionCategories.Region](country.name),
    );
  });

  it("questions should have valid answer options", () => {
    const idx = countries.findIndex((c) => c.capital.length === 1);
    const country = countries[idx];
    const questions = generateQuestions(countries.slice(idx));
    // NOTE: it need more specific conditions because of random sorting
    const { answerOptions: capitalAnswers } = questions.find(
      (q) =>
        q.category === QuestionCategories.CountryOfCapital &&
        q.correctAnswer === country.name,
    )!;
    const { answerOptions: flagAnswers } = questions.find(
      (q) =>
        q.category === QuestionCategories.FlagOfCountry &&
        q.correctAnswer === country.name,
    )!;
    const { answerOptions: regionAnswers } = questions.find(
      (q) =>
        q.category === QuestionCategories.Region &&
        q.correctAnswer === country.region,
    )!;

    expect(capitalAnswers).toBeInstanceOf(Array);
    expect(capitalAnswers).toContain(country.name);
    expect(capitalAnswers.filter((a) => a === country.name)).toHaveLength(1);
    expect(capitalAnswers.length).toBeGreaterThanOrEqual(4);

    expect(flagAnswers).toBeInstanceOf(Array);
    expect(flagAnswers).toContain(country.name);
    expect(flagAnswers.filter((a) => a === country.name)).toHaveLength(1);
    expect(flagAnswers.length).toBeGreaterThanOrEqual(4);

    expect(regionAnswers).toBeInstanceOf(Array);
    expect(regionAnswers).toContain(country.region);
    expect(regionAnswers.filter((a) => a === country.region)).toHaveLength(1);
    expect(regionAnswers.length).toBeGreaterThanOrEqual(4);
  });

  it("questions should have a correct answer", () => {
    const country = countries.find((c) => c.capital.length === 1)!;
    const questions = generateQuestions([country]);

    expect(getCapitalQuestion(questions)!.correctAnswer).toBe(country.name);
    expect(getFlagQuestion(questions)!.correctAnswer).toBe(country.name);
    expect(getRegionQuestion(questions)!.correctAnswer).toBe(country.region);
  });

  it("questions should have properties about selected answer", () => {
    const question = generateQuestions(countries)[0];

    expect(question.selectedAnswer).toBeNull();
    expect(question.hasBeenAnsweredCorrectly).toBeNull();
  });
});
