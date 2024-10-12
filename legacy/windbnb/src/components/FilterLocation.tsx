import { useEffect } from "react";
import {
  useLocationOptionsActions,
  useLocationOptionsFetchingSelector,
} from "@/store/location-options";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { RingSpinner } from "@hrc/spinner/dist/RingSpinner";
import { FilterInput } from "./FilterInput";
import { FILTERS, useFilterStore } from "@/store/filter";
import { stringifyLocation } from "@/utils";
import { STATUS } from "@lib/fetcher";
import type { Location } from "@/types";
import "./FilterLocation.scss";

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
  const { options, status, error } = useLocationOptionsFetchingSelector();
  const { getOptions, resetStatus } = useLocationOptionsActions();
  const location = useFilterStore((state) => state.location);
  const setFilter = useFilterStore((state) => state.setFilter);

  useEffect(() => {
    isSelected ? void getOptions() : resetStatus();
  }, [isSelected, getOptions, resetStatus]);

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
      {status === STATUS.LOADING && (
        <RingSpinner className="location-spinner" />
      )}
      {status === STATUS.ERROR && (
        <p className="location-error">
          <span>{error.message}</span>
        </p>
      )}
      {status === STATUS.SUCCESS && <LocationMenu options={options} />}
    </>
  );
};
