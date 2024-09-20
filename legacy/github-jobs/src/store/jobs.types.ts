import type { Simplify } from "@hrc/type-utils";
import type { FetchingState, PromiseWithError } from "@lib/fetcher";
import type { JobsServiceSuccess } from "@/services/jobs/client";
import type { Job, Search, SetOptional } from "@/types";

type SearchResult = PromiseWithError<
  Simplify<JobsServiceSuccess & { usedLocation: string; isCached?: boolean }>
>;
type JobSearch = Simplify<
  SetOptional<Search, "location"> & { clearCache?: boolean }
>;

export type StoreFetchingState = FetchingState<{ jobs: Job[] }>;
export type State = StoreFetchingState & {
  cachedJobs: Job[][];
};

export type Action = {
  searchJobs: (search: JobSearch) => SearchResult;
};
