import { useCallback, useEffect, useState } from "react";
import { useWeatherStore } from "@/store/weather";
import { getCurrentPosition } from "@/utils/geolocation";
import { getWeather } from "@/services/weather";
import { getForecast } from "@/services/forecast";
import { parseWeather } from "@/utils/weather";
import { Footer } from "@internal/components";
import { CityWeather } from "@/components/CityWeather";
import { Forecast } from "@/components/Forecast";
import { Highlights } from "@/components/Highlights";
import { TemperatureConverter } from "@/components/TemperatureConverter";
import { SearchDrawer } from "@/components/SearchDrawer";
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

  const getCurrentLocationWeather = useCallback(() => {
    clearData();
    getCurrentPosition()
      .then(async (coords) => {
        const [weatherError, weather] = await getWeather(coords);

        if (weatherError) return Promise.reject(weatherError.message);

        setWeather(parseWeather(weather))

        void getForecast(coords).then(setForecast);
      })
      .catch((error) => setError(error as string));
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
