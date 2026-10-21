"use client";

import { createContext, useContext } from "react";
import { FiLock } from "react-icons/fi";

/**
 * Lock state for a property page. While locked, only the *values* are hidden
 * (blurred) — headings, labels and tabs stay readable. Clicking a hidden value
 * opens the site-visit booking that unlocks the page.
 * Components rendered outside a provider are never locked.
 */
const PropertyLockContext = createContext({ locked: false, unlock: () => {} });

export const PropertyLockProvider = PropertyLockContext.Provider;
export const usePropertyLock = () => useContext(PropertyLockContext);

const LOCK_HINT = "Book a free site visit to see this";

/** Inline value (price, area, floor…) blurred while locked */
export function Locked({ children, className = "" }) {
  const { locked, unlock } = usePropertyLock();
  if (!locked) return children;

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        unlock();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          unlock();
        }
      }}
      title={LOCK_HINT}
      aria-label={LOCK_HINT}
      className={`group inline-flex max-w-full items-center gap-1.5 cursor-pointer align-middle ${className}`}
    >
      <span aria-hidden="true" className="blur-[5px] select-none pointer-events-none">
        {children}
      </span>
      <FiLock
        size={12}
        className="shrink-0 text-[#8A38F5] opacity-70 transition group-hover:opacity-100"
      />
    </span>
  );
}

/** Larger content (map, long description) blurred with a centred unlock pill */
export function LockedBlock({ children, label = "Book a free site visit to view", className = "" }) {
  const { locked, unlock } = usePropertyLock();
  if (!locked) return children;

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div aria-hidden="true" className="blur-[6px] select-none pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/30">
        <button
          type="button"
          onClick={unlock}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#5E23DC] shadow-[0px_6px_20px_rgba(94,35,220,0.25)] ring-1 ring-[#8A38F5]/20 transition hover:bg-[#F6F1FF]"
        >
          <FiLock size={14} /> {label}
        </button>
      </div>
    </div>
  );
}
