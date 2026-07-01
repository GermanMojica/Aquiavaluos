# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server with Turbopack (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint with Next.js core-web-vitals + TypeScript rules
```

No test suite is configured.

## Stack

- **Next.js 16** with App Router — check `node_modules/next/dist/docs/` for version-specific APIs before writing code
- **React 19** — uses new concurrent features; avoid legacy patterns
- **Tailwind CSS v4** — configured via `@theme` in `globals.css`, NOT via `tailwind.config.*`
- **GSAP 3 + @gsap/react** for all animations (use `useGSAP` hook, not raw `useEffect`)
- **Lenis** for smooth scroll, synchronized with GSAP's ScrollTrigger ticker in `SmoothScroll.tsx`
- **Framer Motion** also available but GSAP is the primary animation system

## Architecture

This is a single-page marketing site for Arquiavaluos (Colombian real estate appraisal firm). All content lives in `src/app/page.tsx`, which composes sections in order:

```
layout.tsx        — global fonts, Preloader, FloatingActions, SmoothScroll wrapper
page.tsx          — orchestrates all sections; owns `drawerOpen` state, passes `onOpenDrawer` down
  Navbar
  Hero
  StorytellingSection
  BlueprintTransition
  Sectors
  Partners
  CTA
  Footer
  RequestValuationDrawer   — slide-over form, controlled by page-level state
```

**Component conventions:**
- `src/components/sections/` — full-width page sections, each self-contained
- `src/components/layout/` — Navbar, Footer
- `src/components/ui/` — global UI primitives (Preloader, SmoothScroll, CustomCursor, FloatingActions)
- `src/components/features/` — interactive features (RequestValuationDrawer)

## Design System

Colors are defined as CSS custom properties in `globals.css` under `@theme` and used as Tailwind utilities:

| Token | Value | Usage |
|---|---|---|
| `brand-primary` | `#1A3E70` | Main navy blue |
| `brand-secondary` | `#0094CE` | Accent cyan/blue |
| `brand-dark` | `#0B132B` | Deep dark backgrounds |

Fonts: `--font-plus-jakarta` (body, mapped to `font-sans`) and `--font-space-grotesk` (mono/display, mapped to `font-mono`).

## Animation Patterns

GSAP `ScrollTrigger` is used extensively. Always import GSAP dynamically (pattern already established in the codebase):

```ts
const gsapModule = await import('gsap')
const gsap = gsapModule.gsap || gsapModule.default || gsapModule
const { ScrollTrigger } = await import('gsap/ScrollTrigger')
gsap.registerPlugin(ScrollTrigger)
```

Lenis + GSAP ticker sync lives in `SmoothScroll.tsx` — do not add a second Lenis instance. CSS classes `bg-cad-grid`, `bg-blueprint-grid`, `bg-dot-grid` provide the technical grid backgrounds used throughout sections.

## Performance Notes

- Images use AVIF/WebP via `next/image` (configured in `next.config.ts`)
- CSS optimization enabled (`optimizeCss: true`)
- GPU-composited animations use `will-change: transform` and `translateZ(0)` — follow existing patterns in `globals.css` rather than adding new ones ad-hoc
- `scroll-behavior: auto` is forced in CSS; Lenis exclusively controls smooth scrolling
