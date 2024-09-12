import { create } from "zustand";
import type { Forecast, Weather } from "@/types";

type State = {
  error: Error | null;
  weather: Weather | null;
  forecast: Forecast[] | null;
};

type Action = {
  setError: (error: State["error"]) => void;
  setWeather: (weather: Weather) => void;
  setForecast: (forecast: Forecast[]) => void;
  clearData: () => void;
};

export const useWeatherStore = create<State & Action>()((set) => ({
  error: null,
  weather: null,
  forecast: null,
  setError: (error: State["error"]) => set({ error }),
  setWeather: (weather: Weather) => set({ weather }),
  setForecast: (forecast: Forecast[]) => set({ forecast }),
  clearData: () => set({ weather: null, forecast: null }),
}));
