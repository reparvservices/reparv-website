import { test } from "node:test";
import assert from "node:assert/strict";
import { stayIsTaken, addDays, venueBookingApi } from "../../src/lib/venueBookingApi.js";

const avail = {
  booked: [{ start: "2026-12-10", end: "2026-12-13", slot: "full" }, { start: "2026-12-20", end: "2026-12-21", slot: "morning" }],
  blocked: [{ date: "2026-12-25", slot: "full" }],
};

test("addDays crosses month and year ends", () => {
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(addDays("2026-02-28", 1), "2026-03-01");
});

test("night stays: overlapping a booking is taken, touching its edges is free", () => {
  assert.equal(stayIsTaken(avail, { start: "2026-12-11", end: "2026-12-12" }), true);
  assert.equal(stayIsTaken(avail, { start: "2026-12-09", end: "2026-12-11" }), true);
  assert.equal(stayIsTaken(avail, { start: "2026-12-13", end: "2026-12-15" }), false); // check-in on check-out day
  assert.equal(stayIsTaken(avail, { start: "2026-12-08", end: "2026-12-10" }), false);
});

test("slot stays: morning is taken, evening on the same day is free, full clashes with any slot", () => {
  assert.equal(stayIsTaken(avail, { start: "2026-12-20", slot: "morning" }), true);
  assert.equal(stayIsTaken(avail, { start: "2026-12-20", slot: "evening" }), false);
  assert.equal(stayIsTaken(avail, { start: "2026-12-20", slot: "full" }), true);
});

test("owner-blocked dates are taken; nothing loaded or no date means not taken", () => {
  assert.equal(stayIsTaken(avail, { start: "2026-12-25", slot: "full" }), true);
  assert.equal(stayIsTaken(null, { start: "2026-12-25" }), false);
  assert.equal(stayIsTaken(avail, {}), false);
});

test("API calls go to the right endpoints and surface server messages", async () => {
  const calls = [];
  globalThis.fetch = async (url, opts) => {
    calls.push([url, opts?.method || "GET"]);
    return url.includes("/quote")
      ? { ok: false, status: 400, json: async () => ({ success: false, message: "The start date is in the past." }) }
      : { ok: false, status: 401, json: async () => ({}) };
  };
  const api = venueBookingApi("http://api");
  await assert.rejects(api.quote(2, {}), /start date is in the past/);
  await assert.rejects(api.book({ listing_id: 2 }), (e) => e.status === 401 && /log in/i.test(e.message));
  assert.deepEqual(calls.map((c) => c[0]), ["http://api/customerapp/venues/2/quote", "http://api/user/venue-bookings"]);
});
