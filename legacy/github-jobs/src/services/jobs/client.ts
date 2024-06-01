import { parseJobs } from "@/utils/jobs";
import type { JobsResponse } from "@/schemas/jobs";
import type { JobService } from "./types";

export const getJobs: JobService = async (search) => {
  const { query, location, fullTime, page } = search;

  const params = new URLSearchParams({ q: query, location });

  if (fullTime) params.append("full_time", "");
  if (page) params.append("page", `${page}`);

  try {
    const res = await fetch(`/api/jobs?${params.toString()}`);

    // NOTE: ALL VALIDATIONS are done on the SERVER
    // NOTE: if server has an error it returns `{ error: string }`
    const data = (await res.json()) as { error: string } | JobsResponse;

    if ("error" in data) return [new Error(data.error)];

    return [null, parseJobs(data)];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [new Error("An unknown error occurred while trying to get jobs")];
};
