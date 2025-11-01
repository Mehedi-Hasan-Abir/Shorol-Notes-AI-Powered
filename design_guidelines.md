# Design Guidelines: Shorol Notes Web Application

## Design Approach

**Selected Framework**: Material Design 3 (Material You)
**Rationale**: Optimal for productivity applications with complex data hierarchies, excellent typography system for multi-language support (Bangla focus), and proven patterns for list-based interfaces and forms.

**Core Principles**:
- Information clarity over visual flourish
- Efficient task completion with minimal friction
- Bangla-first typography with exceptional readability
- Consistent, predictable interaction patterns
- Offline-capable progressive web app feel

---

## Typography System

### Font Stack
- **Primary (Bangla + English)**: Noto Sans Bengali, Inter, system-ui, -apple-system, sans-serif
- **Monospace (for technical data)**: 'Courier New', monospace

### Type Scale
- **Display (Page Headers)**: 2.5rem (40px), font-weight: 700, line-height: 1.2
- **H1 (Section Headers)**: 2rem (32px), font-weight: 600, line-height: 1.3
- **H2 (Card Titles)**: 1.5rem (24px), font-weight: 600, line-height: 1.4
- **H3 (Subsections)**: 1.25rem (20px), font-weight: 500, line-height: 1.4
- **Body Large**: 1.125rem (18px), font-weight: 400, line-height: 1.6
- **Body Regular**: 1rem (16px), font-weight: 400, line-height: 1.6
- **Body Small**: 0.875rem (14px), font-weight: 400, line-height: 1.5
- **Caption**: 0.75rem (12px), font-weight: 400, line-height: 1.4

**Bangla Typography Notes**: Increase line-height by 0.1 for Bangla-heavy content to accommodate character complexity. Use font-weight 500 minimum for headings in Bangla.

---

## Layout System

### Spacing Scale (Tailwind Units)
**Core spacing set**: 2, 3, 4, 6, 8, 12, 16, 24
- Tight spacing: p-2, gap-2 (8px)
- Standard spacing: p-4, gap-4 (16px) 
- Section spacing: p-6, gap-6 (24px)
- Large section padding: p-8, py-12 (32px, 48px)
- Extra large: p-16, py-24 (64px, 96px)

### Container Strategy
- **Application Shell**: max-w-7xl mx-auto (1280px max width)
- **Main Content Area**: max-w-4xl for reading content (768px)
- **Sidebars/Lists**: w-full md:max-w-sm lg:max-w-md
- **Form Containers**: max-w-2xl (672px)
- **Full-width sections**: w-full with inner padding px-4 md:px-6 lg:px-8

### Grid Patterns
- **Notes List**: Single column mobile, 2 columns tablet (md:grid-cols-2), 3 columns desktop (lg:grid-cols-3)
- **Note Editor**: Full-width single column layout
- **Calendar View**: Grid layout for calendar cells, responsive month/week views
- **Settings**: Two-column form layout on desktop (lg:grid-cols-2)

---

## Component Library

### Navigation Components

**Tab Navigation** (Primary Navigation)
- Full-width horizontal tabs with equal distribution
- Active tab: border-b-2 with solid indicator
- Tab labels: Body Regular typography, padding px-6 py-3
- Icons + text combination, icons size: 20px (w-5 h-5)
- Responsive: Icons only on mobile, icons + text on tablet+
- Smooth transition on tab switches

**Breadcrumbs** (Secondary Navigation)
- Body Small typography
- Separator: "/" or ">" icon
- Spacing: gap-2 between items
- Current page: non-interactive, different visual treatment

### Note Components

**Note Card** (List View)
- Card container: rounded-lg, p-4, border with subtle shadow
- Card header: flex justify-between items-start, mb-3
- Note title: H3 typography, truncate after 2 lines
- Note preview: Body Regular, line-clamp-3, opacity reduced
- Metadata row: flex gap-4, Body Small, icons w-4 h-4
- Audio indicator: pill badge with icon + duration
- Important flag: star icon in top-right, w-5 h-5
- Hover state: subtle elevation increase, smooth transition

**Note Editor** (Detail View)
- Full-page layout with sticky header
- Title input: Display typography styling, border-b, py-3
- Body textarea: Body Large, min-h-96, auto-expand
- Metadata bar: flex justify-between, sticky bottom, backdrop-blur, p-4
- Action buttons: grouped in button group, gap-2

**Voice Recording Controls**
- Large circular record button: w-20 h-20 (80px)
- Timer display: Monospace font, text-2xl
- Waveform visualization: h-24 (96px), animated bars
- Playback controls: Standard media controls (play/pause, scrubber, time)
- Audio player: w-full, rounded container, p-4

### Form Elements

**Text Inputs**
- Height: h-12 (48px) for single-line
- Padding: px-4 py-3
- Border: rounded-md, border width 1px
- Focus state: ring-2, ring-offset-2
- Label: Body Small, mb-2, font-weight 500
- Helper text: Caption, mt-1

**Textareas**
- Min height: min-h-32 (128px)
- Same padding and border as inputs
- Auto-resize based on content

**Buttons**
- Primary: h-11 px-6, rounded-md, font-weight 500
- Secondary: Same size, border style
- Icon buttons: w-10 h-10, rounded-full
- Button groups: flex gap-2, flex-wrap
- Loading state: spinner icon + disabled state

**Select/Dropdown**
- Same height as text inputs (h-12)
- Chevron icon on right: w-5 h-5
- Dropdown menu: rounded-md, shadow-lg, mt-1
- Option items: px-4 py-2, hover background change

### Data Display Components

**Search Bar**
- Prominent placement: sticky top-0, z-10
- Full-width with max-w-2xl, h-12
- Search icon left, clear icon right (when active)
- Placeholder: "নোট খুঁজুন..." (Search notes in Bangla)

**Filter Chips**
- Pill-shaped: rounded-full, px-4 py-2
- Body Small typography
- Horizontal scroll on mobile: flex gap-2, overflow-x-auto
- Active state: solid fill, inactive: outline only

**Empty States**
- Centered layout: flex flex-col items-center justify-center, min-h-96
- Icon: w-24 h-24, reduced opacity
- Message: H2 typography, mt-6
- Action button: mt-4

**Loading States**
- Skeleton screens: animate-pulse, matching content structure
- Spinner: w-8 h-8, centered
- Progressive loading for lists

### Calendar Components

**Event Cards**
- Compact design: p-3, rounded, border-l-4 (accent border)
- Event title: Body Regular, font-weight 500
- Time display: Body Small, flex gap-2, items-center
- Provider badge: small pill, inline
- Calendar grid cells: aspect-square, p-2

### Settings Components

**Settings Sections**
- Section headers: H2, mb-6, border-b, pb-3
- Setting rows: flex justify-between items-center, py-4, border-b
- Label: Body Regular
- Control: aligned right
- Description text: Caption, mt-1

**API Key Inputs**
- Masked input with reveal toggle (eye icon)
- Monospace font for keys
- Test connection button inline

---

## Interaction Patterns

### Modal/Dialog
- Overlay: backdrop with blur effect
- Dialog: max-w-lg, rounded-lg, p-6
- Header: H2, mb-4
- Actions: flex justify-end gap-3, mt-6

### Toast Notifications
- Fixed position: bottom-4 right-4
- Max-width: max-w-md
- Auto-dismiss after 5 seconds
- Slide-in animation from bottom

### Loading Transitions
- Page transitions: fade-in, 150ms duration
- Content loading: skeleton → content fade
- Button loading: spinner replaces text, button stays same size

---

## Responsive Breakpoints

- Mobile: < 768px (base Tailwind)
- Tablet: 768px - 1024px (md:)
- Desktop: 1024px+ (lg:)
- Wide: 1280px+ (xl:)

### Responsive Adaptations
- Mobile: Single column, bottom navigation consideration, full-width buttons
- Tablet: Two-column layouts begin, side-by-side forms
- Desktop: Three-column grids, fixed sidebar navigation, floating action buttons

---

## Accessibility Implementation

- Minimum touch target: 44px × 44px (Bangla text needs larger targets)
- Focus indicators: visible ring on all interactive elements
- ARIA labels in both Bangla and English
- Keyboard navigation: Tab order, Enter/Space for actions
- Screen reader: Semantic HTML, proper heading hierarchy
- High contrast: Ensure 4.5:1 ratio minimum for text

---

## Images

**No hero images required** - this is a productivity application focused on functionality. Use icons from Heroicons throughout for clarity and consistency.