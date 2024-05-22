export type Weather = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temperature: {
      celsius: number;
      fahrenheit: number;
    };
    condition: {
      name: string;
      code: number;
    };
    wind: {
      speed: number;
      direction: string;
      directionDegree: number;
    };
    humidity: number;
    visibility: number;
    airPressure: number;
  };
};

export type Wind = Weather["current"]["wind"];

export type LocationCoords = {
  latitude: number;
  longitude: number;
};

export type PromiseWithError<T> = Promise<[Error] | [null, T]>;
