import { useEffect, useMemo } from "react";
import { FilterInput } from "./FilterInput";
import { Icon } from "@hrc/material-icons";
import { FILTER, useFilterStore } from "../store/filter";
import { useStays } from "../hooks/useStays";
import type { RequiredSearchLocation } from "../types";
import { splitStringLocation, stringifyLocation } from "../utils";
import "./FilterLocation.scss";

export const LocationOption = ({
  location,
}: {
  location: RequiredSearchLocation;
}) => {
  const setLocation = useFilterStore((state) => state.setLocation);

  return (
    <li className="location-menu__option" onClick={() => setLocation(location)}>
      <Icon name="location_on" />
      <span>{stringifyLocation(location)}</span>
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
    ).map(splitStringLocation);
  }, [stays]);

  useEffect(() => void getStays(), [getStays]);

  return (
    <>
      <FilterInput
        label="Location"
        value={location ? `${stringifyLocation(location)}` : ""}
        name="location"
        placeholder="Add location"
        className="location-input"
        isSelected={isSelected}
        onClick={() => setFilter(FILTER.LOCATION)}
      />
      {isSelected && (
        <>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <ul className="location-menu">
              {locationOptions.map((location) => (
                <LocationOption
                  key={stringifyLocation(location)}
                  location={location}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};
