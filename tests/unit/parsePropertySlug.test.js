import { test } from "node:test";
import assert from "node:assert/strict";
import { parsePropertiesRouteParams } from "../../src/lib/parsePropertySlug.js";

test("defaults to Nagpur / properties with no params", () => {
  assert.deepEqual(parsePropertiesRouteParams(), {
    city: "Nagpur",
    propertyCategory: "properties",
    propertyType: "",
  });
});

test("parses combined slug '2-BHK-NewFlat-in-Nagpur'", () => {
  assert.deepEqual(parsePropertiesRouteParams({ slug: "2-BHK-NewFlat-in-Nagpur" }), {
    city: "Nagpur",
    propertyCategory: "NewFlat",
    propertyType: "2 BHK",
  });
});

test("parses multi-word city in combined slug", () => {
  const r = parsePropertiesRouteParams({ slug: "3BHK-ResaleFlat-in-Navi-Mumbai" });
  assert.equal(r.city, "Navi Mumbai");
  assert.equal(r.propertyCategory, "ResaleFlat");
  assert.equal(r.propertyType, "3BHK");
});

test("plain slug is treated as a city", () => {
  assert.equal(parsePropertiesRouteParams({ slug: "Navi-Mumbai" }).city, "Navi Mumbai");
});

test("nested route [slug]/[propertyCategory]/in/[city] wins and is URL-decoded", () => {
  assert.deepEqual(
    parsePropertiesRouteParams({ slug: "2-BHK", propertyCategory: "New%20Flat", city: "Navi-Mumbai" }),
    { city: "Navi Mumbai", propertyCategory: "New Flat", propertyType: "2 BHK" },
  );
});
