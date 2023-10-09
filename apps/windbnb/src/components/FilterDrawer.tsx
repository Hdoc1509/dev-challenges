import { Button } from "@hdoc/react-button";
import { FilterLocation } from "./FilterLocation";
import { FilterGuests } from "./FilterGuests";
import { Filter, useFilterStore } from "../store/filter";
import clsx from "clsx";
import "./FilterDrawer.scss";

type Props = {
  isOpen?: boolean;
};

export const FilterDrawer = ({ isOpen }: Props) => {
  const filter = useFilterStore((state) => state.filter);
  const filterDrawerClass = clsx("filter-container", {
    "filter-container--open": isOpen,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(e.currentTarget)));
  };

  return (
    <div className={filterDrawerClass}>
      <form className="filter-drawer" onSubmit={handleSubmit}>
        <FilterLocation isSelected={filter === Filter.location} />
        <FilterGuests isSelected={filter === Filter.guests} />
        <div className="filter-drawer__search">
          <div className="filter-drawer__search-button-wrapper">
            <Button
              text="Search"
              iconStart="search"
              className="filter-drawer__search-button"
              size="large"
              color="danger"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
