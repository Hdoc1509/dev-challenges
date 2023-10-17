import { Icon } from "@hdoc/react-material-icons";
import { ThemeButton } from "@hdoc/react-toggle-theme";
import "./HeaderWithTheme.scss";

type HeaderWithThemeProps = {
  title: string;
}

export const HeaderWithTheme = ({ title }: HeaderWithThemeProps) => (
  <header className="main-header">
    <h1>{title}</h1>
    <div className="theme-switcher">
      <ThemeButton
        lightElement={<Icon name="light_mode" />}
        darkElement={<Icon name="dark_mode" />}
        fullRounded
      />
    </div>
  </header>
);
