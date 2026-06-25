"use client";
import { useState } from "react";

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
const ArrowRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const ChevronDown = ({ open }) => (
  <svg className={`w-3 h-3 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const CheckCircle = () => (
  <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-5 h-5 text-[#4500B4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const LocationIcon = () => (
  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const BuildingIcon = () => (
  <svg className="w-5 h-5 text-[#4500B4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const HeartIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const ZeroBrokerageIcon = () => (
  <svg className="w-5 h-5 text-[#4500B4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /><circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LegalIcon = () => (
  <svg className="w-5 h-5 text-[#4500B4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const PlotIcon = () => (
  <svg className="w-6 h-6 text-[#4500B4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
  </svg>
);
const RentalIcon = () => (
  <svg className="w-6 h-6 text-[#4500B4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);
const NewProjectIcon = () => (
  <svg className="w-6 h-6 text-[#4500B4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);
const ReadyMoveIcon = () => (
  <svg className="w-6 h-6 text-[#4500B4]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const SelectIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// ── Category Card ─────────────────────────────────────────────────────────────
function CategoryCard({ icon, label }) {
  return (
    <a href="#" className="flex flex-col items-center gap-3 p-6 bg-[#F9F9FF] rounded-2xl shadow-sm hover:shadow-md hover:border-violet-300 border border-transparent transition-all group">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
        {icon}
      </div>
      <div className="flex items-center gap-2 text-sm text-[#151C27]">
        <span>{label}</span>
        <ArrowRight className="w-3 h-3 text-[#5E23DC]" />
      </div>
    </a>
  );
}

// ── Property Card ─────────────────────────────────────────────────────────────
function PropertyCard({ badge, badgeColor = "bg-[#8A38F5]", label, location, title, type, oldPrice, price }) {
  return (
    <div className="bg-white rounded-2xl shadow-[6px_4px_23px_1px_rgba(63,45,98,0.15)] overflow-hidden flex-shrink-0 w-72 sm:w-auto hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gradient-to-br from-amber-700 to-amber-500 flex items-center justify-center">
        <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        {/* Badge top-left */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5">
          <div className={`${badgeColor} rounded-md px-2 py-1 flex items-center gap-1`}>
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            <span className="text-white text-[10px] font-bold">{badge}</span>
          </div>
        </div>
        {/* Heart top-right */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform">
          <HeartIcon />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          <LocationIcon />
          <span className="text-xs text-gray-400">{location}</span>
        </div>
        <h3 className="font-bold text-[#151C27] text-base mb-3">{title}</h3>
        {/* Type + Price row */}
        <div className="bg-[#8A38F5]/10 rounded-[22px] px-3 py-2 flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <BuildingIcon />
            <span className="text-xs font-semibold text-[#8A38F5]">{type}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 line-through">{oldPrice}</p>
            <p className="text-base font-black text-[#151C27]">{price}</p>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-[#8A38F5] flex items-center justify-center bg-white">
              <UserIcon />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Lucky</p>
              <p className="text-[10px] text-gray-400">Owner</p>
            </div>
          </div>
          <button className="bg-[#8A38F5] hover:bg-[#7c3aed] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Why Card ──────────────────────────────────────────────────────────────────
function WhyCard({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-6">
      <div className="w-12 h-12 bg-[#5E23DC]/10 rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-[#151C27] mb-2">{title}</h4>
        <p className="text-base text-[#5F5D69] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── Journey Step ─────────────────────────────────────────────────────────────
function JourneyStep({ num, title, desc }) {
  return (
    <div className="flex flex-col items-start gap-3 flex-1 min-w-0">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-[#4500B4] flex items-center justify-center shadow-[0_0_0_8px_#F9F9FF]">
          <span className="text-white font-bold text-base">{num}</span>
        </div>
      </div>
      <div className="pt-3">
        <h4 className="text-lg font-bold text-[#151C27] mb-2">{title}</h4>
        <p className="text-sm text-[#5F5D69] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── Insight Card ──────────────────────────────────────────────────────────────
function InsightCard({ tag, title, desc }) {
  return (
    <div className="bg-white rounded-3xl shadow-[0px_10px_30px_rgba(94,35,220,0.04)] overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-44 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
        <svg className="w-14 h-14 text-white/50" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="p-8">
        <p className="text-xs font-bold text-[#4500B4] tracking-[1.2px] uppercase mb-3">{tag}</p>
        <h3 className="text-xl font-medium text-[#151C27] leading-[30px] mb-4">{title}</h3>
        <p className="text-sm text-[#5F5D69] leading-6 mb-6">{desc}</p>
        <a href="#" className="flex items-center gap-2 text-[#4500B4] font-bold text-sm hover:gap-3 transition-all">
          Read More <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#CBC3D8] rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center px-6 py-[22px] text-left gap-4 hover:bg-gray-50 transition-colors">
        <span className="text-base text-[#151C27]">{q}</span>
        <ChevronDown open={open} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#5F5D69] leading-relaxed border-t border-[#CBC3D8]">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function PlotsForSale() {
  const [form, setForm] = useState({ name: "", phone: "", area: "Dharampeth" });

  const categories = [
    { icon: <BuildingIcon />, label: "Flats for Sale" },
    { icon: <PlotIcon />, label: "Plots for Sale" },
    { icon: <RentalIcon />, label: "Rental Properties" },
    { icon: <NewProjectIcon />, label: "New Projects" },
    { icon: <ReadyMoveIcon />, label: "Ready to Move" },
  ];

  const properties = [
    { badge: "Verified", badgeColor: "bg-[#8A38F5]", location: "Property Location (5KM)", title: "3 BHK MarlBoro House", type: "New Flat", oldPrice: "₹20Lakh", price: "₹15Lakh" },
    { badge: "New Launch", badgeColor: "bg-[#8A38F5]", location: "Property Location (5KM)", title: "3 BHK MarlBoro House", type: "New Flat", oldPrice: "₹20Lakh", price: "₹15Lakh" },
    { badge: "Hot Deal", badgeColor: "bg-[#8A38F5]", location: "Property Location (5KM)", title: "3 BHK MarlBoro House", type: "New Flat", oldPrice: "₹20Lakh", price: "₹15Lakh" },
  ];

  const whyItems = [
    {
      icon: <ShieldIcon />,
      title: "Verified Listings Only",
      desc: "Every property goes through legal and ownership verification so you never deal with fake listings.",
    },
    {
      icon: <ZeroBrokerageIcon />,
      title: "Zero Brokerage",
      desc: "No hidden charges or last-minute surprises. What you see is what you pay — complete pricing transparency.",
    },
    {
      icon: <LegalIcon />,
      title: "Legal Support",
      desc: "From agreement to registry, our experts assist you at every step to ensure a smooth and safe transaction.",
    },
  ];

  const journeySteps = [
    { num: 1, title: "Share Requirement", desc: "Tell us your budget and preferred location in Nagpur." },
    { num: 2, title: "Shortlist Properties", desc: "Our experts curate the best options matching your profile." },
    { num: 3, title: "Site Visit", desc: "Guided visits with experts for honest property insights." },
    { num: 4, title: "Legal Verification", desc: "Professional documentation and legal checks for peace of mind." },
    { num: 5, title: "Possession", desc: "Smooth transition to your new home with complete support." },
  ];

  const insights = [
    {
      tag: "Market Trends",
      title: "Best Areas to Buy Property in Nagpur: 2026 Edition",
      desc: "A detailed guide covering price trends, connectivity, and livability of top residential areas.",
    },
    {
      tag: "Buying Guide",
      title: "Flat vs Plot – What Should You Buy in Nagpur?",
      desc: "Understand the pros, cons, and long-term value of flats and plots in the current market.",
    },
    {
      tag: "Legal Corner",
      title: "Home Loan & Registry Process Explained",
      desc: "Step-by-step explanation of home loans, stamp duty, and property registration in Maharashtra.",
    },
  ];

  const faqs = [
    { q: "Are all properties on Reparv legally verified?", a: "Yes, every property listed on Reparv undergoes a comprehensive 24-point legal verification process covering title, RERA, encumbrance, and ownership documents before being listed." },
    { q: "Do you charge brokerage for buying or renting property?", a: "No. Reparv operates on a zero-brokerage model. You pay no commission or hidden fees when buying or renting through our platform." },
    { q: "Can I schedule a site visit through Reparv?", a: "Absolutely. You can schedule guided site visits with our property advisors directly through the platform. We accompany you and provide honest insights about each property." },
    { q: "Do you help with home loans and documentation?", a: "Yes. Our legal and financial experts assist you through the entire process — from home loan applications to stamp duty calculation, registry, and documentation." },
  ];

  return (
    <div className="bg-[#F9F9FF] font-['Segoe_UI',sans-serif] text-[#151C27] min-w-0">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="bg-white relative overflow-hidden min-h-[640px] lg:min-h-[700px]">
        {/* Right decorative background */}
        <div className="absolute right-0 top-0 bottom-0 w-[33.33%] bg-[#E4E0EF] rounded-l-[120px] hidden lg:block" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-16 lg:pt-24 lg:pb-20 relative">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="flex-1 min-w-0 z-10">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-[#E4E0EF] rounded-full px-3 py-1.5 mb-6">
                <svg className="w-4 h-4 text-[#4500B4]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span className="text-[#4500B4] text-sm">Trusted • Verified • Zero Brokerage</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-[#151C27] leading-[1.17] tracking-[-0.96px] mb-5">
                Find Verified Properties<br className="hidden sm:block" />
                <span className="text-[#4500B4]"> in Nagpur</span>
              </h1>

              <p className="text-base text-[#5F5D69] leading-6 max-w-xl mb-8">
                Premium real estate storytelling for modern homes. Buy or rent verified properties with complete legal support and zero hidden costs.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="bg-[#5E23DC] hover:bg-[#4500B4] text-white font-medium text-base px-8 py-[18px] rounded-lg transition-colors shadow-[0_20px_25px_-5px_rgba(69,0,180,0.2),0_8px_10px_-6px_rgba(69,0,180,0.2)]">
                  Explore Properties
                </button>
                <button className="border-2 border-[#4500B4] text-[#4500B4] hover:bg-[#4500B4] hover:text-white font-medium text-base px-8 py-4 rounded-lg transition-colors">
                  Talk to Property Expert
                </button>
              </div>

              {/* Divider + Stats */}
              <div className="border-t border-[#CBC3D8] pt-8">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: "500+", label: "Verified Listings" },
                    { val: "0%", label: "Brokerage" },
                    { val: "24/7", label: "Legal Support" },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-base font-medium text-[#4500B4]">{s.val}</p>
                      <p className="text-xs text-[#5F5D69] uppercase tracking-[0.6px] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Property Image Card */}
            <div className="w-full lg:w-[45%] xl:w-[48%] flex-shrink-0 z-10">
              <div className="relative rounded-[32px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                {/* Main building image */}
                <div className="h-[320px] sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-amber-800 via-amber-600 to-amber-500 flex items-center justify-center relative">
                  <svg className="w-32 h-32 text-white/20" fill="none" stroke="currentColor" strokeWidth={0.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Frosted glass info card */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[#5E23DC] text-xs font-bold tracking-[1.2px] uppercase mb-1">Upcoming Project</p>
                        <p className="text-[#151C27] text-base font-medium">Luxury Residential, Dharampeth</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#4500B4] text-sm font-bold">Starting ₹1.2 Cr</p>
                        <p className="text-[#5F5D69] text-xs mt-0.5">Launching 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT ARE YOU LOOKING FOR ════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-[32px] font-bold text-[#151C27] tracking-[-0.32px] mb-4">What Are You Looking For?</h2>
            <p className="text-base text-[#5F5D69]">Tailored categories to simplify your home search in Nagpur</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(c => <CategoryCard key={c.label} {...c} />)}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROPERTIES ═════════════════════════════════════════════ */}
      <section className="bg-[#F9F9FF] py-20 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-[32px] font-bold text-[#151C27] tracking-[-0.32px] mb-2">Featured Verified Properties</h2>
              <p className="text-base text-[#5F5D69]">Every property listed here has undergone a 24-point legal verification process.</p>
            </div>
            <a href="#" className="flex items-center gap-2 text-[#4500B4] text-sm font-medium whitespace-nowrap hover:gap-3 transition-all">
              View All Properties <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          {/* Horizontal scroll on mobile, grid on lg */}
          <div className="flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {properties.map((p, i) => <PropertyCard key={i} {...p} />)}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE REPARV ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
            {/* Left */}
            <div>
              <h2 className="text-3xl sm:text-[32px] font-bold text-[#151C27] tracking-[-0.32px] mb-5">We Build Trust, Not Just Transactions</h2>
              <p className="text-lg text-[#5F5D69] leading-7 mb-10">
                Reparv is built to remove confusion, risk, and hidden costs from property buying and selling in Nagpur. We focus on transparency for every customer.
              </p>
              <div className="flex flex-col gap-8">
                {whyItems.map(w => <WhyCard key={w.title} {...w} />)}
              </div>
            </div>
            {/* Right — image with stats overlay */}
            <div className="relative">
              <div className="bg-[#E4E0EF] rounded-[48px] overflow-hidden h-[400px] lg:h-[516px] flex items-center justify-center relative">
                <svg className="w-32 h-32 text-[#4500B4]/20" fill="none" stroke="currentColor" strokeWidth={0.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              {/* Stats overlay — bottom-left */}
              <div className="absolute -bottom-5 -left-5 bg-white border border-[#E8DDFF] rounded-3xl p-8 shadow-[0_10px_30px_rgba(94,35,220,0.04)]">
                <p className="text-[32px] font-bold text-[#4500B4] tracking-[-0.32px]">10k+</p>
                <p className="text-xs font-bold text-[#5F5D69] mt-1">Happy Homeowners</p>
              </div>
              {/* Rating overlay — top-right */}
              <div className="absolute top-10 -right-5 bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-[0_10px_30px_rgba(94,35,220,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {["bg-slate-300", "bg-slate-400", "bg-slate-500"].map((c, i) => (
                      <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white flex items-center justify-center`}>
                        <UserIcon />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                    <span className="text-xs font-bold text-[#151C27] ml-1">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BUYING JOURNEY ══════════════════════════════════════════════════ */}
      <section className="bg-[#F9F9FF] py-20 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-[32px] font-bold text-[#151C27] tracking-[-0.32px] mb-4">Your Journey to a New Home</h2>
            <p className="text-base text-[#5F5D69]">A simple, transparent process designed to save you time and money.</p>
          </div>
          {/* Steps */}
          <div className="relative">
            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-6 left-6 right-[180px] h-0.5 bg-[#CBC3D8] z-0" />
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 relative z-10">
              {journeySteps.map((s, i) => (
                <JourneyStep key={i} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPERT CONSULTATION ════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-24 px-4 sm:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-[#5E23DC] rounded-[40px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden relative">
            {/* Decorative blurs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 blur-3xl rounded-full" />

            <div className="grid lg:grid-cols-2 relative z-10">
              {/* Left — violet content */}
              <div className="p-10 sm:p-16 lg:p-20 flex flex-col gap-8">
                <h2 className="text-3xl sm:text-[32px] font-bold text-white leading-10 tracking-[-0.32px]">
                  Get Expert Advice on Your Property Journey
                </h2>
                <ul className="flex flex-col gap-6">
                  {[
                    "Understand current market trends in Nagpur",
                    "Get specialized advice for first-time buyers",
                    "Expert negotiation assistance for the best price",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle />
                      </div>
                      <span className="text-lg text-white leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Testimonial */}
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                  <p className="text-base italic text-white/90 leading-6 mb-4">
                    "The Reparv team made my first home buying experience in Nagpur absolutely stress-free. No brokerage and complete legal peace of mind."
                  </p>
                  <p className="text-base text-white">— Rahul Deshmukh, Homeowner</p>
                </div>
              </div>

              {/* Right — white form */}
              <div className="bg-white p-10 sm:p-16 lg:p-20 flex flex-col gap-8">
                <h3 className="text-base text-[#151C27]">Speak with an Expert</h3>
                <div className="flex flex-col gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#5F5D69] tracking-[0.28px]">Full Name</label>
                    <input
                      type="text" placeholder="John Doe"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#E4E0EF] rounded-xl px-4 py-[18px] text-base text-gray-500 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#5E23DC] transition"
                    />
                  </div>
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#5F5D69] tracking-[0.28px]">Phone Number</label>
                    <input
                      type="tel" placeholder="+91 98765 43210"
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#E4E0EF] rounded-xl px-4 py-[18px] text-base text-gray-500 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#5E23DC] transition"
                    />
                  </div>
                  {/* Area of Interest */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#5F5D69] tracking-[0.28px]">Area of Interest</label>
                    <div className="relative">
                      <select
                        value={form.area} onChange={e => setForm({ ...form, area: e.target.value })}
                        className="w-full appearance-none bg-[#E4E0EF] rounded-xl px-4 py-4 text-base text-[#151C27] outline-none focus:ring-2 focus:ring-[#5E23DC] transition cursor-pointer"
                      >
                        {["Dharampeth", "Sadar", "Sitabuldi", "Nagpur Central", "Ramdaspeth", "Civil Lines"].map(a => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <SelectIcon />
                      </div>
                    </div>
                  </div>
                  {/* Submit */}
                  <button className="w-full bg-[#5E23DC] hover:bg-[#4500B4] text-white font-bold text-lg py-[18px] rounded-xl transition-colors shadow-[0_10px_15px_-3px_rgba(69,0,180,0.2),0_4px_6px_-4px_rgba(69,0,180,0.2)]">
                    Request Callback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROPERTY INSIGHTS ═══════════════════════════════════════════════ */}
      <section className="bg-[#F9F9FF] py-20 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-[32px] font-bold text-[#151C27] tracking-[-0.32px] mb-4">Property Insights &amp; Buying Guides</h2>
            <p className="text-base text-[#5F5D69]">Stay informed with expert-written guides and local market insights.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((ins, i) => <InsightCard key={i} {...ins} />)}
          </div>
        </div>
      </section>

      {/* ══ PARTNER CTA ═════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 sm:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative bg-gradient-to-br from-[#4500B4] to-[#5E23DC] rounded-[48px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] px-10 sm:px-24 py-24 overflow-hidden text-center">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.96px] mb-4">Become a Project Partner</h2>
              <p className="text-xl sm:text-2xl text-white/80 leading-6 max-w-2xl mx-auto mb-10">
                List your project with Reparv and reach verified buyers faster. We help with marketing, site visits, and closures.
              </p>
              <button className="bg-white text-[#4500B4] hover:bg-gray-50 font-bold text-lg px-12 py-[22px] rounded-xl transition-colors shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-[768px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-[32px] font-bold text-[#151C27] tracking-[-0.32px] mb-4">Frequently Asked Questions</h2>
            <p className="text-base text-[#5F5D69]">Common questions buyers and sellers ask before dealing in property in Nagpur.</p>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => <FaqItem key={i} {...faq} />)}
          </div>
        </div>
      </section>

    </div>
  );
}