# Reparv Website

The public website for **[reparv.in](https://www.reparv.in)** — verified property listings, site-visit booking, home-loan tools, partner sign-up and the Reparv AI Advisor.

Built with **Next.js 14 (App Router)**, React 18 and Tailwind CSS. All data comes from the Reparv API (`reparv-server`).

---

## Contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Running with Docker](#running-with-docker)
- [Project structure](#project-structure)
- [Key pages](#key-pages)
- [Key features](#key-features)
- [Conventions](#conventions)
- [Troubleshooting](#troubleshooting)

---

## Tech stack

| Area | Library |
| --- | --- |
| Framework | Next.js 14 (App Router, `output: "standalone"`) |
| UI | React 18, Tailwind CSS, Framer Motion, Swiper, React Icons |
| Maps | Leaflet |
| Payments | Razorpay Checkout |
| Auth | Cookie session from `reparv-server`, Google sign-in |
| AI chat | Reparv AI Advisor (`/api/ai/chat/stream`, Server-Sent Events) |

---

## Getting started

**Prerequisites:** Node.js 20+ and a running `reparv-server` (the API).

```bash
npm install
# create .env with the variables listed below
npm run dev            # http://localhost:3000
```

The site calls the API at `NEXT_PUBLIC_BACKEND_URL`. When `reparv-server` runs in Docker on port **4000**, set:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

> Port 3000 is the website itself — don't point the API URL at it.

---

## Environment variables

`NEXT_PUBLIC_*` values are inlined into the browser bundle **at build time**, so rebuild after changing them.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_BACKEND_URL` | Yes | Reparv API base URL used by the browser, e.g. `https://aws-api.reparv.in` or `http://localhost:4000` |
| `NEXT_PUBLIC_S3_IMAGE_URL` | Yes | Base URL for images stored in S3, e.g. `https://reparv-assets.s3.ap-south-1.amazonaws.com` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | For Google sign-in | Google OAuth client ID |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | For payments | Razorpay public key (`rzp_test_…` / `rzp_live_…`) |
| `NEXT_PUBLIC_AI_AGENT_PUBLIC_KEY` | If the API requires it | Must match `AI_AGENT_PUBLIC_KEY` on the server |
| `BACKEND_INTERNAL_URL` | Docker only | API URL used **server-side** (page rendering). In Docker, `localhost` is the website container, so use e.g. `http://host.docker.internal:4000`. Read at runtime, not build time. |

Never commit `.env` — it is gitignored.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload on port 3000 |
| `npm run build` | Production build (standalone output in `.next/standalone`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Running with Docker

The `Dockerfile` builds a standalone Next.js image. Pass the public variables as **build args** (`.env` is excluded by `.dockerignore`):

```bash
docker build -t reparv-website \
  --build-arg NEXT_PUBLIC_BACKEND_URL=http://localhost:4000 \
  --build-arg NEXT_PUBLIC_S3_IMAGE_URL=https://reparv-assets.s3.ap-south-1.amazonaws.com \
  --build-arg NEXT_PUBLIC_GOOGLE_CLIENT_ID=<google-client-id> \
  --build-arg NEXT_PUBLIC_RAZORPAY_KEY_ID=<razorpay-key-id> \
  .

docker run -d --name reparv-website-container --restart unless-stopped \
  -e BACKEND_INTERNAL_URL=http://host.docker.internal:4000 \
  -p 3000:3000 reparv-website
```

Without `BACKEND_INTERNAL_URL`, server-rendered pages (property details, listings) can't reach the API from inside the container and show **404**.

Local ports used by the Reparv stack:

| Service | Port |
| --- | --- |
| Website (this repo) | 3000 |
| API (`reparv-server`) | 4000 |
| Admin panel | 5174 |
| Partner panel | 5175 (Docker) / 5173 (dev) |

---

## Project structure

```
app/
  layout.jsx              Root layout, metadata
  sitemap.js              Generated sitemap
  (site)/                 All public pages (one folder per route)
  project-partner/        Public project-partner profile pages
src/
  views/                  Page-level components used by app/ routes
  components/             Shared UI, grouped by area
    home/                 Home page sections (incl. ViewAllButton)
    property/             Property cards, details, booking/enquiry popups
    agent/                AI Advisor chat widget
    projectPartner/       Project-partner landing components
    seo/, seoPages/, seocomponents/   SEO landing pages and calculators
  hooks/                  e.g. useAgentChat (streaming AI chat)
  lib/                    env.js (backend URL, keys), serverApi.js, seo helpers
  store/                  Auth/app context (city, popups, user)
  utils/                  emi.js, propertyUnlock.js, analytics, helpers
public/assets/            Static images and icons
```

---

## Key pages

| Route | Page |
| --- | --- |
| `/` | Home — trending, rental, new-launch and article sections |
| `/properties` | All verified properties for the selected city |
| `/properties/type/new` · `/rental` · `/resale` | Listings filtered by New / Rent / Resale |
| `/property-info/[slug]` | Property details, pricing, booking |
| `/sell-properties` | List a property (logged-in users) |
| `/emi-calculator`, `/cost-calculator`, `/home-loan-prepayment-calculator` | Finance tools |
| `/home-loan`, `/home-loan-application`, `/check-eligibility` | Home loans |
| `/blogs`, `/blog/[slug]`, `/news` | Articles and news |
| `/join-our-team`, `/sales-partner`, `/territory-partner` | Partner programmes |
| `/about-us`, `/contact-us`, `/support` | Company pages |

SEO landing pages (e.g. `/flats-for-sale-in-nagpur`, `/plots-for-sale-in-nagpur`, `/find-verified-properties-in-nagpur`) live alongside these in `app/(site)/`.

---

## Key features

- **Property details lock** — on `/property-info/[slug]`, detailed pricing, units, brochure, amenities and location are blurred until the visitor books a site visit for that property. Unlocks are remembered per browser (`utils/propertyUnlock.js`).
- **OTP-verified site visits** — the booking form always verifies the phone by OTP; the API only accepts bookings carrying the verification token.
- **View All buttons** — every property/article section links to its full list (`components/home/ViewAllButton.jsx`).
- **New / Rent / Resale tabs** — listings are filtered by property category.
- **EMI** — shown from the stored value or estimated (9% p.a., 20 years) via `utils/emi.js`.
- **Reparv AI Advisor** — chat widget that streams replies, shows property cards, answers FAQs and calculates EMI (`components/agent/AgentWidget.jsx`, `hooks/useAgentChat.js`). Falls back to the non-streaming endpoint if streaming is unavailable.

---

## Conventions

- **Backend URL:** always use `getBackendUrl()` from `src/lib/env.js` — never hard-code API hosts. It returns `BACKEND_INTERNAL_URL` during server rendering and `NEXT_PUBLIC_BACKEND_URL` in the browser.
- **Env access:** this is Next.js — use `process.env.NEXT_PUBLIC_*` (via `lib/env.js`), not `import.meta.env`.
- **Static assets:** reference files under `public/`, e.g. `/assets/reparvLogo.svg`; check the file exists.
- **Sections:** new list sections should end with `<ViewAllButton href=… label=… />`.

---

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| "Failed to fetch" in forms or chat | The API isn't reachable — check `reparv-server` is running (Docker Desktop started) and `NEXT_PUBLIC_BACKEND_URL` points at it. |
| Property detail pages show 404 in Docker | Set `BACKEND_INTERNAL_URL=http://host.docker.internal:4000` on the website container. |
| A changed `NEXT_PUBLIC_*` value has no effect | It's baked in at build time — rebuild (`npm run build` or `docker build`). |
| Broken image icons | The path doesn't exist under `public/` — fix the path. |
| Site visit booking returns "verify your phone number with OTP" | The OTP step was skipped or the 30-minute verification expired — verify again. |
