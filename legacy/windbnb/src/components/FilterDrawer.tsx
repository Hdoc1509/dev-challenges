import { useStaysStore } from "@/store/stays";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { FilterGuests } from "./FilterGuests";
import { FilterLocation } from "./FilterLocation";
import { Drawer } from "./Drawer";
import { FILTERS, useFilterStore } from "@/store/filter";
import "./FilterDrawer.scss";

export const FilterDrawer = () => {
  const filter = useFilterStore((state) => state.filter);
  const guests = useFilterStore((state) => state.guests.total);
  const location = useFilterStore((state) => state.location);
  const clearFilter = useFilterStore((state) => state.clearFilter);
  const getStays = useStaysStore((s) => s.getStays);

  const isOpen = filter !== null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    void getStays({ guests, location });
    clearFilter();
  };

  return (
    <Drawer header="Edit your search" open={isOpen} onClose={clearFilter}>
      <form
        className="filter-form"
        data-filter={filter}
        onSubmit={handleSubmit}
      >
        <FilterLocation isSelected={filter === FILTERS.LOCATION} />
        <FilterGuests isSelected={filter === FILTERS.GUESTS} />
        <div className="filter-form__search">
          <Button iconStart={<Icon name="search" />} color="error">
            Search
          </Button>
        </div>
      </form>
    </Drawer>
  );
};
