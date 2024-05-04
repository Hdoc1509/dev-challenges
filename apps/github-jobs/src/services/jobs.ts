import { parseJobs } from "../utils";
import { ApiResponseSchema } from "../schemas/jobs";
import { JobsResponseError } from "../errors";
import { API_KEY, API_URL } from "../config";
import jobsResponse from "../mocks/jobs.json";

export type Job = {
  title: string;
  company: string;
  location: string;
  description: string;
  id: string;
  createdAt?: string;
  thumbnail?: string;
  isFullTime: boolean;
};

export const getMockedJobs = (): Job[] => {
  return parseJobs(jobsResponse);
};

export const getJobs = async (query: string): Promise<Job[]> => {
  const params = new URLSearchParams({
    engine: "google_jobs",
    q: query,
    api_key: API_KEY,
  });

  const res = await fetch(`${API_URL}/search.json?${params.toString()}`);

  if (!res.ok) throw new JobsResponseError("Jobs response error", res);

  const data = ApiResponseSchema.parse(await res.json());

  return parseJobs(data);
};
