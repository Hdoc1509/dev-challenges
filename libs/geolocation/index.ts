export type LocationCoords = {
  latitude: number;
  longitude: number;
};

// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
const MESSAGES = {
  [GeolocationPositionError.TIMEOUT]:
    "The request to get user location timed out, please try again by reloading the page",
  [GeolocationPositionError.POSITION_UNAVAILABLE]:
    "Location services are not available, please enable them in your browser or try again later",
  [GeolocationPositionError.PERMISSION_DENIED]:
    "Please enable location services, then reload the page",
  UNKNOWN_ERROR: "An unknown error occurred while trying to get your location",
};

const getErrorMessage = (code: number) => {
  return MESSAGES[code] ?? MESSAGES.UNKNOWN_ERROR;
};

export const getCurrentCoords = (
  options: PositionOptions = {},
): Promise<[Error] | [null, LocationCoords]> => {
  const { timeout = 5000, enableHighAccuracy, maximumAge } = options;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        resolve([null, { latitude, longitude }]);
      },
      ({ code }) => {
        resolve([new Error(getErrorMessage(code))]);
      },
      { timeout, enableHighAccuracy, maximumAge },
    );
  });
};
