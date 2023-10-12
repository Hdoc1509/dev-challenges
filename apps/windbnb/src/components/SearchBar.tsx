import { Button, ButtonIcon } from "@hdoc/react-button";
import { FILTER, useFilterStore } from "../store/filter";
import "./SearchBar.scss";

export const SearchBar = () => {
  const setFilter = useFilterStore((state) => state.setFilter);

  return (
    <div className="searchbar">
      <Button
        className="searchbar__location"
        text="Helsinki, Finland"
        onClick={() => setFilter(FILTER.LOCATION)}
      />
      <Button
        className="searchbar__guests"
        text="Add guests"
        onClick={() => setFilter(FILTER.GUESTS)}
      />
      <ButtonIcon
        icon="search"
        className="searchbar__search"
        onClick={() => setFilter(FILTER.LOCATION)}
      />
    </div>
  );
};
