import { create } from "zustand";
import type { Forecast, Weather } from "@/types";

export type TemperatureUnit = "fahrenheit" | "celsius";

type State = {
  error: Error | null;
  temperatureUnit: TemperatureUnit;
  weather: Weather | null;
  forecast: Forecast[] | null;
};

type Action = {
  setError: (error: State["error"]) => void;
  setTemperatureUnit: (temperatureUnit: State["temperatureUnit"]) => void;
  setWeather: (weather: Weather) => void;
  setForecast: (forecast: Forecast[]) => void;
  clearData: () => void;
};

export const useWeatherStore = create<State & Action>()((set) => ({
  error: null,
  temperatureUnit: "celsius",
  weather: null,
  forecast: null,
  setError: (error: State["error"]) => set({ error }),
  setTemperatureUnit: (temperatureUnit: State["temperatureUnit"]) =>
    set({ temperatureUnit }),
  setWeather: (weather: Weather) => set({ weather }),
  setForecast: (forecast: Forecast[]) => set({ forecast }),
  clearData: () => set({ weather: null, forecast: null }),
}));
