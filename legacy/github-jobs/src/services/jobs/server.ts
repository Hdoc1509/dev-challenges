import { JobsResponseSchema, type JobsResponse } from "@/schemas/jobs";
import { JobsResponseError } from "@/errors";
import { SERPAPI } from "@/config";
import locationsMock from "@/mocks/locations.json";
import type { JobService } from "./types";

export const getJobs: JobService<JobsResponse> = async (search) => {
  const { query, location, fullTime, page } = search;
  const params = new URLSearchParams({
    engine: "google_jobs",
    q: query,
    api_key: SERPAPI.KEY,
  });
  const controller = new AbortController();

  // INFO: https://serpapi.com/google-jobs-api#api-parameters-pagination
  params.append("start", (page ? (page - 1) * 10 : 0).toString());

  params.append("location", location ?? locationsMock[0].canonical_name);

  if (fullTime) {
    //NOTE: Based on employment_type chip from jobs mock. Line 707
    params.append("chips", "employment_type:FULLTIME");
  }

  setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${SERPAPI.URL}/search.json?${params.toString()}`, {
      signal: controller.signal,
    });

    if (!res.ok)
      return [new JobsResponseError("Jobs service response error", res)];

    const parsedData = JobsResponseSchema.safeParse(await res.json());

    if (!parsedData.success)
      return [new Error("Jobs service data error. Invalid data")];

    const { data } = parsedData;

    // NOTE:
    // based on https://serpapi.com/searches/245e315c7524f950/6644d67d7690dc208bd21e49.json
    if (data.search_information?.jobs_results_state === "Fully empty")
      return [new Error(`No jobs found for: ${query}`)];

    return [null, data];
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;

      if (name === "AbortError")
        return [new Error("Jobs service response timed out")];

      return [error];
    }
  }

  return [new Error("An unknown error occurred while trying to get jobs")];
};
