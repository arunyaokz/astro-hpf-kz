# Design Refactor Context

This document captures the goals and guidelines for the ongoing visual and interaction overhaul of the site. It is based on the initial audit of the existing implementation.

## 1. Establish unified design tokens
- Introduce a dedicated `tokens.css` for colors, typography scale, spacing, radii, shadows, animation curves, and breakpoints.
- Replace hard‑coded values across components with token variables for consistency and maintainability.

## 2. Clarify typography and spacing hierarchy
- Apply a coherent type scale and consistent spacing rhythm to all sections.
- Adopt a shared container width and grid system to reinforce visual structure.

## 3. Centralize interaction logic
- Refactor the header and other interactive components for proper ARIA attributes and keyboard support.
- Move scattered scripts into reusable modules (e.g., `scripts/main.ts`).

## 4. Standardize motion and animation
- Define easing curves and durations in tokens and reuse them across components.
- Trigger animations via `IntersectionObserver` and honor `prefers-reduced-motion`.

## 5. Unify responsive breakpoints
- Declare standard breakpoints in `tokens.css` and reference them throughout stylesheets.
- Ensure layouts remain legible on narrow screens with flex/grid adjustments.

## 6. Improve accessibility
- Provide descriptive `alt` text and ARIA labels.
- Verify color contrast with automated tools and document accessibility guidelines.

## 7. Optimize performance
- Self-host fonts and enable `font-display: swap`.
- Lazy‑load large images and adopt Astro's island architecture for heavy scripts.

These principles serve as the reference for subsequent code refactors and component updates.
