import { FilterInput } from "./FilterInput";
import { Icon } from "@hdoc/react-material-icons";
import { useFilterStore } from "../store/filter";
import clsx from "clsx";
import "./FilterLocation.scss";

// TODO: Try https://www.npmjs.com/package/bemt for create classNames
export const FilterLocation = ({ isSelected }: { isSelected?: boolean }) => {
  const setFilter = useFilterStore((state) => state.setFilter);
  const filterLocationClass = clsx("filter-location", {
    "filter-location--selected": isSelected,
  })

  return (
    <div className={filterLocationClass}>
      <FilterInput
        label="Location"
        value="Helsinki, Finland"
        name="location"
        isSelected={isSelected}
        onClick={() => setFilter("location")}
      />
      <ul className="filter-location__menu">
        <li className="filter-location__option">
          <Icon name="location_on" />
          <span>Helsinki, Finland</span>
        </li>
        <li className="filter-location__option">
          <Icon name="location_on" />
          <span>Turky, Finland</span>
        </li>
        <li className="filter-location__option">
          <Icon name="location_on" />
          <span>Oulu, Finland</span>
        </li>
        <li className="filter-location__option">
          <Icon name="location_on" />
          <span>Vaasa, Finland</span>
        </li>
      </ul>
    </div>
  );
};
