import { useJobsStore } from "@/store/jobs";
import { /* Checkbox, */ Input, RadioGroup } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import { predefinedCities } from "@/constants";
import "./SearchOptions.scss";

const form = "search-form";

export const SearchOptions = () => {
  const search = useJobsStore((s) => s.search);
  const setSearch = useJobsStore((s) => s.setSearch);

  return (
    <aside className="search-options">
      {/* <Checkbox
        label="Full time"
        form={form}
        color="primary"
        onChange={(e) => setSearch({ fullTime: e.target.checked })}
        checked={search.fullTime ?? false}
      /> */}
      <Input
        label="LOCATION"
        iconStart={<Icon name="public" />}
        placeholder="City, state, zip code or country"
        form={form}
        onChange={(e) => setSearch({ location: e.target.value })}
        value={search.location ?? ""}
        fullWidth
      />
      <RadioGroup
        name="location-options"
        form={form}
        options={predefinedCities}
        onChange={(location) => setSearch({ location })}
        value={search.location ?? ""}
      />
    </aside>
  );
};
