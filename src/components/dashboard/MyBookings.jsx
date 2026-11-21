"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../store/auth";
import { venueBookingApi } from "../../lib/venueBookingApi";

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const STATUS = {
  held: { label: "Awaiting payment", cls: "bg-orange-50 text-orange-700 border-orange-200" },
  confirmed: { label: "Confirmed", cls: "bg-green-50 text-green-700 border-green-200" },
  completed: { label: "Completed", cls: "bg-gray-100 text-gray-600 border-gray-200" },
  cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600 border-red-200" },
};

const niceDate = (d) => {
  try {
    return new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
};

const dayBefore = (d) => {
  const t = new Date(`${d}T00:00:00Z`);
  t.setUTCDate(t.getUTCDate() - 1);
  return t.toISOString().slice(0, 10);
};

const stayText = (b) => {
  if (b.slot && b.slot !== "full") return `${niceDate(b.start_date)} · ${b.slot} slot`;
  if (!b.end_date || b.end_date === b.start_date) return niceDate(b.start_date);
  // per-day venues book whole days: show the first and last day; nightly venues show check-in → check-out
  if (b.listing_price_model === "slot") {
    const last = dayBefore(b.end_date);
    return last === b.start_date ? niceDate(b.start_date) : `${niceDate(b.start_date)} – ${niceDate(last)}`;
  }
  return `${niceDate(b.start_date)} → ${niceDate(b.end_date)}`;
};

function refundLine(b) {
  if (b.status === "cancelled") {
    if (Number(b.refund_amount) > 0) return `Refund of ${inr(b.refund_amount)} initiated`;
    return b.cancelled_by && b.cancelled_by !== "customer" ? "Cancelled by the venue" : "No refund applicable";
  }
  return "";
}

export default function MyBookings() {
  const { URI, setShowLogin, setShowAlert } = useAuth();
  const api = useMemo(() => venueBookingApi(URI), [URI]);

  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const [cancelling, setCancelling] = useState(null); // booking being confirmed
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try {
      setBookings(await api.list());
      setNeedsLogin(false);
    } catch (e) {
      if (e.status === 401) setNeedsLogin(true);
      else setError(e.message);
      setBookings([]);
    }
  }, [api]);

  useEffect(() => {
    if (URI) load();
  }, [URI, load]);

  const confirmCancel = async () => {
    setBusy(true);
    try {
      const out = await api.cancel(cancelling.id, reason.trim());
      setShowAlert?.({
        show: true,
        type: "success",
        title: "",
        message:
          out.refund_amount > 0
            ? `Booking cancelled. A refund of ${inr(out.refund_amount)} has been initiated.`
            : "Booking cancelled.",
      });
      setCancelling(null);
      setReason("");
      await load();
    } catch (e) {
      setError(e.message);
      setCancelling(null);
      await load();
    } finally {
      setBusy(false);
    }
  };

  if (needsLogin) {
    return (
      <div className="mx-auto mt-10 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold">My bookings</h1>
        <p className="mt-2 text-gray-500">Please log in to see your venue bookings.</p>
        <button onClick={() => setShowLogin(true)} className="mt-6 w-full rounded-lg bg-[#5323DC] py-3 font-semibold text-white">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <h1 className="mb-4 text-xl font-bold sm:text-2xl">My bookings</h1>

      {error ? <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">{error}</p> : null}

      {bookings === null ? (
        <p className="py-10 text-center text-gray-500">Loading…</p>
      ) : bookings.length === 0 && !error ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          <p className="font-semibold text-gray-700">No bookings yet</p>
          <Link href="/venues" className="mt-4 inline-block rounded-lg bg-[#8A38F5] px-5 py-2.5 text-sm font-bold text-white">
            Browse venues
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((b) => {
            const st = STATUS[b.status] || { label: b.status, cls: "bg-gray-100 text-gray-600 border-gray-200" };
            return (
              <div key={b.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/venues/${b.listing_id}`} className="block truncate text-base font-extrabold text-slate-900 hover:text-[#8A38F5]">
                      {b.listing_title || "Venue"}
                    </Link>
                    <p className="text-xs capitalize text-gray-500">{b.listing_city}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${st.cls}`}>{st.label}</span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 sm:grid-cols-4">
                  <div><p className="text-gray-400">Stay</p><p className="font-semibold capitalize">{stayText(b)}</p></div>
                  <div><p className="text-gray-400">Guests</p><p className="font-semibold">{b.guests}</p></div>
                  <div><p className="text-gray-400">Total</p><p className="font-semibold">{inr(b.total_amount)}</p></div>
                  <div><p className="text-gray-400">Paid</p><p className="font-semibold">{inr(b.amount_paid)}</p></div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
                  <p className="text-[11px] text-gray-400">Ref {b.booking_ref}{refundLine(b) ? ` · ${refundLine(b)}` : ""}</p>
                  {b.can_cancel ? (
                    <button
                      type="button"
                      onClick={() => { setCancelling(b); setReason(""); }}
                      className="rounded-lg border border-red-300 px-4 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50"
                    >
                      Cancel booking
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cancelling ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5">
            <h2 className="text-lg font-extrabold">Cancel this booking?</h2>
            <p className="mt-1 text-sm text-gray-600">
              {cancelling.listing_title} · {stayText(cancelling)}
            </p>
            <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
              {cancelling.status === "held"
                ? "You haven't paid yet, so there is nothing to refund."
                : cancelling.cancel_refund_amount > 0
                  ? `You will get ${inr(cancelling.cancel_refund_amount)} back (${cancelling.cancel_refund_percent}% of what you paid), under this venue's cancellation policy.`
                  : "Under this venue's cancellation policy no refund applies at this time."}
            </p>
            <textarea
              rows={2}
              maxLength={300}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason (optional)"
              className="mt-3 w-full rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-[#8A38F5]"
            />
            <div className="mt-4 flex gap-2">
              <button type="button" disabled={busy} onClick={() => setCancelling(null)} className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-bold text-gray-700">
                Keep booking
              </button>
              <button type="button" disabled={busy} onClick={confirmCancel} className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white disabled:opacity-60">
                {busy ? "Cancelling…" : "Yes, cancel"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
