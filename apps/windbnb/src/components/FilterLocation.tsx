import { FilterInput } from "./FilterInput";
import { Icon } from "@hdoc/react-material-icons";
import { useFilterStore } from "../store/filter";
import clsx from "clsx";
import "./FilterLocation.scss";

const LocationOption = ({ location }: { location: string }) => {
  const setLocation = useFilterStore((state) => state.setLocation);

  return (
    <li
      className="filter-location__option"
      onClick={() => setLocation(location)}
    >
      <Icon name="location_on" />
      <span>{location}</span>
    </li>
  );
};

export const FilterLocation = ({ isSelected }: { isSelected?: boolean }) => {
  const setFilter = useFilterStore((state) => state.setFilter);
  const location = useFilterStore((state) => state.location);
  const className = clsx("filter-location", {
    "filter-location--selected": isSelected,
  });

  return (
    <div className={className}>
      <FilterInput
        label="Location"
        value={location ?? ""}
        name="location"
        placeholder="Add location"
        isSelected={isSelected}
        onClick={() => setFilter("location")}
      />
      <ul className="filter-location__menu">
        <LocationOption location="Helsinki, Finland" />
        <LocationOption location="Turky, Finland" />
        <LocationOption location="Oulu, Finland" />
        <LocationOption location="Vaasa, Finland" />
      </ul>
    </div>
  );
};
