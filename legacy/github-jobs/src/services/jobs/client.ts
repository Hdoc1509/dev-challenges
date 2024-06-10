import { ServiceError, fetcher } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { JobsResponseSchema } from "@/schemas/jobs";
import { parseJobs } from "@/utils/jobs";
import type { JobService } from "./types";

const ApiResponseSchema = JobsResponseSchema.or(ApiErrorSchema);
const JobsError = new ServiceError("Jobs");

export const getJobs: JobService = async (search) => {
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

  if ("error" in data) return [new Error(data.error)]; // api endpoint error

  return [null, parseJobs(data)];
};
