import { SearchBar } from "./SearchBar";
import { FilterDrawer } from "./FilterDrawer";
import { useFilterStore } from "../store/filter";
import type { FnSearchOptions } from "../types";
import logoUrl from "../../assets/logo.png";
import "./Header.scss";

export const Header = ({ getStays }: { getStays: FnSearchOptions }) => {
  const filter = useFilterStore((state) => state.filter);

  return (
    <header className="main-header">
      <img src={logoUrl} className="main-header__logo" alt="windbnb logo" />
      <SearchBar />
      <FilterDrawer
        isOpen={filter !== null}
        onSearch={({ guests, location } = {}) => getStays({ guests, location })}
      />
    </header>
  );
};
