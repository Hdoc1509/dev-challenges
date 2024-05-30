import type { LocationCoords, PromiseWithError } from "../types";

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

  return "An unknown error occurred while trying to get your location";
};

export const getCurrentCoords = (): PromiseWithError<LocationCoords> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        resolve([null, { latitude, longitude }]);
      },
      (error) => {
        resolve([new Error(getErrorMessage(error.code))]);
      },
    );
  });
};
