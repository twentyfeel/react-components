import { MenuItemProps } from "./MenuItemProps.ts";
import { CommandItemProps } from "./CommandItemProps.ts";

export type NavbarProps = {
  logo?: string;
  menuItems?: MenuItemProps[];
  commandItems?: CommandItemProps[];
  showThemeToggle?: boolean;
  showSearch?: boolean;
  onSearch?: (query: string | undefined) => void;
  searchPlaceholder?: string;
  logoComponent?: React.ReactNode;
  className?: string;
};
