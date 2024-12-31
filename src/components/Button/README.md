# Button Component

## Features

- Multiple variants: default, destructive, outline, secondary, link
- Size options: default, sm, lg, icon
- Loading state with spinner
- Dark/Light theme support
- Keyboard navigation & focus states
- Disabled state handling

## Installation

Copy these files to your project:

- `Button.tsx`
- `Button.scss`

## Usage

```tsx
import { Button } from './path/to/Button';

function Component() {
  return (
    <>
      {/* Basic usage */}
      <Button>Click me</Button>

      {/* With variants */}
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Cancel</Button>

      {/* Different sizes */}
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>

      {/* Icon button */}
      <Button size="icon">
        <svg>...</svg>
      </Button>

      {/* Loading state */}
      <Button loading>Processing</Button>
    </>
  );
}
```

## Props

| Prop      | Type                                                             | Default   | Description            |
|-----------|------------------------------------------------------------------|-----------|------------------------|
| variant   | 'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'link' | 'default' | Button style variant   |
| size      | 'default' \| 'sm' \| 'lg' \| 'icon'                              | 'default' | Button size            |
| loading   | boolean                                                          | false     | Shows loading spinner  |
| disabled  | boolean                                                          | false     | Disables button        |
| className | string                                                           | ""        | Additional CSS classes |

Plus all native HTML button attributes.

## CSS Variables

Uses CSS variables from your theme for colors and styles. Required variables:

```scss
--primary
--primary-foreground
--destructive
--destructive-foreground
--secondary
--secondary-foreground
--accent
--accent-foreground
--background
--foreground
--input
--ring
--radius
```
