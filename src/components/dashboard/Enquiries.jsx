"use client"

import { useState } from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { getImageURI } from "../../utils/helper";

const PAGE_SIZE = 5;
const FALLBACK_IMAGE = "/assets/property/propertyPicture.svg";

const getPropertyImage = (item) => {
  try {
    const images = JSON.parse(item?.frontView || "[]");
    return images.length > 0 ? getImageURI(images[0]) || FALLBACK_IMAGE : FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
};

const formatBudget = (min, max) => {
  const toLac = (v) => {
    const n = Number(v);
    if (!n) return null;
    return n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : `₹${(n / 100000).toFixed(1)} L`;
  };
  const lo = toLac(min);
  const hi = toLac(max);
  if (lo && hi) return `${lo} – ${hi}`;
  return lo || hi || null;
};

export default function Enquiries({ enquiries }) {
  const [visibleEnquiriesCount, setVisibleEnquiriesCount] = useState(PAGE_SIZE);
  const visibleEnquiries = enquiries?.slice(0, visibleEnquiriesCount);
  const remaining = (enquiries?.length || 0) - visibleEnquiriesCount;

  return (
    <div className="md:bg-white md:rounded-xl md:border border-[#D9D9D9] md:p-4">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4">
        Recent Enquiries{" "}
        <span className="text-sm font-normal text-gray-500">({enquiries?.length || 0})</span>
      </h2>

      {/* List */}
      <div className="space-y-3 w-full">
        {visibleEnquiries?.map((item) => {
          const contact = String(item?.contact || "").replace(/\D/g, "").slice(-10);
          const budget = formatBudget(item?.minbudget, item?.maxbudget);
          const [date, time] = String(item?.created_at || "").split("|").map((s) => s.trim());

          return (
            <div
              key={item?.enquirersid}
              className="w-full flex flex-col gap-3 md:flex-row md:items-center justify-between border border-[#D9D9D9] rounded-xl p-4"
            >
              {/* Left */}
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={getPropertyImage(item)}
                  alt={item?.propertyName || "Property"}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="w-14 h-14 shrink-0 rounded-full object-cover bg-gray-100"
                />

                <div className="min-w-0">
                  <h3 className="font-bold text-base truncate">
                    {item?.customer || "Interested buyer"}
                  </h3>
                  <p className="text-xs text-[#828282] truncate">
                    Enquired about{" "}
                    <span className="font-semibold text-gray-700">{item?.propertyName}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#828282] mt-1">
                    {contact && <span>+91 {contact}</span>}
                    {budget && <span>Budget: {budget}</span>}
                    {item?.status && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F2EBFF] text-[#5323DC] font-semibold">
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                {date && (
                  <div className="text-xs text-gray-400 md:text-right">
                    {date}
                    {time && <span className="block">{time}</span>}
                  </div>
                )}

                {contact && (
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:+91${contact}`}
                      className="flex items-center gap-1.5 bg-[#5323DC] text-xs text-white px-3 py-2 rounded-lg hover:opacity-95 transition"
                    >
                      <FaPhoneAlt size={11} /> Call
                    </a>
                    <a
                      href={`https://wa.me/91${contact}?text=${encodeURIComponent(
                        `Hi ${item?.customer || ""}, thanks for your enquiry about ${item?.propertyName || "my property"} on Reparv.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-green-500 text-green-600 text-xs px-3 py-2 rounded-lg hover:bg-green-50 transition"
                    >
                      <FaWhatsapp size={13} /> WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {remaining > 0 && (
          <div className="mt-2 flex justify-center">
            <button
              onClick={() => setVisibleEnquiriesCount((c) => c + PAGE_SIZE)}
              className="px-6 py-2 border border-[#8A38F5] font-semibold rounded-full bg-white text-[#8A38F5] hover:bg-purple-50"
            >
              Show More ({remaining} left)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
