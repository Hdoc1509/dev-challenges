import { Icon } from "@hdoc/react-material-icons";
import { ThemeButton } from "@hdoc/react-toggle-theme";
import "./HeaderWithTheme.scss";

type Props = {
  title: string;
  nav?: React.ReactNode;
};

export const HeaderWithTheme = ({ title, nav }: Props) => (
  <header className="main-header">
    <h1>{title}</h1>
    <ThemeButton
      lightElement={<Icon name="light_mode" color="warning" />}
      darkElement={<Icon name="dark_mode" />}
      fullRounded
    />
    {nav}
  </header>
);
