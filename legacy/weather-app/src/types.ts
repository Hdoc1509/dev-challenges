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

export type Forecast = {
  day: string;
  temperature: {
    min: Weather["current"]["temperature"];
    max: Weather["current"]["temperature"];
  };
  condition: {
    code: number;
    name: string;
  };
};

export type LocationCoords = {
  latitude: number;
  longitude: number;
};

export type City = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type PromiseWithError<T> = Promise<[Error] | [null, T]>;

export type Status = "idle" | "loading" | "success" | "error";
