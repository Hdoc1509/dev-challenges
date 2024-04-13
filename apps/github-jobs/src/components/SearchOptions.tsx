import { Checkbox, Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import { RadioGroup } from "./RadioGroup";
import "./SearchOptions.scss";

const form = "search-form";

export const SearchOptions = () => {
  return (
    <aside className="search-options">
      <Checkbox
        label="Full time"
        name="full-time"
        form={form}
        color="primary"
      />
      <Input
        label="LOCATION"
        iconStart={<Icon name="public" />}
        placeholder="City, state, zip code or country"
        form={form}
        name="location"
        fullWidth
      />
      <RadioGroup
        name="city"
        form={form}
        options={["London", "Amsterdam", "New York", "Berlin"]}
      />
    </aside>
  );
};
