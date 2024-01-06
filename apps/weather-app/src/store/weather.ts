import { create } from "zustand";
import type { Weather } from "../schemas/weather";

export type Forecast = {
  day: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
};

type State = {
  weather: Weather | null;
  forecast: Forecast[] | null;
};

type Action = {
  setWeather: (weather: Weather) => void;
  setForecast: (forecast: Forecast[]) => void;
};

export const useWeatherStore = create<State & Action>()((set) => ({
  weather: null,
  forecast: null,
  setWeather: (weather: Weather) => set({ weather }),
  setForecast: (forecast: Forecast[]) => set({ forecast }),
}));
