import { ServiceError } from "./error";
import type { Options, PromiseWithError, Status } from "./types";
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

  setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { ...restOptions, signal: controller.signal });

    if (checkStatus && !res.ok) return [serviceError.response()];

    const parsed = schema.safeParse(await res.json());

    if (!parsed.success) return [serviceError.validation()];

    return [null, parsed.data];
  } catch (error) {
    if (error instanceof Error) {
      const { name, message } = error;

      if (name === "AbortError") return [serviceError.timeout()];

      if (message.match(/NetworkError|Failed to fetch/) != null)
        return [serviceError.network()];
    }
  }

  return [serviceError.unknown()];
}

export { ServiceError };
export type { PromiseWithError, Status };
