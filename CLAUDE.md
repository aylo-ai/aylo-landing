# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
```

There is no test suite, linter, or type checker configured. `npm run build` is
the only automated check — it is what CI runs, so a clean build is the bar for
"it works". Verify visual/behavioral changes in a browser.

## Architecture

A single-page marketing site: React 18 + Vite + Tailwind + framer-motion +
lucide-react. No router, no data layer, no backend. `src/main.jsx` mounts
`App.jsx`, which renders every section in a fixed vertical order — that JSX
list *is* the page order, so reordering sections means reordering it.

Each section is one self-contained component in `src/components/`, owning its
own markup, animation, and copy. There is no shared layout or props-drilling
between sections; they communicate only through in-page anchors. Nav and CTA
links target `#features`, `#how-it-works`, `#testimonials`, `#meta-verified`,
`#pricing`, and `#contact` — if you rename a section `id`, grep for the anchor.

`RobotMascot` and `DashboardMockup` are the exception to "one component per
section": they are visual sub-widgets rendered by `Contact` and `Hero`.

### Styling

- Theme lives in `tailwind.config.js` under `theme.extend`: the `brand-50`→`brand-900`
  orange ramp, the `ink`/`panel` dark surfaces, and the shared keyframes
  (`float`, `glow`, `marquee`, `gradient-x`). Prefer these over ad-hoc values.
- `src/index.css` holds the only global CSS: the `.section-container` width
  wrapper (used by ~10 sections), the `.text-gradient` helper, and a two-tone
  `:focus-visible` ring. The ring is deliberately two-tone — the page alternates
  dark and white sections, so it needs an orange outline *plus* a dark halo to
  stay visible on both. Don't collapse it to a single color.
- The page alternates dark (`bg-ink`) and light sections. When adding one, check
  that text, borders, and focus rings work against its background.

### Motion

`App.jsx` wraps everything in `<MotionConfig reducedMotion="user">`, so all
framer-motion animation defers to the OS "reduce motion" setting globally.
Transform animations drop out while opacity fades still play — meaning **no
content may depend on a transform animation to become visible or reachable**.
Scroll entrances use `whileInView` with `viewport={{ once: true }}`; match that
so sections don't re-animate on scroll-back.

## Contact form

`Contact.jsx` reads `VITE_CONTACT_ENDPOINT` (Vite only exposes `VITE_`-prefixed
vars) and POSTs `{ name, email, message }` as JSON, with client-side validation,
a 15s `AbortController` timeout, and error/success states.

When the variable is unset it enters an `unconfigured` state that tells the
visitor the message was **not** sent. This is intentional — never "simplify"
this into an optimistic success message. Locally, copy `.env.example` to
`.env.local`; in production it comes from the `VITE_CONTACT_ENDPOINT` repo secret.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` → live at https://aylo.uz.

The self-hosted runner sits on the *same server* as nginx (`143.198.112.70`),
so the job has no SSH step: it builds and writes the webroot directly. The host
has no node installed, so the build runs inside a `node:20-alpine` container as
the runner user; `/var/www/aylo-landing` is owned by that user, so no sudo either.

That box also hosts `api.aylo.uz` and `app.aylo.uz` and their containers — be
careful with any server-wide change (nginx reloads, package installs, certbot).
nginx serves `/assets/` (content-hashed) as immutable and `index.html` as
`no-cache`, with an SPA fallback; TLS is Let's Encrypt, auto-renewed.

## Content status

Testimonials, FAQ copy, pricing tiers, and the company logos in `LogoMarquee`
are placeholders taken from the mockups in `design/`, not real content or real
brand marks. Treat them as replaceable.

## Agents

`.claude/agents/` holds three subagents used to build and check this page:
`landing-page-designer` (builds/restyles sections, encodes the animation
defaults and layout bugs already hit here), `layout-qa` (measures the real DOM
in a browser for overflow, spacing, and borders), and `ux-lead` (reviews the
experience and files findings as tasks).

## Skills

`.claude/skills/` holds Figma's official designer skills (from the `figma`
plugin, v2.2.91), copied in from `../mcp-server-guide/skills/`. The ones that
apply to this project: `figma-design-to-code` and `figma-generate-design`
(design ↔ code), `figma-implement-motion` and `figma-use-motion` (motion specs),
`figma-code-connect` (maps published Figma components to code), and `figma-use`
(the Plugin API). `figma-swiftui`, `figma-use-slides`, `figma-use-figjam`, and
`figma-generate-diagram` are for other surfaces and won't fire here.

**All of them require the Figma MCP server to be authenticated** — run `/mcp`
and pick "claude.ai Figma". Until then the skills load but their tools
(`get_design_context`, `get_code_connect_suggestions`, …) do not exist.

`figma.config.json` configures Code Connect (React parser, templates expected
at `src/figma/**/*.figma.ts`). Note that Code Connect maps Figma component
*properties* onto code *props*, and every section component here takes zero
props — so there is nothing meaningful to map until shared primitives (button,
feature card, pricing card) are extracted out of the sections.
