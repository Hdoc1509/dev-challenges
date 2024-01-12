import { create } from "zustand";
import type { Weather } from "../schemas/weather";

export type Forecast = {
  day: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: {
    code: number;
    name: string;
  };
};

export type TemperatureUnit = "fahrenheit" | "celsius";

type State = {
  temperatureUnit: TemperatureUnit;
  weather: Weather | null;
  forecast: Forecast[] | null;
};

type Action = {
  setTemperatureUnit: (temperatureUnit: State["temperatureUnit"]) => void;
  setWeather: (weather: Weather) => void;
  setForecast: (forecast: Forecast[]) => void;
};

export const useWeatherStore = create<State & Action>()((set) => ({
  temperatureUnit: "celsius",
  weather: null,
  forecast: null,
  setTemperatureUnit: (temperatureUnit: State["temperatureUnit"]) =>
    set({ temperatureUnit }),
  setWeather: (weather: Weather) => set({ weather }),
  setForecast: (forecast: Forecast[]) => set({ forecast }),
}));
