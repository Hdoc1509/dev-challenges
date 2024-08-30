import { Icon } from "@hrc/material-icons";
import { ThemeButton } from "@hrc/toggle-theme";
import { RemainingSearches } from "./RemainingSearches";
import './Header.scss'

export const Header = () => {
  return (
    <header className="main-header">
      <h1>
        <span className="bold">Github</span> Jobs
      </h1>
      <ThemeButton
        lightElement={<Icon name="light_mode" color="warning" />}
        darkElement={<Icon name="dark_mode" />}
        fullRounded
      />
      <RemainingSearches />
    </header>
  );
};
