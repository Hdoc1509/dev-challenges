import { getAuthorQuotes } from "@/services/quotes/server";
import { createErrorResponse, createSuccessResponse } from "@lib/request";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  const author = params.get("author");

  if (!author)
    return createErrorResponse(400, '"author" parameter is required');

  const [error, data] = await getAuthorQuotes(author);

  if (error) return createErrorResponse(500, error.message);

  return createSuccessResponse(data);
};
