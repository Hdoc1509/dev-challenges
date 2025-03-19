import { z } from "zod";
import { ServiceError, fetcher } from "@lib/fetcher";
import { DEFINITIONS } from "@/consts/definitions";
import { Random } from "@/utils/random";

/**
 * @callback DefinitionService
 * @param {import("@/consts/definitions").DefinitionWord} word
 * @returns {import("@lib/fetcher").PromiseWithError<string[]>}
 */

/** @type {DefinitionService} */
export const getMockedDefinition = async (word) => {
  /** @type {string[]} */
  const definitions = DEFINITIONS[word];
  const delay = Random.intInRange(1500, 3000);

  await new Promise((resolve) => setTimeout(resolve, delay));
  return [null, definitions];
};

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
