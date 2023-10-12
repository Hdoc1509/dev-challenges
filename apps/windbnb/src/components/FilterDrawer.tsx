import { Button } from "@hdoc/react-button";
import { FilterGuests } from "./FilterGuests";
import { FilterLocation } from "./FilterLocation";
import { FILTER, useFilterStore } from "../store/filter";
import clsx from "clsx";
import "./FilterDrawer.scss";

export const FilterDrawer = ({ isOpen }: { isOpen?: boolean }) => {
  const filter = useFilterStore((state) => state.filter);
  const setFilter = useFilterStore((state) => state.setFilter);

  const containerClass = clsx("filter-container", {
    "filter-container--open": isOpen,
  });
  const drawerClass = clsx("filter-drawer", {
    "filter-drawer--with-menu": filter,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(e.currentTarget)));
  };

  return (
    <>
      <div className={containerClass}>
        <form className={drawerClass} onSubmit={handleSubmit}>
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
        </form>
      </div>
      {isOpen && (
        <div className="filter-backdrop" onClick={() => setFilter(null)}></div>
      )}
    </>
  );
};
