# Muhammed Sadiq T — Portfolio

Personal developer portfolio built with modern vanilla HTML5, CSS3, and JavaScript. Designed with clean design systems, rich aesthetics, dark/light theme switching, and zero external runtime dependencies.

**Live Site:** [sadiqt.com](https://sadiqt.com)

---

## Overview

A high-performance single-page portfolio showcasing my work as a Full Stack Engineer (React, Next.js, TypeScript, Node.js), featuring production projects, engineering experience, skills, and direct contact channels.

### Sections

- **Hero** — Value proposition, social links, resume quick-download, and profile visual
- **About** — Background, metrics & achievements, and engineering philosophy
- **Experience** — Timeline highlighting key roles (Nexbex, Mapview, Pluuto) with company logos and outcomes
- **Skills** — Categorized technical proficiencies (Languages, Frontend, Backend, Tools & DevOps)
- **Projects** — Featured flagship project (Pluuto) and 2x2 grid of shipped client/product apps with live preview screenshots
- **Education & Certifications** — Formal degree & industry certifications
- **Contact** — Intent-based direct action links (For teams, For clients, Call requests) and social profiles

---

## Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Structure** | HTML5 | Semantic elements, accessible landmarks, SEO metadata |
| **Styling** | Vanilla CSS3 | Custom properties (design tokens), dark & light mode palettes, responsive grid/flexbox |
| **Logic** | Vanilla ES6+ JavaScript | Theme state management, scroll-reveal observer, active link tracking, interactive mouse glow |
| **Fonts & Icons** | Inter, JetBrains Mono, Inline SVGs | Clean typography and zero external icon library overhead |

---

## Project Structure

```
portfolio-sadiq/
├── index.html              # Main HTML — all semantic sections and SEO tags
├── index.css               # Design system tokens, themes (dark/light), animations, responsive rules
├── script.js               # Theme toggling, scroll reveals, active nav, mobile drawer, cursor glow
├── profile.png             # Hero profile image
├── cv.pdf                  # Downloadable curriculum vitae / resume
├── favicon.svg             # Custom SVG favicon
├── nexbex.webp             # Experience logo: Nexbex Solutions
├── mapview.webp            # Experience logo: Mapview Geographical Solutions
├── pluuto.png              # Experience logo: Pluuto
├── pluuto_site.png         # Project preview: Pluuto (Featured)
├── wheelzcart_site.png     # Project preview: WheelzCart
├── cashbook_site.png       # Project preview: CashBook
├── kaligraph_site.png      # Project preview: KaligraphInfoSystems
└── aigaming_site.png       # Project preview: AIGaming
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

## Key Features

- **Dark & Light Modes**: Seamless theme switching with localStorage persistence, smooth transitions, and system `prefers-color-scheme` support.
- **Project Showcase**: Live website screenshots with hover zoom animations, tech tags, and direct Live / GitHub links.
- **Fluid & Responsive Layout**: Tailored responsive layouts for desktop, tablet, and mobile with an animated mobile drawer.
- **Micro-Animations & Interaction**: IntersectionObserver scroll-reveal animations and an ambient cursor follower glow.
- **Zero Build Tooling**: Runs instantly without node build steps, bundlers, or compilation.

---

## Running Locally

Simply open the file directly in any modern browser:

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
