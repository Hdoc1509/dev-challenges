import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { FilterGuests } from "./FilterGuests";
import { FilterLocation } from "./FilterLocation";
import { Drawer } from "./Drawer";
import { FILTER, useFilterStore } from "../store/filter";
import type { FnSearchOptions } from "../types";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    void onSearch({ guests, location });
    clearFilter();
  };

  return (
    <Drawer header="Edit your search" open={isOpen} onClose={clearFilter}>
      <form
        className="filter-drawer"
        data-filter={filter}
        onSubmit={handleSubmit}
      >
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
      </form>
    </Drawer>
  );
};
