import { QuestionCategories } from "../constants";
import type { Country } from "../schemas/country";
import type { Question } from "../types";

export const QUESTION = {
  [QuestionCategories.CountryOfCapital]: (capital: string) =>
    `${capital} is the capital of...`,
  [QuestionCategories.FlagOfCountry]: () =>
    "Which country does this flag belong to?",
  [QuestionCategories.Region]: (country: string) =>
    `Which region does ${country} belong to?`,
};

export const generateQuestions = (countries: Country[]): Question[] => {
  return [];
};
