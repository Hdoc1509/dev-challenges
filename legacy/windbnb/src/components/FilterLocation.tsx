import { useEffect, useMemo } from "react";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { FilterInput } from "./FilterInput";
import { FILTERS, useFilterStore } from "@/store/filter";
import { useStays } from "@/hooks/useStays";
import { splitStringLocation, stringifyLocation } from "@/utils";
import type { RequiredSearchLocation } from "@/types";
import "./FilterLocation.scss";

type Location = RequiredSearchLocation;

export const LocationOption = ({ location }: { location: Location }) => {
  const setLocation = useFilterStore((state) => state.setLocation);

  return (
    <li>
      <Button
        iconStart={<Icon name="location_on" />}
        onClick={() => setLocation(location)}
        type="button"
      >
        {stringifyLocation(location)}
      </Button>
    </li>
  );
};

const LocationMenu = ({ options }: { options: Location[] }) => {
  return (
    <menu className="location-menu">
      {options.map((location) => (
        <LocationOption key={stringifyLocation(location)} location={location} />
      ))}
    </menu>
  );
};

export const FilterLocation = ({ isSelected }: { isSelected?: boolean }) => {
  const { stays, isLoading, isSuccess, setStatus, getStays } = useStays();
  const location = useFilterStore((state) => state.location);
  const setFilter = useFilterStore((state) => state.setFilter);

  const options = useMemo(() => {
    return Array.from(
      new Set(stays.map((stay) => `${stay.city}, ${stay.country}`)),
    ).map(splitStringLocation);
  }, [stays]);

  useEffect(() => {
    if (isSelected) void getStays();
    else setStatus("idle");
  }, [isSelected, getStays, setStatus]);

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
      {isLoading && <RingSpinner className="location-spinner" />}
      {isSuccess && <LocationMenu options={options} />}
    </>
  );
};
