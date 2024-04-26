import { useEffect, useMemo } from "react";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { FilterInput } from "./FilterInput";
import { FILTERS, useFilterStore } from "../store/filter";
import { useStays } from "../hooks/useStays";
import { splitStringLocation, stringifyLocation } from "../utils";
import type { RequiredSearchLocation } from "../types";
import "./FilterLocation.scss";

type Location = RequiredSearchLocation;

export const LocationOption = ({ location }: { location: Location }) => {
  const setLocation = useFilterStore((state) => state.setLocation);

  return (
    <Button
      iconStart={<Icon name="location_on" />}
      onClick={() => setLocation(location)}
      type="button"
    >
      {stringifyLocation(location)}
    </Button>
  );
};

type MenuProps = {
  options: Location[];
  isLoading: boolean;
};

const LocationMenu = ({ options, isLoading }: MenuProps) => {
  if (isLoading) return <span>Loading...</span>;

  return (
    <div className="location-menu" role="group">
      {options.map((location) => (
        <LocationOption key={stringifyLocation(location)} location={location} />
      ))}
    </div>
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
        onClick={() => setFilter(FILTERS.LOCATION)}
      />
      {isSelected && (
        <LocationMenu options={locationOptions} isLoading={isLoading} />
      )}
    </>
  );
};
