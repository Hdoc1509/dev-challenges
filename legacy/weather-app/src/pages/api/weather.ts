import { getWeather } from "@/services/weather/server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  const latitude = params.get("lat");
  const longitude = params.get("lon");

  if (!latitude || !longitude)
    return new Response(
      JSON.stringify({
        error: "Missing latitude or longitude",
      }),
      { status: 400 },
    );

  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);

  if (isNaN(parsedLatitude) || isNaN(parsedLongitude))
    return new Response(
      JSON.stringify({ error: "Invalid latitude or longitude" }),
      { status: 400 },
    );

  const [weatherError, weather] = await getWeather({
    latitude: parsedLatitude,
    longitude: parsedLongitude,
  });

  if (weatherError)
    return new Response(JSON.stringify({ error: weatherError.message }), {
      status: 500,
    });

  return new Response(JSON.stringify(weather), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
