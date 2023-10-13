import { Button, ButtonIcon } from "@hdoc/react-button";
import { FILTER, useFilterStore } from "../store/filter";
import "./SearchBar.scss";

export const SearchBar = () => {
  const location = useFilterStore((state) => state.location);
  const guests = useFilterStore((state) => state.guests.total);
  const setFilter = useFilterStore((state) => state.setFilter);

  return (
    <div className="searchbar">
      <Button
        className="searchbar__location"
        text={location ?? "Add location"}
        onClick={() => setFilter(FILTER.LOCATION)}
      />
      <Button
        className="searchbar__guests"
        text={guests ? `${guests} guests` : "Add guests"}
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
