import { test } from "node:test";
import assert from "node:assert/strict";
import {
  categoryGroup,
  kindOfCategory,
  categoriesFor,
  classificationFromProperty,
  propertyTabFor,
  categoryLabel,
  areaModeFor,
  basicDetailFieldsFor,
  parseLandArea,
  areaColumnsFor,
  areaDisplayFor,
  listingStatusFor,
  needsConfiguration,
  COMMERCIAL_FURNISHING_OPTIONS,
} from "../../src/utils/propertyListing.js";

test("categoryGroup by prefix", () => {
  assert.equal(categoryGroup("RentalFlat"), "rent");
  assert.equal(categoryGroup("ResaleFlat"), "resale");
  assert.equal(categoryGroup("NewFlat"), "new");
  assert.equal(categoryGroup(undefined), "new");
});

test("kindOfCategory: known, fallback sets, default", () => {
  assert.equal(kindOfCategory("FarmLand"), "Agriculture");
  assert.equal(kindOfCategory("RentalShop"), "Commercial");
  assert.equal(kindOfCategory("ResaleFarmLand"), "Agriculture");
  assert.equal(kindOfCategory("OfficeSpace"), "Commercial");
  assert.equal(kindOfCategory("SomethingElse"), "Residential");
  assert.equal(kindOfCategory(""), "");
});

test("categoriesFor picks group and filters by kind", () => {
  const rent = categoriesFor({ listingType: "Rent" });
  assert.ok(rent.every((c) => c.value.startsWith("Rental")));

  const resaleCommercial = categoriesFor({ listingType: "Sell", condition: "resale", propertyKind: "Commercial" });
  assert.ok(resaleCommercial.length > 0);
  assert.ok(resaleCommercial.every((c) => c.value.startsWith("Resale") && c.kind === "Commercial"));

  const newAgri = categoriesFor({ listingType: "Sell", condition: "new", propertyKind: "Agriculture" });
  assert.deepEqual(newAgri.map((c) => c.value), ["FarmLand", "FarmHouse"]);
});

test("every offered category value is unique and has an icon", () => {
  const all = [
    ...categoriesFor({ listingType: "Sell", condition: "new" }),
    ...categoriesFor({ listingType: "Sell", condition: "resale" }),
    ...categoriesFor({ listingType: "Rent" }),
  ];
  const values = all.map((c) => c.value);
  assert.equal(new Set(values).size, values.length);
  for (const c of all) assert.ok(c.icon, `${c.value} has no icon`);
});

test("classificationFromProperty for edit mode", () => {
  assert.deepEqual(classificationFromProperty({ propertyCategory: "RentalShop" }), {
    listingType: "Rent",
    condition: "new",
    propertyKind: "Commercial",
  });
  assert.deepEqual(classificationFromProperty({ propertyCategory: "ResaleFlat" }), {
    listingType: "Sell",
    condition: "resale",
    propertyKind: "Residential",
  });
  assert.equal(classificationFromProperty({}).propertyKind, "Residential");
  assert.equal(classificationFromProperty({ listingType: "Rent", propertyKind: "Agriculture" }).listingType, "Rent");
});

test("propertyTabFor mirrors classification", () => {
  assert.equal(propertyTabFor({ listingType: "Rent", condition: "resale" }), "rent");
  assert.equal(propertyTabFor({ listingType: "Sell", condition: "resale" }), "resale");
  assert.equal(propertyTabFor({ listingType: "Sell", condition: "new" }), "new");
});

test("categoryLabel resolves label or echoes unknown value", () => {
  assert.equal(categoryLabel("ResaleBunglow"), "Resale Bungalow");
  assert.equal(categoryLabel("Unknown"), "Unknown");
  assert.equal(categoryLabel(undefined), "");
});

test("areaModeFor: land / plot / built", () => {
  assert.equal(areaModeFor({ propertyCategory: "FarmLand" }), "land");
  assert.equal(areaModeFor({ propertyCategory: "NewPlot" }), "plot");
  assert.equal(areaModeFor({ propertyCategory: "CommercialPlot" }), "plot");
  assert.equal(areaModeFor({ propertyCategory: "NewFlat" }), "built");
});

test("basicDetailFieldsFor returns type-specific fields", () => {
  const keys = (args) => basicDetailFieldsFor(args).map((f) => f.key);
  assert.deepEqual(keys({ propertyCategory: "FarmLand" }), ["waterSupply", "ownershipType", "propertyFacing"]);
  assert.deepEqual(keys({ propertyCategory: "NewPlot" }), ["propertyFacing", "ownershipType"]);
  assert.deepEqual(keys({ propertyCategory: "NewFlat" }), ["furnishing", "floorNo", "totalFloors", "propertyFacing"]);

  const shop = basicDetailFieldsFor({ propertyCategory: "NewShop" });
  assert.deepEqual(shop.map((f) => f.key), ["furnishing", "floorNo", "totalFloors", "parkingAvailability", "powerBackup"]);
  assert.deepEqual(shop[0].options, COMMERCIAL_FURNISHING_OPTIONS);
});

test("parseLandArea splits value and unit (case-insensitive)", () => {
  assert.deepEqual(parseLandArea("2.5 Acre"), { value: "2.5", unit: "Acre" });
  assert.deepEqual(parseLandArea("10 guntha"), { value: "10", unit: "Guntha" });
  assert.deepEqual(parseLandArea("1200 Sq.ft"), { value: "1200", unit: "Sq.ft" });
  assert.deepEqual(parseLandArea("3"), { value: "3", unit: "Acre" });
  assert.deepEqual(parseLandArea(null), { value: "", unit: "Acre" });
});

test("areaColumnsFor ↔ areaDisplayFor round trip", () => {
  const land = areaColumnsFor("land", { landArea: "2.5", landUnit: "Hectare" });
  assert.deepEqual(land, { builtUpArea: "2.5 Hectare", carpetArea: "" });
  assert.deepEqual(parseLandArea(land.builtUpArea), { value: "2.5", unit: "Hectare" });
  assert.deepEqual(areaDisplayFor({ propertyCategory: "FarmLand", ...land }), { label: "Land Area", value: "2.5 Hectare" });

  const plot = areaColumnsFor("plot", { plotArea: "1500" });
  assert.deepEqual(plot, { builtUpArea: "1500", carpetArea: "1500" });
  assert.deepEqual(areaDisplayFor({ propertyCategory: "NewPlot", ...plot }), { label: "Plot Area", value: "1500 sq.ft" });

  const built = areaColumnsFor("built", { builtUpArea: "1100", carpetArea: "900" });
  assert.deepEqual(areaDisplayFor({ propertyCategory: "NewFlat", ...built }), { label: "Carpet Area", value: "900 sq.ft" });

  assert.deepEqual(areaColumnsFor("land", {}), { builtUpArea: "", carpetArea: "" });
});

test("listingStatusFor", () => {
  assert.equal(listingStatusFor({ status: "Active", approve: "Approved" }), "Live");
  assert.equal(listingStatusFor({ status: "Inactive", approve: "Approved" }), "Inactive");
  assert.equal(listingStatusFor({ approve: "Rejected" }), "Rejected");
  assert.equal(listingStatusFor({ approve: "Not Approved" }), "Under Review");
  assert.equal(listingStatusFor(), "Under Review");
});

test("needsConfiguration only for residential built property", () => {
  assert.equal(needsConfiguration({ propertyCategory: "NewFlat" }), true);
  assert.equal(needsConfiguration({ propertyCategory: "RentalHouse" }), true);
  assert.equal(needsConfiguration({ propertyCategory: "NewPlot" }), false);
  assert.equal(needsConfiguration({ propertyCategory: "NewShop" }), false);
  assert.equal(needsConfiguration({ propertyCategory: "FarmHouse" }), false);
  assert.equal(needsConfiguration({}), false);
});
