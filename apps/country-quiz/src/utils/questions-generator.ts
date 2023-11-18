import { QuestionCategories } from "../constants";

const QUESTION = {
  [QuestionCategories.CountryOfCapital]: (capital: string) =>
    `${capital} is the capital of...`,
  [QuestionCategories.FlagOfCountry]: () =>
    "Which country does this flag belong to?",
  [QuestionCategories.Region]: (country: string) =>
    `Which region does ${country} belong to?`,
};
