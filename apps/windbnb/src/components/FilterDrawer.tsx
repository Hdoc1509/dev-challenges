import { Button, ButtonIcon } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { FilterGuests } from "./FilterGuests";
import { FilterLocation } from "./FilterLocation";
import { FILTER, useFilterStore } from "../store/filter";
import type { FnSearchOptions } from "../types";
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
  const clearFilter = useFilterStore((state) => state.clearFilter);

  const containerClass = clsx("filter-container", {
    "filter-container--open": isOpen,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    void onSearch({ guests, location });
    clearFilter();
  };

  return (
    <>
      {/* TODO: Create Drawer component */}
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
                <ButtonIcon onClick={clearFilter}>
                  <Icon name="close" />
                </ButtonIcon>
              </header>
              <FilterLocation isSelected={filter === FILTER.LOCATION} />
              <FilterGuests isSelected={filter === FILTER.GUESTS} />
              <div className="filter-drawer__search-button-wrapper">
                <Button
                  iconStart={<Icon name="search" />}
                  className="filter-drawer__search-button"
                  color="error"
                >
                  Search
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
      {isOpen && <div className="filter-backdrop" onClick={clearFilter}></div>}
    </>
  );
};
