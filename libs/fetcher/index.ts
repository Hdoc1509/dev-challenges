import { ServiceError } from "./error";
import type { PromiseWithError } from "./types";
import type { z } from "zod";

type Options<S> = {
  serviceError: ServiceError;
  schema: S;
  timeout?: number;
} & Omit<RequestInit, "signal">;

// based on https://zod.dev/?id=writing-generic-functions
/** Utility for validating and handling errors from a fetch request */
export async function fetcher<S extends z.ZodTypeAny>(
  url: string,
  options: Options<S>,
): PromiseWithError<z.infer<S>> {
  const { serviceError, schema, timeout = 5000, ...restOptions } = options;
  const controller = new AbortController();

  setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { ...restOptions, signal: controller.signal });

    if (!res.ok) return [serviceError.response()];

    const parsed = schema.safeParse(await res.json());

    if (!parsed.success) return [serviceError.validation()];

    return [null, parsed.data];
  } catch (error) {
    if (error instanceof Error) {
      return [error.name === "AbortError" ? serviceError.timeout() : error];
    }
  }

  return [serviceError.unknown()];
}

export { ServiceError, type PromiseWithError };
