import { test } from "node:test";
import assert from "node:assert/strict";
import { listingFeeApi } from "../../src/lib/listingFeeApi.js";
import { listingStatusFor } from "../../src/utils/propertyListing.js";

const stubFetch = (handler) => {
  const calls = [];
  globalThis.fetch = async (url, opts = {}) => {
    calls.push({ url, method: opts.method || "GET", body: opts.body ? JSON.parse(opts.body) : undefined });
    return handler(url);
  };
  return calls;
};
const ok = (data) => ({ ok: true, status: 200, json: async () => data });

test("quote asks for this type and returns the server's answer", async () => {
  const calls = stubFetch(() => ok({ success: true, quote: { enabled: true, mode: "paid", fee: { total: 590 } } }));
  const q = await listingFeeApi("http://api").quote("Sell", "New Flat");
  assert.equal(q.fee.total, 590);
  assert.equal(calls[0].url, "http://api/user/listing-fees/quote?listingType=Sell&category=New%20Flat");
});

test("checkout and verify post to the website-login endpoints", async () => {
  const calls = stubFetch(() => ok({ success: true, order_id: "order_1" }));
  const api = listingFeeApi("http://api");
  await api.checkout(42);
  await api.verify({ razorpay_order_id: "o", razorpay_payment_id: "p", razorpay_signature: "s" });
  assert.deepEqual(calls.map((c) => [c.method, c.url]), [
    ["POST", "http://api/user/listing-fees/checkout"],
    ["POST", "http://api/user/listing-fees/verify"],
  ]);
  assert.deepEqual(calls[0].body, { property_id: 42 });
});

test("server messages surface, and a 401 asks to log in again", async () => {
  stubFetch(() => ({ ok: false, status: 409, json: async () => ({ success: false, message: "No payment is needed for this listing." }) }));
  await assert.rejects(listingFeeApi("http://api").checkout(1), /No payment is needed/);
  stubFetch(() => ({ ok: false, status: 401, json: async () => ({}) }));
  await assert.rejects(listingFeeApi("http://api").checkout(1), (e) => e.status === 401 && /log in/i.test(e.message));
});

test("a listing with an unpaid fee shows as Payment Pending, whatever else it says", () => {
  assert.equal(listingStatusFor({ fee_status: "pending", approve: "Approved", status: "Active" }), "Payment Pending");
  assert.equal(listingStatusFor({ fee_status: "paid", approve: "Approved", status: "Active" }), "Live");
  assert.equal(listingStatusFor({ fee_status: "free", approve: "Not Approved", status: "Active" }), "Under Review");
  assert.equal(listingStatusFor({ approve: "Approved", status: "Active" }), "Live"); // old rows: no fee_status
});
