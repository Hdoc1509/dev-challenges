import { fetcher, is5xxError, type PromiseWithError } from "@lib/fetcher";
import {
  JobsResponseSchema,
  JobsErrorResponseSchema,
  type JobsResponse,
} from "./schema";
import { JobsServiceError } from "./service-error";
import { SERPAPI } from "@/config";
import { GET_JOBS_PARAMS, type JobsParams } from "./params";
import locationsMock from "@/mocks/locations.json";
import type { Search } from "@/types";

const Schema = JobsResponseSchema.or(JobsErrorResponseSchema);

export const getJobs = async (
  search: Search,
): PromiseWithError<JobsResponse> => {
  const { query, location, fullTime, nextPageToken } = search;
  const paramsOptions: JobsParams["server"] = {
    engine: GET_JOBS_PARAMS.ENGINE,
    // see @/mocks/jobs-up-to-date.json line 68
    q: fullTime ? `${query} full time` : query,
    api_key: SERPAPI.KEY,
    location: location ?? locationsMock[0].canonical_name,
  };

  if (nextPageToken != null) paramsOptions.next_page_token = nextPageToken;

  const params = new URLSearchParams(paramsOptions);

  const [error, data] = await fetcher(
    `${SERPAPI.URL}/search.json?${params.toString()}`,
    {
      schema: Schema,
      serviceError: JobsServiceError,
    },
  );

  if (error != null)
    return [is5xxError(error) ? JobsServiceError.internal() : error];

  // serpapi endpoint error
  if ("error" in data)
    return [
      data.search_information.jobs_results_state === "Fully empty"
        ? new Error(`No jobs found for: ${query}`)
        : new Error(data.error),
    ];

  return [null, data];
};
