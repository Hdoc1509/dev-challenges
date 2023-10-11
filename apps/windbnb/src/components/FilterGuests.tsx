import { FilterInput } from "./FilterInput";
import { ButtonIcon } from "@hdoc/react-button";
import { type GuestType, useFilterStore } from "../store/filter";
import clsx from "clsx";
import "./FilterGuests.scss";

const FilterGuestsCriteria = ({
  criteria,
  criteriaHint,
}: {
  criteria: Capitalize<GuestType>;
  criteriaHint: string;
}) => {
  const guests = useFilterStore((state) => state.guests);
  const addGuest = useFilterStore((state) => state.addGuest);
  const removeGuest = useFilterStore((state) => state.removeGuest);
  const criteriaLower = criteria.toLowerCase() as GuestType;

  return (
    <div className="filter-guests__criteria">
      <span className="filter-guests__criteria-label">{criteria}</span>
      <span className="filter-guests__criteria-hint">{criteriaHint}</span>
      <div className="filter-guests__criteria-counter">
        <ButtonIcon
          icon="remove"
          variant="outline"
          className="filter-guests__criteria-button"
          type="button"
          onClick={() => removeGuest(criteriaLower)}
          disabled={guests[criteriaLower] === 0}
        />
        <span className="filter-guests__criteria-count">
          {guests[criteriaLower]}
        </span>
        <ButtonIcon
          className="filter-guests__criteria-button"
          icon="add"
          variant="outline"
          type="button"
          onClick={() => addGuest(criteriaLower)}
        />
      </div>
    </div>
  );
};

export const FilterGuests = ({ isSelected }: { isSelected?: boolean }) => {
  const setFilter = useFilterStore((state) => state.setFilter);
  const guests = useFilterStore((state) => state.guests.total);
  const filterGuestsClass = clsx("filter-guests", {
    "filter-guests--selected": isSelected,
  });

  return (
    <div className={filterGuestsClass}>
      <FilterInput
        label="Guests"
        value={guests === 0 ? "" : `${guests} guests`}
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
