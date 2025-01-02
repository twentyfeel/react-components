import { SubMenuItemProps } from "./SubMenuItemProps.ts";

export type MenuItemProps = {
  label: string;
  href?: string;
  submenu?: SubMenuItemProps[];
};
