import { Icon } from "@hdoc-react/material-icons";
import { ThemeButton } from "@hdoc-react/toggle-theme";
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
    </header>
  );
};
