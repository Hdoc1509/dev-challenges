import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import {
  JobsResponseSchema,
  JobsErrorResponseSchema,
  type JobsResponse,
} from "./schema";
import { SERPAPI } from "@/config";
import locationsMock from "@/mocks/locations.json";
import type { Search } from "@/types";

const Schema = JobsResponseSchema.or(JobsErrorResponseSchema);
const JobsError = new ServiceError("Jobs");

export const getJobs = async (
  search: Search,
): PromiseWithError<JobsResponse> => {
  const { query, location, fullTime, page } = search;
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

  const [error, data] = await fetcher(
    `${SERPAPI.URL}/search.json?${params.toString()}`,
    {
      schema: Schema,
      serviceError: JobsError,
      checkStatus: false, // allows to read serpapi endpoint errors in response
    },
  );

  if (error) return [error];

  if ("error" in data) { // serpapi endpoint error
    if (data.search_information.jobs_results_state === "Fully empty")
      return [new Error(`No jobs found for: ${query}`)];

    return [new Error(data.error)];
  }

  return [null, data];
};
