import { STATUS as FETCHER_STATUS } from "@lib/fetcher";

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

export const STATUS = Object.freeze({
  ...FETCHER_STATUS,
  OVER: "over",
});
export type Status = (typeof STATUS)[keyof typeof STATUS];
