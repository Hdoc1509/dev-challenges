import { create } from "zustand";
import { getForecast } from "@/services/forecast/client";
import { getWeather as getWeatherService } from "@/services/weather/client";
import { getCurrentCoords, type LocationCoords } from "@lib/geolocation";
import type { Forecast, Weather } from "@/types";

type State = {
  error: Error | null;
  weather: Weather | null;
  forecast: Forecast[] | null;
  userLocation?: LocationCoords;
};

type Action = {
  getWeather: (coords: LocationCoords) => Promise<Error | undefined>;
  getCurrentWeather: () => void;
};

export const useWeatherStore = create<State & Action>()((set, get) => ({
  error: null,
  weather: null,
  forecast: null,

  getWeather: async (coords) => {
    set({ weather: null, forecast: null });

    const [weatherResult, forecastResult] = await Promise.all([
      getWeatherService(coords),
      getForecast(coords),
    ]);
    const [weatherError, weather] = weatherResult;
    const [forecastError, forecast] = forecastResult;

    if (weatherError) {
      set({ error: weatherError });
      return weatherError;
    }
    if (forecastError) {
      set({ error: forecastError });
      return forecastError;
    }

    set({ weather, forecast });
  },

  getCurrentWeather: async () => {
    const { userLocation, getWeather } = get();

    if (userLocation != null) return getWeather(userLocation);

    const [coordsError, coords] = await getCurrentCoords({ timeout: 8000 });

    if (coordsError) return set({ error: coordsError });

    set({ userLocation: coords });
    getWeather(coords);
  },
}));

// intitialize store on module load
useWeatherStore.getState().getCurrentWeather();
