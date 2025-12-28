# Planning Guide

A unified dashboard that displays real-time weather data from two internal weather stations (EOA and WOA) side-by-side, eliminating the need to navigate between multiple websites.

**Experience Qualities**:
1. **Efficient** - Instant access to both weather stations simultaneously without tab switching or navigation
2. **Clear** - Clean, organized layout that distinctly separates the two weather station displays
3. **Functional** - No-frills interface focused purely on displaying the weather data with minimal chrome

**Complexity Level**: Micro Tool (single-purpose application)
This is a simple view aggregator that embeds two existing weather station interfaces in a single page. The sole purpose is to display both weather readouts simultaneously.

## Essential Features

### Dual Weather Station Display
- **Functionality**: Display both EOA and WOA weather station interfaces side-by-side
- **Purpose**: Eliminate the need to switch between two separate websites to view weather data
- **Trigger**: Automatically loads on page load
- **Progression**: Page loads → Both iframes render → User can interact with either weather station independently
- **Success criteria**: Both weather stations visible simultaneously, iframes load correctly, user can authenticate if needed

### Station Labels
- **Functionality**: Clear headers identifying which weather station is which (EOA vs WOA)
- **Purpose**: Prevent confusion when viewing multiple similar interfaces
- **Trigger**: Displays immediately on load
- **Progression**: Labels are static and always visible above each weather display
- **Success criteria**: Users can immediately identify which station they're looking at

### Responsive Layout
- **Functionality**: Adapts layout based on screen size (side-by-side on desktop, stacked on mobile)
- **Purpose**: Ensure usability across different device sizes
- **Trigger**: Responds to viewport size changes
- **Progression**: Desktop view shows side-by-side → Mobile view stacks vertically
- **Success criteria**: Both stations remain fully visible and usable on all screen sizes

## Edge Case Handling

- **Authentication Required**: Each iframe will prompt for credentials (admin/admin) independently - users authenticate directly within the iframe
- **Loading Failures**: If one or both stations fail to load, the layout remains stable and the working station is still visible
- **CORS/Security Restrictions**: Modern browsers may block iframe embedding - provide fallback links to open stations in new tabs
- **Network Timeout**: If internal network is unavailable, display appropriate error state
- **Slow Loading**: Show loading indicators while iframes are initializing

## Design Direction

The design should feel utilitarian and professional - like a control room monitor or operations dashboard. It should emphasize clarity and information density over aesthetic flourishes, with a technical, system-monitoring aesthetic.

## Color Selection

Industrial monitoring aesthetic with high-contrast elements for excellent readability.

- **Primary Color**: Deep Blue-Gray (`oklch(0.25 0.02 240)`) - Conveys technical professionalism and stability, used for headers and primary UI elements
- **Secondary Colors**: 
  - Slate Gray (`oklch(0.35 0.01 240)`) for secondary elements and dividers
  - Light Gray (`oklch(0.95 0.005 240)`) for backgrounds
- **Accent Color**: Bright Cyan (`oklch(0.70 0.15 195)`) - Technical highlight color for station labels and interactive elements, evokes radar/monitoring displays
- **Foreground/Background Pairings**:
  - Primary (Deep Blue-Gray #353D4C): White text (#FAFAFA) - Ratio 10.5:1 ✓
  - Accent (Bright Cyan #2DD4E5): Deep Blue-Gray (#353D4C) - Ratio 4.8:1 ✓
  - Background (Light Gray #F5F5F7): Dark Gray text (#2A2A2E) - Ratio 14.2:1 ✓

## Font Selection

Monospace and system fonts to reinforce the technical, operations-focused purpose of the dashboard.

- **Typographic Hierarchy**:
  - H1 (Station Labels): Space Mono Bold/24px/tight letter spacing - Technical, fixed-width aesthetic
  - Body Text (Headers): Inter Medium/16px/normal - Clean, readable system font
  - System Labels: Space Mono Regular/14px/wide letter spacing - For status indicators if needed

## Animations

Minimal animations to maintain focus on the weather data itself. Brief fade-in on load (200ms) for polish. Smooth transitions when resizing or switching between responsive layouts (300ms). No unnecessary motion that could distract from monitoring the weather stations.

## Component Selection

- **Components**:
  - Card components for framing each weather station iframe
  - Simple headers with station identification
  - Separator component between stations (desktop view)
  - No complex shadcn components needed - this is primarily HTML/CSS layout
  
- **Customizations**:
  - Full-height iframe containers that maximize visible weather data
  - Custom grid layout that adapts from 2-column to 1-column responsive
  
- **States**:
  - Loading state: Simple skeleton or spinner while iframes initialize
  - Error state: Clear messaging if iframe fails to load with "Open in New Tab" fallback
  
- **Icon Selection**:
  - MapPin (for location/station identification)
  - Cloud (weather theme)
  - ArrowsOut (for fullscreen/expand functionality if added)
  
- **Spacing**:
  - Generous gap-6 between station panels on desktop
  - Minimal padding around iframes to maximize visible content (p-4 on cards)
  - Consistent spacing scale: gap-3 for small, gap-6 for large
  
- **Mobile**:
  - Desktop: grid grid-cols-2 with side-by-side stations
  - Mobile: grid grid-cols-1 with vertically stacked stations
  - Each iframe maintains aspect ratio and remains fully interactive
  - Header remains sticky on mobile for context while scrolling
