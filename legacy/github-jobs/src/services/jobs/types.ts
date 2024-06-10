import type { PromiseWithError } from "@lib/fetcher";
import type { Job, Search } from "@/types";

export type JobService<T = Job[]> = (search: Search) => PromiseWithError<T>;
