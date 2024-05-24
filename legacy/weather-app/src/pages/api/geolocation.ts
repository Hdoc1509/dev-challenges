import { searchCity } from "@/services/server/geolocation";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  const city = params.get("city");

  if (!city)
    return new Response(
      JSON.stringify({
        error: "Missing city",
      }),
      { status: 400 },
    );

  const [cityError, cityData] = await searchCity(city);

  if (cityError)
    return new Response(JSON.stringify({ error: cityError.message }), {
      status: 500,
    });

  return new Response(JSON.stringify(cityData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
