import { useJobsStore } from "@/store/jobs";
// import { Checkbox } from "@hrc/input/dist/Checkbox";
import { Input } from "@hrc/input/dist/Input";
import { Icon } from "@hrc/material-icons";
import { RadioGroup } from "./RadioGroup";
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
        form={form}
        options={predefinedCities}
        onChange={(e) => setSearch({ location: e.target.value })}
        value={search.location ?? ""}
      />
    </aside>
  );
};
