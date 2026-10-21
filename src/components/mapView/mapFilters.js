import { categoryGroup, categoryLabel, kindOfCategory } from "@/utils/propertyListing";

export const idOf = (p) => p?.propertyid ?? p?.seoSlug;

// Some records store longitude offset by 360° (e.g. 439.07 for 79.07), which
// stretches map bounds around the globe. Wrap it back into [-180, 180].
export function normalizeCoords(p) {
  const lat = parseFloat(p?.latitude);
  const lng = parseFloat(p?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90) {
    return { ...p, latitude: null, longitude: null };
  }
  const wrapped = ((((lng + 180) % 360) + 360) % 360) - 180;
  return wrapped === lng ? p : { ...p, longitude: String(wrapped) };
}

export const isRentalProperty = (p) => categoryGroup(p?.propertyCategory?.trim()) === "rent";

// ── Quick type tabs ───────────────────────────────────────────────────────────
const segmentOf = (p) => {
  const c = String(p?.propertyCategory || "").trim();
  if (kindOfCategory(c) === "Commercial") return "commercial";
  if (categoryGroup(c) === "rent") return "rent";
  if (/Plot|Land/i.test(c)) return "plot";
  if (/Flat/i.test(c)) return "flat";
  // Row houses, bungalows, independent/farm houses, and the vague "Resale".
  return "house";
};

export const SEGMENTS = [
  { value: "", label: "All" },
  { value: "flat", label: "Flats" },
  { value: "house", label: "Houses" },
  { value: "plot", label: "Plots" },
  { value: "rent", label: "Rent" },
  { value: "commercial", label: "Commercial" },
];

// ── Category labels ("NewFlat" → "New Flat") ──────────────────────────────────
export const prettyCategory = (c) => {
  const label = categoryLabel(c);
  return label === c ? String(c).replace(/([a-z])([A-Z])/g, "$1 $2") : label;
};

// ── BHK ───────────────────────────────────────────────────────────────────────
export const BHK_OPTIONS = [
  { value: "1RK", label: "1 RK" },
  { value: "1", label: "1 BHK" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
  { value: "4+", label: "4+ BHK" },
];

// propertyType holds free text such as "2 BHK,3 BHK" or a JSON array string.
function bhkValuesOf(p) {
  const raw = String(p?.propertyType || "");
  const out = new Set();
  if (/1\s*RK/i.test(raw)) out.add("1RK");
  for (const m of raw.matchAll(/(\d+(?:\.\d+)?)\s*BHK/gi)) {
    const n = Math.floor(Number(m[1]));
    out.add(n >= 4 ? "4+" : String(n));
  }
  return out;
}

// ── Budget presets ────────────────────────────────────────────────────────────
const L = 1e5;
const CR = 1e7;
const SALE_BUDGETS = [
  { value: "s1", label: "Under ₹25 L", min: 0, max: 25 * L },
  { value: "s2", label: "₹25 L – 50 L", min: 25 * L, max: 50 * L },
  { value: "s3", label: "₹50 L – 1 Cr", min: 50 * L, max: CR },
  { value: "s4", label: "Above ₹1 Cr", min: CR, max: Infinity },
];
const RENT_BUDGETS = [
  { value: "r1", label: "Under ₹10k", min: 0, max: 10000 },
  { value: "r2", label: "₹10k – 25k", min: 10000, max: 25000 },
  { value: "r3", label: "₹25k – 50k", min: 25000, max: 50000 },
  { value: "r4", label: "Above ₹50k", min: 50000, max: Infinity },
];

// Budget only makes sense once rent and sale prices aren't mixed.
export const budgetOptionsFor = (segment) =>
  segment === "rent" ? RENT_BUDGETS : segment ? SALE_BUDGETS : [];

const budgetById = (id) => [...SALE_BUDGETS, ...RENT_BUDGETS].find((b) => b.value === id);

// ── Distance ──────────────────────────────────────────────────────────────────
export const RADIUS_OPTIONS = [
  { value: 0, label: "Any" },
  { value: 5, label: "5 km" },
  { value: 10, label: "10 km" },
  { value: 25, label: "25 km" },
  { value: 50, label: "50 km" },
];

// ── Sorting ───────────────────────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { value: "", label: "Relevance" },
  { value: "latest", label: "Newest" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
];

function sortProperties(list, sortBy) {
  const arr = [...list];
  const price = (p) => Number(p.totalOfferPrice) || 0;
  switch (sortBy) {
    case "latest":
      return arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    case "price_low":
      return arr.sort((a, b) => price(a) - price(b));
    case "price_high":
      return arr.sort((a, b) => price(b) - price(a));
    default:
      return arr;
  }
}

export function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371,
    toR = Math.PI / 180;
  const dLat = (lat2 - lat1) * toR,
    dLng = (lng2 - lng1) * toR;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * toR) * Math.cos(lat2 * toR) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Filter state ──────────────────────────────────────────────────────────────
export const EMPTY_FILTERS = {
  search: "",
  segment: "",
  category: "",
  bhk: "",
  budget: "",
  radius: 0,
  sort: "",
};

/** Filters every field except `skip` — used for option counts. */
function matches(p, f, center, skip) {
  if (skip !== "search" && f.search) {
    const term = f.search.toLowerCase();
    const hit = [p.propertyName, p.city, p.location, p.address, p.propertyCategory].some((v) =>
      String(v || "").toLowerCase().includes(term),
    );
    if (!hit) return false;
  }
  if (skip !== "segment" && f.segment && segmentOf(p) !== f.segment) return false;
  if (skip !== "category" && f.category && String(p.propertyCategory).trim() !== f.category)
    return false;
  if (skip !== "bhk" && f.bhk && !bhkValuesOf(p).has(f.bhk)) return false;
  if (skip !== "budget" && f.budget) {
    const b = budgetById(f.budget);
    const price = Number(p.totalOfferPrice) || 0;
    if (b && !(price >= b.min && price < b.max)) return false;
  }
  if (skip !== "radius" && f.radius && center && p.latitude && p.longitude) {
    const d = haversine(center[0], center[1], parseFloat(p.latitude), parseFloat(p.longitude));
    if (d > f.radius) return false;
  }
  return true;
}

export function applyFilters(properties, f, center) {
  return sortProperties(
    properties.filter((p) => matches(p, { ...f, search: f.search.trim() }, center)),
    f.sort,
  );
}

/** Categories available under the current filters (ignoring category itself). */
export function categoryCounts(properties, f, center) {
  const counts = new Map();
  for (const p of properties) {
    if (!matches(p, { ...f, search: f.search.trim() }, center, "category")) continue;
    const c = String(p.propertyCategory || "").trim();
    if (c) counts.set(c, (counts.get(c) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export function bhkCounts(properties, f, center) {
  const counts = {};
  for (const p of properties) {
    if (!matches(p, { ...f, search: f.search.trim() }, center, "bhk")) continue;
    for (const v of bhkValuesOf(p)) counts[v] = (counts[v] || 0) + 1;
  }
  return counts;
}

/** Removable pills for every active filter. */
export function activeFilterPills(f) {
  const pills = [];
  if (f.category) pills.push({ key: "category", label: prettyCategory(f.category) });
  if (f.bhk) pills.push({ key: "bhk", label: BHK_OPTIONS.find((o) => o.value === f.bhk)?.label });
  if (f.budget) pills.push({ key: "budget", label: budgetById(f.budget)?.label });
  if (f.radius) pills.push({ key: "radius", label: `Within ${f.radius} km` });
  return pills;
}
