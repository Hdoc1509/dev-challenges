import type { ServiceError } from "./error";

export type PromiseWithError<T> = Promise<[Error] | [null, T]>;

export type Status = "idle" | "loading" | "success" | "error" | "over";

export type Options<S> = {
  serviceError: ServiceError;
  schema: S;
  timeout?: number;
  /**
   * Whether to return an error based on `response.ok`.
   * Useful if endpoint returns the error as a JSON in the response.
   *
   * **If `false`, be sure to use an schema that matches the expected error format.**
   * @default true
   * */
  checkStatus?: boolean;
} & Omit<RequestInit, "signal">;
