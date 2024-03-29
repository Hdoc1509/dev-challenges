export type LocationPosition = {
  latitude: number;
  longitude: number;
};

export const getCurrentPosition = async (): Promise<LocationPosition> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      resolve({ latitude, longitude });
    });
  });
};
