import { Button, ButtonIcon } from "@hdoc/react-button";
import "./SearchBar.scss";

export const SearchBar = () => {
  return (
    <div className="searchbar">
      <Button className="searchbar__location" text="Helsinki, Finland" />
      <Button className="searchbar__guests" text="Add guests" />
      <ButtonIcon icon="search" className="searchbar__search" />
    </div>
  );
};
