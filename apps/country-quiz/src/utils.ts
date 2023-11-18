export const QuestionCategories = Object.freeze({
  CountryOfCapital: "CountryOfCapital",
  FlagOfCountry: "FlagOfCountry",
  Region: "Region",
});

export const QUESTION = {
  [QuestionCategories.CountryOfCapital]: (capital: string) =>
    `${capital} is the capital of...`,
  [QuestionCategories.FlagOfCountry]: () => "Which country does this flag belong to?",
  [QuestionCategories.Region]: () => "Which region does this country belong to?",
};

export type QuestionCategory = keyof typeof QUESTION;

export const randomSort = <T>(arr: T[]): T[] =>
  structuredClone(arr).sort(() => Math.random() - 0.5);
