import { Button, ButtonIcon } from "@hdoc/react-button";
import { FILTER, useFilterStore } from "../store/filter";
import { stringifyLocation } from "../utils";
import clsx from "clsx";
import "./SearchBar.scss";

export const SearchBar = () => {
  const location = useFilterStore((state) => state.location);
  const guests = useFilterStore((state) => state.guests.total);
  const setFilter = useFilterStore((state) => state.setFilter);
  const locationClass = clsx("searchbar__location", { "with-value": location });
  const guestsClass = clsx("searchbar__guests", { "with-value": guests > 0 });

  return (
    <div className="searchbar">
      <Button
        className={locationClass}
        text={location ? `${stringifyLocation(location)}` : "Add location"}
        onClick={() => setFilter(FILTER.LOCATION)}
      />
      <Button
        className={guestsClass}
        text={guests ? `${guests} guests` : "Add guests"}
        onClick={() => setFilter(FILTER.GUESTS)}
      />
      <ButtonIcon
        icon="search"
        className="searchbar__search"
        onClick={() => setFilter(FILTER.LOCATION)}
      />
    </div>
  );
};
