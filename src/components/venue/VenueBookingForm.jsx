"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../../store/auth";
import { venueBookingApi, loadRazorpay, stayIsTaken, addDays } from "../../lib/venueBookingApi";

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const todayIST = () => new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10);
const SLOTS = [
  { key: "full", label: "Full day" },
  { key: "morning", label: "Morning" },
  { key: "evening", label: "Evening" },
];
const inputCls =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#8A38F5]";

export default function VenueBookingForm({ venue }) {
  const { URI, user, setShowLogin } = useAuth();
  // The website keeps the signed-in user in the store / localStorage (the cookie flag stays false)
  const [hasStoredUser, setHasStoredUser] = useState(false);
  useEffect(() => {
    try {
      setHasStoredUser(!!localStorage.getItem("guestUser"));
    } catch {
      setHasStoredUser(false);
    }
  }, [user]);
  const isLoggedIn = !!user || hasStoredUser;
  const api = useMemo(() => venueBookingApi(URI), [URI]);
  const isNight = venue.price_model === "night";
  const today = todayIST();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [lastDay, setLastDay] = useState(""); // slot venues: optional last day of a multi-day full-day booking
  const [slot, setSlot] = useState("full");
  const [guests, setGuests] = useState(1);
  const [availability, setAvailability] = useState(null);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  // night venues: check-out date. slot venues: a full-day booking may run to a later day (end is the day after it).
  const endDate = isNight ? end : slot === "full" && lastDay ? addDays(lastDay, 1) : undefined;
  const stay = { start_date: start, end_date: endDate, slot: isNight ? undefined : slot, guests };
  const ready = start && (!isNight || end) && (isNight || !lastDay || slot !== "full" || lastDay >= start);
  const taken = ready && stayIsTaken(availability, { start, end: endDate, slot: isNight ? "full" : slot });

  // Which dates are already booked or blocked (next ~2 months)
  useEffect(() => {
    if (!URI) return;
    api.availability(venue.id, today, addDays(today, 90)).then(setAvailability).catch(() => {});
  }, [api, URI, venue.id, today]);

  // Re-price whenever the choice changes
  useEffect(() => {
    setQuote(null);
    setError("");
    if (!ready || taken) return;
    let alive = true;
    const t = setTimeout(() => {
      api
        .quote(venue.id, stay)
        .then((d) => alive && setQuote(d.quote))
        .catch((e) => alive && setError(e.message));
    }, 300);
    return () => {
      alive = false;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, venue.id, start, end, lastDay, slot, guests, taken]);

  const book = async () => {
    if (!isLoggedIn) return setShowLogin(true);
    setError("");
    setBusy(true);
    try {
      if (!(await loadRazorpay())) throw new Error("Could not load the payment window. Check your connection.");
      const order = await api.book({ listing_id: venue.id, ...stay });
      await new Promise((resolve, reject) => {
        const rz = new window.Razorpay({
          key: order.key,
          order_id: order.order_id,
          amount: order.amount,
          currency: order.currency,
          name: "Reparv",
          description: `${venue.title} (${order.booking_ref})`,
          theme: { color: "#8A38F5" },
          handler: async (payment) => {
            try {
              const out = await api.verify(payment);
              setDone({ ref: order.booking_ref, quote: order.quote, booking: out.booking });
              resolve();
            } catch (e) {
              reject(e);
            }
          },
          modal: { ondismiss: () => reject(new Error("Payment was not completed. Your dates are held for a few minutes.")) },
        });
        rz.on("payment.failed", (r) => reject(new Error(r?.error?.description || "Payment failed. Please try again.")));
        rz.open();
      });
    } catch (e) {
      if (e.status === 401) setShowLogin(true);
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
        <FiCheckCircle className="mx-auto text-green-600" size={32} />
        <p className="mt-2 text-base font-extrabold text-slate-900">Booking confirmed</p>
        <p className="text-xs text-gray-600">Reference <b>{done.ref}</b></p>
        <p className="mt-2 text-xs text-gray-600">
          Paid {inr(done.quote?.payable_now)}
          {done.quote?.balance_due > 0 ? ` · Balance ${inr(done.quote.balance_due)} due later` : ""}
        </p>
        <Link href="/dashboard?tab=bookings" className="mt-3 inline-block text-xs font-bold text-[#8A38F5] underline">
          View my bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <label className="text-[11px] font-bold text-slate-600">
          {isNight ? "Check-in" : "Date"}
          <input type="date" min={today} value={start} onChange={(e) => { setStart(e.target.value); if (end && e.target.value >= end) setEnd(""); if (lastDay && e.target.value > lastDay) setLastDay(""); }} className={inputCls} />
        </label>
        {isNight ? (
          <label className="text-[11px] font-bold text-slate-600">
            Check-out
            <input type="date" min={start ? addDays(start, 1) : today} value={end} onChange={(e) => setEnd(e.target.value)} className={inputCls} />
          </label>
        ) : (
          <label className="text-[11px] font-bold text-slate-600">
            Slot
            <select value={slot} onChange={(e) => { setSlot(e.target.value); if (e.target.value !== "full") setLastDay(""); }} className={inputCls}>
              {SLOTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </label>
        )}
      </div>
      {!isNight && slot === "full" ? (
        <label className="text-[11px] font-bold text-slate-600">
          Last day <span className="font-normal text-gray-400">(optional, to book several days)</span>
          <input type="date" min={start || today} value={lastDay} onChange={(e) => setLastDay(e.target.value)} className={inputCls} />
        </label>
      ) : null}
      <label className="text-[11px] font-bold text-slate-600">
        Guests (up to {venue.capacity})
        <input type="number" min={1} max={venue.capacity} value={guests} onChange={(e) => setGuests(Math.max(1, Math.min(venue.capacity, Number(e.target.value) || 1)))} className={inputCls} />
      </label>

      {taken ? <p className="text-xs font-semibold text-red-600">Those dates are not available. Please pick other dates.</p> : null}

      {quote ? (
        <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-3 text-xs text-slate-700">
          {quote.lines.length <= 5 ? quote.lines.map((l) => (
            <div key={l.date} className="flex justify-between"><span className="capitalize">{l.date} · {l.label}</span><span>{inr(l.amount)}</span></div>
          )) : <div className="flex justify-between"><span>{quote.lines.length} days</span><span>{inr(quote.stay_total)}</span></div>}
          {quote.cleaning_fee > 0 && <div className="flex justify-between"><span>Cleaning fee</span><span>{inr(quote.cleaning_fee)}</span></div>}
          {quote.gst_amount > 0 && <div className="flex justify-between"><span>GST ({quote.gst_percent}%)</span><span>{inr(quote.gst_amount)}</span></div>}
          <div className="mt-1 flex justify-between border-t border-violet-100 pt-1 text-sm font-extrabold text-slate-900"><span>Total</span><span>{inr(quote.total_amount)}</span></div>
          {quote.balance_due > 0 && <div className="flex justify-between font-semibold text-violet-700"><span>Pay now ({quote.deposit_percent}%)</span><span>{inr(quote.payable_now)}</span></div>}
        </div>
      ) : null}

      {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}

      <button
        type="button"
        onClick={book}
        disabled={busy || (isLoggedIn && (!ready || taken || !quote))}
        className="w-full rounded-md bg-[#8A38F5] py-3 text-base font-bold text-white shadow-[0px_7px_13px_0px_#8A38F540] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "Please wait…" : isLoggedIn ? (quote ? `Book & pay ${inr(quote.payable_now)}` : "Select dates") : "Log in to book"}
      </button>
      <p className="text-center text-[11px] text-gray-400">Pay securely online. Dates are held for 10 minutes while you pay.</p>
    </div>
  );
}
