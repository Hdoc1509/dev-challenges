import { getRandomQuote } from "@/services/quotes/server";
import { createErrorResponse, createSuccessResponse } from "@lib/request";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const [error, data] = await getRandomQuote();

  if (error != null) return createErrorResponse(500, error.message);

  return createSuccessResponse(data);
};
