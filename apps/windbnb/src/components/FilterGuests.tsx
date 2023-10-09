import { FilterInput } from "./FilterInput";
import { ButtonIcon } from "@hdoc/react-button";
import clsx from "clsx";
import "./FilterGuests.scss";
import { useFilterStore } from "../store/filter";

const FilterGuestsCriteria = ({
  criteria,
  criteriaHint,
}: {
  criteria: string;
  criteriaHint: string;
}) => {
  return (
    <div className="filter-guests__criteria">
      <span className="filter-guests__criteria-label">{criteria}</span>
      <span className="filter-guests__criteria-hint">{criteriaHint}</span>
      <div className="filter-guests__criteria-counter">
        <ButtonIcon
          icon="remove"
          size="small"
          variant="outline"
          className="filter-guests__criteria-button"
          type="button"
        />
        <span className="filter-guests__criteria-count">0</span>
        <ButtonIcon
          className="filter-guests__criteria-button"
          icon="add"
          size="small"
          variant="outline"
          type="button"
        />
      </div>
    </div>
  );
};

export const FilterGuests = ({ isSelected }: { isSelected?: boolean }) => {
  const setFilter = useFilterStore((state) => state.setFilter);
  const filterGuestsClass = clsx("filter-guests", {
    "filter-guests--selected": isSelected,
  })

  return (
    <div className={filterGuestsClass}>
      <FilterInput
        label="Guests"
        value={undefined}
        name="guests"
        placeholder="Add guests"
        isSelected={isSelected}
        onClick={() => setFilter("guests")}
      />
      <div className="filter-guests__menu">
        <FilterGuestsCriteria
          criteria="Adults"
          criteriaHint="Ages 13 or above"
        />
        <FilterGuestsCriteria criteria="Children" criteriaHint="Ages 2-12" />
      </div>
    </div>
  );
};
