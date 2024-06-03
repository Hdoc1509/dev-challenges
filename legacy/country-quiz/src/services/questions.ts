import { generateQuestions } from "../utils/questions-generator";
import { getCountries } from "./countries";
import { getCountriesFromBin } from "./npoint";
import data from "../mocks/questions.json";
import type { Question } from "../types";

export const getMockQuestions = (limit: number = 10): Promise<Question[]> => {
  return Promise.resolve(data.questions.slice(0, limit) as Question[]);
};

export const getQuestions = async (limit: number = 10): Promise<Question[]> => {
  try {
    const countries = await getCountries(limit * 2);
    return generateQuestions(countries).slice(0, limit);
  } catch (error) {
    const countries = await getCountriesFromBin(limit * 2);
    return generateQuestions(countries).slice(0, limit);
  }
};
