import { QuestionCategories, type QuestionCategory } from "../constants";
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
  return countries.flatMap((country) => {
    const questions = [];

    for (const category in QuestionCategories) {
      const quiz: Question = {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        category: category as QuestionCategory,
        question: "",
      };

      if (category === QuestionCategories.CountryOfCapital) {
        if (country.capital.length === 0) continue;

        quiz.question = QUESTION[category](country.capital[0]);
      } else if (category === QuestionCategories.FlagOfCountry) {
        quiz.question = QUESTION[category]();
      } else if (category === QuestionCategories.Region) {
        quiz.question = QUESTION[category](country.name);
      }

      questions.push(quiz);
    }

    return questions;
  });
};
