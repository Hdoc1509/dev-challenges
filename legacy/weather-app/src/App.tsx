import { useWeather } from "@/hooks/useWeather";
import { Footer } from "@lib/components/Footer";
import { CityWeather } from "@/components/weather/CityWeather";
import { Forecast } from "@/components/forecast/Forecast";
import { Highlights } from "@/components/weather/highlights/Highlights";
import { TemperatureConverter } from "@/components/TemperatureConverter";
import { SearchDrawer } from "@/components/search/SearchDrawer";
import "./App.scss";

function App() {
  const { error } = useWeather();

  if (error) {
    return (
      <div className="App" data-error>
        <p className="App__error">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <CityWeather />
      <SearchDrawer />
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
