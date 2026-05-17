import { getCurrentCoords } from "@/services/ipquery";
import { searchLocation } from "@/services/geolocation/client";
import type { PromiseWithError } from "@lib/fetcher";

// TODO: avoid calling services on dev mode

export const getLocationOption = async (
  location?: string,
): PromiseWithError<string> => {
  if (location === "" || location == null) {
    const [coordsError, coords] = await getCurrentCoords();

    if (coordsError) return [coordsError];

    if (coords.zipcode !== "") return [null, coords.zipcode];

    const [locationError, coordsLocation] = await searchLocation({ coords });

    if (locationError) return [locationError];

    return [null, coordsLocation];
  }

  // INFO: about zipcode
  // - https://en.wikipedia.org/wiki/ZIP_Code
  // - https://tools.usps.com/zip-code-lookup.htm
  const zipCode = parseInt(location);

  if (!isNaN(zipCode)) {
    const [locationError, zipLocation] = await searchLocation({ zipCode });

    if (locationError) return [locationError];

    return [null, zipLocation];
  }

  return [null, location];
};
