import {
  ServiceError,
  ResponseError,
  fetcher,
  type PromiseWithError,
} from "@lib/fetcher";
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
  const { query, location, /* fullTime, */ nextPageToken } = search;
  const params = new URLSearchParams({
    engine: "google_jobs",
    q: query,
    api_key: SERPAPI.KEY,
  });

  if (nextPageToken != null) params.append("next_page_token", nextPageToken);

  params.append("location", location ?? locationsMock[0].canonical_name);

  // if (fullTime) {
  //   params.append("chips", "employment_type:FULLTIME");
  // }

  const [error, data] = await fetcher(
    `${SERPAPI.URL}/search.json?${params.toString()}`,
    {
      schema: Schema,
      serviceError: JobsError,
    },
  );

  if (error != null) {
    if (error instanceof ResponseError && error.res.status >= 500)
      return [new Error("Jobs service internal error")];

    return [error];
  }

  if ("error" in data) {
    // serpapi endpoint error
    if (data.search_information.jobs_results_state === "Fully empty")
      return [new Error(`No jobs found for: ${query}`)];

    return [new Error(data.error)];
  }

  return [null, data];
};
