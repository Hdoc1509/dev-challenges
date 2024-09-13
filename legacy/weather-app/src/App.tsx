import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { Footer } from "@lib/components/Footer";
import { CityWeather } from "@/components/CityWeather";
import { Forecast } from "@/components/Forecast";
import { Highlights } from "@/components/Highlights";
import { TemperatureConverter } from "@/components/TemperatureConverter";
import { SearchDrawer } from "@/components/SearchDrawer";
import "./App.scss";

function App() {
  const { error } = useCurrentWeather();

  if (error) {
    return (
      <div className="App" data-error>
        <h2 className="App__error">{error.message}</h2>
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
