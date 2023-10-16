import { Button, ButtonIcon } from "@hdoc/react-button";
import { FilterGuests } from "./FilterGuests";
import { FilterLocation } from "./FilterLocation";
import { FILTER, useFilterStore } from "../store/filter";
import { FnSearchOptions } from "../types";
import clsx from "clsx";
import "./FilterDrawer.scss";

type Props = {
  isOpen?: boolean;
  onSearch: FnSearchOptions;
};

export const FilterDrawer = ({ isOpen, onSearch }: Props) => {
  const filter = useFilterStore((state) => state.filter);
  const guests = useFilterStore((state) => state.guests.total);
  const location = useFilterStore((state) => state.location);
  const setFilter = useFilterStore((state) => state.setFilter);

  const containerClass = clsx("filter-container", {
    "filter-container--open": isOpen,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location) {
      const [city, country] = location.split(",");

      void onSearch({
        guests,
        location: { city, country: country.trim() },
      });
    } else {
      void onSearch({ guests });
    }

    setFilter(null);
  };

  return (
    <>
      <div className={containerClass}>
        <form
          className="filter-drawer"
          data-filter={filter}
          onSubmit={handleSubmit}
        >
          {isOpen && (
            <>
              <header className="filter-drawer__header">
                <span>Edit your search</span>
                <ButtonIcon icon="close" onClick={() => setFilter(null)} />
              </header>
              <FilterLocation isSelected={filter === FILTER.LOCATION} />
              <FilterGuests isSelected={filter === FILTER.GUESTS} />
              <div className="filter-drawer__search-button-wrapper">
                <Button
                  text="Search"
                  iconStart="search"
                  className="filter-drawer__search-button"
                  color="danger"
                />
              </div>
            </>
          )}
        </form>
      </div>
      {isOpen && (
        <div className="filter-backdrop" onClick={() => setFilter(null)}></div>
      )}
    </>
  );
};
