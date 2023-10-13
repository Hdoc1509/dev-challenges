import { Button } from "@hdoc/react-button";
import { FilterGuests } from "./FilterGuests";
import { FilterLocation } from "./FilterLocation";
import { FILTER, useFilterStore } from "../store/filter";
import clsx from "clsx";
import "./FilterDrawer.scss";
import { SearchOptions } from "../types";

type Props = {
  isOpen?: boolean;
  onSearch: (options: SearchOptions) => void;
};

export const FilterDrawer = ({ isOpen, onSearch }: Props) => {
  const filter = useFilterStore((state) => state.filter);
  const guests = useFilterStore((state) => state.guests.total);
  const location = useFilterStore((state) => state.location);
  const setFilter = useFilterStore((state) => state.setFilter);

  const containerClass = clsx("filter-container", {
    "filter-container--open": isOpen,
  });
  const drawerClass = clsx("filter-drawer", {
    "filter-drawer--with-menu": filter,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (location) {
      const [city, country] = location.split(",");

      onSearch({
        guests,
        location: { city, country: country.trim() },
      });
    } else {
      onSearch({ guests });
    }

    setFilter(null);
  };

  return (
    <>
      <div className={containerClass}>
        <form className={drawerClass} onSubmit={handleSubmit}>
          {isOpen && (
            <>
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
