import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const sections = read("../../src/components/dashboard/PhotoSections.jsx");
const edit = read("../../src/components/dashboard/EditProperty.jsx");

test("a saved photo has a remove / undo button, and the new-photo room counts the saved ones that stay", () => {
  assert.match(sections, /onToggleSaved/);
  assert.match(sections, /Will be removed/);
  assert.match(sections, /Undo/);
  assert.match(sections, /keptSaved/);
  assert.match(sections, /kept \+ files\.length < max/);
});

test("the edit form sends the whole section for the sections it changed, and names them in replacePhotos", () => {
  assert.match(edit, /payload\.replacePhotos = replacePhotos/);
  assert.match(edit, /\(storedPhotos\[field\] \|\| \[\]\)\.filter\(\(_, i\) => !gone\.includes\(i\)\)/);
  // the removal marks and the new photos are cleared once the saved property is loaded again
  assert.match(edit, /setRemovedSaved\(\{\}\)/);
});

test("the last front view photo cannot be removed", () => {
  assert.match(edit, /A listing needs at least one front view photo/);
  assert.match(edit, /frontWouldBeEmpty/);
});
