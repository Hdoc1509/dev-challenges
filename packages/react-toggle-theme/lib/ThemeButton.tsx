import { ReactNode, useState } from "react";
import { Theme, getTheme, toggleTheme } from "./utils";
import "./ThemeButton.scss";

type ThemeButtonProps = {
  lightElement: ReactNode;
  darkElement: ReactNode;
};

export const ThemeButton = ({
  darkElement,
  lightElement
}: ThemeButtonProps) => {
  const [theme, setTheme] = useState<Theme>(getTheme());

  const handleToggleTheme = () => {
    const newTheme = toggleTheme();

    // setTheme(toggleTheme());
    setTheme(newTheme);
  };

  return (
    <button className="theme-button" onClick={handleToggleTheme}>
      {theme === 'light' ? lightElement : darkElement}
    </button>
  );
};
