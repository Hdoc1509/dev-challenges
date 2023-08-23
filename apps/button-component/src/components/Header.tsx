import { Icon } from "@hdoc/react-material-icons";
import { ThemeButton } from "@hdoc/react-toggle-theme";
import './Header.scss'

export const Header = () => (
  <header>
    <h1>Buttons</h1>
    <div className="theme-switcher">
      <ThemeButton
        lightElement={<Icon name="light_mode" />}
        darkElement={<Icon name="dark_mode" />}
        fullRounded
      />
    </div>
  </header>
);
