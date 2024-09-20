import { useSearchDrawerStore } from "@/store/search-drawer";
import { useWeatherStore } from "@/store/weather";
import { Button, ButtonIcon } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { WeatherDetails } from "./WeatherDetails";
import { WeatherImage } from "./WeatherImage";
import "./CityWeather.scss";

const HeaderButtons = () => {
  const openDrawer = useSearchDrawerStore((s) => s.openDrawer);
  const getCurrentWeather = useWeatherStore((s) => s.getCurrentWeather);

  return (
    <header>
      <Button
        className="weather__search"
        color="secondary"
        rounded="none"
        onClick={openDrawer}
      >
        Search for places
      </Button>
      <ButtonIcon
        color="secondary"
        rounded="full"
        onClick={getCurrentWeather}
        aria-label="Get current location weather"
      >
        <Icon name="gps_fixed" />
      </ButtonIcon>
    </header>
  );
};

export const CityWeather = () => {
  return (
    <aside className="weather">
      <HeaderButtons />
      <WeatherImage />
      <WeatherDetails />
    </aside>
  );
};
