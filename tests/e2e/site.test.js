// End-to-end checks against a running website + API.
//   BASE_URL (default http://localhost:3001)  – the Next.js site
//   API_URL  (default http://localhost:3000)  – reparv-server
// Start both first (`npm run dev` in each), then: npm run test:e2e
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const BASE_URL = (process.env.BASE_URL || "http://localhost:3001").replace(/\/$/, "");
const API_URL = (process.env.API_URL || "http://localhost:3000").replace(/\/$/, "");
const TIMEOUT = Number(process.env.E2E_TIMEOUT_MS || 180_000); // first dev compile is slow
const SITE_URL = "https://www.reparv.in";

// `next dev` restarts itself when it nears its memory threshold; retry
// connection-refused for a while instead of failing the whole run.
async function get(url, init = {}, attempts = 20) {
  for (let i = 1; ; i++) {
    try {
      return await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(TIMEOUT), ...init });
    } catch (err) {
      const codes = [err?.cause?.code, ...(err?.cause?.errors || []).map((e) => e.code)];
      const transient = codes.some((c) => ["ECONNREFUSED", "ECONNRESET", "UND_ERR_SOCKET"].includes(c));
      if (!transient || i >= attempts) throw err;
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

async function getJson(url) {
  const res = await get(url);
  assert.equal(res.status, 200, `${url} → ${res.status}`);
  return res.json();
}

/** Fails on HTTP errors and on pages that rendered Next's error shell. */
async function expectPage(pathname, { status = 200, location } = {}) {
  const res = await get(BASE_URL + pathname);
  const html = await res.text();
  assert.equal(res.status, status, `${pathname} → HTTP ${res.status}`);
  if (location) {
    assert.equal(new URL(res.headers.get("location"), BASE_URL).pathname, location, `${pathname} redirects to wrong place`);
    return html;
  }
  assert.ok(!html.includes('id="__next_error__"'), `${pathname} rendered the Next.js error page`);
  assert.ok(!/Application error|Internal Server Error|Unhandled Runtime Error/i.test(html), `${pathname} contains an error message`);
  assert.match(html, /<title>[^<]+<\/title>/, `${pathname} has no <title>`);
  return html;
}

async function inBatches(items, size, fn) {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map(fn));
  }
}

/* ── route discovery ─────────────────────────────────────────────────── */

const APP_DIR = fileURLToPath(new URL("../../app", import.meta.url));

function staticRoutes(dir = APP_DIR, prefix = "") {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      if (/^page\.(jsx?|tsx?)$/.test(entry.name)) out.push(prefix || "/");
      continue;
    }
    if (entry.name.startsWith("[") || entry.name === "api") continue; // dynamic: tested below
    const seg = /^\(.*\)$/.test(entry.name) ? "" : `/${entry.name}`;
    out.push(...staticRoutes(path.join(dir, entry.name), prefix + seg));
  }
  return out;
}

// Pages that are noindex/private and may not set a canonical
const NO_CANONICAL = new Set(["/404", "/dashboard", "/my-listings", "/profile", "/profile-edit", "/thank-you", "/property-details", "/sell-properties"]);

// Pages that intentionally don't answer 200
const EXPECTED_STATUS = {
  "/404": { status: 404 },
  "/home": { status: 307, location: "/" }, // app/(site)/home/page.jsx → redirect("/")
  "/property-details": { status: 307, location: "/properties" },
  "/project-partner": { status: 307, location: "/join-our-team" },
};

/* ── preflight ───────────────────────────────────────────────────────── */

let reachable = true;
before(async () => {
  try {
    await get(BASE_URL + "/robots.txt");
    await get(API_URL + "/frontend/blog");
  } catch {
    reachable = false;
  }
});

const skipIfDown = (t) => {
  if (!reachable) t.skip(`site (${BASE_URL}) or API (${API_URL}) not reachable`);
  return !reachable;
};

/* ── static pages ────────────────────────────────────────────────────── */

test("every static page renders without errors", { timeout: TIMEOUT * 20 }, async (t) => {
  if (skipIfDown(t)) return;
  const routes = staticRoutes();
  assert.ok(routes.length > 40, `found only ${routes.length} routes`);
  const failures = [];
  await inBatches(routes, 2, async (route) => {
    try {
      const html = await expectPage(route, EXPECTED_STATUS[route]);
      if (!NO_CANONICAL.has(route) && !EXPECTED_STATUS[route]) {
        const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
        const expected = route === "/" ? SITE_URL : SITE_URL + route;
        if (canonical && canonical !== expected && route !== "/home") {
          failures.push(`${route}: canonical ${canonical} ≠ ${expected}`);
        }
      }
    } catch (err) {
      failures.push(err.message);
    }
  });
  assert.deepEqual(failures, [], failures.join("\n"));
});

/* ── dynamic pages backed by the API ─────────────────────────────────── */

test("property detail pages render for real API properties", { timeout: TIMEOUT * 5 }, async (t) => {
  if (skipIfDown(t)) return;
  const properties = await getJson(`${API_URL}/frontend/all-properties/Nagpur`);
  assert.ok(Array.isArray(properties) && properties.length > 0, "API returned no Nagpur properties");
  await inBatches(properties.slice(0, 3), 3, async (p) => {
    const html = await expectPage(`/property-info/${p.seoSlug || p.propertyid}`);
    if (p.propertyName) {
      assert.ok(html.toLowerCase().includes(String(p.propertyName).toLowerCase()), `property page missing name "${p.propertyName}"`);
    }
  });
});

test("unknown property returns 404", { timeout: TIMEOUT }, async (t) => {
  if (skipIfDown(t)) return;
  const res = await get(`${BASE_URL}/property-info/this-property-does-not-exist-e2e-0000`);
  assert.equal(res.status, 404);
});

test("blog and news detail pages render", { timeout: TIMEOUT * 5 }, async (t) => {
  if (skipIfDown(t)) return;
  const blogs = await getJson(`${API_URL}/frontend/blog`);
  const news = await getJson(`${API_URL}/frontend/news/`);
  assert.ok(blogs.length > 0 && news.length > 0, "API returned no blogs/news");
  await expectPage(`/blog/${blogs[0].seoSlug || blogs[0].id}`);
  await expectPage(`/news/${news[0].seoSlug || news[0].id}`);
});

test("listing routes render", { timeout: TIMEOUT * 5 }, async (t) => {
  if (skipIfDown(t)) return;
  for (const route of [
    "/properties/type/rent",
    "/2-BHK-NewFlat-in-Nagpur",
    "/2-BHK/NewFlat/in/Nagpur",
  ]) {
    await expectPage(route);
  }
});

test("unknown URL returns 404", { timeout: TIMEOUT }, async (t) => {
  if (skipIfDown(t)) return;
  const res = await get(`${BASE_URL}/no/such/page/e2e`);
  assert.equal(res.status, 404);
});

/* ── redirects, SEO files, API route ─────────────────────────────────── */

test("legacy /property URLs redirect permanently", { timeout: TIMEOUT }, async (t) => {
  if (skipIfDown(t)) return;
  let res = await get(`${BASE_URL}/property`);
  assert.equal(res.status, 308);
  assert.equal(new URL(res.headers.get("location"), BASE_URL).pathname, "/properties");

  res = await get(`${BASE_URL}/property/some-slug`);
  assert.equal(res.status, 308);
  assert.equal(new URL(res.headers.get("location"), BASE_URL).pathname, "/property-info/some-slug");
});

test("sitemap.xml lists static, blog, news and property URLs", { timeout: TIMEOUT }, async (t) => {
  if (skipIfDown(t)) return;
  const res = await get(`${BASE_URL}/sitemap.xml`);
  assert.equal(res.status, 200);
  const xml = await res.text();
  for (const part of ["/property-info/", "/blog/", "/news/", "/emi-calculator"]) {
    assert.ok(xml.includes(`${SITE_URL}${part}`), `sitemap has no ${part} entries`);
  }
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(new Set(locs).size, locs.length, "sitemap contains duplicate URLs");
});

test("robots.txt is served", { timeout: TIMEOUT }, async (t) => {
  if (skipIfDown(t)) return;
  const res = await get(`${BASE_URL}/robots.txt`);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /User-agent/i);
});

test("POST /api/revalidate-property validates the slug", { timeout: TIMEOUT }, async (t) => {
  if (skipIfDown(t)) return;
  let res = await get(`${BASE_URL}/api/revalidate-property`, { method: "POST", body: "../etc/passwd" });
  assert.equal(res.status, 400);
  res = await get(`${BASE_URL}/api/revalidate-property`, { method: "POST", body: "" });
  assert.equal(res.status, 400);
  res = await get(`${BASE_URL}/api/revalidate-property`, { method: "POST", body: "royal-keshava-3bhk-flats-nagpur" });
  assert.equal(res.status, 204);
});
