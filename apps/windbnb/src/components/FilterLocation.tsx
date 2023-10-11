import { FilterInput } from "./FilterInput";
import { Icon } from "@hdoc/react-material-icons";
import { useFilterStore } from "../store/filter";
import "./FilterLocation.scss";

export const LocationOption = ({ location }: { location: string }) => {
  const setLocation = useFilterStore((state) => state.setLocation);

  return (
    <li
      className="filter-location-menu__option"
      onClick={() => setLocation(location)}
    >
      <Icon name="location_on" />
      <span>{location}</span>
    </li>
  );
};

export const FilterLocation = ({ isSelected }: { isSelected?: boolean }) => {
  const location = useFilterStore((state) => state.location);
  const setFilter = useFilterStore((state) => state.setFilter);

  return (
    <>
      <FilterInput
        label="Location"
        value={location ?? ""}
        name="location"
        placeholder="Add location"
        isSelected={isSelected}
        onClick={() => setFilter("location")}
      />
      {isSelected && (
        <ul className="filter-location-menu">
          <LocationOption location="Helsinki, Finland" />
          <LocationOption location="Turky, Finland" />
          <LocationOption location="Oulu, Finland" />
          <LocationOption location="Vaasa, Finland" />
        </ul>
      )}
    </>
  );
};
