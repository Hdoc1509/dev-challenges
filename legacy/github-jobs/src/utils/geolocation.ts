import { getCurrentCoords } from "@lib/geolocation";
import { searchLocation } from "@/services/geolocation/client";
import type { PromiseWithError } from "../types";

export const getLocationOption = async (
  location?: string,
): PromiseWithError<string> => {
  if (location === "" || location == null) {
    const [coordsError, coords] = await getCurrentCoords();

    if (coordsError) return [coordsError];

    const [locationError, coordsLocation] = await searchLocation({ coords });

    if (locationError) return [locationError];

    return [null, coordsLocation.name];
  }

  // INFO: about zipcode
  // - https://en.wikipedia.org/wiki/ZIP_Code
  // - https://tools.usps.com/zip-code-lookup.htm
  const zipCode = parseInt(location);

  if (!isNaN(zipCode)) {
    const [locationError, zipLocation] = await searchLocation({ zipCode });

    if (locationError) return [locationError];

    return [null, zipLocation.name];
  }

  return [null, location];
};
