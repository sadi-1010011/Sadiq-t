# Muhammed Sadiq T — Portfolio

Personal developer portfolio built with modern vanilla HTML5, CSS3, and JavaScript. Engineered with a custom design system, dark/light theme switching, responsive micro-interactions, mobile-first enhancements, and zero external runtime dependencies.

**Live Site:** [sadiqt.com](https://sadiqt.com)

---

## Overview

A high-performance single-page portfolio showcasing my work as a Full Stack Engineer (React, Next.js, TypeScript, Node.js), featuring production projects, engineering experience, skills, and direct contact channels.

### Sections

- **Hero** — Value proposition, social links, resume quick-download, desktop profile visual, and mobile glow avatar
- **About** — Background, animated metrics & achievements, and engineering philosophy
- **Experience** — Timeline highlighting key roles (Nexbex, Mapview, Pluuto) with company logos and outcomes
- **Skills** — Categorized technical proficiencies (Languages, Frontend, Backend, Tools & DevOps)
- **Projects** — Featured flagship project (Pluuto) and 2x2 grid of shipped client/product apps with live preview screenshots (mobile swipeable carousel)
- **Education & Certifications** — Formal degree & industry certifications
- **Contact** — Intent-based direct action links (For teams, For clients, Call requests), 1-click email copy, and social profiles

---

## Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Structure** | HTML5 | Semantic elements, accessible landmarks, SEO & OpenGraph meta tags, JSON-LD Schema.org |
| **Styling** | Vanilla CSS3 | Custom properties (design tokens), fluid `clamp()` typography, dark/light themes, glassmorphism |
| **Logic** | Vanilla ES6+ JavaScript | Theme state management, IntersectionObserver reveals, stat counters, 3D tilt, easter eggs |
| **Assets & Media** | WebP, Inline SVGs | Ultra-optimized WebP imagery (96% size reduction), zero runtime icon library overhead |

---

## Project Structure

```
portfolio-sadiq/
├── index.html              # Main HTML — semantic sections, SEO/OG meta, accessibility tags
├── index.css               # Design system tokens, themes, animations, mobile-first responsive rules
├── script.js               # Theme toggling, scroll reveals, stat counters, bottom nav, easter egg
├── cv.pdf                  # Downloadable curriculum vitae / resume
├── favicon.svg             # Custom SVG favicon
├── profile.webp            # Optimized hero image (desktop & mobile avatar)
├── profile.png             # Fallback image for OpenGraph / Twitter crawlers
├── nexbex.webp             # Experience logo: Nexbex Solutions
├── mapview.webp            # Experience logo: Mapview Geographical Solutions
├── pluuto.png              # Experience logo: Pluuto
├── pluuto_site.webp        # Project preview: Pluuto (Featured)
├── wheelzcart_site.webp    # Project preview: WheelzCart
├── cashbook_site.webp      # Project preview: CashBook
├── kaligraph_site.webp     # Project preview: KaligraphInfoSystems
└── aigaming_site.webp      # Project preview: AIGaming
```

---

## Shipped Projects

| Project | Role / Type | Tech Stack | Links |
|---|---|---|---|
| **Pluuto** (Featured) | Event Discovery & Ticketing | Next.js, TypeScript, Node.js, MongoDB, Razorpay | [Live Site](https://pluuto.in/) · [GitHub](https://github.com/sadi-1010011/evento) |
| **WheelzCart** | Automotive Spare Parts E-Commerce | Next.js, Node.js, Supabase | [Live Site](https://wheelzcart.com/) · [GitHub](https://github.com/sadi-1010011/wheels-cart) |
| **CashBook** | 100% Offline Personal Finance PWA | Next.js, Node.js, IndexedDB | [Live Site](https://kaayi2.vercel.app/) · [GitHub](https://github.com/sadi-1010011/Cashbook) |
| **KaligraphInfoSystems** | Commercial Printer Listing Platform | Next.js, Tailwind CSS | [Live Site](https://kaligraphinfosystems.com/) · [GitHub](https://github.com/sadi-1010011/kaligraphinfosystems) |
| **AIGaming** | Client Marketing Website | Webflow, n8n, Custom Code | [Live Site](https://aiminfinitegaming.com/) · [GitHub](https://github.com/sadi-1010011/aim-infinite) |

---

## Key Features & UI/UX Polish

- **Preloader & Smooth Onboarding**: Custom animated brand spinner and seamless fade-out on document load.
- **Reading Scroll Progress**: Real-time gradient progress bar fixed to the top viewport edge.
- **Dark & Light Modes**: Theme switching with `localStorage` persistence, smooth token transitions, and automatic `prefers-color-scheme` adaptation.
- **Fluid Typography**: Dynamic sizing using CSS `clamp()` ensuring proportional text across mobile, tablet, and ultra-wide screens.
- **Mobile-First Experience**:
  - Compact hero avatar with an animated multi-color glowing ring.
  - Floating frosted-glass bottom navigation dock with scroll direction auto-hiding.
  - Horizontal swipe-friendly project card preview carousel with momentum scrolling.
- **Delightful Micro-Interactions**:
  - Animated stat counters with spring-overshoot effect on scroll-reveal.
  - 3D magnetic card spotlight tilt tracking mouse coordinates on desktop.
  - 1-click email copy to clipboard with floating toast notification feedback.
  - Smooth back-to-top floating button with circular indicator.
- **Konami Code Easter Egg**: Press `↑` `↑` `↓` `↓` `←` `→` `←` `→` `B` `A` on desktop for a celebratory confetti rain shower!
- **Performance & Asset Optimization**:
  - Converted image pipeline to WebP reducing total image weight by 96% (~15.5 MB down to ~730 KB).
  - Explicit image width/height dimensions to eliminate Cumulative Layout Shift (CLS).
  - Native `loading="lazy"` and `decoding="async"` on all offscreen images.
- **Accessibility (a11y)**: Semantic landmark structure, accessible ARIA labels, high-visibility `:focus-visible` outlines, and full `prefers-reduced-motion` compliance.
- **Zero Build Tooling**: 100% pure vanilla stack — runs directly in any browser without npm, bundlers, or compilation steps.

---

## Running Locally

Open [`index.html`](file:///Users/sadiq/Hobby/portfolio-sadiq/index.html) directly in any modern browser:

```bash
open index.html
```

Or serve with any static HTTP server:

```bash
# Using Python
python3 -m http.server 3000

# Or using Node
npx serve .
```

---

## Contact & Links

- **Website:** [sadiqt.com](https://sadiqt.com)
- **Email:** [msadiqt.dev@gmail.com](mailto:msadiqt.dev@gmail.com)
- **LinkedIn:** [linkedin.com/in/sadiq-t](https://linkedin.com/in/sadiq-t)
- **GitHub:** [github.com/sadi-1010011](https://github.com/sadi-1010011)
