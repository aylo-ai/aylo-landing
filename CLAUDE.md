# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build

npm run check:pricing  # diff index.html's schema.org Offers against the live API
```

There is no test suite, linter, or type checker configured. `npm run build` is
the only check CI runs, so a clean build is the bar for "it works". Verify
visual/behavioral changes in a browser. `check:pricing` is a manual guard, not
part of CI — it exits 2 (rather than failing) when the API is unreachable.

## Architecture

A single-page marketing site: React 18 + Vite + Tailwind + framer-motion +
lucide-react. No router and no state library. The only server data on the page
is the pricing section, which fetches its plans from the Aylo API (see
"Content status"); everything else is static copy. `src/main.jsx` mounts
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

## Languages (i18n)

Three languages: **Uzbek (default), Russian, English**. `src/i18n/index.jsx`
holds a small context — no i18n library, because there is no routing, no
pluralisation and no runtime catalogue loading to justify one.

- `src/i18n/locales/{uz,ru,en}.js` are plain objects with identical key shapes.
  `en.js` carries the comment marking it the copy source of truth, but **`uz.js`
  is the default AND the fallback**, so it must always be complete — a key
  missing from `ru`/`en` silently renders Uzbek.
- Components call `useT()` and then `t('section.key')`. `t` returns whatever is
  at the path, so arrays (`t('features.items')`, `t('mockup.cards')`) work the
  same as strings. `t(key, { code })` interpolates `{code}`-style placeholders.
- Icons, gradients and layout flags stay in the components, paired
  **positionally** with the locale arrays: `FEATURE_ICONS[i]` ↔
  `features.items[i]`, `AGENT_CARDS[i]` ↔ `mockup.cards[i]`. Adding an entry
  means adding it to the component array *and* all three locales, in the same
  position. (`Pricing` no longer participates in this: its cards are built from
  the API response, so there is no positional array to keep in step.)
- The choice persists in `localStorage` under `aylo-lang`. The browser language
  is deliberately **not** sniffed — everyone lands on Uzbek unless they have
  chosen otherwise. Add a `navigator.languages` branch to `readStoredLang` to
  change that.
- The provider syncs `<html lang>`, `document.title` and the meta description on
  every switch. It deliberately leaves `og:`/`twitter:` tags alone: crawlers
  read the served HTML and never run the effect, so the static tags in
  `index.html` (English) are what gets shared.
- `LanguageSwitcher` is a three-way segmented control, styled for dark surfaces
  only. It appears in the navbar at `lg:` and inside the mobile menu below that.
- The navbar's desktop row starts at `lg:`, not `md:` — Uzbek and Russian labels
  run longer than English and, with the switcher, no longer fit at 768px.

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

Testimonials and FAQ copy are placeholders taken from the mockups in `design/`.
Treat them as replaceable — `Testimonials.jsx` carries a pre-launch banner
explaining what must be replaced and in which locales.

**Pricing is not content — it is data.** No price, plan name, allowance or
feature bullet lives in this repo. `Pricing.jsx` fetches them at runtime from
`GET {VITE_API_BASE_URL}/api/v1/payment/pricing-packages/` via
`src/lib/pricingApi.js`; the endpoint is public and CORS-allowed for
`https://aylo.uz`. Those are the same `PricingPackage` rows the sign-up flow in
app.aylo.uz offers and Payme bills against, so a number typed here could
disagree with what a customer is actually charged — it already did, when this
page advertised four tiers from 199,000 while the backend held three from
299,000.

What that means when editing:

- The locale `pricing` blocks hold only the copy *around* the numbers (heading,
  `allowance`/`perDays` templates, CTA labels, footnotes, error strings). To
  change a price, a tier, or a feature bullet, change the backend row — or ask
  someone who can — never this repo.
- Tier count, ordering (cheapest first) and which card is featured all come
  from the response (`is_popular`), so `Pricing.jsx` has no `FEATURED_PLAN_INDEX`
  and its grid picks column classes from a lookup table keyed on plan count.
- There is **no annual billing**: every package is `duration_days: 30` and the
  only discount the backend models is `discount_price`, a promo on the monthly
  figure (rendered as a struck-through list price). The monthly/annual switch
  that used to sit here applied a 20% discount invented on the client — a price
  no one could buy. Don't reintroduce it without an annual package to back it.
- A failed fetch renders an error with a retry, never a fallback price. Same
  principle as the contact form's `unconfigured` state: do not "simplify" it
  into showing stale hardcoded tiers.
- Plan names, descriptions and feature names are modeltranslation fields on the
  backend, requested with `Accept-Language`. The rows are currently **Uzbek
  only**, so ru/en visitors see Uzbek plan copy until the backend rows are
  translated. The page needs no change when they are.

The one remaining hand-copy of backend prices is the `application/ld+json`
block in `index.html`, which publishes them as schema.org `Offer`s in UZS.
Crawlers read the served HTML and never run the fetch, so it cannot be merged
into the runtime source. `npm run check:pricing` diffs that block against the
live API and fails if they have drifted — run it after any backend price
change. That block deliberately carries no `aggregateRating` or `review` —
there are no real reviews yet, and inventing them would be feeding fabricated
data to search engines. `public/robots.txt` and `public/sitemap.xml` are static
and copied to the webroot by the build; the sitemap lists the single
`https://aylo.uz/` URL because the language lives in `localStorage`, not in the
URL.

`LogoMarquee` used to show Uzum, Click and PayMe marks under "100+ companies
already using Aylo AI". Those are real Uzbek payment companies and none is a
customer, so the marks were removed — a live page naming real third parties as
customers is a misrepresentation, not a placeholder. The band now lists the
channels the agent works on. Real, permissioned customer logos belong there
when they exist, and only then does the social-proof framing return.

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
