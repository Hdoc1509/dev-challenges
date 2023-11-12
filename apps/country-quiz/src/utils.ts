export const QUESTION = {
  countryOfCapital: (capital: string) => `${capital} is the capital of...`,
  flagOfCountry: () => "Which country does this flag belong to?",
};

export type QuestionCategory = keyof typeof QUESTION;
