import type { Job, PromiseWithError, Search } from "@/types";

export type JobService<T = Job[]> = (search: Search) => PromiseWithError<T>;
