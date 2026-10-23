---
name: FULafia Security & Incident Management
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f0eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#4e4637'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0ea'
  outline: '#807665'
  outline-variant: '#d1c5b2'
  surface-tint: '#795900'
  primary: '#765700'
  on-primary: '#ffffff'
  primary-container: '#926f1b'
  on-primary-container: '#fffbff'
  inverse-primary: '#ecc166'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#006b2e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00873c'
  on-tertiary-container: '#f7fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea0'
  primary-fixed-dim: '#ecc166'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5c4300'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#87fb9d'
  tertiary-fixed-dim: '#6add84'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005322'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system establishes an authoritative, institutional, and highly responsive operational framework for the Federal University of Lafia Security Unit. Built to bridge urgent emergency response with structured criminal investigation workflows, the visual language balances civic authority with accessible campus utility.

### Personality & Emotional Response
- **Authoritative & Trustworthy:** Anchored in institutional pride and rigorous security protocols, conveying vigilance and uncompromised discretion.
- **Calm & Decisive Under Pressure:** High-stress emergency interactions must feel frictionless, unambiguous, and clear.
- **Institutional Dignity:** Evoking the core ethos of "Integrity, Innovation, Excellence" through refined university heraldry and precise digital utility.

### Design Movement
- **Modern Institutional Flat:** High-clarity operational dashboards blended with refined academic prestige. Clean neutral canvases are punctuated with functional status signaling, crisp borders, subtle warm gold boundaries, and dark charcoal command surfaces.

## Colors

The palette is derived directly from the institutional seal and operational campus safety standards.

### Core Swatches
- **Primary / Brand Gold (#B08A35):** Used for primary actions, active navigational states, credential headers, key metrics, and subtle structural hairline borders.
- **Secondary / Dark Charcoal (#1A1A1A):** Used for primary body text, tactical command sidebars, table column headers, and dark footing.
- **Tertiary / FULafia Green (#1E9B4A):** Designates resolved cases, secure statuses, success alerts, verified clearance badges, and confirmed officer dispatches.
- **Alert / Emergency Maroon (#8B1A1A):** Reserved strictly for critical SOS alerts, active panic triggers, high-priority emergency hotlines, and severe incidents.
- **Pending Amber (#F2A900):** Applied to tickets under preliminary review, unassigned dispatches, and cautionary alerts.

### Surface Canvas Hierarchy
- **Base Canvas:** Off-white warm stone (`#FAF7F0`) gives depth and warmth to reduce clinical glare across prolonged shifts.
- **Card & Container Surface:** Pure crisp white (`#FFFFFF`) framed by hairlines tinted with primary gold at 20% opacity (`rgba(176, 138, 53, 0.20)`).
- **Command & Security Surface:** Deep Charcoal (`#1A1A1A`) dedicated to desktop control panels, dark sidebars, and secure modal backdrops.

## Typography

Inter serves as the primary typeface across all hierarchies due to its neutral proportions, distinct letterforms, tall x-height, and robust optical legibility in rapid reporting interfaces and data-heavy investigative tables.

### Type Rules
- **Display & Headlines:** Used for dashboard stat aggregates, case file identification numbers, and modal titles. Track tightly (`-0.01em` to `-0.02em`) to maintain an authoritative, compact profile.
- **Labels & Badges:** Uppercase is restricted to `label-sm` when designating status badges (e.g., `PENDING`, `INVESTIGATION`, `RESOLVED`, `EMERGENCY`) with wide tracking (`0.05em`).
- **Tabular Data:** Use monospace numerical styling (`tnum`) for crime incident reference IDs, phone numbers, timestamps, and GPS coordinates.

## Layout & Spacing

The layout utilizes an 8pt base grid for spacing and component structures, pairing fluid multi-column setups with dedicated persistent security controls.

### Form Factor Adaptations
- **Desktop (Command Station, ≥ 1024px):** Fixed 280px deep charcoal navigation sidebar alongside a 12-column fluid grid. Layout gutters sit at `1.5rem` (`24px`) with outer canvas margins of `2rem` (`32px`). Tables, feeds, and mapping modules reflow into multi-column split views.
- **Tablet (Field Patrol / Dispatch, 768px – 1023px):** Collapsed iconography sidebar (72px) with an 8-column fluid grid. Gutters remain `1.5rem`.
- **Mobile (Student / Staff Reporting Portal, < 768px):** Single-column stack with bottom navigation bar (height: 64px) for one-handed SOS reporting. Margins tighten to `1rem` (`16px`) and gutters to `1rem`. Floating SOS button is anchored above the bottom navigation bar.

## Elevation & Depth

Visual depth avoids excessive decorative blur, utilizing clean tonal stacking, structural hairlines, and restrained ambient drops to maintain operational speed and accessibility.

### Depth System
- **Level 0 (Flat / Canvas):** Neutral stone background (`#FAF7F0`) without elevation.
- **Level 1 (Cards & Data Panels):** Pure white `#FFFFFF` surface framed with a 1px border of `rgba(176, 138, 53, 0.20)` (Primary Gold 20%). Ambient shadow: `0 1px 3px rgba(26, 26, 26, 0.05), 0 1px 2px rgba(26, 26, 26, 0.03)`.
- **Level 2 (Hover & Filter Overlays):** 1px border of `rgba(176, 138, 53, 0.35)`. Shadow: `0 4px 6px -1px rgba(26, 26, 26, 0.08), 0 2px 4px -2px rgba(26, 26, 26, 0.04)`.
- **Level 3 (Modals & Emergency Drawers):** Shadow: `0 20px 25px -5px rgba(26, 26, 26, 0.15), 0 8px 10px -6px rgba(26, 26, 26, 0.10)`. Backdrops use `#1A1A1A` at 60% opacity.
- **Level 4 (Critical Emergency Banner):** Solid `#8B1A1A` with a high-contrast pulsing glow: `0 0 0 4px rgba(139, 26, 26, 0.25)`.

## Shapes

The interface balances modern comfort with structural rigidity:
- **Default Elements:** 0.5rem (`8px`) roundedness on inputs, standard buttons, and small dropdowns.
- **Cards & Command Blocks (`rounded-xl`):** 1.5rem (`24px`) roundedness to create distinct, approachable incident overview modules and dashboard containers.
- **Badges & Quick Action Chips:** Fully pill-shaped (`9999px`) to immediately communicate status classification and prevent confusion with actionable rectangular cards.
- **SOS Panic Action:** Circular circular geometry (`w-16 h-16` / `64px`) for instant identification.

## Components

### Buttons
- **Primary:** Solid University Gold (`#B08A35`) background with dark charcoal or white high-contrast text, 8px corner radius, medium typography (`label-lg`). Hover shifts to `#99752B`.
- **Emergency Action Button:** Solid Emergency Maroon (`#8B1A1A`), uppercase bold white text, subtle pulse effect on active emergency standby.
- **Secondary / Ghost:** Off-white background, 1px border in `rgba(176, 138, 53, 0.35)`, Charcoal text.

### Status Badges & Chips
- **Pending:** Amber background (`#F2A900/15`), solid `#F2A900` text, 1px border in `#F2A900/30`. Pill-shaped with a 6px leading dot.
- **Under Investigation:** Primary Gold background (`#B08A35/15`), text `#B08A35`, border `#B08A35/30`.
- **Resolved:** FULafia Green (`#1E9B4A/15`), text `#1E9B4A`, border `#1E9B4A/30`.
- **Closed / Inactive:** Dark Charcoal tint (`#1A1A1A/10`), text `#1A1A1A`, border `#1A1A1A/20`.
- **Emergency:** Maroon (`#8B1A1A`), solid background, crisp white text.

### Incident Cards
- Encased in white `#FFFFFF` with `rounded-xl` (1.5rem) borders and `1px solid rgba(176, 138, 53, 0.20)`. Internal padding uses `space-lg` (`1.5rem`). Contains incident ID, timestamp in `tnum`, severity indicator, short description, and assigned security personnel chip.

### Input Fields & Selects
- 8px radius, white surface, 1.5px border `#E5E0D5`. Focus state triggers a 1.5px border of `#B08A35` with an ambient ring: `0 0 0 3px rgba(176, 138, 53, 0.15)`. Error states switch border to `#8B1A1A`.

### Navigation
- **Desktop Sidebar:** Persistent `#1A1A1A` background, institutional seal at top, active navigation items highlighted with a left border accent of `#B08A35` and subtle gold-tinted fill.
- **Mobile Bottom Navigation:** Fixed `#FFFFFF` container with subtle top border `rgba(176, 138, 53, 0.20)`, 4 tab slots (Home, Report, Track, Contacts) with an elevated centered circular SOS button.