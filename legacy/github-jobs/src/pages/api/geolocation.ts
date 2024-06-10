import { searchLocation } from "@/services/geolocation/server";
import type { APIRoute } from "astro";
import type { LocationOptions } from "@/types";

export const GET: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const query = params.get("q");

  if (!query)
    return new Response(JSON.stringify({ error: "Missing query" }), {
      status: 400,
    });

  const isCoords = query.includes(",");
  let searchArgs = {} as LocationOptions;

  if (isCoords) {
    const [latitude, longitude] = query.split(",").map(Number);

    if (isNaN(latitude) || isNaN(longitude))
      return new Response(JSON.stringify({ error: "Invalid coordinates" }), {
        status: 400,
      });

    searchArgs = { coords: { latitude, longitude } };
  } else {
    const zipCode = Number(query);

    if (isNaN(zipCode))
      return new Response(JSON.stringify({ error: "Invalid zip code" }), {
        status: 400,
      });

    if (zipCode < 9999 || zipCode > 99999)
      return new Response(
        JSON.stringify({ error: "Zip code must be 5 digits" }),
        { status: 400 },
      );

    searchArgs = { zipCode };
  }

  const [locationError, location] = await searchLocation(searchArgs);

  if (locationError)
    return new Response(JSON.stringify({ error: locationError.message }), {
      status: 500,
    });

  return new Response(JSON.stringify(location), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
