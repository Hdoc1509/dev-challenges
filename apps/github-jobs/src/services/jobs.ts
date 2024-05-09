import { parseJobs } from "../utils/jobs";
import { searchLocation } from "./geolocation";
import { ApiResponseSchema } from "../schemas/jobs";
import { JobsResponseError } from "../errors";
import { SERPAPI } from "../config";
import locationsMock from "../mocks/locations.json";
import type { Job, PromiseWithError, SearchOptions } from "../types";

export type JobService = (
  query?: string,
  options?: SearchOptions,
) => PromiseWithError<Job[]>;

export const getJobs: JobService = async (query, options = {}) => {
  const { location, zipCode, fullTime } = options;
  const params = new URLSearchParams({
    engine: "google_jobs",
    q: query ?? "frontend web",
    api_key: SERPAPI.KEY,
  });

  if (typeof location === "string" || location == null) {
    params.append("location", location ?? locationsMock[0].canonical_name);
  } else {
    // TODO: call searchLocation({ coords: location })
    params.append("location", `${location.latitude},${location.longitude}`);
  }

  // NOTE: zip code has a higher priority
  if (zipCode != null) {
    const [locationError, location] = await searchLocation({ zipCode });

    if (locationError) return [locationError];

    params.set("location", location.name);
  }

  if (fullTime === "on") {
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

    return [null, parseJobs(parsedData.data)];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [new Error("An unknown error occurred while trying to get jobs")];
};
