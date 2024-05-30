import type { Job, PromiseWithError, SearchOptions } from "@/types";

export type JobService<T = Job[]> = (
  query: string,
  options?: SearchOptions,
) => PromiseWithError<T>;
