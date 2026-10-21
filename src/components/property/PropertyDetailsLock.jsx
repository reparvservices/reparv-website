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
import { PropertyLockProvider } from "./PropertyLock";

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

  items.push(types.length ? `Prices for ${types.join(", ")}` : "Complete price breakup");
  if (FLAT_CATEGORIES.includes(propertyInfo.propertyCategory)) {
    items.push("Available flats by wing & floor");
  } else if (PLOT_CATEGORIES.includes(propertyInfo.propertyCategory)) {
    items.push("Available plots & sizes");
  }
  items.push("Exact address & map");
  if (propertyInfo.brochureFile) items.push("Brochure");
  return items;
}

/**
 * Hides the property's values (prices, areas, flats, exact location…) until the
 * visitor books a site visit (OTP-verified) for this property. Headings and labels
 * stay readable, so the page looks complete, not broken.
 *  - onBook: opens the site visit popup (unlocks on success)
 */
export default function PropertyDetailsLock({ propertyInfo, onBook, children }) {
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

  const lock = useMemo(() => ({ locked: !unlocked, unlock: onBook }), [unlocked, onBook]);

  return (
    <PropertyLockProvider value={lock}>
      {unlocked ? (
        showUnlockedNote ? (
          <div className="mx-2 sm:mx-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600" size={18} />
            <p className="flex-1">
              <strong>Full details unlocked.</strong> Thanks for booking a site visit. Our
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
        ) : null
      ) : (
        <section
          aria-label="Unlock property details"
          className="mx-2 sm:mx-0 overflow-hidden rounded-2xl border border-[#8A38F5]/15 bg-white shadow-[0px_8px_28px_rgba(94,35,220,0.10)]"
        >
          <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5E23DC] to-[#8A38F5] text-white shadow-md">
                <FiLock size={18} />
              </span>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Prices & exact details are reserved for visitors
                </h3>
                <p className="mt-0.5 text-sm text-gray-500">
                  Book a free site visit to unlock everything on this page instantly.
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1 rounded-full bg-[#F6F1FF] px-2.5 py-1 text-xs font-medium text-[#5E23DC]"
                    >
                      <FiCheck size={11} strokeWidth={3} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="shrink-0 md:w-[230px]">
              <button
                type="button"
                onClick={onBook}
                className="w-full rounded-xl bg-[#8A38F5] px-5 py-3 text-sm font-bold text-white shadow-[0px_7px_13px_0px_#8A38F540] transition hover:bg-[#7a2ee6] active:scale-[0.98]"
              >
                Book Free Site Visit
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-gray-100 bg-[#FCFAFF] px-4 py-2 text-[11px] text-gray-500 md:justify-start">
            <span className="inline-flex items-center gap-1">
              <FiGift size={12} /> 100% free, no brokerage
            </span>
            <span className="inline-flex items-center gap-1">
              <FiShield size={12} /> OTP verified
            </span>
            <span className="inline-flex items-center gap-1">
              <FiPhoneCall size={12} /> Expert call back
            </span>
          </div>
        </section>
      )}
      {children}
    </PropertyLockProvider>
  );
}
