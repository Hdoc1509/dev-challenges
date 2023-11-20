import { toTitleCase } from "./helpers";
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

type AnswerOptions<T> = {
  source: T[];
  correct: string;
  mapBy: (country: T) => string;
};

const generateAnswers = <T>({ source, correct, mapBy }: AnswerOptions<T>) =>
  source
    .map(mapBy)
    .filter((c) => c !== correct)
    .slice(0, 3)
    .concat(correct);

export const generateQuestions = (countries: Country[]): Question[] => {
  return countries.flatMap((country) => {
    const questions = [];

    for (const category in QuestionCategories) {
      const quiz: Question = {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        category: category as QuestionCategory,
        question: "",
        answerOptions: [],
        correctAnswer: "",
      };

      if (category === QuestionCategories.CountryOfCapital) {
        if (country.capital.length === 0) continue;

        quiz.question = QUESTION[category](country.capital[0]);
        quiz.answerOptions = generateAnswers({
          source: countries,
          correct: country.name,
          mapBy: (c) => c.name,
        });
        quiz.correctAnswer = country.name;
      } else if (category === QuestionCategories.FlagOfCountry) {
        quiz.question = QUESTION[category]();
        quiz.answerOptions = generateAnswers({
          source: countries,
          correct: country.name,
          mapBy: (c) => c.name,
        });
        quiz.correctAnswer = country.name;
      } else if (category === QuestionCategories.Region) {
        quiz.question = QUESTION[category](country.name);
        quiz.answerOptions = generateAnswers({
          source: REGIONS.map(toTitleCase),
          correct: country.region,
          mapBy: (r) => r,
        });
        quiz.correctAnswer = country.region;
      }

      questions.push(quiz);
    }

    return questions;
  });
};
