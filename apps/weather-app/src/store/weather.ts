import { create } from "zustand";
import type { LocationPosition } from "../schemas/location";
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
  location: LocationPosition | null;
  weather: Weather | null;
  forecast: Forecast[] | null;
};

type Action = {
  setLocation: (location: LocationPosition) => void;
  setWeather: (weather: Weather) => void;
  setForecast: (forecast: Forecast[]) => void;
};

export const useWeatherStore = create<State & Action>()((set) => ({
  location: null,
  weather: null,
  forecast: null,
  highlights: null,
  setLocation: (location: LocationPosition) => set({ location }),
  setWeather: (weather: Weather) => set({ weather }),
  setForecast: (forecast: Forecast[]) => set({ forecast }),
}));
