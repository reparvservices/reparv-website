"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TiLocationOutline } from "react-icons/ti";
import { RiBuildingLine } from "react-icons/ri";
import { useAuth } from "../../store/auth";
import { venueApi } from "../../lib/venueApi";
import { getImageURI } from "../../utils/helper";

const STATUS = {
  draft: { label: "Draft", cls: "bg-gray-100 text-gray-600 border-gray-200" },
  pending: { label: "Under Review", cls: "bg-orange-50 text-orange-700 border-orange-200" },
  live: { label: "Live", cls: "bg-green-50 text-green-700 border-green-200" },
  paused: { label: "Paused", cls: "bg-gray-100 text-gray-600 border-gray-200" },
  rejected: { label: "Rejected", cls: "bg-red-50 text-red-600 border-red-200" },
};

const asList = (v) => {
  if (Array.isArray(v)) return v;
  try {
    const parsed = JSON.parse(v || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const typeLabel = (v) => (v.type === "other" ? v.custom_type || "Venue" : v.type ? v.type[0].toUpperCase() + v.type.slice(1) : "Venue");

/** The customer's own venue listings, shown under their properties in My Listings. */
export default function MyVenues() {
  const router = useRouter();
  const { URI, setShowAlert } = useAuth();
  const [venues, setVenues] = useState(null); // null = loading
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    try {
      setVenues(await venueApi(URI).list());
    } catch (err) {
      console.error("Error fetching venues:", err);
      setVenues([]);
    }
  }, [URI]);

  useEffect(() => {
    load();
  }, [load]);

  const run = async (venue, action, done) => {
    setBusyId(venue.id);
    try {
      await venueApi(URI).action(venue.id, action);
      setShowAlert({ show: true, type: "success", title: "", message: done });
      await load();
    } catch (err) {
      setShowAlert({ show: true, type: "error", title: "", message: err.message || "Something went wrong" });
    } finally {
      setBusyId(null);
    }
  };

  // Nothing to show until the customer has listed a venue
  if (!venues || venues.length === 0) return null;

  return (
    <section className="w-full bg-white rounded-xl p-4 border border-[#D9D9D9]">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold">
          Your Venues <span className="text-sm font-normal text-gray-500">({venues.length})</span>
        </h2>
        <button
          type="button"
          onClick={() => router.push("/sell-properties")}
          className="text-sm font-semibold text-[#8A38F5] hover:underline"
        >
          + List a venue
        </button>
      </div>

      <div className="space-y-4">
        {venues.map((v) => {
          const status = STATUS[v.status] || STATUS.draft;
          const cover = asList(v.images)[0];
          const unit = v.price_model === "slot" ? "slot" : "night";
          const busy = busyId === v.id;
          return (
            <div key={v.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#D9D9D9] flex flex-col sm:flex-row gap-4">
              <img
                loading="lazy"
                decoding="async"
                src={cover ? getImageURI(cover) : "/assets/property/propertyPicture.svg"}
                onError={(e) => {
                  e.currentTarget.src = "/assets/property/propertyPicture.svg";
                }}
                alt={v.title}
                className="w-full sm:w-40 h-40 sm:h-28 shrink-0 object-cover rounded-lg bg-gray-100"
              />

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-base truncate">{v.title}</h3>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.cls}`}>{status.label}</span>
                </div>
                <p className="flex items-center gap-1 text-sm text-[#868686] mt-1">
                  <TiLocationOutline className="w-5 h-5 shrink-0" />
                  <span className="truncate">{[v.address, v.city].filter(Boolean).join(", ")}</span>
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#868686] mt-3">
                  <span className="flex items-center gap-2">
                    <RiBuildingLine /> {typeLabel(v)}
                  </span>
                  <span>Up to {v.capacity} guests</span>
                  <span className="font-semibold text-black">
                    ₹{Number(v.base_price).toLocaleString("en-IN")} / {unit}
                  </span>
                </div>
                {v.status === "rejected" && v.reject_reason && (
                  <p className="mt-2 text-xs text-red-600">Reason: {v.reject_reason}</p>
                )}
                {v.status === "draft" && (
                  <p className="mt-2 text-xs text-gray-500">Not submitted yet. Submit it so our team can review and publish it.</p>
                )}
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-start gap-2">
                <button
                  type="button"
                  onClick={() => router.push(`/edit-venue/${v.id}`)}
                  className="rounded-lg border border-[#5323DC] px-4 py-2 text-sm font-semibold text-[#5323DC] hover:bg-[#F7F3FF]"
                >
                  Edit
                </button>
                {(v.status === "draft" || v.status === "rejected") && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => run(v, "submit", "Venue submitted for approval")}
                    className="rounded-lg bg-[#5323DC] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {busy ? "Submitting..." : v.status === "rejected" ? "Resubmit" : "Submit for approval"}
                  </button>
                )}
                {v.status === "live" && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => run(v, "pause", "Venue paused. It is hidden from bookings")}
                    className="rounded-lg border border-[#D9D9D9] px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                  >
                    Pause
                  </button>
                )}
                {v.status === "paused" && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => run(v, "resume", "Venue is live again")}
                    className="rounded-lg bg-[#5323DC] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    Resume
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
