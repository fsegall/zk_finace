# Color Palette - ZK Finance

## Primary Colors

### Primary
- **Primary**: `#2974FF` - Main blue for actions and highlight elements
- **Primary Foreground**: `#FFFFFF` - Text on primary background

### Secondary
- **Secondary**: `#3DFFEC` - Cyan for secondary elements
- **Secondary Foreground**: `#0C0C21` - Text on secondary background

## Secondary Colors
- **Secondary1**: `#3DFFEC` - Cyan
- **Secondary2**: `#0C0C21` - Dark blue
- **Secondary3**: `#000229` - Very dark blue
- **Secondary4**: `#002068` - Medium blue

## Status Colors
- **Success**: `#3CFFB1` - Green for success
- **Warning**: `#FFCD29` - Yellow for warnings
- **Destructive**: `#EF4870` - Red for errors

## Neutral Colors
- **Neutral-50**: `#F2F2F2` - White
- **Neutral-100**: `#F2F2F2CC` - White with 80% opacity
- **Neutral-200**: `#F2F2F2B3` - White with 70% opacity
- **Neutral-300**: `#F2F2F21F` - White with 12% opacity
- **Neutral-400**: `#F2F2F20D` - White with 5% opacity
- **Neutral-500**: `#040406` - Very dark black
- **Neutral-600**: `#0F0F10` - Dark black
- **Neutral-700**: `#17171C` - Very dark gray

## Interface Colors

### Background
- **Background**: `#0C0C21` - Main background
- **Card**: `#17171C` - Card background
- **Popover**: `#17171C` - Popover background

### Text
- **Foreground**: `#F2F2F2` - Main text
- **Card Foreground**: `#F2F2F2` - Text in cards
- **Muted Foreground**: `#0F0F10` - Secondary text

### Borders and Inputs
- **Border**: `#F2F2F21F` - Borders
- **Input**: `#F2F2F21F` - Input fields
- **Ring**: `#2974FF` - Element focus

### Sidebar
- **Sidebar Background**: `#000229` - Sidebar background
- **Sidebar Foreground**: `#F2F2F2` - Sidebar text
- **Sidebar Primary**: `#2974FF` - Primary sidebar elements
- **Sidebar Accent**: `#002068` - Highlight sidebar elements

## How to Use

### Tailwind Classes
```tsx
// Primary colors
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-secondary text-secondary-foreground">Secondary</div>

// Status colors
<div className="bg-success text-success-foreground">Success</div>
<div className="bg-warning text-warning-foreground">Warning</div>
<div className="bg-destructive text-destructive-foreground">Error</div>

// Neutral colors
<div className="bg-neutral-50">White</div>
<div className="bg-neutral-700">Dark gray</div>

// Secondary colors
<div className="bg-secondary1">Cyan</div>
<div className="bg-secondary2">Dark blue</div>
<div className="bg-secondary3">Very dark blue</div>
<div className="bg-secondary4">Medium blue</div>
```

### CSS Variables
```css
/* Using CSS variables directly */
.my-element {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

## Application

This palette was designed to create a modern and professional interface, with:
- High contrast for accessibility
- Consistent colors throughout the application
- Clear visual hierarchy
- Dark theme support 