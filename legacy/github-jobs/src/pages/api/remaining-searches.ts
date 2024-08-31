import { getRemainingSearches } from "@/services/remaining-searches/server";
import { createResponseError, createResponseSuccess } from "@/utils/response";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const [error, data] = await getRemainingSearches();

  if (error) return createResponseError(500, error.message);

  return createResponseSuccess(data);
};
