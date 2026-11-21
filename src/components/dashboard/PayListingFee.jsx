"use client";

import { useMemo, useState } from "react";
import { useAuth } from "../../store/auth";
import { listingFeeApi, payListingFee } from "../../lib/listingFeeApi";

/** Shown on a listing whose fee is unpaid: it is not sent for review until paid. */
export default function PayListingFee({ property, onPaid, className = "" }) {
  const { URI, setShowAlert, setShowLogin } = useAuth();
  const api = useMemo(() => listingFeeApi(URI), [URI]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (property?.fee_status !== "pending") return null;

  const pay = async () => {
    setBusy(true);
    setError("");
    try {
      await payListingFee(api, property.propertyid);
      setShowAlert?.({
        show: true,
        type: "success",
        title: "Payment received",
        message: "Your listing is now with our team for review.",
      });
      await onPaid?.();
    } catch (e) {
      if (e.status === 401) setShowLogin(true);
      else if (!e.dismissed) setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900 ${className}`}>
      <p className="font-semibold">Listing fee not paid yet. Pay to send this listing for review.</p>
      {error ? <p className="mt-1 font-semibold text-red-600">{error}</p> : null}
      <button
        type="button"
        disabled={busy}
        onClick={pay}
        className="mt-2 rounded-md bg-[#8A38F5] px-4 py-1.5 font-bold text-white disabled:opacity-60"
      >
        {busy ? "Please wait…" : "Pay now"}
      </button>
    </div>
  );
}
