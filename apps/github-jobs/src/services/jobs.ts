import { parseJobs } from "../utils/jobs";
import { ApiResponseSchema } from "../schemas/jobs";
import { JobsResponseError } from "../errors";
import { SERPAPI } from "../config";
import locationsMock from "../mocks/locations.json";
import type { Job, PromiseWithError, SearchOptions } from "../types";

export type JobService = (
  query: string,
  options?: SearchOptions,
) => PromiseWithError<Job[]>;

export const getJobs: JobService = async (query, options = {}) => {
  const { location, fullTime, page } = options;
  const params = new URLSearchParams({
    engine: "google_jobs",
    q: query,
    api_key: SERPAPI.KEY,
  });

  // INFO: https://serpapi.com/google-jobs-api#api-parameters-pagination
  params.append("start", (page ? (page - 1) * 10 : 0).toString());

  params.append("location", location ?? locationsMock[0].canonical_name);

  if (fullTime) {
    //NOTE: Based on employment_type chip from jobs mock. Line 707
    params.append("chips", "employment_type:FULLTIME");
  }

  try {
    const res = await fetch(`${SERPAPI.URL}/search.json?${params.toString()}`);

    if (!res.ok)
      return [new JobsResponseError("Jobs service response error", res)];

    const parsedData = ApiResponseSchema.safeParse(await res.json());

    if (!parsedData.success)
      return [new Error("Jobs service data error. Invalid data")];

    const { data } = parsedData;

    // NOTE:
    // based on https://serpapi.com/searches/245e315c7524f950/6644d67d7690dc208bd21e49.json
    if (data.search_information?.jobs_results_state === "Fully empty")
      return [new Error(`No jobs found for: ${query}`)];

    return [null, parseJobs(data)];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [new Error("An unknown error occurred while trying to get jobs")];
};
