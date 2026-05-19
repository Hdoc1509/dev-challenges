import {
  fetcher,
  ResponseError,
  ServiceError,
  type PromiseWithError,
} from "@lib/fetcher";
import { IPQueryResponseSchema, type IpQueryResponse } from "./schema";
import { IPQUERY_API } from "@/config";

const ERROR_MESSAGES = {
  RATE_LIMIT_EXCEEDED: "Rate limit exceeded. Please try again in a few minutes",
  REMOTE_SERVER_ERROR: "Remote server error. Please try again later",
};
const IPQueryServiceError = new ServiceError("Geolocation[client]");

export const getCurrentCoords = async (): PromiseWithError<
  IpQueryResponse["location"]
> => {
  const [error, data] = await fetcher(`${IPQUERY_API.URL}?format=json`, {
    schema: IPQueryResponseSchema,
    serviceError: IPQueryServiceError,
    timeout: 10_000,
  });

  if (error != null) {
    if (error instanceof ResponseError) {
      const statusError = error.res.status;

      if (statusError === IPQUERY_API.ERROR_CODES.STATUS.EXCEEDED_RATE_LIMIT)
        return [
          IPQueryServiceError.generic(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED),
        ];
      if (statusError === IPQUERY_API.ERROR_CODES.STATUS.INTERNAL)
        return [
          IPQueryServiceError.generic(ERROR_MESSAGES.REMOTE_SERVER_ERROR),
        ];
    }

    return [error];
  }

  return [null, data.location];
};
