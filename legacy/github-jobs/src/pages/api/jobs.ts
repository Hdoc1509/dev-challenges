import { getJobs } from "@/services/jobs/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const query = params.get("q");
  const location = params.get("location");
  const fullTimeParam = params.get("full_time");
  const pageParam = params.get("page");

  if (!query)
    return new Response(JSON.stringify({ error: "Missing query" }), {
      status: 400,
    });
  if (!location)
    return new Response(JSON.stringify({ error: "Missing location" }), {
      status: 400,
    });
  if (pageParam === "0")
    return new Response(JSON.stringify({ error: "Invalid page" }), {
      status: 400,
    });

  const fullTime = fullTimeParam != null;
  const page = pageParam ? Number(pageParam) : 1;

  if (isNaN(page))
    return new Response(JSON.stringify({ error: "Invalid page" }), {
      status: 400,
    });

  const [jobsError, jobs] = await getJobs({ query, location, fullTime, page });

  if (jobsError)
    return new Response(JSON.stringify({ error: jobsError.message }), {
      status: 500,
    });

  return new Response(JSON.stringify(jobs), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
