import type { Job, PromiseWithError, SearchOptions } from "@/types";

export type JobService = (
  query: string,
  options?: SearchOptions,
) => PromiseWithError<Job[]>;
