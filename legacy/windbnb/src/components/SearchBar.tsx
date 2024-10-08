import { Button, ButtonGroup, ButtonIcon } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { FILTERS, useFilterStore } from "@/store/filter";
import { stringifyLocation } from "@/utils";
import clsx from "clsx";
import "./SearchBar.scss";

export const SearchBar = () => {
  const location = useFilterStore((state) => state.location);
  const totalGuests = useFilterStore((state) => state.guests.total);
  const setFilter = useFilterStore((state) => state.setFilter);

  const locationClass = clsx({ "with-value": location });
  const guestsClass = clsx({ "with-value": totalGuests > 0 });

  return (
    <ButtonGroup className="searchbar">
      <Button
        className={locationClass}
        onClick={() => setFilter(FILTERS.LOCATION)}
      >
        {location ? `${stringifyLocation(location)}` : "Add location"}
      </Button>
      <Button className={guestsClass} onClick={() => setFilter(FILTERS.GUESTS)}>
        {totalGuests ? `${totalGuests} guests` : "Add guests"}
      </Button>
      <ButtonIcon
        className="searchbar__search"
        onClick={() => setFilter(FILTERS.LOCATION)}
        aria-label="Open filter drawer"
      >
        <Icon name="search" />
      </ButtonIcon>
    </ButtonGroup>
  );
};
