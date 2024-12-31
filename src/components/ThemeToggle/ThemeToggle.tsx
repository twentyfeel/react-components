import React from "react";
import "./ThemeToggle.scss";
import { useTheme } from "./context/themeContext.tsx";
import MoonIcon from "../../assets/icons/ThemeToggle/Moon.svg?react";
import SunIcon from "../../assets/icons/ThemeToggle/Sun.svg?react";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prev: string) => (prev === "light" ? "dark" : "light"));
  };

  return (
    // TODO: replace with button component when one is created
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;
