# Theme Toggle Component

## Features

- Light/Dark theme support
- System preference detection
- Theme persistence in localStorage

## Installation

1. Copy these files to your project:

- `themeContext.tsx`
- `ThemeToggle.tsx`
- `ThemeToggle.scss`
- `Moon.svg`
- `Sun.svg`

## Usage

1. Wrap your app with ThemeProvider:

```tsx
import { ThemeProvider } from './path/to/themeContext';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

2. Use the ThemeToggle component:

```tsx
import ThemeToggle from './path/to/ThemeToggle';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

3. Access theme state in any component:

```tsx
import { useTheme } from './path/to/themeContext';

function Component() {
  const { theme } = useTheme();
  return <div>Current theme: {theme}</div>;
}
```

## CSS Variables

Ensure your app has SCSS variables defined. You can find them in `_variables.scss` file

## Props

### ThemeProvider

| Prop         | Type              | Default           | Description   |
|--------------|-------------------|-------------------|---------------|
| defaultTheme | 'light' \| 'dark' | system preference | Initial theme |

### ThemeToggle

| Prop      | Type   | Default | Description            |
|-----------|--------|---------|------------------------|
| className | string | ""      | Additional CSS classes |
