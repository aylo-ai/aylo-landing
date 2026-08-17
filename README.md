# Aylo AI — Landing Page

Interactive marketing landing page built from the screenshots in `design/`.

**Stack:** React 18 + Vite + Tailwind CSS + framer-motion + lucide-react

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Sections

Rendered in order from `src/App.jsx`:

| Component | Notes |
|---|---|
| `Navbar` | Fixed; goes translucent + blurred on scroll. Hamburger menu under `md`. |
| `Hero` | Headline, CTAs, and `DashboardMockup`. |
| `DashboardMockup` | Fake product UI with mouse-tracking 3D tilt and floating stat badges. |
| `LogoMarquee` | Infinite horizontal scroll of customer logos. |
| `Features` | Six cards on a red radial-gradient backdrop; hover lift + icon rotate. |
| `HowItWorks` | Three steps joined by a dashed line that draws in on scroll. |
| `Testimonials` | Star-rated review cards. |
| `MetaVerified` | Meta approval banner with twinkling particles. |
| `Integrations` | Instagram / Facebook / Website / Telegram channel icons. |
| `Pricing` | Tiers fetched live from the backend; the tier the API flags `is_popular` is scaled up and highlighted. |
| `FAQ` | Accordion with animated height. |
| `Contact` | Form beside an animated CSS robot mascot (`RobotMascot`). |
| `CTABanner` | Closing dark call-to-action panel. |
| `Footer` | Logo, nav links, copyright. |

## Configuration

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `VITE_CONTACT_ENDPOINT` | POST endpoint receiving contact form submissions as JSON (`{ name, email, message }`). Until set, the form tells visitors delivery isn't configured rather than falsely reporting success. |
| `VITE_API_BASE_URL` | Base URL of the Aylo API, used by the pricing section. Defaults to `https://api.aylo.uz`; set it only to point a local or staging build elsewhere. |

## Deployment

Live at **https://aylo.uz** (and `www.aylo.uz`), served as static files by nginx on
`143.198.112.70`.

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs on the
self-hosted runner **on that same server** — so there is no SSH step. The job
builds inside a `node:20-alpine` container (the host has no node installed) and
rsyncs `dist/` into the webroot.

| Piece | Where |
|---|---|
| nginx vhost | `/etc/nginx/sites-available/aylo.uz` — SPA fallback, immutable caching on `/assets/`, `no-cache` on `index.html` |
| Webroot | `/var/www/aylo-landing` (owned by the runner user, so no sudo in CI) |
| TLS | Let's Encrypt via certbot, covering `aylo.uz` + `www.aylo.uz`; auto-renewed by `certbot.timer`. HTTP 301s to HTTPS. |
| Runner | `actions.runner.aylo-ai-aylo-landing.aylo-landing.service` |

To point the contact form at a real endpoint in production, set the
`VITE_CONTACT_ENDPOINT` repository secret — the workflow passes it into the build.

## Placeholders

These are visual stand-ins, not wired-up functionality:

- **The contact form has no endpoint configured.** `Contact.jsx` is fully wired — it validates and POSTs to `VITE_CONTACT_ENDPOINT` — but until that variable is set the form tells visitors their message was not sent. Set the repo secret to switch it on.
- **Company logos** (uzum, click, PayMe) are lucide icons plus text, not real brand marks.
- **Testimonials and FAQ copy** are from the design mockups — replace with real content. (Pricing is no longer among them: plans, prices and feature bullets come from the backend at runtime.)
- All CTA links are in-page anchors (`#pricing`, `#contact`) rather than real routes.

## Theming

Brand colors and animation keyframes live in `tailwind.config.js` under `theme.extend`. The accent ramp is `brand-50` → `brand-900`; `ink` and `panel` are the dark surfaces.

## Agents

Reusable subagents live in `.claude/agents/`:

| Agent | Role |
|---|---|
| `landing-page-designer` | Builds and restyles high-impact interactive landing pages. Encodes the animation defaults and the specific layout bugs hit while building this page. |
| `layout-qa` | Verifies layout by measuring the real DOM in a browser — horizontal overflow, full-bleed sections, spacing rhythm, borders/radii, invisible text, and interaction. Ships six copy-pasteable JS probes. |
| `ux-lead` | Reviews the built experience as a UX/UI lead and files each finding via `TaskCreate`, ordered Broken → Missing → Accessibility → Polish. |

## Accessibility

- `App.jsx` wraps the tree in `<MotionConfig reducedMotion="user">`, so every framer-motion animation defers to the OS "reduce motion" setting. Transform animations (marquee, floating badges, cursor agent, 3D tilt, entrance slides) drop out; opacity fades still play so content appears rather than snapping in.
- `index.css` defines a two-tone `:focus-visible` ring that stays visible across both the dark and light sections.
