import { Button } from "@hdoc/react-button";
import { FilterLocation } from "./FilterLocation";
import { FilterGuests } from "./FilterGuests";
import "./FilterDrawer.scss";
import clsx from "clsx";

type Props = {
  isOpen?: boolean;
};

export const FilterDrawer = ({ isOpen }: Props) => {
  const filterDrawerClass = clsx("filter-container", {
    "filter-container--open": isOpen,
  });

  return (
    <div className={filterDrawerClass}>
      <div className="filter-drawer ">
        <FilterLocation />
        <FilterGuests />
        <div className="filter-drawer__search">
          <Button
            text="Search"
            iconStart="search"
            className="filter-drawer__search-button"
          />
        </div>
      </div>
    </div>
  );
};
