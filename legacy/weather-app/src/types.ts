type Temperature = {
  celsius: number;
  fahrenheit: number;
};

export type Wind = {
  speed: number;
  direction: string;
  directionDegree: number;
};

export type Weather = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temperature: Temperature;
    condition: {
      name: string;
      code: number;
    };
    wind: Wind;
    humidity: number;
    visibility: number;
    airPressure: number;
  };
};

export type Forecast = {
  day: string;
  temperature: {
    min: Temperature;
    max: Temperature;
  };
  condition: {
    code: number;
    name: string;
  };
};

export type City = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type ParamOptions<T extends string> = Record<T, string>;
