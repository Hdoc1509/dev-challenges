import type { SearchCityResponse } from "@/schemas/geolocation";
import type { City, LocationCoords, PromiseWithError } from "@/types";

const ERROR = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

const getErrorMessage = (code: number) => {
  if (code === ERROR.PERMISSION_DENIED)
    return "Please enable location services, then reload the page";

  if (code === ERROR.POSITION_UNAVAILABLE)
    return "Location services are not available";

  if (code === ERROR.TIMEOUT)
    return "The request to get user location timed out, please try again";
};

export const getCurrentCoords = async (): PromiseWithError<LocationCoords> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        resolve([null, { latitude, longitude }]);
      },
      (error) => {
        const { code } = error;

        resolve([new Error(getErrorMessage(code))]);
      },
    );
  });
};

export const parseCities = (cities: SearchCityResponse): City[] => {
  return cities.map((city) => ({
    id: city.id,
    name: city.name,
    country: city.country,
    latitude: city.lat,
    longitude: city.lon,
  }));
};
