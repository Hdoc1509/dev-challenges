import { useSearchStore } from "@/store/search";
import { useWeatherStore } from "@/store/weather";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import type { City } from "@/types";
import "./SearchResults.scss";

type Props = {
  disabled: boolean;
  onClose: () => void;
  results: City[];
};

export const SearchResults = ({ results, disabled, onClose }: Props) => {
  const removeResultById = useSearchStore((s) => s.removeResultById);
  const getWeather = useWeatherStore((s) => s.getWeather);

  const handleSelect = async ({ latitude, longitude, id }: City) => {
    const coords = { latitude, longitude };

    onClose();

    const weatherError = await getWeather(coords);

    if (weatherError == null) removeResultById(id);
  };

  return (
    <menu className="search-drawer__results">
      {results.map((result) => (
        <li key={result.id}>
          <Button
            onClick={() => handleSelect(result)}
            disabled={disabled}
            noShadow
          >
            {result.name} - {result.country}
            <Icon name="keyboard_arrow_right" />
          </Button>
        </li>
      ))}
    </menu>
  );
};
