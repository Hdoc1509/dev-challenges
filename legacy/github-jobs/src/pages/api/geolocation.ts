import { searchLocation } from "@/services/geolocation/server";
import { createResponseError, createResponseSuccess } from "@/utils/response";
import type { APIRoute } from "astro";
import type { LocationOptions } from "@/types";

export const GET: APIRoute = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const query = params.get("q");

  if (!query) return createResponseError(400, "Missing query");

  const isCoords = query.includes(",");
  let searchArgs = {} as LocationOptions;

  if (isCoords) {
    const [latitude, longitude] = query.split(",").map(Number);

    if (isNaN(latitude) || isNaN(longitude))
      return createResponseError(400, "Invalid coordinates");

    searchArgs = { coords: { latitude, longitude } };
  } else {
    const zipCode = Number(query);

    if (isNaN(zipCode)) return createResponseError(400, "Invalid zip code");

    if (zipCode <= 9999 || zipCode > 99999)
      return createResponseError(400, "Zip code must be 5 digits");

    searchArgs = { zipCode };
  }

  const [locationError, location] = await searchLocation(searchArgs);

  if (locationError) return createResponseError(500, locationError.message);

  return createResponseSuccess(location);
};
