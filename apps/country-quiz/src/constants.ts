export const QuestionCategories = Object.freeze({
  CountryOfCapital: "CountryOfCapital",
  FlagOfCountry: "FlagOfCountry",
  Region: "Region",
});
export type QuestionCategory =
  (typeof QuestionCategories)[keyof typeof QuestionCategories];

export const REGIONS = [
  "africa",
  "americas",
  "antarctic",
  "asia",
  "europe",
  "oceania",
] as const;
export type Region = (typeof REGIONS)[number];
