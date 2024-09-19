import { isAbortError, isNetworkError } from "./utils";
import type { Options, PromiseWithError } from "./types";
import type { z } from "zod";

// based on https://zod.dev/?id=writing-generic-functions
/** Utility for validating and handling errors from a fetch request */
export async function fetcher<S extends z.ZodTypeAny>(
  url: string,
  options: Options<S>,
): PromiseWithError<z.infer<S>> {
  const {
    serviceError,
    schema,
    checkStatus = true,
    timeout = 5000,
    ...restOptions
  } = options;
  const controller = new AbortController();

  const timeoutID = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { ...restOptions, signal: controller.signal });

    if (checkStatus && !res.ok) return [serviceError.response(res)];

    const parsed = schema.safeParse(await res.json());

    if (!parsed.success) return [serviceError.validation(parsed.error)];

    return [null, parsed.data];
  } catch (error) {
    if (error instanceof Error) {
      if (isAbortError(error)) return [serviceError.timeout()];
      if (isNetworkError(error)) return [serviceError.network()];
    }
  } finally {
    clearTimeout(timeoutID);
  }

  return [serviceError.unknown()];
}

export * from "./error";
export { STATUS, type FetchingState } from "./status";
export { is5xxError } from "./utils";
export type { Status, ParamOptions } from "./types";
export type { PromiseWithError };
