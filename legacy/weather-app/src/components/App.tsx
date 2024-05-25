import { useCallback, useEffect, useState } from "react";
import { useWeatherStore } from "@/store/weather";
import { getCurrentCoords } from "@/utils/geolocation";
import { getWeather } from "@/services/weather/client";
import { getForecast } from "@/services/forecast/client";
import { Footer } from "@internal/components";
import { CityWeather } from "./CityWeather";
import { Forecast } from "./Forecast";
import { Highlights } from "./Highlights";
import { TemperatureConverter } from "./TemperatureConverter";
import { SearchDrawer } from "./SearchDrawer";
import "./App.scss";

let didInit = false;

function App() {
  // TODO: Use status logic from github-jobs
  const [error, setError] = useState<string | undefined>();
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);
  const setWeather = useWeatherStore((s) => s.setWeather);
  const setForecast = useWeatherStore((s) => s.setForecast);
  const clearData = useWeatherStore((s) => s.clearData);

  const openDrawer = () => {
    setShowSearchDrawer(true);
    document.body.classList.add("no-scroll");
  };
  const closeDrawer = () => {
    setShowSearchDrawer(false);
    document.body.classList.remove("no-scroll");
  };

  const getCurrentLocationWeather = useCallback(async () => {
    clearData();

    try {
      const [coordsError, coords] = await getCurrentCoords();

      if (coordsError) throw coordsError;

      const [[weatherError, weather], [forecastError, forecast]] =
        await Promise.all([getWeather(coords), getForecast(coords)]);

      if (weatherError) throw weatherError;
      if (forecastError) throw forecastError;

      setWeather(weather);
      setForecast(forecast);
    } catch (error) {
      setError((error as Error).message);
    }
  }, [setForecast, setWeather, clearData]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      getCurrentLocationWeather();
    }
  }, [getCurrentLocationWeather]);

  if (error) {
    return (
      <div className="App" data-error>
        <h2 className="App__error">{error}</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <CityWeather
        openDrawer={openDrawer}
        getCurrentLocationWeather={getCurrentLocationWeather}
      />
      <SearchDrawer onClose={closeDrawer} isOpen={showSearchDrawer} />
      <main>
        <TemperatureConverter />
        <Forecast />
        <Highlights />
        <Footer />
      </main>
    </div>
  );
}

export default App;
