import { test } from "node:test";
import assert from "node:assert/strict";
import { getImageURI, formatIndianUnit } from "../../src/utils/helper.js";
import { getS3ImageUrl } from "../../src/lib/env.js";

const S3 = getS3ImageUrl().replace(/\/$/, "");

test("getImageURI returns '' for empty / non-string input", () => {
  for (const bad of [undefined, null, "", "   ", 42, {}]) {
    assert.equal(getImageURI(bad), "");
  }
});

test("getImageURI passes absolute and data URLs through", () => {
  assert.equal(getImageURI("https://x.com/a.jpg"), "https://x.com/a.jpg");
  assert.equal(getImageURI("http://x.com/a.jpg"), "http://x.com/a.jpg");
  assert.equal(getImageURI("data:image/png;base64,AAA"), "data:image/png;base64,AAA");
});

test("getImageURI keeps local /assets paths", () => {
  assert.equal(getImageURI("/assets/logo.png"), "/assets/logo.png");
});

test("getImageURI maps API upload paths to S3 with exactly one slash", () => {
  assert.equal(getImageURI("/uploads/a.jpg"), `${S3}/uploads/a.jpg`);
  assert.equal(getImageURI("uploads/a.jpg"), `${S3}/uploads/a.jpg`);
  assert.equal(getImageURI("  //uploads/a.jpg "), `${S3}/uploads/a.jpg`);
});

test("formatIndianUnit formats crore / lakh / thousand", () => {
  assert.equal(formatIndianUnit(10_000_000), "1 Cr");
  assert.equal(formatIndianUnit(12_500_000), "1.25 Cr");
  assert.equal(formatIndianUnit(4_500_000), "45 Lakh");
  assert.equal(formatIndianUnit(150_000), "1.50 Lakh");
  assert.equal(formatIndianUnit(2_500), "2.50 Thousand");
  assert.equal(formatIndianUnit("100000"), "1 Lakh");
});

test("formatIndianUnit returns '' below 1000 or for invalid input", () => {
  for (const v of [999, 0, -5, null, undefined, "abc"]) {
    assert.equal(formatIndianUnit(v), "");
  }
});
