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

// TODO: Use LocationCoords from @/types
export type LocationPosition = {
  latitude: number;
  longitude: number;
};

export const getCurrentPosition = async (): Promise<LocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        const { code } = error;

        reject(getErrorMessage(code));
      },
    );
  });
};
