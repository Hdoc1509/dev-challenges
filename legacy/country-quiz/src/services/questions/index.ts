import { StoredSchema } from "./schema";
import { generateQuestions } from "@/utils/questions-generator";
import { randomSort } from "@/utils/helpers";
import { getCountries, getCountriesFromBin } from "../countries";
import questionsMock from "@/mocks/questions.json";
import type { PromiseWithError } from "@lib/fetcher";
import type { Question } from "@/types";

const LS_KEY = "countries";

export const getMockQuestions = (limit: number = 10): Promise<Question[]> => {
  return Promise.resolve(questionsMock.questions.slice(0, limit) as Question[]);
};

export const getQuestions = async (
  limit: number,
): PromiseWithError<Question[]> => {
  const stored = localStorage.getItem(LS_KEY);

  if (stored) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const parsed = StoredSchema.safeParse(JSON.parse(stored));

    if (parsed.success)
      return [null, generateQuestions(randomSort(parsed.data), limit)];
  }

  const [errorRestCountries, dataRestCountries] = await getCountries();

  if (!errorRestCountries)
    return [null, generateQuestions(randomSort(dataRestCountries), limit)];

  const [errorNpoint, dataNpoint] = await getCountriesFromBin();

  if (errorNpoint) return [errorNpoint];

  return [null, generateQuestions(randomSort(dataNpoint), limit)];
};
