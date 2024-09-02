import { ThemeButton } from "@hrc/toggle-theme";
import { Icon } from "@hrc/material-icons";
import { SearchBar } from "./SearchBar";
import { FilterDrawer } from "./FilterDrawer";
import type { FnSearchOptions } from "@/types";
import logoUrl from "/logo.svg";
import "./Header.scss";

export const Header = ({ getStays }: { getStays: FnSearchOptions }) => {
  return (
    <header className="main-header">
      <img src={logoUrl} className="main-header__logo" alt="windbnb logo" />
      <SearchBar />
      <ThemeButton
        lightElement={<Icon name="light_mode" color="warning" />}
        darkElement={<Icon name="dark_mode" />}
        fullRounded
      />
      <FilterDrawer onSearch={getStays} />
    </header>
  );
};
