import { ThemeButton } from "@hdoc/react-toggle-theme";
import { Icon } from "@hdoc/react-material-icons";
import { SearchBar } from "./SearchBar";
import { FilterDrawer } from "./FilterDrawer";
import { useFilterStore } from "../store/filter";
import type { FnSearchOptions } from "../types";
import logoUrl from "../assets/logo.svg";
import "./Header.scss";

export const Header = ({ getStays }: { getStays: FnSearchOptions }) => {
  const filter = useFilterStore((state) => state.filter);

  return (
    <header className="main-header">
      <img src={logoUrl} className="main-header__logo" alt="windbnb logo" />
      <SearchBar />
      <ThemeButton
        lightElement={<Icon name="light_mode" color="warning" />}
        darkElement={<Icon name="dark_mode" />}
        fullRounded
      />
      <FilterDrawer
        isOpen={filter !== null}
        onSearch={({ guests, location } = {}) => getStays({ guests, location })}
      />
    </header>
  );
};
