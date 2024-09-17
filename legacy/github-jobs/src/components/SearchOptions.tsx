import { useSearchStore } from "@/store/search";
import { Checkbox, Input, RadioGroup } from "@hrc/input";
import { Icon } from "@hrc/material-icons";
import { SEARCH_FORM_ID, predefinedCities } from "@/constants";
import "./SearchOptions.scss";

export const SearchOptions = () => {
  const search = useSearchStore((s) => s.search);
  const setSearch = useSearchStore((s) => s.setSearch);

  return (
    <aside className="search-options">
      <Checkbox
        label="Full time"
        form={SEARCH_FORM_ID}
        color="primary"
        onChange={(e) => setSearch({ fullTime: e.target.checked })}
        checked={search.fullTime ?? false}
      />
      <Input
        label="LOCATION"
        iconStart={<Icon name="public" />}
        placeholder="City, state, zip code or country"
        form={SEARCH_FORM_ID}
        onChange={(e) => setSearch({ location: e.target.value })}
        value={search.location ?? ""}
        fullWidth
      />
      <RadioGroup
        name="location-options"
        form={SEARCH_FORM_ID}
        options={predefinedCities}
        onChange={(location) => setSearch({ location })}
        value={search.location ?? ""}
      />
    </aside>
  );
};
