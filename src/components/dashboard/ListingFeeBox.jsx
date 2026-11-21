"use client";

import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useAuth } from "../../store/auth";
import { listingFeeApi } from "../../lib/listingFeeApi";

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

/**
 * Tells the user, before they submit, whether this listing is free or what it will cost.
 * Reports the quote upward so the submit button can say "Submit & pay".
 */
export default function ListingFeeBox({ category, listingType, onQuote }) {
  const { URI } = useAuth();
  const api = useMemo(() => listingFeeApi(URI), [URI]);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    let alive = true;
    setQuote(null);
    onQuote?.(null);
    if (!URI || !category || !listingType) return undefined;
    api
      .quote(listingType, category)
      .then((q) => {
        if (!alive) return;
        setQuote(q);
        onQuote?.(q);
      })
      .catch(() => {
        // Not logged in yet, or the quote is unavailable: the server still decides when saving
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, URI, category, listingType]);

  if (!quote || !quote.enabled) return null;

  if (quote.mode === "free") {
    return (
      <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
        <b>Your first listing is free.</b> No payment is needed to submit this one.
      </div>
    );
  }

  if (quote.mode === "paid") {
    return (
      <div className="mb-6 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-slate-800">
        <p className="font-bold text-violet-800">Listing fee</p>
        <div className="mt-1 flex justify-between"><span>Fee for this property type</span><span>{inr(quote.fee.base)}</span></div>
        <div className="flex justify-between"><span>GST ({quote.gst_percent}%)</span><span>{inr(quote.fee.gst)}</span></div>
        <div className="mt-1 flex justify-between border-t border-violet-200 pt-1 font-extrabold"><span>Total to pay</span><span>{inr(quote.fee.total)}</span></div>
        <p className="mt-2 text-xs text-gray-600">
          Your first listing was free. You'll pay securely online when you submit, and your listing then goes to our team for review.
        </p>
      </div>
    );
  }

  return null; // waived: nothing to pay
}
