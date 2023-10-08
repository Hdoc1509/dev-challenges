import { FilterInput } from "./FilterInput";
import { Icon } from "@hdoc/react-material-icons";
import "./FilterLocation.scss";

// TODO: Try https://www.npmjs.com/package/bemt for create classNames
export const FilterLocation = () => {
  return (
    <div className="filter-location">
      <FilterInput
        label="Location"
        value="Helsinki, Finland"
        name="location"
        isSelected
      />
      <div className="filter-location__menu">
        <div className="filter-location__option">
          <Icon name="location_on" />
          <span>Helsinki, Finland</span>
        </div>
        <div className="filter-location__option">
          <Icon name="location_on" />
          <span>Turky, Finland</span>
        </div>
        <div className="filter-location__option">
          <Icon name="location_on" />
          <span>Oulu, Finland</span>
        </div>
        <div className="filter-location__option">
          <Icon name="location_on" />
          <span>Vaasa, Finland</span>
        </div>
      </div>
    </div>
  );
};
