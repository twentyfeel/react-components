import React from "react";
import { useTheme } from "./context/themeContext.tsx";
import MoonIcon from "../../assets/icons/ThemeToggle/Moon.svg?react";
import SunIcon from "../../assets/icons/ThemeToggle/Sun.svg?react";
import { Button } from "../Button/Button.tsx";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prev: string) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      className={`${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ThemeToggle;
