import { generateQuestions } from "../utils/questions-generator";
import { randomSort } from "../utils/helpers";
import { getCountries } from "./countries";
import { getCountriesFromBin } from "./npoint";
import data from "../mocks/questions.json";
import type { Question } from "../types";
import type { Country } from "../schemas/country";

const LS_KEY = "countries";

export const getMockQuestions = (limit: number = 10): Promise<Question[]> => {
  return Promise.resolve(data.questions.slice(0, limit) as Question[]);
};

export const getQuestions = async (limit: number = 10): Promise<Question[]> => {
  const stored = localStorage.getItem(LS_KEY);
  let countries: Country[] = [];

  if (stored) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = JSON.parse(stored) as Country[];

    return generateQuestions(randomSort(data)).slice(0, limit);
  }

  try {
    const data = await getCountries();

    countries = data;
  } catch (error) {
    const data = await getCountriesFromBin();

    countries = data;
  }

  localStorage.setItem(LS_KEY, JSON.stringify(countries));

  return generateQuestions(randomSort(countries)).slice(0, limit);
};
