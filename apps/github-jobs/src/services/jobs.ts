import { parseJobs } from "../utils/jobs";
import { ApiResponseSchema } from "../schemas/jobs";
import { JobsResponseError } from "../errors";
import { API_KEY, API_URL } from "../config";
import jobsResponse from "../mocks/jobs.json";
import locationsMock from "../mocks/locations.json";
import type { Job } from "../types";

export const getMockedJobs = (): Promise<Job[]> => {
  const jobs = parseJobs(jobsResponse);
  const filtered = jobs.filter(
    (job) => job.location.match(/new york|\sny/i) != null,
  );

  return Promise.resolve(filtered);
};

type JobOptions = {
  location?: string;
};

export const getJobs = async (
  query?: string,
  options: JobOptions = {},
): Promise<Job[]> => {
  const { location } = options;
  const params = new URLSearchParams({
    engine: "google_jobs",
    q: query ?? "frontend web",
    api_key: API_KEY,
    location: location ?? locationsMock[0].canonical_name,
  });

  const res = await fetch(`${API_URL}/search.json?${params.toString()}`);

  if (!res.ok) throw new JobsResponseError("Jobs response error", res);

  const data = ApiResponseSchema.parse(await res.json());

  return parseJobs(data);
};
