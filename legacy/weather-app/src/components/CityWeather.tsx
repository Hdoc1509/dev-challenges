import { useCurrentWeather } from "@/hooks/useCurrentWeather";
import { Button, ButtonIcon } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { WeatherDetails } from "./WeatherDetails";
import { WeatherImage } from "./WeatherImage";
import "./CityWeather.scss";

type Props = {
  openDrawer: () => void;
};

export const CityWeather = ({ openDrawer }: Props) => {
  const { getCurrentWeather } = useCurrentWeather();

  return (
    <aside className="weather">
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
      <WeatherImage />
      <WeatherDetails />
    </aside>
  );
};
