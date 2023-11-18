export const QuestionCategories = Object.freeze({
  CountryOfCapital: "CountryOfCapital",
  FlagOfCountry: "FlagOfCountry",
  Region: "Region",
});
export type QuestionCategory =
  (typeof QuestionCategories)[keyof typeof QuestionCategories];

// NOTE: Only 5 regions will be used
export const REGIONS = [
  "africa",
  "americas",
  "asia",
  "europe",
  "oceania",
] as const;
export type Region = (typeof REGIONS)[number];
