import { FilterInput } from "./FilterInput";
import { Icon } from "@hdoc/react-material-icons";
import { FILTER, useFilterStore } from "../store/filter";
import "./FilterLocation.scss";
import { useStays } from "../hooks/useStays";
import { useEffect, useMemo } from "react";

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
  const { stays, isLoading, getStays } = useStays();
  const location = useFilterStore((state) => state.location);
  const setFilter = useFilterStore((state) => state.setFilter);

  const locationOptions = useMemo(() => {
    return Array.from(
      new Set(stays.map((stay) => `${stay.city}, ${stay.country}`)),
    );
  }, [stays]);

  useEffect(() => void getStays(), [getStays]);

  return (
    <>
      <FilterInput
        label="Location"
        value={location ?? ""}
        name="location"
        placeholder="Add location"
        isSelected={isSelected}
        onClick={() => setFilter(FILTER.LOCATION)}
      />
      {isSelected && (
        <>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <ul className="filter-location-menu">
              {locationOptions.map((location) => (
                <LocationOption key={location} location={location} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};
