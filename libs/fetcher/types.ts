import type { ServiceError } from "./error";
export type { Status } from "./status";

export type PromiseWithError<T> = Promise<[Error] | [null, T]>;

export type ParamOptions<T extends string> = Record<T, string>;

export type Options<S> = {
  serviceError: ServiceError;
  schema: S;
  timeout?: number;
  /**
   * Whether to return an error based on `response.ok`.
   * Useful if endpoint returns the error as a JSON in the response.
   * **
   * If `true`, you will be able to retrieve the response from the error by
   * using `ResponseError` class.**
   * If `false`, be sure to use an schema that matches the expected error format.**
   *
   * @example
   * import { ResponseError, fetcher } from "@lib/fetcher";
   *
   * const [error, data] = await fetcher(...);
   *
   * // if `checkStatus` is `true`
   * if (error != null) {
   *   if (error instanceof ResponseError) {
   *     const { res } = error;
   *     // do something with response
   *   }
   *
   *   // do something with rest of errors
   * }
   *
   * // if `checkStatus` is `false`
   * if (error != null) // do something with error
   *
   * // the error can be retrieved from data
   * const errorFromData = handleErrorFromData(data);
   *
   * if (errorFromData != null) // do something with error
   *
   * @default true
   * */
  checkStatus?: boolean;
} & Omit<RequestInit, "signal">;
