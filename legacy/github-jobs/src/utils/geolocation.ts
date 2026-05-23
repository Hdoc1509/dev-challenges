import { getCurrentLocation } from "@/services/ipquery";
import { getValidLocation } from "@/services/valid-location";
import { searchLocation } from "@/services/geolocation/client";
import { isDev } from "@/config";
import type { PromiseWithError } from "@lib/fetcher";

const ERROR_MESSAGE = {
  CURRENT_LOCATION:
    "Your current location can not be auto-detected. Please enter it manually.",
  ZIPCODE: (zipCode: number) =>
    `No location found for zipcode: ${zipCode}. Please try another one.`,
};

// TODO: dynamic import of used services
export const getLocationOption = async (
  location?: string,
): PromiseWithError<string> => {
  if (isDev) return [null, "nowhereland"];

  if (location === "" || location == null) {
    const [currentLocationError, currentLocation] = await getCurrentLocation();
    if (currentLocationError) return [currentLocationError];

    const { city, state, country } = currentLocation;
    const locationOptions = [`${city}+${state}`, `${city}+${country}`, state];

    for (const option of locationOptions) {
      const [optionError, validLocation] = await getValidLocation(option);
      if (optionError == null) return [null, validLocation];
    }

    return [new Error(ERROR_MESSAGE.CURRENT_LOCATION)];
  }

  // INFO: about zipcode
  // - https://en.wikipedia.org/wiki/ZIP_Code
  // - https://tools.usps.com/zip-code-lookup.htm
  // TODO: use Number(location)
  const zipCode = parseInt(location);

  // TODO:use Number.isNaN(zipCode)
  if (!isNaN(zipCode)) {
    const [locationError, zipLocation] = await searchLocation({ zipCode });
    if (locationError) return [locationError];

    const { name, region, country } = zipLocation;
    const locationOptions = [`${name}+${region}`, `${name}+${country}`, region];

    for (const option of locationOptions) {
      const [optionError, validLocation] = await getValidLocation(option);
      if (optionError == null) return [null, validLocation];
    }

    return [new Error(ERROR_MESSAGE.ZIPCODE(zipCode))];
  }

  return [null, location];
};
