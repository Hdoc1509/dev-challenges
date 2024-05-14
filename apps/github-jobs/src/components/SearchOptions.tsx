import { useJobsStore } from "../store/jobs";
import { Checkbox, Input } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import { RadioGroup } from "./RadioGroup";
import { predefinedCities } from "../constants";
import "./SearchOptions.scss";

const form = "search-form";

export const SearchOptions = () => {
  const options = useJobsStore((s) => s.searchOptions);
  const setOptions = useJobsStore((s) => s.setSearchOptions);

  return (
    <aside className="search-options">
      <Checkbox
        label="Full time"
        form={form}
        color="primary"
        onChange={(e) => setOptions({ fullTime: e.target.checked })}
        checked={options.fullTime ?? false}
      />
      <Input
        label="LOCATION"
        iconStart={<Icon name="public" />}
        placeholder="City, state, zip code or country"
        form={form}
        onChange={(e) => setOptions({ location: e.target.value })}
        value={options.location ?? ""}
        fullWidth
      />
      <RadioGroup
        form={form}
        options={predefinedCities}
        onChange={(e) => setOptions({ location: e.target.value })}
        value={options.location ?? ""}
      />
    </aside>
  );
};
