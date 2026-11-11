import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateEMI, getPropertyEMI } from "../../src/utils/emi.js";

test("calculateEMI uses 9% p.a. over 20 years by default", () => {
  // 50 lakh @ 9% / 20y: standard reducing-balance EMI ≈ 44,986
  assert.equal(calculateEMI(5_000_000), 44986);
});

test("calculateEMI honours custom rate and tenure", () => {
  // 10 lakh @ 12% / 10y ≈ 14,347
  assert.equal(calculateEMI(1_000_000, 12, 10), 14347);
});

test("calculateEMI with 0% interest divides evenly", () => {
  assert.equal(calculateEMI(1_200_000, 0, 10), 10000);
});

test("calculateEMI accepts numeric strings", () => {
  assert.equal(calculateEMI("5000000"), calculateEMI(5_000_000));
});

test("calculateEMI returns null (never NaN) for missing or invalid principal", () => {
  for (const bad of [undefined, null, "", "abc", 0, -100, NaN, Infinity]) {
    assert.equal(calculateEMI(bad), null, `input ${String(bad)}`);
  }
});

test("getPropertyEMI prefers the stored emi", () => {
  assert.equal(getPropertyEMI({ emi: "12345.6", totalOfferPrice: 5_000_000 }), 12346);
});

test("getPropertyEMI falls back to offer price, then sales price", () => {
  assert.equal(getPropertyEMI({ totalOfferPrice: 5_000_000 }), 44986);
  assert.equal(getPropertyEMI({ emi: 0, totalSalesPrice: 5_000_000 }), 44986);
});

test("getPropertyEMI returns null when nothing usable", () => {
  assert.equal(getPropertyEMI(undefined), null);
  assert.equal(getPropertyEMI({}), null);
});
