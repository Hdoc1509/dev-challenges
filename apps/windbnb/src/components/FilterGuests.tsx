import { FilterInput } from "./FilterInput";
import { ButtonIcon } from "@hdoc/react-button";
import "./FilterGuests.scss";

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
        />
        <span className="filter-guests__criteria-count">0</span>
        <ButtonIcon
          className="filter-guests__criteria-button"
          icon="add"
          size="small"
          variant="outline"
        />
      </div>
    </div>
  );
};

export const FilterGuests = () => {
  return (
    <div className="filter-guests">
      <FilterInput
        label="Guests"
        value={undefined}
        name="guests"
        placeholder="Add guests"
      />
      <div className="filter-guests__menu">
        <div className="filter-guests__options">
          <FilterGuestsCriteria
            criteria="Adults"
            criteriaHint="Ages 13 or above"
          />
          <FilterGuestsCriteria criteria="Children" criteriaHint="Ages 2-12" />
        </div>
      </div>
    </div>
  );
};
