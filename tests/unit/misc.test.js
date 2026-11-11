import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { aggregateChartData } from "../../src/utils/chart.js";
import * as footer from "../../src/config/footerLinks.js";

/* ── chart aggregation ────────────────────────────────────────────────── */

test("aggregateChartData groups by year and sums views/performance", () => {
  const out = aggregateChartData(
    [
      { created_at: "2025-03-01T10:00:00", views: 2, performance: 1 },
      { created_at: "2025-07-01T10:00:00", views: 3, performance: 4 },
      { created_at: "2026-01-01T10:00:00", views: 5, performance: 0 },
    ],
    "year",
  );
  assert.deepEqual(out, [
    { label: "2025", views: 5, performance: 5 },
    { label: "2026", views: 5, performance: 0 },
  ]);
});

test("aggregateChartData groups by month by default", () => {
  const out = aggregateChartData([
    { created_at: "2026-02-03T10:00:00", views: 1, performance: 1 },
    { created_at: "2026-02-20T10:00:00", views: 1, performance: 1 },
  ]);
  assert.deepEqual(out, [{ label: "Feb", views: 2, performance: 2 }]);
  assert.deepEqual(aggregateChartData(), []);
});

/* ── footer links point at real routes ────────────────────────────────── */

const APP_DIR = fileURLToPath(new URL("../../app", import.meta.url));

function collectRoutes(dir, prefix = "") {
  const routes = new Set();
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      if (/^page\.(jsx?|tsx?)$/.test(entry.name)) routes.add(prefix || "/");
      continue;
    }
    // (group) folders don't add a URL segment
    const seg = /^\(.*\)$/.test(entry.name) ? "" : `/${entry.name}`;
    for (const r of collectRoutes(path.join(dir, entry.name), prefix + seg)) routes.add(r);
  }
  return routes;
}

test("every internal footer link has a page route", () => {
  const routes = collectRoutes(APP_DIR);
  const lists = Object.values(footer).filter(Array.isArray).flat();
  const internal = lists.filter((l) => typeof l?.href === "string" && l.href.startsWith("/") && !l.external);
  assert.ok(internal.length > 20, "expected footer links");
  const missing = internal.map((l) => l.href.split(/[?#]/)[0]).filter((href) => !routes.has(href));
  assert.deepEqual(missing, [], `footer links without a route: ${missing.join(", ")}`);
});

test("static public files referenced by SEO exist", () => {
  const pub = fileURLToPath(new URL("../../public", import.meta.url));
  for (const f of ["og-image.png", "robots.txt", "ads.txt", "llms.txt"]) {
    assert.ok(existsSync(path.join(pub, f)), `public/${f} missing`);
  }
});

/* ── property unlock (localStorage / sessionStorage) ─────────────────── */

function fakeStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
  };
}

const events = [];
beforeEach(() => {
  events.length = 0;
  globalThis.localStorage = fakeStorage();
  globalThis.sessionStorage = fakeStorage();
  globalThis.window = { dispatchEvent: (e) => events.push(e) };
});

test("property unlock flow", async () => {
  const unlock = await import("../../src/utils/propertyUnlock.js");

  assert.equal(unlock.isPropertyUnlocked(42), false);
  unlock.markPropertyUnlocked(42);
  assert.equal(unlock.isPropertyUnlocked(42), true);
  assert.equal(unlock.isPropertyUnlocked("42"), true, "string/number ids are equivalent");
  assert.equal(events.length, 1);
  assert.equal(events[0].type, unlock.PROPERTY_UNLOCKED_EVENT);

  unlock.markPropertyUnlocked(42);
  assert.equal(JSON.parse(localStorage.getItem("reparv_unlocked_properties")).length, 1, "no duplicates");

  assert.equal(unlock.consumeJustUnlocked(42), true);
  assert.equal(unlock.consumeJustUnlocked(42), false, "only once");
});

test("property unlock tolerates corrupt storage", async () => {
  const unlock = await import("../../src/utils/propertyUnlock.js");
  localStorage.setItem("reparv_unlocked_properties", "{not json");
  assert.equal(unlock.isPropertyUnlocked(1), false);
  localStorage.setItem("reparv_unlocked_properties", '{"a":1}');
  assert.equal(unlock.isPropertyUnlocked(1), false);
  assert.equal(unlock.isPropertyUnlocked(null), false);
});
