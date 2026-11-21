import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const edit = read("../../src/components/dashboard/EditProperty.jsx");
const add = read("../../src/components/dashboard/SellProperty.jsx");

// The edit form is built from the same pieces as the add form, so a listing can be edited with
// everything it was created with.
test("the edit form uses the same shared blocks as the add form", () => {
  for (const piece of ["PropertyBasicDetails", "PropertyFeatures", "BHK_OPTIONS", "needsConfiguration"]) {
    assert.ok(add.includes(piece), `add form uses ${piece}`);
    assert.ok(edit.includes(piece), `edit form uses ${piece}`);
  }
  assert.match(edit, /showDetails=\{true\}/);
});

test("the edit form has a description and sends the configuration as the list the server stores", () => {
  assert.match(edit, /propertyDescription/);
  assert.match(edit, /<textarea/);
  assert.match(edit, /payload\.propertyType = \[newProperty\.propertyType\]/);
});

test("the edit form accepts the same property and owner names as the add form (digits, & . , ' ( ) / -)", () => {
  const regexOf = (src, name) => src.match(new RegExp(`const ${name} = (/.*?/);`))[1];
  assert.equal(regexOf(edit, "PROPERTY_NAME_REGEX"), regexOf(add, "PROPERTY_NAME_REGEX"));
  assert.equal(regexOf(edit, "OWNER_NAME_REGEX"), regexOf(add, "OWNER_NAME_REGEX"));
  // the old behaviour stripped every digit and symbol as you typed
  assert.equal(/propertyName[^\n]*replace\(\/\[\^A-Za-z\\s\]\/g/.test(edit), false);
  const name = regexOf(edit, "PROPERTY_NAME_REGEX");
  const re = new RegExp(name.slice(1, -1));
  for (const ok of ["Sunrise Heights 2", "Plot no 87, Naidu layout", "Green Valley 12 & Co. (Phase-2)", "101"]) assert.ok(re.test(ok), ok);
  assert.equal(re.test("Bad <name>"), false);
});

test("the old hard-coded option lists are gone (they had drifted from the shared ones)", () => {
  for (const old of ["ownershipOptions", "facingOptions", "furnishingOptions", "waterSupplyOptions", "powerBackupOptions", "amenitiesFeatureOptions"]) {
    assert.equal(edit.includes(old), false, old);
  }
});

test("a stored value that is not in the standard list stays visible in the selects and pills", () => {
  for (const p of [
    "../../src/components/dashboard/FormUI.jsx",
    "../../src/components/dashboard/PropertyBasicDetails.jsx",
  ]) assert.match(read(p), /not in the standard list|withStored/, p);
  const ui = read("../../src/components/dashboard/FormUI.jsx");
  assert.match(ui, /withStored\(options, value\)\.map/);
  assert.match(ui, /withStored\(options, safeValue\)\.map/);
});
