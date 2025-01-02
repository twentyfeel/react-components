# Navbar Component

## Features

- Configurable menu items with optional submenus
- Mobile-friendly hamburger menu
- Optional theme toggle
- Search with command palette

## Installation

Copy these files to your project:

- `Navbar.tsx`
- `NavbarProps.ts`
- `MenuItemProps.ts`
- `SubMenuItemProps.ts`
- `CommandItemProps.ts`
- `Navbar.scss`
- `File.svg`
- `Search.svg`

### NOTE: If ThemeToggle is enabled, also copy this files:

- [ThemeToggle](../../ThemeToggle/README.md)

## Usage

```tsx
import Navbar from "./Navbar";

const menuItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    submenu: [
      { label: "Company", href: "/about" },
      { label: "Team", href: "/team" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

function Header() {
  return (
    <Navbar
      logo="Programiraj"
      menuItems={menuItems}
      commandItems={[
        {
          id: "introduction",
          label: "Introduction",
          onSelect: () => console.log("Introduction"),
        },
        {
          id: "getting-started",
          label: "Getting Started",
          onSelect: (id, label) => console.log(id, label),
        },
      ]}
      showSearch
      showThemeToggle
      onSearch={query => console.log(query)}
    />
  );
}
```

## Props

| Prop              | Type                    | Default      | Description                        |
|-------------------|-------------------------|--------------|------------------------------------|
| logo              | string                  | "Twentyfeel" | Logo text                          |
| menuItems         | MenuItemProps[]         | []           | Array of menu items                |
| commandItems      | CommandItemProps[]      | []           | Array of command items             |
| showThemeToggle   | boolean                 | false        | Whether to show theme toggle       |
| showSearch        | boolean                 | false        | Whether to show search input       |
| onSearch          | (query: string) => void | nothing      | Callback when search query changes |
| searchPlaceholder | string                  | "Search..."  | Placeholder text for search input  |
| logoComponent     | ReactNode               | nothing      | Custom logo component              |
| className         | string                  | ""           | Additional CSS class name          |

### MenuItemProps

| Prop    | Type               | Required    | Description            |
|---------|--------------------|-------------|------------------------|
| label   | string             | Yes         | Menu item label text   |
| href    | string             | For link    | URL for menu item link |
| submenu | SubMenuItemProps[] | For submenu | Submenu items array    |

### SubMenuItemProps

| Prop  | Type   | Required | Description            |
|-------|--------|----------|------------------------|
| label | string | Yes      | Menu item label text   |
| href  | string | Yes      | URL for menu item link |

### CommandItemProps

| Prop     | Type                                                          | Required | Description                    |
|----------|---------------------------------------------------------------|----------|--------------------------------|
| id       | string                                                        | Yes      | Command item id (URL)          |
| label    | string                                                        | Yes      | Command item label text        |
| onSelect | (id: string \| undefined, label: string \| undefined) => void | No       | Callback when item is selected |

## CSS Variables

The following CSS variables are required in your global styles:

```scss
--border
--foreground
--background
--secondary
--muted-foreground
--accent
--popover
--nav-bg
--radius
--ring
```
