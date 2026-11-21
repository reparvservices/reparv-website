"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../store/auth";
import { venueApi } from "../../lib/venueApi";
import VenueForm from "./VenueForm";

const STATUS_NOTE = {
  draft: "This venue is a draft. Submit it for approval when you are ready.",
  pending: "This venue is under review. You can still edit it.",
  live: "This venue is live. Your changes show to customers as soon as you save.",
  paused: "This venue is paused and hidden from bookings.",
  rejected: "This venue was rejected. Fix the issues, then save and resubmit it.",
};

/** /edit-venue/:id : edit a venue the customer listed (same form as listing one) */
export default function EditVenue() {
  const { id } = useParams();
  const router = useRouter();
  const { URI, setShowAlert } = useAuth();
  const api = useMemo(() => venueApi(URI), [URI]);

  const [venue, setVenue] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api
      .get(id)
      .then((v) => !cancelled && setVenue(v))
      .catch((err) => !cancelled && setError(err.message || "Could not load this venue."));
    return () => {
      cancelled = true;
    };
  }, [api, id]);

  const goBack = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    router.push(isMobile ? "/my-listings" : "/dashboard?tab=listings");
  };

  const save = async (body, submit) => {
    await api.save(id, body, submit);
    setShowAlert({
      show: true,
      type: "success",
      title: submit ? "Venue submitted" : "Venue updated",
      message: submit
        ? "Your venue is under review. It will go live for bookings once our team approves it."
        : "Your changes have been saved.",
    });
    goBack();
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F3FF] px-4 py-6">
      <div className="mx-auto w-full max-w-4xl">
        <button
          type="button"
          onClick={goBack}
          className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#8A38F5]"
        >
          <FaArrowLeft /> Back to My Listings
        </button>

        <section className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          {error ? (
            <div className="py-10 text-center">
              <p className="font-semibold text-gray-900">{error}</p>
              <button
                type="button"
                onClick={goBack}
                className="mt-5 rounded-lg bg-[#8A38F5] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Back to My Listings
              </button>
            </div>
          ) : !venue ? (
            <div className="space-y-3">
              <div className="h-8 w-48 animate-pulse rounded bg-gray-100" />
              <div className="h-40 animate-pulse rounded-xl bg-gray-100" />
            </div>
          ) : (
            <>
              <h1 className="mb-1 text-xl font-bold text-black sm:text-2xl">Edit venue</h1>
              <p className="mb-6 text-sm text-[#868686]">{STATUS_NOTE[venue.status] || ""}</p>
              <VenueForm
                key={venue.id}
                embedded
                editing
                initial={venue}
                setBusy={setBusy}
                onCancel={goBack}
                onSave={save}
                submitLabel={
                  venue.status === "draft" || venue.status === "rejected"
                    ? "Save & submit for approval"
                    : "Save changes"
                }
              />
            </>
          )}
        </section>
      </div>
      {busy && <div className="fixed inset-0 z-50 cursor-wait bg-white/40" aria-hidden="true" />}
    </div>
  );
}
