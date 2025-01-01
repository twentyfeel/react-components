import { MenuItemProps } from "./MenuItemProps.ts";

export type NavbarProps = {
  logo?: string;
  menuItems?: MenuItemProps[];
  showThemeToggle?: boolean;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  logoComponent?: React.ReactNode;
  className?: string;
  colors?: {
    backgroundColor?: string;
    textColor?: string;
    hoverColor?: string;
    activeColor?: string;
  };
};
