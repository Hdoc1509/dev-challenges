export type LocationCoords = {
  latitude: number;
  longitude: number;
};

const MESSAGES = {
  TIMEOUT: "The request to get user location timed out, please try again.",
};

// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
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

  if (code === ERROR.TIMEOUT) return MESSAGES.TIMEOUT;

  return "An unknown error occurred while trying to get your location";
};

export const getCurrentCoords = (): Promise<
  [Error] | [null, LocationCoords]
> => {
  return new Promise((resolve) => {
    // NOTE: it happens when there's no internet connection
    setTimeout(() => resolve([new Error(MESSAGES.TIMEOUT)]), 5000);

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        resolve([null, { latitude, longitude }]);
      },
      ({ code }) => {
        resolve([new Error(getErrorMessage(code))]);
      },
    );
  });
};
