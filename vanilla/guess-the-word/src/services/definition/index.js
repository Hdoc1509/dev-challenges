import { z } from "zod";
import { ServiceError, fetcher } from "@lib/fetcher";

/**
 * @callback DefinitionService
 * @param {string} word
 * @returns {import("@lib/fetcher").PromiseWithError<string[]>}
 */

const API_URL = "https://api.npoint.io";
const BIN_ID = "da112cda6039b039864c";

const DefinitionError = new ServiceError("Definition");
const DefinitionResponseSchema = z.array(z.string());

/** @type {DefinitionService} */
export const getDefinition = async (word) => {
  const [error, data] = await fetcher(`${API_URL}/${BIN_ID}/${word}`, {
    schema: DefinitionResponseSchema,
    serviceError: DefinitionError,
  });

  if (error) return [error];

  return [null, data];
};
