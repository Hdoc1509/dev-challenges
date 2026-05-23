import * as z from "zod";
import { fetcher, ServiceError, type PromiseWithError } from "@lib/fetcher";
import { SERPAPI } from "@/config";

const ERROR_MESSAGE = {
  NOT_VALID: (location: string) =>
    `The location "${location}" is not valid. Please try another one.`,
};
const ValidLocationServiceError = new ServiceError("ValidLocation");

export const ValidLocationResponseSchema = z.array(
  z.object({
    canonical_name: z.string(),
  }),
);

// docs: https://serpapi.com/locations-api
export async function getValidLocation(
  location: string,
): PromiseWithError<string> {
  const [error, data] = await fetcher(
    `${SERPAPI.URL}/locations.json?q=${location}`,
    {
      schema: ValidLocationResponseSchema,
      serviceError: ValidLocationServiceError,
    },
  );

  // TODO: handle errors from SerpAPI
  if (error) return [error];

  if (data.length === 0) return [new Error(ERROR_MESSAGE.NOT_VALID(location))];

  return [null, data[0].canonical_name];
}
