import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { JobsResponseSchema } from "./schema";
import { JobsEmptyResultsError } from "@/errors";
import { parseJobs } from "./parse";
import type { Job, Search } from "@/types";

const ApiResponseSchema = JobsResponseSchema.or(ApiErrorSchema);
const JobsError = new ServiceError("Jobs");

export const getJobs = async (search: Search): PromiseWithError<Job[]> => {
  const { query, location, fullTime, page } = search;

  const params = new URLSearchParams({ q: query, location });

  if (fullTime) params.append("full_time", "");
  if (page) params.append("page", `${page}`);

  const [error, data] = await fetcher(`/api/jobs?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: JobsError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) {
    if (data.error.match(/No jobs found/) != null)
      return [new JobsEmptyResultsError(data.error)];

    return [new Error(data.error)]; // api endpoint error
  }

  return [null, parseJobs(data)];
};
