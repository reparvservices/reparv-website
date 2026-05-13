"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
import FormatPrice from "@/components/FormatPrice";
import { addVisitor } from "@/utils/analytics";

// ── Inline SVG Icons ───────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 10.8 19.79 19.79 0 0 1 0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 7.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const TagIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CreditCardIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircleIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const GridIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
  </svg>
);

// ── Helpers ────────────────────────────────────────────────────────────────
const isRental = (cat) =>
  ["RentalFlat", "RentalShop", "RentalOffice"].includes(cat);

const isNewProperty = (cat) =>
  ["NewFlat", "NewPlot", "CommercialFlat", "CommercialPlot"].includes(cat);

// ── Component ──────────────────────────────────────────────────────────────
export default function PropertyBookingCard({ propertyInfo }) {
  const router = useRouter();

  const {
    URI,
    user,
    setPriceSummery,
    setShowLogin,
    setShowPriceSummery,
    setShowSiteVisitPopup,
    setPropertyImage,
    setPropertyCategory,
    setPropertyId,
  } = useAuth();

  const phone =
    propertyInfo?.projectPartnerContact ||
    propertyInfo?.guestUserContact ||
    "8010881965";

  const WHATSAPP_NUMBER = `91${phone}`;

  const handleCall = () => {
    if (propertyInfo?.propertyid) {
      addVisitor({
        URI,
        propertyid: propertyInfo.propertyid,
        source: "call",
      });
    }

    window.location.href = `tel:+91${phone}`;
  };

  const handleWhatsApp = () => {
    if (propertyInfo?.propertyid) {
      addVisitor({
        URI,
        propertyid: propertyInfo.propertyid,
        source: "whatsapp",
      });
    }

    const msg = `Hello 👋
I found this property on Reparv and I'm interested.
Property: ${propertyInfo?.propertyName}
Property Link: https://www.reparv.in/property-info/${propertyInfo?.seoSlug}

Please share more details and site visit availability.

Enquiry via Reparv – www.reparv.in`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const handleSiteVisit = () => {
    setShowSiteVisitPopup(true);

    if (propertyInfo?.frontView) {
      setPropertyImage(JSON.parse(propertyInfo.frontView)[0]);
    }

    setPropertyId(propertyInfo?.propertyid);
    setPropertyCategory(propertyInfo?.propertyCategory);
  };

  const showEMI =
    !isRental(propertyInfo?.propertyCategory) &&
    propertyInfo?.loanAvailability !== "No";

  const showAvailability =
    (propertyInfo?.availableCount > 0 ||
      propertyInfo?.bookedCount > 0) &&
    isNewProperty(propertyInfo?.propertyCategory);

  const address = propertyInfo?.address
    ? `${propertyInfo.address}, `
    : "";

  const fullAddress = `${address}${propertyInfo?.state || ""} ${
    propertyInfo?.pincode || ""
  }`.trim();

  const showRERA = ["NewFlat", "NewPlot"].includes(
    propertyInfo?.propertyCategory
  );

  const showApproval =
    propertyInfo?.propertyApprovedBy &&
    propertyInfo?.propertyCategory !== "FarmLand";

  return (
    <div className="relative w-full max-w-[460px] bg-white rounded-2xl p-4 sm:p-5 flex flex-col gap-3 font-sans max-h-[75vh]">
      <div className="w-full max-h-[70vh] flex flex-col gap-3 overflow-scroll scrollbar-hide">
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight truncate">
              {propertyInfo?.propertyName}
            </h2>
            <p className="text-xs font-bold text-violet-600 mt-0.5">
              Project by{" "}
              <span className="underline cursor-pointer">
                {propertyInfo?.projectBy}
              </span>
            </p>
          </div>

          {showApproval && (
            <div className="flex-shrink-0 flex items-center gap-1.5 bg-violet-50 border border-violet-100 rounded-xl px-2.5 py-1.5">
              <div className="w-6 h-6 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                <ShieldIcon />
              </div>
              <p className="text-[9px] font-bold text-slate-700 uppercase tracking-wide leading-tight">
                {propertyInfo.propertyApprovedBy}
                <br />
                Approved
              </p>
            </div>
          )}
        </div>

        {/* ── Address ── */}
        {fullAddress && (
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
            <MapPinIcon />
            <span className="truncate">{fullAddress}</span>
          </div>
        )}

        {/* ── Availability pill ── */}
        {showAvailability && (
          <div className="inline-flex items-center gap-3 bg-violet-50/60 border border-violet-100 rounded-xl px-3 py-1.5 w-fit">
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              {propertyInfo.availableCount} Available
            </div>
            <div className="w-px h-3 bg-gray-300" />
            <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-red-500">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              {propertyInfo.bookedCount} Booked
            </div>
          </div>
        )}

        {/* ── Highlights grid ── */}
        <div className="grid grid-cols-3 gap-2">
          {showApproval && (
            <div className="flex flex-col items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl p-2.5">
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <ShieldIcon />
              </div>
              <span className="text-[9px] font-bold text-slate-600 text-center leading-tight">
                {propertyInfo.propertyApprovedBy} Approved
              </span>
            </div>
          )}
          {propertyInfo?.distanceFromCityCenter && (
            <div className="flex flex-col items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl p-2.5">
              <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <MapPinIcon />
              </div>
              <span className="text-[9px] font-bold text-slate-600 text-center leading-tight">
                {propertyInfo.distanceFromCityCenter} km from City
              </span>
            </div>
          )}
          <div className="flex flex-col items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl p-2.5">
            <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
              <CheckCircleIcon />
            </div>
            <span className="text-[9px] font-bold text-slate-600 text-center leading-tight">
              Assured Quality
            </span>
          </div>
        </div>

        {/* ── Pricing card ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 to-white border border-violet-100 rounded-xl p-4">
          {/* glow blob */}
          <div className="absolute -right-4 -top-6 w-28 h-28 bg-violet-100 rounded-full blur-2xl opacity-50 pointer-events-none" />

          <div className="flex items-start justify-between gap-4 relative">
            <div>
              <p className="text-[9px] font-extrabold text-violet-400 uppercase tracking-widest mb-1">
                Starting from
              </p>
              <div className="flex items-end gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">
                  <FormatPrice price={propertyInfo?.totalOfferPrice} />
                </span>
              </div>
              {propertyInfo?.originalPrice && (
                <p className="text-[11px] text-gray-400 line-through mt-1 font-medium">
                  <FormatPrice price={propertyInfo.originalPrice} />
                </p>
              )}
            </div>

            {propertyInfo?.savings && (
              <div className="flex-shrink-0 flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1.5 text-[10px] font-bold text-emerald-700">
                <TagIcon />
                Save <FormatPrice price={propertyInfo.savings} />
              </div>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-gray-200 flex items-center gap-1.5 text-[11px] font-bold text-violet-600">
            <ClockIcon />
            Limited Time Offer
          </div>
        </div>

        {/* ── EMI + Total Price: side-by-side on sm+, stacked on xs ── */}
        <div className="flex flex-col gap-4">
          {/* EMI card */}
          {showEMI && (
            <div className="flex-1 flex items-center justify-between gap-2 border border-slate-100 rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-indigo-50 text-violet-600 flex items-center justify-center">
                  <CreditCardIcon />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wide">
                    EMI starts at
                  </p>
                  <p className="text-sm font-extrabold text-slate-800 leading-tight">
                    <FormatPrice price={propertyInfo?.emi} />
                    <span className="text-[10px] text-gray-400 font-medium">
                      {" "}
                      /mo
                    </span>
                  </p>
                </div>
              </div>
              <button
                className="flex items-center gap-1 bg-violet-50 hover:bg-violet-100 transition-colors rounded-xl px-2.5 py-2 text-[11px] font-bold text-violet-700 whitespace-nowrap flex-shrink-0"
                onClick={() =>
                  user?.id
                    ? navigate("/home-loan-application")
                    : setShowLogin(true)
                }
              >
                Check <ArrowRightIcon />
              </button>
            </div>
          )}

          {/* Total price card */}
          <div className="flex-1 flex items-center justify-between gap-4 border border-slate-100 rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <BuildingIcon />
              </div>
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wide">
                  Total Price
                </p>
                <p className="text-sm font-extrabold text-slate-800 leading-tight">
                  <FormatPrice price={propertyInfo?.totalOfferPrice} />
                </p>
                <p className="text-[9px] text-gray-400 font-bold">
                  + Other Charges
                </p>
              </div>
            </div>
            <button
              className="flex items-center gap-1 bg-violet-50 hover:bg-violet-100 transition-colors rounded-xl px-2.5 py-2 text-[11px] font-bold text-violet-700 whitespace-nowrap flex-shrink-0"
              onClick={() => {
                setShowPriceSummery(true);
                setPriceSummery(propertyInfo);
              }}
            >
              Cost Sheet <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/* ── Features strip ── */}
        <div className="flex items-center justify-center gap-x-3 gap-y-1.5 bg-gray-50 border border-dashed border-gray-200 rounded-xl px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-500">
            <CheckCircleIcon />
            Transparent Pricing
          </div>
          <div className="hidden sm:block w-px h-3 bg-gray-300" />
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-500">
            <XCircleIcon />
            No Hidden Charges
          </div>
          {showRERA && (
            <>
              <div className="hidden sm:block w-px h-3 bg-gray-300" />
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-500">
                <GridIcon />
                RERA Registered
              </div>
            </>
          )}
        </div>
      </div>
      {/* ── CTA ── */}
      <div className="flex flex-col gap-3 bg-white">
        {/* ── Call / WhatsApp ── */}
        <div className="flex gap-4">
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-1.5 border border-violet-400 text-violet-600 hover:bg-violet-50 transition-colors rounded-xl py-2.5 text-[13px] font-bold"
          >
            <PhoneIcon /> Call
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-1.5 border border-green-400 text-green-700 hover:bg-green-50 transition-colors rounded-xl py-2.5 text-[13px] font-bold"
          >
            <WhatsAppIcon /> WhatsApp
          </button>
        </div>

        {/* ── Book Site Visit — hidden below md ── */}
        <button
          className="hidden w-full md:flex items-center justify-center gap-4 bg-violet-600 hover:bg-violet-700 active:scale-[0.99] transition-all rounded-xl py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-300 tracking-wide"
          onClick={handleSiteVisit}
        >
          <CalendarIcon /> Book Site Visit Now
        </button>
        <p className=" text-center text-[11px] text-gray-400 font-medium">
          Free site visit • No brokerage charges
        </p>
      </div>
    </div>
  );
}