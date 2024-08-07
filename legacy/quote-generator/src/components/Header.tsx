import { ThemeButton } from "@hrc/toggle-theme";
import { Icon } from "@hrc/material-icons";
import { Button } from "@hrc/button/dist/Button";
import "./Header.scss";

type Props = {
  isLoading: boolean;
  handleRandomQuote: () => void;
};

export const Header = ({ isLoading, handleRandomQuote }: Props) => {
  return (
    <header className="main-header">
      <Button
        iconEnd={<Icon name="autorenew" />}
        onClick={handleRandomQuote}
        disabled={isLoading}
        noShadow
      >
        random
      </Button>
      <ThemeButton
        lightElement={<Icon name="light_mode" color="warning" />}
        darkElement={<Icon name="dark_mode" />}
        fullRounded
      />
    </header>
  );
};
