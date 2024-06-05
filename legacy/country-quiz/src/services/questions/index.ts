import { z } from "zod";
import { generateQuestions } from "@/utils/questions-generator";
import { randomSort } from "@/utils/helpers";
import { getCountries, getCountriesFromBin } from "../countries";
import data from "@/mocks/questions.json";
import type { Question, PromiseWithError } from "@/types";

type QuestionService = (limit?: number) => PromiseWithError<Question[]>;

const StoredSchema = z.array(
  z.object({
    name: z.string(),
    region: z.string(),
    capital: z.array(z.string()),
    flagUrl: z.string(),
  }),
);

const LS_KEY = "countries";

export const getMockQuestions = (limit: number = 10): Promise<Question[]> => {
  return Promise.resolve(data.questions.slice(0, limit) as Question[]);
};

export const getQuestions: QuestionService = async (limit = 10) => {
  const stored = localStorage.getItem(LS_KEY);

  if (stored) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const parsed = StoredSchema.safeParse(JSON.parse(stored));

    if (parsed.success)
      return [null, generateQuestions(randomSort(parsed.data)).slice(0, limit)];
  }

  const [errorRestCountries, dataRestCountries] = await getCountries();

  if (!errorRestCountries)
    return [
      null,
      generateQuestions(randomSort(dataRestCountries)).slice(0, limit),
    ];

  const [errorNpoint, dataNpoint] = await getCountriesFromBin();

  if (errorNpoint) return [errorNpoint];

  return [null, generateQuestions(randomSort(dataNpoint)).slice(0, limit)];
};
