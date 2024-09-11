import { ThemeButton } from "@hrc/toggle-theme";
import { Icon } from "@hrc/material-icons";
import { Nav } from "./Nav";
import "./Header.scss";

export function Header() {
  return (
    <header className="main-header">
      <h1>#todo</h1>
      <ThemeButton
        lightElement={<Icon name="light_mode" color="warning" />}
        darkElement={<Icon name="dark_mode" />}
        fullRounded
      />
      <Nav />
    </header>
  );
}
