import { Button, ButtonIcon } from "@hdoc/react-button";
import { useFilterStore } from "../store/filter";
import "./SearchBar.scss";

export const SearchBar = () => {
  const setFilter = useFilterStore((state) => state.setFilter);

  return (
    <div className="searchbar">
      <Button
        className="searchbar__location"
        text="Helsinki, Finland"
        onClick={() => setFilter("location")}
      />
      <Button
        className="searchbar__guests"
        text="Add guests"
        onClick={() => setFilter("guests")}
      />
      <ButtonIcon
        icon="search"
        className="searchbar__search"
        onClick={() => setFilter("location")}
      />
    </div>
  );
};
