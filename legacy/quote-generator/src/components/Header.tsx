import { ThemeButton } from "@hrc/toggle-theme";
import { Icon } from "@hrc/material-icons";
import { Button } from "@hrc/button/dist/Button";
import './Header.scss';

type Props = {
  isLoading: boolean;
  handleRandomQuote: () => void;
};

export const Header = ({ isLoading, handleRandomQuote }: Props) => {
  return (
    <header className="main-header">
      <Button
        className="main-header__random-button"
        iconEnd={<Icon name="autorenew" />}
        onClick={handleRandomQuote}
        disableShadow
        disabled={isLoading}
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
