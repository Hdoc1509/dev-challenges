import data from "../mocks/questions.json";
import type { Question } from "../types";

export const getMockQuestions = (limit: number = 10): Promise<Question[]> => {
  return Promise.resolve(data.questions.slice(0, limit) as Question[]);
};
