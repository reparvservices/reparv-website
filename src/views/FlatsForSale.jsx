"use client";
import { useState } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const ChevronDown = ({ cls = "w-4 h-4 text-gray-500 flex-shrink-0" }) => (
  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const ArrowRight = ({ cls = "w-4 h-4" }) => (
  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const CheckDot = ({ color = "#10B981" }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0 mt-0.5">
    <circle cx="5" cy="5" r="5" fill={color} />
  </svg>
);
const GreenCheck = () => (
  <svg className="w-4 h-4 text-[#10B981] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const PurpleCheck = () => (
  <svg className="w-4 h-4 text-[#5E23DC] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-5 h-5 text-[#5E23DC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const DownloadIcon = () => (
  <svg className="w-5 h-5 text-[#5E23DC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

// ── FAQ accordion ─────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-[#F3F4F6] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center px-6 py-5 text-left gap-4 hover:bg-gray-50/50 transition-colors">
        <span className="font-['Manrope'] font-black text-sm text-[#111827]">{q}</span>
        <span className="text-[#5E23DC] text-lg font-light flex-shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-6 pb-5 border-t border-gray-100">
          <p className="pt-4 font-['Manrope'] text-sm text-[#6B7280] leading-[23px]">{a}</p>
        </div>
      )}
    </div>
  );
}

// ── Flat Card ─────────────────────────────────────────────────────────────────
function FlatCard({ badge, location, title, price }) {
  return (
    <div className="bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden flex-shrink-0 w-64 sm:w-auto hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
        <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <div className="absolute top-3 left-3 bg-[#5E23DC] rounded px-2 py-0.5">
          <span className="font-['Manrope'] font-bold text-[10px] text-white uppercase">{badge}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-1">
        <p className="font-['Manrope'] font-bold text-[10px] text-[#9CA3AF] uppercase tracking-wide">{location}</p>
        <h3 className="font-['Manrope'] font-black text-lg text-[#111827]">{title}</h3>
        <p className="font-['Manrope'] font-black text-xl text-[#5E23DC] mt-1">{price}</p>
        <button className="w-full border border-[#5E23DC] text-[#5E23DC] font-['Manrope'] font-bold text-sm py-2.5 rounded-xl mt-2 hover:bg-[#5E23DC] hover:text-white transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ badge, badgeBg, name, sub, priceOrDate, btnLabel = "Register Interest" }) {
  return (
    <div className="flex flex-col gap-1 flex-shrink-0 w-72 sm:w-auto hover:shadow-md transition-shadow">
      <div className="relative h-56 bg-gradient-to-br from-violet-300 to-violet-600 rounded-2xl overflow-hidden flex items-center justify-center">
        <svg className="w-14 h-14 text-white/30" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <div className="absolute top-4 left-4" style={{ background: badgeBg }} dangerouslySetInnerHTML={{ __html: `<span class="font-['Manrope'] font-bold text-[10px] text-white uppercase px-3 py-1 rounded-full inline-block">${badge}</span>` }} />
      </div>
      <div className="pt-3 flex flex-col gap-1">
        <h3 className="font-['Manrope'] font-black text-xl text-[#111827]">{name}</h3>
        <p className="font-['Manrope'] text-sm text-[#9CA3AF]">{sub}</p>
        <p className="font-['Manrope'] font-bold text-base text-[#5E23DC] py-1">{priceOrDate}</p>
        <button className="w-full bg-[rgba(94,35,220,0.05)] text-[#5E23DC] font-['Manrope'] font-bold text-sm py-3 rounded-xl hover:bg-[rgba(94,35,220,0.1)] transition-colors">
          {btnLabel}
        </button>
      </div>
    </div>
  );
}

// ── Area Card ─────────────────────────────────────────────────────────────────
function AreaCard({ name, priceRange, priceColor, borderColor, iconBg, iconColor, items, linkColor }) {
  return (
    <div className={`bg-white border-t-4 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col gap-1 hover:shadow-md transition-shadow flex-shrink-0 w-52 sm:w-auto`} style={{ borderTopColor: borderColor }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1 text-xl" style={{ background: iconBg }}>
        🏙️
      </div>
      <h3 className="font-['Manrope'] font-black text-lg text-[#111827] pt-3">{name}</h3>
      <p className="font-['Manrope'] font-bold text-sm" style={{ color: priceColor }}>{priceRange}</p>
      <div className="flex flex-col gap-2 py-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckDot color="#22C55E" />
            <span className="font-['Manrope'] text-[11px] text-[#6B7280] leading-4">{item}</span>
          </div>
        ))}
      </div>
      <a href="#" className="font-['Manrope'] font-bold text-xs border-b pb-0.5 hover:opacity-80 transition-opacity" style={{ color: linkColor, borderColor: linkColor }}>
        View Flats →
      </a>
    </div>
  );
}

// ── Persona Card ──────────────────────────────────────────────────────────────
function PersonaCard({ bg, border, badge, badgeBg, badgeText, title, desc, btnColor, btnText }) {
  return (
    <div className={`border rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow flex-shrink-0 w-64 sm:w-auto`} style={{ background: bg, borderColor: border }}>
      <div>
        <div className="mb-3">
          <span className="font-['Manrope'] font-bold text-[10px] uppercase px-2 py-1 rounded" style={{ background: badgeBg, color: badgeText }}>{badge}</span>
        </div>
        <h3 className="font-['Manrope'] font-black text-xl text-[#111827] mb-2">{title}</h3>
        <p className="font-['Manrope'] text-sm text-[#6B7280] leading-5">{desc}</p>
      </div>
      <button className="w-full font-['Manrope'] font-bold text-sm py-2 rounded-lg mt-6 text-white hover:opacity-90 transition-opacity shadow-sm" style={{ background: btnColor }}>
        {btnText}
      </button>
    </div>
  );
}

// ── Story Card ────────────────────────────────────────────────────────────────
function StoryCard({ initials, name, role, location, problem, outcome }) {
  return (
    <div className="bg-white border border-[#F9FAFB] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-3xl p-8 flex flex-col gap-6 hover:shadow-md transition-shadow flex-shrink-0 w-72 sm:w-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-black text-base flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="font-['Manrope'] font-black text-sm text-[#111827]">{name}</p>
            <p className="font-['Manrope'] text-xs text-[#9CA3AF]">{role}</p>
          </div>
        </div>
        <span className="font-['Manrope'] font-bold text-xs text-[#5E23DC]">{location}</span>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-['Manrope'] font-bold text-[10px] uppercase text-[#9CA3AF] mb-1">Problem</p>
          <p className="font-['Manrope'] text-sm text-[#4B5563] leading-5">{problem}</p>
        </div>
        <div>
          <p className="font-['Manrope'] font-bold text-[10px] uppercase text-[#9CA3AF] mb-1">Outcome</p>
          <div className="flex items-start gap-2">
            <span className="text-[#5E23DC] font-bold text-sm">→</span>
            <p className="font-['Manrope'] font-bold text-sm text-[#5E23DC] leading-5">{outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function FlatsForSale() {
  const [filters, setFilters] = useState({ bhk: "Any", budget: "Any", status: "Any", area: "All Areas" });
  const [form, setForm] = useState({ name: "", phone: "", bhk: "Select BHK" });

  const flats = [
    { badge: "Verified", location: "Manish Nagar, Nagpur", title: "2 BHK Apartment", price: "₹42.00 Lacs" },
    { badge: "Premium", location: "Wardha Road, Nagpur", title: "3 BHK Apartment", price: "₹68.50 Lacs" },
    { badge: "Ready", location: "Besa, Nagpur", title: "2 BHK Apartment", price: "₹38.00 Lacs" },
    { badge: "New", location: "MIHAN, Nagpur", title: "1 BHK Apartment", price: "₹24.00 Lacs" },
  ];

  const projects = [
    { badge: "Pre Launch", badgeBg: "#F97316", name: "Shree Vishv Residency", sub: "Manish Nagar | 1, 2, 3 BHK", priceOrDate: "Expected Price: ₹32 Lacs+" },
    { badge: "Ready", badgeBg: "#10B981", name: "Skyline Heights", sub: "Wardha Road | 2, 3, 4 BHK", priceOrDate: "Finalization: Dec 2025" },
    { badge: "New Launch", badgeBg: "#5E23DC", name: "Royal Heritage Phase 2", sub: "Besa | 2, 3 BHK", priceOrDate: "New Launch Offers Available" },
  ];

  const areas = [
    { name: "Manish Nagar", priceRange: "₹3.5k - ₹5k/sqft", priceColor: "#5E23DC", borderColor: "#5E23DC", iconBg: "rgba(94,35,220,0.1)", iconColor: "#5E23DC", items: ["Active residential hub", "Great schools nearby", "Good connectivity"], linkColor: "#5E23DC" },
    { name: "Wardha Road", priceRange: "₹3k - ₹4.5k/sqft", priceColor: "#2563EB", borderColor: "#3B82F6", iconBg: "#DBEAFE", iconColor: "#2563EB", items: ["IT parks nearby", "Airport proximity"], linkColor: "#2563EB" },
    { name: "Besa", priceRange: "₹2.8k - ₹4k/sqft", priceColor: "#EA580C", borderColor: "#F97316", iconBg: "#FFEDD5", iconColor: "#EA580C", items: ["Premium area", "Green surroundings"], linkColor: "#EA580C" },
    { name: "MIHAN", priceRange: "₹2.5k - ₹3.8k/sqft", priceColor: "#4F46E5", borderColor: "#6366F1", iconBg: "#E0E7FF", iconColor: "#4F46E5", items: ["Corporate zone", "MIHAN-SEZ access"], linkColor: "#4F46E5" },
    { name: "Hingna", priceRange: "₹2.2k - ₹3.5k/sqft", priceColor: "#9333EA", borderColor: "#A855F7", iconBg: "#F3E8FF", iconColor: "#9333EA", items: ["Affordable zone", "Growing area"], linkColor: "#9333EA" },
  ];

  const areaLinks = [
    ["Flats in Manish Nagar", "Flats on Wardha Road", "Flats in Besa", "Flats in MIHAN"],
    ["Flats in Hingna", "Flats near Airport", "Flats in Dharampeth", "Flats in South Nagpur"],
  ];

  const personas = [
    { bg: "#EFF6FF", border: "#DBEAFE", badge: "FAMILY", badgeBg: "#DBEAFE", badgeText: "#2563EB", title: "Family Buyer", desc: "Focus: Safety, schools, connectivity, amenities. Typical Budget: ₹45-80 Lacs.", btnColor: "#2563EB", btnText: "Show Matching Flats" },
    { bg: "#FAF5FF", border: "#F3E8FF", badge: "PROFESSIONAL", badgeBg: "#F3E8FF", badgeText: "#9333EA", title: "Working Professional", desc: "Focus: Proximity to IT hubs, gym, lifestyle. Typical Budget: ₹35-60 Lacs.", btnColor: "#9333EA", btnText: "Show Matching Flats" },
    { bg: "#F0FDF4", border: "#DCFCE7", badge: "INVESTOR", badgeBg: "#DCFCE7", badgeText: "#16A34A", title: "Investor", desc: "Focus: Rental yield, appreciation, location potential. Typical Budget: ₹30-50 Lacs.", btnColor: "#16A34A", btnText: "Show Matching Flats" },
    { bg: "#FFF7ED", border: "#FFEDD5", badge: "FIRST-TIME", badgeBg: "#FFEDD5", badgeText: "#EA580C", title: "First-Time Buyer", desc: "Focus: Loan support, legal clarity, budget. Typical Budget: ₹25-45 Lacs.", btnColor: "#EA580C", btnText: "Show Matching Flats" },
  ];

  const stories = [
    { initials: "RD", name: "Rahul Deshmukh", role: "IT Manager", location: "Wardha Road", problem: "Struggled to find a verified flat without high brokerage in Nagpur.", outcome: "Bought verified 2BHK flat with 0% brokerage via Reparv." },
    { initials: "EP", name: "Elan Peethambaram", role: "Entrepreneur", location: "Manish Nagar", problem: "Too many options, confused about legal paperwork and RERA status.", outcome: "Reparv expert simplified RERA check & got his dream 3BHK." },
    { initials: "PD", name: "Priya Dongre", role: "NRI Investor", location: "MIHAN Zone", problem: "Wanted an investment-ready flat near Nagpur Airport.", outcome: "Invested in MIHAN flat with 8% rental yield via Reparv." },
  ];

  const faqs = [
    { q: "Ready to move vs under construction — what to select?", a: "Ready-to-move flats are great for immediate needs and saving GST, whereas under-construction flats offer better capital appreciation and flexible payments. Your choice depends on urgency and financial capacity." },
    { q: "Are there simple plots in Nagpur?", a: "Yes, Reparv lists verified residential and commercial plots across all major Nagpur zones including Wardha Road, Besa, MIHAN, and Hingna with complete legal verification." },
    { q: "What is the average cost of flats in Nagpur?", a: "Flat prices in Nagpur range from ₹20 Lacs for 1 BHK in developing areas to ₹80+ Lacs for premium 3 BHK apartments in Besa, Manish Nagar, and Wardha Road. Average price is ₹3,500–5,000 per sqft." },
  ];

  return (
    <div className="bg-[#F9FAFB] font-['Manrope',sans-serif] min-w-0 overflow-x-hidden">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#8A38F5] to-[#5E23DC] relative overflow-hidden pt-20 pb-20 min-h-[580px] flex items-center">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumbs */}
              <div className="flex gap-3 mb-5">
                {["Flats for Sale", "Nagpur"].map(b => (
                  <span key={b} className="bg-white/10 text-white font-['Manrope'] font-semibold text-xs px-3 py-1 rounded-full">{b}</span>
                ))}
              </div>
              <h1 className="font-['Manrope'] font-black text-5xl text-white leading-[48px] mb-5">
                Flats for Sale<br />in Nagpur
              </h1>
              <p className="font-['Manrope'] text-lg text-white/80 leading-7 mb-7 max-w-[447px]">
                Explore 2, 3 BHK Apartments & new flat listings in Nagpur. Buy verified properties with complete legal support and zero hidden costs.
              </p>
              <div className="flex flex-wrap gap-4 mb-5">
                <button className="bg-white text-[#5E23DC] font-['Manrope'] font-bold text-base px-6 py-3 rounded-lg hover:bg-violet-50 transition-colors shadow">
                  Show Flats
                </button>
                <button className="bg-white/10 border border-white/20 text-white font-['Manrope'] font-bold text-base px-6 py-3 rounded-lg hover:bg-white/20 transition-colors">
                  Talk to Expert
                </button>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-5">
                {["500+ Listings", "RERA Verified", "0% Brokerage"].map(b => (
                  <div key={b} className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="font-['Manrope'] text-xs text-white/60">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — building image card */}
            <div className="w-full lg:w-[458px] flex-shrink-0 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] h-[380px] bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                <svg className="w-24 h-24 text-white/20" fill="none" stroke="currentColor" strokeWidth={0.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {/* Live badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                  <span className="font-['Manrope'] font-bold text-xs text-[#1F2937]">New Listings Available</span>
                </div>
                {/* Price card */}
                <div className="absolute -left-12 bottom-4 bg-white rounded-xl p-4 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] min-w-[162px]">
                  <p className="font-['Manrope'] font-bold text-[10px] text-[#6B7280] uppercase tracking-wide mb-1">Starting From</p>
                  <p className="font-['Manrope'] font-black text-xl text-[#1F2937]">₹5,360/sqft</p>
                  <p className="font-['Manrope'] font-bold text-[10px] text-[#22C55E] mt-0.5">3 New Units Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FILTER BAR ══════════════════════════════════════════════════════ */}
      <div className="max-w-[1408px] mx-auto px-4 -mt-[52px] relative z-20 mb-6">
        <div className="bg-white shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] rounded-2xl p-6 flex flex-wrap items-end gap-4">
          {[
            { label: "BHK", key: "bhk", opts: ["Any", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"] },
            { label: "BUDGET", key: "budget", opts: ["Any", "₹20-40L", "₹40-60L", "₹60-80L", "₹80L+"] },
            { label: "STATUS", key: "status", opts: ["Any", "Ready to Move", "Under Construction", "New Launch"] },
            { label: "PREFERRED AREA", key: "area", opts: ["All Areas", "Manish Nagar", "Wardha Road", "Besa", "MIHAN", "Hingna"] },
          ].map(f => (
            <div key={f.key} className="flex flex-col gap-1 flex-1 min-w-[160px]">
              <label className="font-['Manrope'] font-bold text-[10px] uppercase text-[#9CA3AF] tracking-wide">{f.label}</label>
              <div className="relative">
                <select value={filters[f.key]} onChange={e => setFilters({ ...filters, [f.key]: e.target.value })}
                  className="w-full appearance-none bg-[#F9FAFB] border-0 rounded-lg pl-3 pr-9 py-2 font-['Manrope'] font-semibold text-sm text-[#111827] outline-none focus:ring-2 focus:ring-[#5E23DC] cursor-pointer">
                  {f.opts.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown cls="w-4 h-4 text-[#5E23DC] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          ))}
          <button className="bg-[#5E23DC] text-white font-['Manrope'] font-bold text-sm px-8 py-2.5 rounded-lg hover:bg-[#4500B4] transition-colors flex-shrink-0">
            Show Flats
          </button>
        </div>
      </div>

      {/* ══ FEATURED FLATS ══════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="font-['Manrope'] font-bold text-xs text-[#5E23DC] uppercase tracking-[1.2px] mb-2">RERA VERIFIED</p>
            <h2 className="font-['Manrope'] font-black text-[30px] text-[#111827] leading-9">Featured &amp; Verified Flats in Nagpur</h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-[#5E23DC] font-['Manrope'] font-bold text-sm whitespace-nowrap hover:gap-2 transition-all">
            Show All <ArrowRight cls="w-4 h-4 text-[#5E23DC]" />
          </a>
        </div>
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {flats.map((f, i) => <FlatCard key={i} {...f} />)}
        </div>
      </section>

      {/* ══ UPCOMING PROJECTS ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <p className="font-['Manrope'] font-bold text-xs text-[#5E23DC] uppercase tracking-[1.2px] mb-3">PRE LAUNCH</p>
            <h2 className="font-['Manrope'] font-black text-[36px] text-[#111827] leading-10 mb-3">Upcoming Projects in Nagpur</h2>
            <p className="font-['Manrope'] text-base text-[#6B7280] max-w-[660px] mx-auto leading-6">
              Discover pre-launch and upcoming residential projects in Nagpur — in areas delivering strong ROI and build quality.
            </p>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
          </div>
        </div>
      </section>

      {/* ══ POPULAR AREAS ═══════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-20">
        <div className="text-center mb-12">
          <p className="font-['Manrope'] font-bold text-xs text-[#5E23DC] uppercase tracking-[1.2px] mb-3">POPULAR AREAS</p>
          <h2 className="font-['Manrope'] font-black text-[36px] text-[#111827] leading-10 mb-3">Popular Areas for Buying Flats in Nagpur</h2>
          <p className="font-['Manrope'] text-base text-[#6B7280] max-w-[598px] mx-auto leading-6">
            Each area has its own vibe, price band, and lifestyle — pick the one that matches your priorities.
          </p>
        </div>
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {areas.map((a, i) => <AreaCard key={i} {...a} />)}
        </div>
      </section>

      {/* ══ EXPLORE BY AREA (Link Grid) ══════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 mb-16">
        <div className="bg-[rgba(94,35,220,0.05)] rounded-3xl p-10 md:p-16">
          <h2 className="font-['Manrope'] font-black text-2xl text-[#111827] text-center mb-8">Explore Flats by Area in Nagpur</h2>
          <div className="flex flex-col gap-4">
            {areaLinks.map((row, ri) => (
              <div key={ri} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {row.map((link, li) => (
                  <div key={li} className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl px-4 py-3 flex items-center justify-between hover:shadow-md hover:border-violet-200 border border-transparent transition-all cursor-pointer group">
                    <span className="font-['Manrope'] font-semibold text-sm text-[#111827] group-hover:text-[#5E23DC] transition-colors">{link}</span>
                    <ChevronDown cls="w-4 h-4 text-[#5E23DC] -rotate-90" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUYER PERSONAS ══════════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-20">
        <div className="text-center mb-12">
          <p className="font-['Manrope'] font-bold text-xs text-[#5E23DC] uppercase tracking-[1.2px] mb-3">FIND YOUR MATCH</p>
          <h2 className="font-['Manrope'] font-black text-[36px] text-[#111827] leading-10">What Type of Flat Buyer Are You?</h2>
        </div>
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {personas.map((p, i) => <PersonaCard key={i} {...p} />)}
        </div>
      </section>

      {/* ══ COMPARISON SECTION ══════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-16">
        <div className="bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[40px] p-10 md:p-20">
          <div className="text-center mb-12">
            <h2 className="font-['Manrope'] font-black text-[30px] text-[#111827] leading-9 mb-3">Ready to Move vs Under Construction — What Should You Choose?</h2>
            <p className="font-['Manrope'] text-base text-[#6B7280]">A side-by-side comparison to help you decide which option suits your needs.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-12 max-w-[1024px] mx-auto">
            {/* Ready to Move */}
            <div className="bg-[rgba(249,250,251,0.5)] border border-[#F3F4F6] rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(16,185,129,0.2)] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <h3 className="font-['Manrope'] font-bold text-2xl text-[#111827]">Ready to Move Flats</h3>
              </div>
              <div className="flex flex-col gap-4">
                {["Immediate possession available", "No GST applicable", "Physical inspection before buying", "No construction risk involved"].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckDot color="#10B981" />
                    <span className="font-['Manrope'] text-sm text-[#4B5563]">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-[#10B981] text-white font-['Manrope'] font-bold text-base py-4 rounded-xl hover:bg-[#059669] transition-colors mt-2">
                Explore Ready Flats
              </button>
            </div>
            {/* Under Construction */}
            <div className="bg-[rgba(249,250,251,0.5)] border border-[#F3F4F6] rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[rgba(94,35,220,0.2)] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#5E23DC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <h3 className="font-['Manrope'] font-bold text-2xl text-[#111827]">Under Construction Flats</h3>
              </div>
              <div className="flex flex-col gap-4">
                {["Lower entry price and down payment", "Higher capital appreciation", "Flexible payment schedules", "Customisation options available"].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckDot color="#5E23DC" />
                    <span className="font-['Manrope'] text-sm text-[#4B5563]">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-[#5E23DC] text-white font-['Manrope'] font-bold text-base py-4 rounded-xl hover:bg-[#4500B4] transition-colors mt-2">
                Explore Under Construction
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SELL BANNER ═════════════════════════════════════════════════════ */}
      <section className="max-w-[1408px] mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-[#5E23DC] to-[#3B0A91] rounded-[32px] px-10 md:px-16 py-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="flex-1 max-w-[451px]">
            <p className="font-['Manrope'] font-bold text-xs text-white/70 uppercase tracking-[1.2px] mb-3">SELL YOUR PROPERTY</p>
            <h2 className="font-['Manrope'] font-black text-[36px] text-white leading-10 mb-4">Selling Flats in Nagpur?</h2>
            <p className="font-['Manrope'] text-base text-white/70 leading-6 mb-6">
              List your flat for free, reach verified buyers across all of Nagpur with strong marketing and expert support.
            </p>
            <div className="flex flex-wrap gap-5">
              {["Safe System", "0% Quality access"].map(f => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="font-['Manrope'] font-semibold text-sm text-white">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="bg-white text-[#5E23DC] font-['Manrope'] font-black text-base px-10 py-4 rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] hover:bg-gray-50 transition-colors flex-shrink-0">
            Request Expert Partner
          </button>
        </div>
      </section>

      {/* ══ EXPERT CONSULTATION ════════════════════════════════════════════ */}
      <section className="max-w-[1230px] mx-auto px-4 sm:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <p className="font-['Manrope'] font-bold text-xs text-[#5E23DC] uppercase tracking-[1.2px]">FREE FLAT EXPERT</p>
            <h2 className="font-['Manrope'] font-black text-[36px] text-[#111827] leading-[45px]">Talk to a Flat Buying Expert</h2>
            <p className="font-['Manrope'] text-base text-[#6B7280] leading-6">
              Our dedicated property experts help you find the flat for sale in Nagpur suited to your lifestyle and financial goals.
            </p>
            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              {[
                { bg: "#DBEAFE", icon: "🏡", title: "Verified Support", sub: "Get genuine insights from local property experts." },
                { bg: "#F3E8FF", icon: "💜", title: "Zero Brokerage", sub: "No hidden fees or extra charges for our services." },
                { bg: "#DCFCE7", icon: "✅", title: "Hassle-Free Process", sub: "We handle documentation and site visits." },
                { bg: "#FFEDD5", icon: "⚖️", title: "Legal Assistance", sub: "Full transparency in legal verification." },
              ].map(f => (
                <div key={f.title}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-2" style={{ background: f.bg }}>{f.icon}</div>
                  <p className="font-['Manrope'] font-bold text-base text-[#111827] mb-1">{f.title}</p>
                  <p className="font-['Manrope'] text-xs text-[#6B7280] leading-4">{f.sub}</p>
                </div>
              ))}
            </div>
            {/* Team avatars */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-2">
                {["bg-violet-400", "bg-violet-500", "bg-violet-600"].map((c, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white flex items-center justify-center text-white font-bold text-xs`}>E{i+1}</div>
                ))}
              </div>
              <span className="font-['Manrope'] font-bold text-xs text-[#111827]">Expert Nagpur Team</span>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white border border-[#F3F4F6] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] rounded-3xl p-8 flex flex-col gap-4">
            <h3 className="font-['Manrope'] font-black text-xl text-[#111827]">Request a Callback</h3>
            <div className="flex flex-col gap-4 mt-2">
              {[
                { label: "YOUR NAME", placeholder: "Enter your full name", key: "name", type: "text" },
                { label: "PHONE NUMBER", placeholder: "Enter your phone number", key: "phone", type: "tel" },
              ].map(f => (
                <div key={f.key} className="flex flex-col gap-1">
                  <label className="font-['Manrope'] font-bold text-[10px] uppercase text-[#9CA3AF] tracking-wide">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3 py-3.5 font-['Manrope'] text-base text-[#111827] placeholder-[#6B7280] outline-none focus:ring-2 focus:ring-[#5E23DC] transition" />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label className="font-['Manrope'] font-bold text-[10px] uppercase text-[#9CA3AF] tracking-wide">PREFERRED BHK</label>
                <div className="relative">
                  <select value={form.bhk} onChange={e => setForm({ ...form, bhk: e.target.value })}
                    className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-3.5 font-['Manrope'] text-base text-[#111827] outline-none focus:ring-2 focus:ring-[#5E23DC] cursor-pointer">
                    {["Select BHK", "1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown cls="w-5 h-5 text-[#6B7280] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <button className="w-full bg-[#5E23DC] text-white font-['Manrope'] font-bold text-base py-4 rounded-xl hover:bg-[#4500B4] transition-colors mt-2">
                Submit Callback
              </button>
              <p className="font-['Manrope'] text-[10px] text-[#9CA3AF] text-center">We'll reach out within 15 minutes on business days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ APP PROMO ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1408px] mx-auto px-4 mb-16">
        <div className="bg-[#5E23DC] rounded-[32px] overflow-hidden relative min-h-[372px] flex items-center">
          {/* Decorative glow */}
          <div className="absolute right-0 top-0 bottom-0 w-[40%] pointer-events-none">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute bottom-0 left-0 w-96 h-72 bg-gradient-radial from-[#D9BDFF] to-[#8A38F5] blur-[38px] rounded-full" />
            </div>
            {/* Phone mockups */}
            <div className="absolute right-8 bottom-0 flex items-end gap-3">
              {[{ h: "h-60 w-32", cls: "" }, { h: "h-72 w-36", cls: "" }].map((m, i) => (
                <div key={i} className={`${m.h} ${m.cls} bg-white/20 rounded-[28px] border border-white/30 backdrop-blur-sm`} />
              ))}
            </div>
          </div>

          <div className="relative z-10 px-10 md:px-16 py-16 max-w-[832px]">
            <p className="font-['Manrope'] font-bold text-xs text-white/70 uppercase tracking-[1.2px] mb-4">REPARV APP</p>
            <h2 className="font-['Manrope'] font-black text-[36px] text-white leading-10 mb-4">All Property Solutions in One App</h2>
            <p className="font-['Manrope'] text-lg text-white/70 leading-7 mb-8 max-w-[368px]">
              Search flats, check RERA status, and message owners directly from your phone.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button className="bg-white text-[#5E23DC] font-['Manrope'] font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-lg">
                <DownloadIcon />
                Download Now
              </button>
              <span className="font-['Manrope'] text-xs text-white/50">Available on iOS & Android</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════════════════════ */}
      <section className="max-w-[896px] mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="font-['Manrope'] font-bold text-xs text-[#5E23DC] uppercase tracking-[1.2px] mb-3">YOUR QUESTIONS ANSWERED</p>
          <h2 className="font-['Manrope'] font-black text-[36px] text-[#111827] leading-10">Flat Buyer FAQs</h2>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
      </section>

      {/* ══ BUYER STORIES ═══════════════════════════════════════════════════ */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <p className="font-['Manrope'] font-bold text-xs text-[#5E23DC] uppercase tracking-[1.2px] mb-3">BUYER STORIES</p>
            <h2 className="font-['Manrope'] font-black text-[36px] text-[#111827] leading-10 mb-2">Real Flat Buyer Stories — Nagpur</h2>
            <p className="font-['Manrope'] text-base text-[#6B7280]">Real stories from verified buyers who found their perfect flat through Reparv.</p>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {stories.map((s, i) => <StoryCard key={i} {...s} />)}
          </div>
        </div>
      </section>

    </div>
  );
}