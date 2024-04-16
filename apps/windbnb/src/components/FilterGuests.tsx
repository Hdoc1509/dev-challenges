import { ButtonIcon } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { FilterInput } from "./FilterInput";
import { type GuestType, useFilterStore, FILTER } from "../store/filter";
import "./FilterGuests.scss";

export const FilterGuestsCriteria = ({
  criteria,
  criteriaHint,
}: {
  criteria: Capitalize<GuestType>;
  criteriaHint: string;
}) => {
  const guests = useFilterStore((state) => state.guests);
  const criteriaLower = criteria.toLowerCase() as GuestType;
  const addGuest = useFilterStore((state) => state.addGuest);
  const removeGuest = useFilterStore((state) => state.removeGuest);

  return (
    <div className="filter-guests-criteria">
      <span className="filter-guests-criteria__label">{criteria}</span>
      <span className="filter-guests-criteria__hint">{criteriaHint}</span>
      <div className="filter-guests-counter">
        <ButtonIcon
          variant="outline"
          className="filter-guests-counter__button"
          type="button"
          onClick={() => removeGuest(criteriaLower)}
          disabled={guests[criteriaLower] === 0}
        >
          <Icon name="remove" />
        </ButtonIcon>
        <span className="filter-guests-counter__count">
          {guests[criteriaLower]}
        </span>
        <ButtonIcon
          className="filter-guests-counter__button"
          variant="outline"
          type="button"
          onClick={() => addGuest(criteriaLower)}
        >
          <Icon name="add" />
        </ButtonIcon>
      </div>
    </div>
  );
};

export const FilterGuests = ({ isSelected }: { isSelected?: boolean }) => {
  const setFilter = useFilterStore((state) => state.setFilter);
  const guests = useFilterStore((state) => state.guests.total);

  return (
    <>
      <FilterInput
        className="filter-guests-input"
        label="Guests"
        value={guests === 0 ? "" : `${guests} guests`}
        name="guests"
        placeholder="Add guests"
        isSelected={isSelected}
        onClick={() => setFilter(FILTER.GUESTS)}
      />
      {isSelected && (
        <div className="filter-guests-menu">
          <FilterGuestsCriteria
            criteria="Adults"
            criteriaHint="Ages 13 or above"
          />
          <FilterGuestsCriteria criteria="Children" criteriaHint="Ages 2-12" />
        </div>
      )}
    </>
  );
};
