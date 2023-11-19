import { toTitleCase } from "./generateQuestions";
import {
  REGIONS,
  QuestionCategories,
  type QuestionCategory,
} from "../constants";
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
        answerOptions: [],
      };

      if (category === QuestionCategories.CountryOfCapital) {
        if (country.capital.length === 0) continue;

        const options = countries
          .map((c) => c.name)
          .filter((c) => c !== country.name)
          .slice(0, 3);

        quiz.question = QUESTION[category](country.capital[0]);
        quiz.answerOptions = options.concat(country.name);
      } else if (category === QuestionCategories.FlagOfCountry) {
        const options = countries
          .map((c) => c.name)
          .filter((c) => c !== country.name)
          .slice(0, 3);

        quiz.question = QUESTION[category]();
        quiz.answerOptions = options.concat(country.name);
      } else if (category === QuestionCategories.Region) {
        const options = REGIONS.map(toTitleCase)
          .filter((r) => r !== country.region)
          .slice(0, 3);

        quiz.question = QUESTION[category](country.name);
        quiz.answerOptions = options.concat(country.region);
      }

      questions.push(quiz);
    }

    return questions;
  });
};
