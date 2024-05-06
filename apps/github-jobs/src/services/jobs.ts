import { parseJobs } from "../utils/jobs";
import { ApiResponseSchema } from "../schemas/jobs";
import { JobsResponseError } from "../errors";
import { API_KEY, API_URL } from "../config";
import jobsResponse from "../mocks/jobs.json";
import locationsMock from "../mocks/locations.json";
import type { Job } from "../types";

type JobServiceReturn = Promise<[Error] | [null, Job[]]>;

export const getMockedJobs = (): JobServiceReturn => {
  const jobs = parseJobs(jobsResponse);
  const filtered = jobs.filter(
    (job) => job.location.match(/new york|\sny/i) != null,
  );

  return Promise.resolve([null, filtered]);
};

type JobOptions = {
  location?: string;
};

export const getJobs = async (
  query?: string,
  options: JobOptions = {},
): JobServiceReturn => {
  const { location } = options;
  const params = new URLSearchParams({
    engine: "google_jobs",
    q: query ?? "frontend web",
    api_key: API_KEY,
    location: location ?? locationsMock[0].canonical_name,
  });

  const res = await fetch(`${API_URL}/search.json?${params.toString()}`);

  if (!res.ok)
    return [new JobsResponseError("Jobs service response error", res)];

  const parsedData = ApiResponseSchema.safeParse(await res.json());

  if (!parsedData.success)
    return [new Error("Jobs service data error. Invalid data")];

  return [null, parseJobs(parsedData.data)];
};
