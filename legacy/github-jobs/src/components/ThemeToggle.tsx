import { Icon } from "@hrc/material-icons";
import { ThemeButton } from "@hrc/toggle-theme";

export const ThemeToggle = () => {
  return (
    <ThemeButton
      lightElement={<Icon name="light_mode" color="warning" />}
      darkElement={<Icon name="dark_mode" />}
      fullRounded
    />
  );
};
