import { Button, ButtonIcon } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
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
        onClick={() => setFilter(FILTER.LOCATION)}
      >
        {location ? `${stringifyLocation(location)}` : "Add location"}
      </Button>
      <Button className={guestsClass} onClick={() => setFilter(FILTER.GUESTS)}>
        {guests ? `${guests} guests` : "Add guests"}
      </Button>
      <ButtonIcon
        className="searchbar__search"
        onClick={() => setFilter(FILTER.LOCATION)}
      >
        <Icon name="search" />
      </ButtonIcon>
    </div>
  );
};
