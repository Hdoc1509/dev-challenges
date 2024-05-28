import { randomElement, randomSort, toTitleCase } from "./helpers";
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

const generateAnswers = <T,>({ source, correct, mapBy }: AnswerOptions<T>) =>
  randomSort(source.map(mapBy).filter((c) => c !== correct))
    .slice(0, 3)
    .concat(correct);

export const generateQuestions = (countries: Country[]): Question[] => {
  const questions: Question[] = [];

  countries.forEach((country) => {
    for (const category in QuestionCategories) {
      const quiz: Question = {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        category: category as QuestionCategory,
        question: "",
        answerOptions: [],
        correctAnswer: "",
        selectedAnswer: null,
        hasBeenAnsweredCorrectly: null,
      };

      if (category === QuestionCategories.CountryOfCapital) {
        const capitals = country.capital;
        const hasCapital = capitals.length > 0;

        if (!hasCapital) continue;

        const capital =
          capitals.length === 1 ? capitals[0] : randomElement(capitals);

        quiz.question = QUESTION[category](capital);
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
        quiz.flagUrl = country.flagUrl;
      } else if (category === QuestionCategories.Region) {
        quiz.question = QUESTION[category](country.name);
        quiz.answerOptions = generateAnswers({
          source: REGIONS.map(toTitleCase),
          correct: country.region,
          mapBy: (r) => r,
        });
        quiz.correctAnswer = country.region;
      }

      quiz.answerOptions = randomSort(quiz.answerOptions);
      questions.push(quiz);
    }
  });

  return randomSort(questions);
};
