# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start Vite dev server with HMR
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

No test runner, linter, or formatter is configured.

## Architecture

This is a single-page React landing page for **Emotional Fitness Lab**, a B2B lead-generation site targeting venue operators and corporate wellness buyers. Built with Vite 6 + React 18, plain JavaScript (no TypeScript despite types being installed).

### Code Structure

The entire UI lives in `src/App.jsx` (~887 lines) as a single module. It contains:

- **Section components** rendered sequentially: `Nav`, `Hero`, `Problem`, `WhatIs`, `Proof`, `HowItWorks`, `About`, `ContactForm`, `Footer`
- **`useInView` custom hook** — Intersection Observer wrapper for scroll-triggered fade-in animations
- **`FadeIn` component** — reusable animation wrapper using `useInView`
- **`COLORS` and `FONTS` objects** — the design system constants (earthy/muted palette with Cormorant Garamond serif + DM Sans sans-serif)
- **All styles are inline** via the `style` prop — no CSS files, no CSS-in-JS library

`src/main.jsx` is the entry point; it renders `<App />` into `#root`.

### Key Details

- Navigation uses anchor links with smooth scrolling — no router
- The contact form (`ContactForm`) collects name, email, org, role, and type. It currently **logs to console** on submit — needs backend integration (Formspree, Tally, Airtable, etc.)
- Google Fonts are imported via `@import` in a `<style>` tag within the component
- Several content placeholders exist (testimonials, headshot, specific stats) — see `REQUIREMENTS.md` for the full list of open items
- `REQUIREMENTS.md` contains the complete project brief, business context, target audience details, and brand rationale
