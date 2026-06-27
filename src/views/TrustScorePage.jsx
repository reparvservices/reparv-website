"use client";
import { useState } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const ChevronDown = ({ open }) => (
  <svg
    className={`w-3 h-2 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    viewBox="0 0 12 7"
    fill="none"
  >
    <path
      d="M1 1l5 5 5-5"
      stroke="#151C27"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CheckPurple = () => (
  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#CEBDFF" />
    <path
      d="M6 10l3 3 5-5"
      stroke="#4500B4"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ShieldIcon = () => (
  <svg
    className="w-4 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);
const LocationIcon = () => (
  <svg
    className="w-4 h-5 flex-shrink-0"
    fill="none"
    stroke="#CEBDFF"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"
    />
  </svg>
);
const BuildingIcon = () => (
  <svg
    className="w-5 h-4 flex-shrink-0"
    fill="none"
    stroke="#CEBDFF"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);
const StarIcon = () => (
  <svg
    className="w-5 h-4 flex-shrink-0"
    fill="none"
    stroke="#CEBDFF"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);
const UserCircleIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0"
    fill="none"
    stroke="#CEBDFF"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FAQ({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-[rgba(203,195,216,0.3)] shadow-[0_10px_30px_rgba(94,35,220,0.04)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-4 px-6 py-6 text-left"
      >
        <span className="font-['Manrope'] font-semibold text-2xl leading-8 text-[#151C27] flex-1">
          {q}
        </span>
        <ChevronDown open={open} />
      </button>
      {open && (
        <div className="px-6 pb-6 font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
          {a}
        </div>
      )}
    </div>
  );
}

// ── Framework Pillar Card ─────────────────────────────────────────────────────
function PillarCard({ iconBg, iconColor, title, pct, desc }) {
  return (
    <div className="flex flex-row items-start gap-6 bg-[#F0F3FF] border border-[#CBC3D8] rounded-2xl p-6">
      <div
        className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}
      >
        <svg
          className={`w-5 h-5 ${iconColor}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 1l2.928 5.929L20 8.118l-5 4.872 1.18 6.878L10 16.9l-6.18 3.968L5 13.99 0 9.118l7.072-1.189L10 1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-['Manrope'] font-semibold text-2xl leading-8 text-[#151C27]">
            {title}
          </h3>
          <span className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-base leading-6 text-[#4500B4] flex-shrink-0 ml-4">
            {pct}%
          </span>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
          {desc}
        </p>
      </div>
    </div>
  );
}

// ── Property Card ─────────────────────────────────────────────────────────────
function PropertyCard({ score, title, location, price, oldPrice, type }) {
  return (
    <div className="bg-white rounded-2xl shadow-[6px_4px_23px_1px_rgba(63,45,98,0.15)] overflow-hidden flex flex-col">
      <div className="relative">
        <div className="h-[258px] bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500 flex items-center justify-center rounded-t-2xl">
          <svg
            className="w-20 h-20 text-white/30"
            fill="none"
            stroke="currentColor"
            strokeWidth={0.8}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <span className="absolute top-4 left-7 bg-[#8A38F5] text-white font-['Segoe_UI',system-ui,sans-serif] font-bold text-xs leading-4 px-2 py-1 rounded-md">
          {score}/10
        </span>
        <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 text-[#868686]">
          <svg
            className="w-4 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            />
          </svg>
          <span className="font-['Segoe_UI',system-ui,sans-serif] text-base">
            {location}
          </span>
        </div>
        <h4 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-base text-black">
          {title}
        </h4>
        <div className="relative h-[44px] mt-1">
          <div className="absolute inset-0 bg-[#8A38F5] opacity-10 rounded-[22px]" />
          <div className="flex items-center justify-between px-3 h-full">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#8A38F5]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                />
              </svg>
              <span className="font-['Poppins',sans-serif] font-semibold text-xs text-[#8A38F5]">
                {type}
              </span>
            </div>
            <div className="text-right">
              <p className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-xs text-[#868686] line-through">
                {oldPrice}
              </p>
              <p className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-xl text-black">
                {price}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-[#D9D9D9] mt-2 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-[#8A38F5] bg-white flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#5E23DC]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <p className="font-['Poppins',sans-serif] font-medium text-xs text-[#868686]">
                Lucky
              </p>
              <p className="font-['Poppins',sans-serif] font-medium text-[8px] text-[#868686]">
                Owner
              </p>
            </div>
          </div>
          <button className="bg-[#8A38F5] text-white font-['Segoe_UI',system-ui,sans-serif] font-bold text-base px-4 py-2 rounded-lg">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Verification Step ─────────────────────────────────────────────────────────
function VerifStep({ icon, label, sub, active, isLast }) {
  return (
    <div className="flex flex-col items-center flex-1 relative">
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-1/2 right-0 h-0.5 bg-[#CBC3D8] z-0" />
      )}
      <div
        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 mb-6
        ${active ? "bg-[#4500B4] border-[#4500B4] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]" : "bg-white border-[#4500B4]"}`}
      >
        <span className={`text-xl ${active ? "text-white" : "text-[#4500B4]"}`}>
          {icon}
        </span>
      </div>
      <h4
        className={`font-['Manrope'] font-semibold text-2xl leading-8 text-center ${active ? "text-[#4500B4]" : "text-[#151C27]"}`}
      >
        {label}
      </h4>
      <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] text-center mt-1">
        {sub}
      </p>
    </div>
  );
}

// ── Trust Signal Card ─────────────────────────────────────────────────────────
function TrustSignalCard({ iconBg, iconEl, title, sub }) {
  return (
    <div className="bg-white border border-white shadow-[0_10px_30px_rgba(94,35,220,0.04)] rounded-2xl p-8 flex flex-col items-center gap-2 flex-1 min-w-[200px]">
      <div
        className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center`}
      >
        {iconEl}
      </div>
      <div className="pt-4 text-center">
        <h4 className="font-['Manrope'] font-semibold text-2xl leading-8 text-[#151C27]">
          {title}
        </h4>
      </div>
      <p className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-sm leading-5 tracking-[0.28px] text-[#494455] text-center">
        {sub}
      </p>
    </div>
  );
}

// ── Score Meaning Row ─────────────────────────────────────────────────────────
function ScoreRow({ range, rangeColor, label, sub }) {
  return (
    <div className="flex items-center gap-6 p-4 border border-[#CBC3D8] rounded-xl">
      <span
        className={`font-['Segoe_UI',system-ui,sans-serif] font-bold text-2xl leading-8 w-16 flex-shrink-0 ${rangeColor}`}
      >
        {range}
      </span>
      <div>
        <h4 className="font-['Manrope'] font-semibold text-2xl leading-8 text-[#151C27]">
          {label}
        </h4>
        <p className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-sm leading-5 tracking-[0.28px] text-[#494455]">
          {sub}
        </p>
      </div>
    </div>
  );
}

// ── Circular Score Ring ───────────────────────────────────────────────────────
function ScoreRing({ score = 9.4 }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const pct = (score / 10) * circ;
  return (
    <div className="relative inline-flex items-center justify-center w-[180px] h-[180px]">
      <svg width="180" height="180" className="-rotate-90 absolute inset-0">
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="#5E23DC"
          strokeWidth="10"
          strokeDasharray={`${pct} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10">
        <div className="w-8 h-8 rounded-full bg-[#5E23DC] flex items-center justify-center mb-1 text-white">
          <ShieldIcon />
        </div>
        <span className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-4xl text-[#4500B4] leading-none">
          {score}
        </span>
        <span className="font-['Plus_Jakarta_Sans'] font-normal text-xs text-[#494455]">
          /10
        </span>
        <span className="font-['Plus_Jakarta_Sans'] font-normal text-xs text-[#494455] mt-0.5">
          Trust Score
        </span>
        <span className="font-['Plus_Jakarta_Sans'] font-normal text-[10px] text-[#494455]">
          Based on 500+ listings
        </span>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TrustScorePage() {
  const faqs = [
    {
      q: "What makes a property 'Trusted' on Reparv?",
      a: "A 'Trusted' status is only awarded after a property passes our 150-point audit covering legal paperwork, builder track record, construction material quality, and post-possession resident feedback. It must score above 7.0 on our Trust Framework.",
    },
    {
      q: "Are all properties in Nagpur listed here?",
      a: "No. We only list properties that meet our rigorous verification standards. We actively exclude properties with pending legal disputes, builder complaints, or insufficient documentation.",
    },
    {
      q: "Can a Trust Score change over time?",
      a: "Yes. Trust Scores are reviewed quarterly and can increase or decrease based on new resident feedback, any emerging legal issues, changes in builder reputation, and updated construction inspections.",
    },
    {
      q: "Do builders pay for higher scores?",
      a: "Absolutely not. Our Trust Score is independently calculated and cannot be purchased. We maintain strict separation between our sales and verification teams.",
    },
  ];

  const properties = [
    {
      score: "9.1",
      title: "3 BHK MarlBoro House",
      location: "Property Location (5KM)",
      price: "₹15Lakh",
      oldPrice: "₹20Lakh",
      type: "New Flat",
    },
    {
      score: "9.1",
      title: "3 BHK MarlBoro House",
      location: "Property Location (5KM)",
      price: "₹15Lakh",
      oldPrice: "₹20Lakh",
      type: "New Flat",
    },
    {
      score: "9.1",
      title: "3 BHK MarlBoro House",
      location: "Property Location (5KM)",
      price: "₹15Lakh",
      oldPrice: "₹20Lakh",
      type: "New Flat",
    },
  ];

  const pillars = [
    {
      iconBg: "bg-[#E8DDFF]",
      iconColor: "text-[#4500B4]",
      title: "Legal Safety",
      pct: 30,
      desc: "Title search, RERA approvals, encumbrance scan, and litigation history audit.",
    },
    {
      iconBg: "bg-[#E8DDFF]",
      iconColor: "text-[#4500B4]",
      title: "Builder Reliability",
      pct: 25,
      desc: "Delivery history, past complaints, financial stability, and reputation scan.",
    },
    {
      iconBg: "bg-[#E8DDFF]",
      iconColor: "text-[#4500B4]",
      title: "Construction Quality",
      pct: 25,
      desc: "On-ground audit of materials, finishing quality, and amenity standards.",
    },
    {
      iconBg: "bg-[#E8DDFF]",
      iconColor: "text-[#4500B4]",
      title: "Buyer Satisfaction",
      pct: 20,
      desc: "Post-handover experience, society feedback, and management quality.",
    },
  ];

  const verifySteps = [
    {
      icon: "⚖️",
      label: "Legal Check",
      sub: "100% Title Verification",
      active: false,
    },
    {
      icon: "🏗️",
      label: "Builder Audit",
      sub: "Past Record Analysis",
      active: false,
    },
    {
      icon: "🔍",
      label: "Quality Audit",
      sub: "On-ground Inspections",
      active: false,
    },
    {
      icon: "💬",
      label: "Buyer Feedback",
      sub: "New Resident Insights",
      active: false,
    },
    {
      icon: "✅",
      label: "Score Assigned",
      sub: "Final Trust Rating",
      active: true,
    },
  ];

  const trustSignals = [
    {
      iconBg: "bg-[#E8DDFF]",
      iconEl: (
        <svg
          className="w-5 h-5 text-[#4500B4]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      title: "Advisor Recommended",
      sub: "Shortlisted by senior property advisors.",
    },
    {
      iconBg: "bg-[#DCFCE7]",
      iconEl: (
        <svg
          className="w-5 h-5 text-[#15803D]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Legal Clear",
      sub: "Title, RERA, and permissions verified.",
    },
    {
      iconBg: "bg-[#FFEDD5]",
      iconEl: (
        <svg
          className="w-5 h-5 text-[#C2410C]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      title: "Top Rated",
      sub: "Highest buyer satisfaction scores.",
    },
    {
      iconBg: "bg-[#DBEAFE]",
      iconEl: (
        <svg
          className="w-5 h-4 text-[#1D4ED8]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title: "Builder Trusted",
      sub: "Zero project delays in last 5 years.",
    },
    {
      iconBg: "bg-[#F3E8FF]",
      iconEl: (
        <svg
          className="w-5 h-3 text-[#7E22CE]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      title: "High Resale Value",
      sub: "Strong appreciation & resale demand.",
    },
    {
      iconBg: "bg-[#FEE2E2]",
      iconEl: (
        <svg
          className="w-4 h-4 text-[#B91C1C]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      title: "Quality Audited",
      sub: "Verified superior build standards.",
    },
  ];

  return (
    <div className="bg-[#F9F9FF] font-['Plus_Jakarta_Sans']">
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#5E23DC] to-[#4500B4] relative overflow-hidden py-[120px]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-[10%] bottom-[-60px] w-[33%] bg-white/5"
            style={{ transform: "matrix(1,0,-0.38,0.93,0,0)" }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <div className="mb-6">
            <span className="inline-flex items-center bg-[#5E23DC] rounded-full px-4 py-1 font-['Plus_Jakarta_Sans'] font-medium text-xs leading-4 text-[#CFBFFF]">
              Verified • Highly Rated • Buyer Trusted
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            {/* Left copy */}
            <div className="flex flex-col gap-6 max-w-[552px]">
              <h1 className="font-['Manrope'] font-bold text-5xl lg:text-[48px] leading-[60px] tracking-[-0.96px] text-white">
                Top Trusted Property in Nagpur
              </h1>
              <p className="font-['Plus_Jakarta_Sans'] font-normal text-lg leading-7 text-[#CFBFFF] opacity-90 max-w-[483px]">
                Legally verified, builder-checked, and buyer-approved properties
                in Nagpur. Shortlisted by Reparv advisors after rigorous
                auditing.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-white text-[#4500B4] hover:bg-gray-50 font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] px-8 py-[17px] rounded-lg transition-colors shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]">
                  View Trusted Properties
                </button>
                <button className="border border-white/30 text-white hover:bg-white/10 font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] px-8 py-4 rounded-lg transition-colors">
                  How Trust Scores Work
                </button>
              </div>
              <div className="relative h-24 mt-2">
                <div className="absolute inset-0 grid grid-cols-2 gap-y-6">
                  {[
                    { icon: <LocationIcon />, text: "Legally Verified" },
                    { icon: <BuildingIcon />, text: "Builder-Checked" },
                    { icon: <StarIcon />, text: "Quality Verified" },
                    { icon: <UserCircleIcon />, text: "Buyer Approved" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      {icon}
                      <span className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-white">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — hero image + float card */}
            <div className="flex-1 relative max-w-[552px]">
              <div className="w-full h-[500px] rounded-2xl border-4 border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500 flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-white/20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.6}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="absolute -left-8 -bottom-8 bg-white rounded-2xl px-6 py-6 flex items-center gap-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] w-[226px]">
                <div className="w-16 h-16 rounded-full bg-[#5E23DC] flex items-center justify-center flex-shrink-0 text-white">
                  <span className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-xl leading-7">
                    9.2
                  </span>
                </div>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] font-bold text-base leading-6 text-[#151C27]">
                    Trust Score
                  </p>
                  <p className="font-['Segoe_UI',system-ui,sans-serif] font-normal text-xs leading-4 text-[#494455]">
                    Exceptional Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST SCORE FRAMEWORK ═════════════════════════════════════════════ */}
      <section className="bg-[#F9F9FF] py-[120px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col items-center gap-4 mb-16">
            <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-[36px] leading-10 tracking-[-0.32px] text-[#5E23DC] text-center">
              The Reparv Trust Score Framework
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] text-center max-w-[607px]">
              Our proprietary algorithm analyzes over 150 data points across
              four core pillars to calculate an objective score for every
              listing.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-20 items-center justify-center">
            <div className="flex justify-center">
              <ScoreRing score={9.4} />
            </div>
            <div className="flex flex-col gap-8 flex-1 max-w-[536px]">
              {pillars.map((p) => (
                <PillarCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MOST TRUSTED PROPERTIES ════════════════════════════════════════════ */}
      <section className="bg-[#F0F3FF] py-[120px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
            <div className="flex flex-col gap-2">
              <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-[36px] leading-10 tracking-[-0.32px] text-[#5E23DC]">
                Most Trusted Properties in Nagpur
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
                Properties that passed every verification layer.
              </p>
            </div>
            <button className="bg-[#5E23DC] hover:bg-[#4c1cb0] text-white font-['Segoe_UI',system-ui,sans-serif] font-bold text-base leading-6 px-6 py-3 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
              See All 120+ Listings
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p, i) => (
              <PropertyCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ VERIFICATION JOURNEY ══════════════════════════════════════════════ */}
      <section className="bg-[#F9F9FF] py-[120px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col items-center gap-4 mb-20">
            <h2 className="font-['Manrope'] font-semibold text-[32px] leading-10 tracking-[-0.32px] text-[#151C27] text-center">
              Our Verification Journey
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] text-center max-w-[654px]">
              Every property goes through a multi-step audit before it appears
              on our trusted listings.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[71px] right-[79px] h-0.5 bg-[#CBC3D8] z-0" />
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
              {verifySteps.map((s, i) => (
                <VerifStep
                  key={i}
                  {...s}
                  isLast={i === verifySteps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST SIGNALS & CERTIFICATIONS ════════════════════════════════════ */}
      <section className="bg-[#F0F3FF] py-[120px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col items-center gap-4 mb-16">
            <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-[36px] leading-10 tracking-[-0.32px] text-[#151C27] text-center">
              Trust Signals &amp; Certifications
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] text-center max-w-[532px]">
              Look for these badges on property cards to instantly see its
              strengths and verified credentials.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustSignals.map((t, i) => (
              <TrustSignalCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT DOES A TRUST SCORE MEAN + REPARV GUARANTEE ══════════════════ */}
      <section className="bg-[#F9F9FF] py-[120px] px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1312px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-[80px] lg:gap-16">
            {/* Left */}
            <div className="flex flex-col gap-6 max-w-[616px]">
              <h2 className="font-['Manrope'] font-semibold text-[32px] leading-10 tracking-[-0.32px] text-[#151C27]">
                What Does a Trust Score Mean?
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] font-normal text-lg leading-7 text-[#494455]">
                Our scores are binary — either a property meets our rigorous
                standards or it doesn't. We only feature properties that score
                above 7.0.
              </p>
              <div className="flex flex-col gap-6 pt-6">
                <ScoreRow
                  range="9-10"
                  rangeColor="text-[#16A34A]"
                  label="Exceptional Choice"
                  sub="Ultra-safe, premium builds with zero legacy issues."
                />
                <ScoreRow
                  range="8-8.9"
                  rangeColor="text-[#4500B4]"
                  label="Highly Trusted"
                  sub="Robust legal standing and great build quality."
                />
                <ScoreRow
                  range="7-7.9"
                  rangeColor="text-[#494455]"
                  label="Verified"
                  sub="Safe with standard risk profiles and typical features."
                />
              </div>
            </div>

            {/* Right — Guarantee card */}
            <div className="flex-1 max-w-[616px]">
              <div className="bg-[#5E23DC] rounded-3xl p-12 flex flex-col gap-6 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-[119px] h-[117px] p-8">
                  <div className="w-[55px] h-[53px] bg-white/20 rounded-full" />
                </div>
                <h3 className="font-['Manrope'] font-semibold text-[32px] leading-10 tracking-[-0.32px] text-white relative z-10 max-w-[520px]">
                  Reparv Guarantee
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-lg leading-7 text-white opacity-90 max-w-[520px] relative z-10">
                  We never rank or promote projects with unresolved legal
                  issues, repeated delivery delays, or negative buyer history —
                  even if they pay higher commissions.
                </p>
                <div className="flex flex-col gap-4 py-2 relative z-10">
                  {[
                    "Unbiased Algorithm-driven scoring",
                    "Zero conflict of interest policy",
                    "Continuous monitoring & updates",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <CheckPurple />
                      <span className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-white">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-white hover:bg-gray-50 text-[#4500B4] font-['Plus_Jakarta_Sans'] font-bold text-base leading-6 py-4 rounded-xl transition-colors relative z-10">
                  Talk to Our Trust Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════════════════════ */}
      <section className="px-4 py-8 sm:px-8 lg:px-16">
        <div className="max-w-[1312px] mx-auto">
          <div className="bg-gradient-to-r from-[#5E23DC] to-[#4500B4] rounded-[32px] px-20 py-20 relative overflow-hidden">
            <div
              className="absolute inset-0 rounded-[32px]"
              style={{
                background:
                  "radial-gradient(52.96% 151.76% at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-[1152px] mx-auto">
              <h2 className="font-['Manrope'] font-bold text-[48px] leading-[56px] tracking-[-0.96px] text-white text-center">
                Confused Between Multiple Properties?
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] font-normal text-lg leading-7 text-[#CFBFFF] text-center max-w-[672px] opacity-90">
                Get a professional Trust Audit for any property you're
                considering, even if it's not listed on Reparv.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4 w-full justify-center">
                <button className="bg-white hover:bg-gray-50 text-[#4500B4] font-['Plus_Jakarta_Sans'] font-bold text-base leading-6 px-10 py-5 rounded-xl transition-colors shadow">
                  Get Your Free Trust Consultation
                </button>
                <button className="border border-white/40 text-white hover:bg-white/10 font-['Plus_Jakarta_Sans'] font-bold text-base leading-6 px-10 py-5 rounded-xl transition-colors">
                  Download Sample Audit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F9F9FF] pt-[26px] pb-[120px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col items-center gap-4 mb-16">
            <h2 className="font-['Manrope'] font-semibold text-[32px] leading-10 tracking-[-0.32px] text-[#151C27] text-center">
              Frequently Asked Questions
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] text-center max-w-[487px]">
              Everything you need to know about our trust verification process
              and scoring.
            </p>
          </div>
          <div className="flex flex-col gap-4 max-w-[768px] mx-auto">
            {faqs.map((faq, i) => (
              <FAQ key={i} q={faq.q} a={faq.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
