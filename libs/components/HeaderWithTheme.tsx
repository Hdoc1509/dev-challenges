import { Icon } from "@hrc/material-icons";
import { ThemeButton } from "@hrc/toggle-theme";
import "./HeaderWithTheme.scss";

type Props = {
  title: string;
};

export const HeaderWithTheme = ({ title }: Props) => (
  <header className="main-header">
    <h1>{title}</h1>
    <ThemeButton
      lightElement={<Icon name="light_mode" color="warning" />}
      darkElement={<Icon name="dark_mode" />}
      fullRounded
    />
  </header>
);
