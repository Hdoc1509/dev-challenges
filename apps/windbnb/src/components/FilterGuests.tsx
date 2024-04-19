import { ButtonIcon } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import { FilterInput } from "./FilterInput";
import { type GuestType, useFilterStore, FILTER } from "../store/filter";
import "./FilterGuests.scss";

type CriteriaProps = {
  label: Capitalize<GuestType>;
  hint: string;
};

export const Criteria = ({ label, hint }: CriteriaProps) => {
  const guests = useFilterStore((state) => state.guests);
  const criteriaLower = label.toLowerCase() as GuestType;
  const addGuest = useFilterStore((state) => state.addGuest);
  const removeGuest = useFilterStore((state) => state.removeGuest);

  return (
    <div className="guests-criteria">
      <span className="guests-criteria__label">{label}</span>
      <span className="guests-criteria__hint">{hint}</span>
      <div className="guests-counter">
        <ButtonIcon
          variant="outline"
          type="button"
          onClick={() => removeGuest(criteriaLower)}
          disabled={guests[criteriaLower] === 0}
        >
          <Icon name="remove" />
        </ButtonIcon>
        <span>{guests[criteriaLower]}</span>
        <ButtonIcon
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
        className="guests-input"
        label="Guests"
        value={guests === 0 ? "" : `${guests} guests`}
        name="guests"
        placeholder="Add guests"
        isSelected={isSelected}
        onClick={() => setFilter(FILTER.GUESTS)}
      />
      {isSelected && (
        <div className="guests-menu">
          <Criteria label="Adults" hint="Ages 13 or above" />
          <Criteria label="Children" hint="Ages 2-12" />
        </div>
      )}
    </>
  );
};
