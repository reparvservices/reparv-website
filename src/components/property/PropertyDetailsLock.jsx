"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FiLock,
  FiCheck,
  FiShield,
  FiPhoneCall,
  FiGift,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import {
  isPropertyUnlocked,
  consumeJustUnlocked,
  PROPERTY_UNLOCKED_EVENT,
} from "../../utils/propertyUnlock";

const FLAT_CATEGORIES = ["NewFlat", "CommercialFlat"];
const PLOT_CATEGORIES = ["NewPlot", "CommercialPlot"];

const parseList = (value) => {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/** What a visitor gets after booking, based on what this property actually has. */
function unlockItems(propertyInfo = {}) {
  const items = [];
  const types = parseList(propertyInfo.propertyType).filter(Boolean);

  if (FLAT_CATEGORIES.includes(propertyInfo.propertyCategory)) {
    items.push("Wing & floor-wise available flats");
  } else if (PLOT_CATEGORIES.includes(propertyInfo.propertyCategory)) {
    items.push("Plot-wise availability and sizes");
  }
  items.push(types.length ? `Price breakup for ${types.join(", ")}` : "Detailed price breakup");
  if (propertyInfo.brochureFile) items.push("Project brochure (PDF)");
  if (propertyInfo.videoLink) items.push("Walkthrough video");
  items.push("Highlights, amenities & full description");
  if (propertyInfo.latitude && propertyInfo.longitude) items.push("Exact location on the map");
  return items;
}

/**
 * Blurs the full property details until the visitor books a site visit
 * (OTP-verified) for this property.
 *  - onBook: opens the site visit popup (unlocks on success)
 *  - onCall: opens the call-back popup (does not unlock)
 */
export default function PropertyDetailsLock({ propertyInfo, onBook, onCall, children }) {
  const propertyId = propertyInfo?.propertyid;
  const [unlocked, setUnlocked] = useState(false);
  const [showUnlockedNote, setShowUnlockedNote] = useState(false);
  const items = useMemo(() => unlockItems(propertyInfo), [propertyInfo]);

  useEffect(() => {
    const sync = () => {
      const isOpen = isPropertyUnlocked(propertyId);
      setUnlocked(isOpen);
      if (isOpen && consumeJustUnlocked(propertyId)) setShowUnlockedNote(true);
    };
    sync();
    window.addEventListener(PROPERTY_UNLOCKED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROPERTY_UNLOCKED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [propertyId]);

  if (unlocked) {
    return (
      <>
        {showUnlockedNote ? (
          <div className="mx-2 sm:mx-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600" size={18} />
            <p className="flex-1">
              <strong>Full details unlocked.</strong> Thanks for booking a site visit — our
              property expert will call you to confirm the time.
            </p>
            <button
              type="button"
              onClick={() => setShowUnlockedNote(false)}
              className="text-emerald-700/70 hover:text-emerald-900"
              aria-label="Dismiss"
            >
              <FiX size={16} />
            </button>
          </div>
        ) : null}
        {children}
      </>
    );
  }

  return (
    <div className="relative mx-2 sm:mx-0">
      {/* Peek: structure is recognisable, text is not readable */}
      <div
        className="blur-[5px] opacity-80 pointer-events-none select-none max-h-[760px] overflow-hidden"
        aria-hidden="true"
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-white" />

      {/* Card stays in view while scrolling past the locked area */}
      <div className="absolute inset-0 flex justify-center px-3 sm:px-6">
        <div className="sticky top-28 lg:top-40 h-fit w-full max-w-lg pt-10 sm:pt-16">
          <div className="overflow-hidden rounded-2xl border border-[#8A38F5]/15 bg-white shadow-[0px_16px_48px_rgba(94,35,220,0.20)]">
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#5E23DC] to-[#8A38F5] px-5 py-4 text-white">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
                <FiLock size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/75">
                  Exclusive details
                </p>
                <h3 className="truncate text-base sm:text-lg font-bold">
                  Unlock {propertyInfo?.propertyName || "this property"}
                </h3>
              </div>
            </div>

            <div className="px-5 pt-4 pb-5">
              <p className="text-sm text-gray-600">
                Book a free site visit and get instant access to:
              </p>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-gray-800">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EFE7FF] text-[#8A38F5]">
                      <FiCheck size={11} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={onBook}
                className="mt-5 w-full rounded-xl bg-[#8A38F5] py-3 text-sm sm:text-base font-bold text-white shadow-[0px_7px_13px_0px_#8A38F540] transition hover:bg-[#7a2ee6] active:scale-[0.98]"
              >
                Book Free Site Visit &amp; Unlock
              </button>

              {onCall ? (
                <button
                  type="button"
                  onClick={onCall}
                  className="mt-2 w-full rounded-xl py-2 text-sm font-semibold text-[#5E23DC] hover:bg-[#F6F1FF]"
                >
                  Prefer to talk? Request a call back
                </button>
              ) : null}

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-gray-100 pt-3 text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <FiGift size={12} /> 100% free
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiShield size={12} /> OTP verified
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiPhoneCall size={12} /> Expert call back
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
