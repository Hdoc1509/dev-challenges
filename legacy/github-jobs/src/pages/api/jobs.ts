import { getJobs } from "@/services/jobs/server";
import { getRemainingSearches } from "@/services/remaining-searches/server";
import { createResponseError, createResponseSuccess } from "@/utils/response";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const [searchesError, remainingSearches] = await getRemainingSearches();

  if (searchesError == null && remainingSearches.plan_searches_left === 0)
    return createResponseError(400, "No free searches left");

  const params = new URL(request.url).searchParams;

  const query = params.get("q");
  const location = params.get("location");
  // const fullTimeParam = params.get("full_time");
  const nextPageToken = params.get("next_page_token");

  if (!query) return createResponseError(400, "Missing query");
  if (!location) return createResponseError(400, "Missing location");
  if (nextPageToken === "")
    return createResponseError(400, "Invalid next page token");

  // const fullTime = fullTimeParam != null;

  const [jobsError, jobs] = await getJobs({
    query,
    location,
    // fullTime,
    nextPageToken: nextPageToken ?? undefined,
  });

  if (jobsError) return createResponseError(500, jobsError.message);

  return createResponseSuccess(jobs);
};
