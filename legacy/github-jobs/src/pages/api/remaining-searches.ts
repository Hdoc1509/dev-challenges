import { getRemainingSearches } from "@/services/remaining-searches/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const [error, data] = await getRemainingSearches();

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
