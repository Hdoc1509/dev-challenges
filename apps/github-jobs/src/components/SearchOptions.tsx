import { Checkbox, Input } from "@hdoc-react/input";
import { Icon } from "@hdoc-react/material-icons";
import { RadioGroup } from "./RadioGroup";
import "./SearchOptions.scss";

export const SearchOptions = () => {
  return (
    <aside className="search-options">
      <Checkbox
        label="Full time"
        name="full-time"
        form="search-form"
        color="primary"
      />
      <Input
        label="LOCATION"
        iconStart={<Icon name="public" />}
        placeholder="City, state, zip code or country"
        form="search-form"
        name="location"
        fullWidth
      />
      <RadioGroup
        name="city"
        options={["London", "Amsterdam", "New York", "Berlin"]}
        defaultValue="New York"
      />
    </aside>
  );
};
