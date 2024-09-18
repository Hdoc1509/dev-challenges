import { fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { JobsResponseSchema } from "./schema";
import {
  JobsServiceError,
  JobsEmptyResultsError,
  isJobsEmptyResultsMessage,
} from "./service-error";
import { parseJobs } from "./parse";
import type { Job, Search } from "@/types";
import type { JobsParams } from "./params";

const ApiResponseSchema = JobsResponseSchema.or(ApiErrorSchema);

export type JobsServiceSuccess = { jobs: Job[]; nextPageToken?: string };
export type JobsServiceResult = PromiseWithError<JobsServiceSuccess>;

export const getJobs = async (search: Search): JobsServiceResult => {
  const { query, location, fullTime, nextPageToken } = search;
  const paramsOptions: JobsParams["client"] = { q: query, location };

  if (fullTime) paramsOptions.full_time = "";
  if (nextPageToken != null) paramsOptions.next_page_token = nextPageToken;

  const params = new URLSearchParams(paramsOptions);

  const [error, data] = await fetcher(`/api/jobs?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: JobsServiceError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  // api endpoint error
  if ("error" in data)
    return [
      isJobsEmptyResultsMessage(data.error)
        ? new JobsEmptyResultsError({ query })
        : new Error(data.error),
    ];

  return [
    null,
    {
      jobs: parseJobs(data.jobs_results),
      nextPageToken: data.serpapi_pagination?.next_page_token,
    },
  ];
};
