"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import SeoSectionAd from "../components/seocomponents/common/SeoSectionAd";
import { useAuth } from "../store/auth";
import { openAgentAdvisor } from "../utils/openAgentAdvisor";
import {
  buildPropertiesLink,
  filterRentals,
  formatRentPrice,
  formatRentRange,
  formatVerifiedStatValue,
  getBhkLabel,
  getPlotArea,
  getPropertyBadge,
  getPropertyImage,
  getPropertyLocationText,
  getRentalTag,
  getRentalTitle,
  mapFaqs,
} from "../utils/rentalPropertiesPage";

const PAGE_CITY = "Nagpur";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ChevronDown = ({ open, size = "w-3.5 h-3.5" }) => (
  <svg
    className={`${size} transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const ArrowRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const LocationPin = () => (
  <svg className="w-2.5 h-3.5 text-[#151C27] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.608 3.5-7.327A8 8 0 008 8c0 2.72 1.556 5.315 3.5 7.327a19.58 19.58 0 002.43 2.05 16.975 16.975 0 001.397.974zM12 12a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);
const ShieldCheck = ({ className = "w-6 h-6 text-white" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);
const ZapIcon = ({ className = "w-6 h-6 text-white" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const StarFilled = () => (
  <svg className="w-4 h-4 text-[#5E23DC] fill-[#5E23DC]" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const DownloadIcon = () => (
  <svg className="w-5 h-5 text-[#5E23DC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-white/10 shadow-[0px_10px_30px_rgba(94,35,220,0.04)] rounded-3xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-8 py-[22px] text-left gap-4 hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-['Manrope'] text-lg text-[#151C27] leading-7">{q}</span>
        <ChevronDown open={open} size="w-3.5 h-3.5 text-[#5E23DC] flex-shrink-0" />
      </button>
      {open && (
        <div className="px-8 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

function RentalCard({ property, index = 0 }) {
  const tag = getRentalTag(property);
  const badge = getPropertyBadge(property);
  const area = getPlotArea(property);

  return (
    <div className="bg-white border border-[rgba(203,195,216,0.1)] shadow-[0px_10px_30px_rgba(94,35,220,0.04)] rounded-3xl overflow-hidden flex-shrink-0 w-72 sm:w-auto hover:shadow-lg transition-shadow">
      <Link href={`/property-info/${property?.seoSlug}`} className="relative h-56 block">
        <img
          src={getPropertyImage(property)}
          alt={getRentalTitle(property)}
          className="w-full h-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/assets/seoPages/rentalProperties/image.svg";
          }}
        />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="bg-white/90 backdrop-blur-md rounded-lg px-3 py-1">
            <span className={`font-bold text-xs ${tag.color}`}>{tag.label}</span>
          </div>
          <div className={`${badge.color} rounded-lg px-3 py-1`}>
            <span className="text-white text-xs font-['Plus_Jakarta_Sans']">{badge.label}</span>
          </div>
        </div>
      </Link>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="font-['Manrope'] text-base text-[#151C27] truncate">
              {property?.propertyName || getRentalTitle(property)}
            </h3>
            <div className="flex items-center gap-1">
              <LocationPin />
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#151C27] truncate">
                {getPropertyLocationText(property)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="font-['Manrope'] text-base text-[#5E23DC]">
              {formatRentPrice(property)}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#151C27]">/ month</span>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <span className="bg-[#F0F3FF] text-[#5E23DC] text-xs font-semibold px-3 py-1 rounded-lg">
            {getBhkLabel(property)}
          </span>
          {area ? (
            <span className="bg-[#F0F3FF] text-[#5E23DC] text-xs font-semibold px-3 py-1 rounded-lg">
              {area.toLocaleString("en-IN")} sq.ft
            </span>
          ) : null}
        </div>
        <Link
          href={`/property-info/${property?.seoSlug}`}
          className={`w-full text-center font-['Plus_Jakarta_Sans'] text-base py-3 rounded-xl transition-colors ${
            index % 2 === 0
              ? "bg-[#5E23DC] hover:bg-[#4500B4] text-white"
              : "border-2 border-[#5E23DC] text-[#5E23DC] hover:bg-[#5E23DC] hover:text-white"
          }`}
        >
          {index % 2 === 0 ? "Schedule Visit" : "Quick Inquiry"}
        </Link>
      </div>
    </div>
  );
}

function AreaCard({ area }) {
  return (
    <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col gap-6 hover:border-[#5E23DC] hover:shadow-md transition-all flex-shrink-0 w-64 sm:w-auto">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="font-['Manrope'] text-xl font-bold text-[#111827] truncate">{area.name}</h3>
          <p className="font-['Manrope'] text-[10px] font-bold text-[#6B7280] uppercase tracking-wide">
            {area.subtitle}
          </p>
        </div>
        <div className="bg-[rgba(94,35,220,0.05)] rounded-lg p-2 text-center min-w-[72px] flex-shrink-0">
          <p className="font-['Manrope'] text-[8px] font-bold text-[#5E23DC] uppercase tracking-wide">
            Avg Rent
          </p>
          <p className="font-['Manrope'] text-base font-black text-[#5E23DC]">{area.avgRent}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span className="text-xs text-[#111827] mt-0.5">•</span>
          <p className="font-['Manrope'] text-xs font-bold text-[#4B5563]">{area.detail1}</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-xs text-[#111827] mt-0.5">•</span>
          <p className="font-['Manrope'] text-xs font-bold text-[#4B5563]">{area.detail2}</p>
        </div>
      </div>
      <Link
        href={buildPropertiesLink({ city: PAGE_CITY, area: area.name })}
        className="w-full border border-[#5E23DC] text-[#5E23DC] font-['Manrope'] text-xs font-bold py-2 rounded-lg hover:bg-[#5E23DC] hover:text-white transition-colors text-center"
      >
        View Properties
      </Link>
    </div>
  );
}

function HowStep({ icon, label, sub }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0 text-center">
      <div className="w-24 h-24 bg-white border-2 border-[#4500B4] shadow-[0px_10px_30px_rgba(94,35,220,0.04)] rounded-3xl flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-[#5E23DC]/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="pt-4">
        <p className="font-['Manrope'] text-base text-[#151C27] font-medium">{label}</p>
        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#151C27] mt-1 max-w-[180px] mx-auto">
          {sub}
        </p>
      </div>
    </div>
  );
}

function TrustBenefitCard({ iconBg, emoji, title, desc }) {
  return (
    <div className="bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-3xl p-8 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center text-xl`}>
        <span>{emoji}</span>
      </div>
      <div>
        <h4 className="font-['Manrope'] text-lg font-bold text-[#111827] mb-2">{title}</h4>
        <p className="font-['Manrope'] text-sm text-[#6B7280] leading-[23px]">{desc}</p>
      </div>
    </div>
  );
}

function StoryCard({ name, role, problem, solution, outcome }) {
  return (
    <div className="bg-[#F4ECFF] border border-white shadow-[0px_10px_30px_rgba(94,35,220,0.04)] rounded-3xl p-12 flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-300 to-violet-500 border-4 border-white shadow-md flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
          {name[0]}
        </div>
        <div>
          <p className="font-['Manrope'] text-base text-[#151C27]">{name}</p>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#151C27]">{role}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <p className="font-bold text-xs text-[#5E23DC] uppercase tracking-[0.6px] mb-2">Problem</p>
          <p className="text-base text-[#151C27] leading-6">&ldquo;{problem}&rdquo;</p>
        </div>
        <div>
          <p className="font-bold text-xs text-[#5E23DC] uppercase tracking-[0.6px] mb-2">Solution</p>
          <p className="text-base text-[#151C27] leading-6">&ldquo;{solution}&rdquo;</p>
        </div>
      </div>
      <div className="border-t border-[rgba(203,195,216,0.3)] pt-4 flex items-center gap-3">
        <StarFilled />
        <span className="font-['Plus_Jakarta_Sans'] text-base text-[#151C27]">{outcome}</span>
      </div>
    </div>
  );
}

function TenantCard({ tenant, onSelect }) {
  return (
    <div className="border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow flex-shrink-0 w-64 sm:w-auto">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 ${tenant.iconBg} rounded-xl flex items-center justify-center text-2xl`}
          >
            {tenant.emoji}
          </div>
          <span
            className={`${tenant.badgeColor} ${tenant.badgeTextColor} text-[10px] font-bold px-2 py-1 rounded`}
          >
            {tenant.badge}
          </span>
        </div>
        <h3 className="font-['Manrope'] text-lg font-black text-[#111827] mb-2">{tenant.title}</h3>
        <p className="font-['Manrope'] text-xs text-[#6B7280] mb-4">{tenant.focus}</p>
      </div>
      <div>
        <p className="font-['Manrope'] text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide mb-4">
          {tenant.areas}
        </p>
        <button
          type="button"
          onClick={() => onSelect(tenant)}
          className={`w-full ${tenant.btnColor} text-white font-['Manrope'] text-xs font-bold py-2.5 rounded-lg shadow-sm hover:opacity-90 transition-opacity`}
        >
          View Properties
        </button>
      </div>
    </div>
  );
}

export default function RentalProperties({ initialPageData = null, initialFaqs = [] }) {
  const { URI, setShowAlert } = useAuth();
  const pageData = initialPageData;

  const [filters, setFilters] = useState({
    type: "Any",
    budget: "Any",
    bhk: "Any",
    area: "All Areas",
  });
  const [locality, setLocality] = useState("");
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const rentalListings = pageData?.stats?.rentalListings || 0;
  const localityCount = pageData?.stats?.localities || 0;
  const minRent = pageData?.stats?.minMonthlyRent;
  const maxRent = pageData?.stats?.maxMonthlyRent;
  const newListingsToday = pageData?.stats?.newListingsToday || 0;
  const allRentals = pageData?.rentals || pageData?.featuredRentals || [];
  const popularAreas = pageData?.popularAreas || [];
  const localityOptions = pageData?.localities || [];
  const bhkOptions = pageData?.bhkOptions || [];
  const propertyTypeOptions = pageData?.propertyTypeOptions || ["Flat"];

  const filteredRentals = useMemo(
    () => filterRentals(allRentals, { ...filters, locality }),
    [allRentals, filters, locality],
  );

  const hasActiveFilters =
    filters.type !== "Any" ||
    filters.budget !== "Any" ||
    filters.bhk !== "Any" ||
    filters.area !== "All Areas" ||
    locality.trim().length > 0;

  const displayRentals = hasActiveFilters
    ? filteredRentals
    : (pageData?.featuredRentals || allRentals).slice(0, 6);

  const filterConfig = useMemo(
    () => [
      {
        label: "PROPERTY TYPE",
        key: "type",
        options: ["Any", ...propertyTypeOptions.filter((item) => item !== "Commercial"), "House", "PG"],
      },
      {
        label: "BUDGET (MONTHLY)",
        key: "budget",
        options: ["Any", "₹10k-20k", "₹20k-35k", "₹35k+"],
      },
      {
        label: "BHK",
        key: "bhk",
        options: ["Any", ...bhkOptions, ...(bhkOptions.includes("4 BHK") ? [] : ["4+ BHK"])],
      },
      {
        label: "PREFERRED AREA",
        key: "area",
        options: ["All Areas", ...localityOptions],
      },
    ],
    [bhkOptions, localityOptions, propertyTypeOptions],
  );

  const faqs = useMemo(() => {
    const mapped = mapFaqs(initialFaqs || []);
    if (mapped.length > 0) return mapped;

    return [
      {
        q: "How does Reparv find rental listings for me?",
        a: "Reparv curates verified rental listings across Nagpur through a rigorous process. We directly partner with property owners, verify legal documentation, and only list properties that pass our quality and ownership checks.",
      },
      {
        q: "What are the fees for renting through Reparv?",
        a: "Zero brokerage. We charge no commission or hidden fees to tenants. You pay only the rent agreed with the owner — nothing more.",
      },
      {
        q: "Can I schedule a site visit online?",
        a: "Yes. Once you find a property you like, request a site visit through the listing page or contact form. Our team coordinates with the owner and confirms a slot with you, usually within 24 hours.",
      },
    ];
  }, [initialFaqs]);

  const tenantTypes = useMemo(
    () => [
      {
        emoji: "🏠",
        iconBg: "bg-[#EEF2FF]",
        badge: "Most Popular",
        badgeColor: "bg-[#EEF2FF]",
        badgeTextColor: "text-[#818CF8]",
        title: "Family",
        focus: "Focus: Safety, schools, parking",
        areas: `Preferred Areas: ${popularAreas.slice(0, 2).map((a) => a.name).join(", ") || "Manish Nagar, Besa"}`,
        btnColor: "bg-[#5E23DC]",
        filter: { type: "Flat", bhk: "3 BHK", budget: "₹20k-35k", area: popularAreas[0]?.name || "All Areas" },
      },
      {
        emoji: "💼",
        iconBg: "bg-[#FAF5FF]",
        badge: "Top Choice",
        badgeColor: "bg-[#FAF5FF]",
        badgeTextColor: "text-[#C084FC]",
        title: "Working Professional",
        focus: "Focus: Commute, amenities, internet",
        areas: `Preferred Areas: ${popularAreas.slice(1, 3).map((a) => a.name).join(", ") || "Wardha Road, Dharampeth"}`,
        btnColor: "bg-[#5E23DC]",
        filter: { type: "Flat", bhk: "2 BHK", budget: "₹10k-20k", area: popularAreas[1]?.name || "All Areas" },
      },
      {
        emoji: "🎓",
        iconBg: "bg-[#FFFBEB]",
        badge: "Budget",
        badgeColor: "bg-[#FFFBEB]",
        badgeTextColor: "text-[#F59E0B]",
        title: "Student",
        focus: "Focus: Budget, PG options, proximity",
        areas: `Preferred Areas: ${popularAreas.slice(2, 4).map((a) => a.name).join(", ") || "Hingna, Wadi"}`,
        btnColor: "bg-[#F97316]",
        filter: { type: "PG", bhk: "Any", budget: "₹10k-20k", area: "All Areas" },
      },
      {
        emoji: "🏢",
        iconBg: "bg-[#ECFDF5]",
        badge: "Corporate",
        badgeColor: "bg-[#ECFDF5]",
        badgeTextColor: "text-[#10B981]",
        title: "Corporate Tenant",
        focus: "Focus: Furnished, lease terms, security",
        areas: `Preferred Areas: ${popularAreas[0]?.name || "Wardha Road"}, ${popularAreas[3]?.name || "Airport Zone"}`,
        btnColor: "bg-[#059669]",
        filter: { type: "Flat", bhk: "Any", budget: "₹35k+", area: popularAreas[0]?.name || "All Areas" },
      },
    ],
    [popularAreas],
  );

  const howSteps = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#5E23DC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      label: "Browse",
      sub: "Find verified homes that match your taste.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#5E23DC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Connect",
      sub: "Reach out directly to owners or managers.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#5E23DC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "Schedule",
      sub: "Instant, hassle-free property visits.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#5E23DC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: "Agreement",
      sub: "Legal paperwork handled digitally.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#5E23DC]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: "Move In",
      sub: "Get your keys and welcome home!",
    },
  ];

  const handleReset = () => {
    setFilters({ type: "Any", budget: "Any", bhk: "Any", area: "All Areas" });
    setLocality("");
  };

  const handleBrowse = () => scrollToSection("featured-rentals");

  const handleTenantSelect = (tenant) => {
    setFilters({ ...filters, ...tenant.filter });
    scrollToSection("featured-rentals");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullname = form.name.trim();
    const contact = form.phone.trim();

    if (!fullname || !contact) {
      alert("Please fill in your name and phone number");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${URI}/frontend/contact-us/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          contact,
          email: `${contact}@callback.reparv.in`,
          subject: `Rental Properties - ${PAGE_CITY}`,
          message: `Rental options requested from Rental Properties page. City: ${PAGE_CITY}.`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      setShowAlert?.({
        show: true,
        type: "success",
        message: data.message || "Request submitted successfully",
      });

      setForm({ name: "", phone: "" });
    } catch (error) {
      console.error("Rental callback form error:", error);
      alert("Server error, please try again later");
    } finally {
      setSubmitting(false);
    }
  };

  const liveFeedText =
    newListingsToday > 0
      ? `Live Property Feed: ${newListingsToday} new added today`
      : `Live Property Feed: ${formatVerifiedStatValue(rentalListings)} verified rentals`;

  return (
    <div className="bg-[#F9F9FF] font-['Manrope',sans-serif] text-[#151C27] min-w-0 overflow-x-hidden">
      <section className="bg-gradient-to-br from-[#5E23DC] to-[#7B4AE4] relative overflow-hidden min-h-[670px] flex items-center">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#AB6BFF] blur-[34px] rounded-full opacity-60 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#8A38F5] blur-[34px] rounded-full opacity-60 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-16 lg:py-20 w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-6">
                {["Zero Brokerage", "Owner Verified", "Instant Move-In", "24/7 Rental Support"].map(
                  (b) => (
                    <span
                      key={b}
                      className="bg-white/20 border border-white/30 text-white text-xs font-['Manrope'] font-medium px-4 py-1.5 rounded-full"
                    >
                      {b}
                    </span>
                  ),
                )}
              </div>
              <h1 className="font-['Manrope'] font-black text-4xl sm:text-5xl text-white leading-[60px] mb-6">
                Rental Properties
                <br />
                in {PAGE_CITY}
              </h1>
              <p className="font-['Manrope'] text-lg text-white/80 leading-7 mb-8 max-w-[510px]">
                Discover verified rental flats, offices and shops in {PAGE_CITY} — curated by Reparv
                advisors with zero brokerage and direct owner contact.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  type="button"
                  onClick={handleBrowse}
                  className="bg-white text-[#5E23DC] font-['Manrope'] font-bold text-base px-8 py-3 rounded-full hover:bg-violet-50 transition-colors shadow-lg"
                >
                  Browse Rentals
                </button>
                <input
                  type="text"
                  placeholder="Enter Locality..."
                  value={locality}
                  onChange={(event) => setLocality(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleBrowse();
                  }}
                  className="bg-white/10 border border-white/30 text-white placeholder-white/60 font-['Manrope'] text-base px-6 py-3 rounded-full outline-none focus:bg-white/20 transition-colors w-56 sm:w-64"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="font-['Plus_Jakarta_Sans'] text-white text-base">{liveFeedText}</span>
              </div>
            </div>

            <div className="w-full lg:w-[607px] flex-shrink-0 relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#AB6BFF] blur-[34px] rounded-full opacity-40 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#8A38F5] blur-[34px] rounded-full opacity-40 pointer-events-none" />
              <div className="relative bg-[rgba(240,243,255,0.2)] border border-white/50 rounded-3xl p-8 z-10">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      icon: "🏠",
                      title: "Verified Rentals",
                      sub: `${formatVerifiedStatValue(rentalListings)} Listings`,
                    },
                    {
                      icon: "⚡",
                      title: "Instant Move-In",
                      sub: "Ready within 24h",
                    },
                    {
                      icon: "💰",
                      title: "Best Value",
                      sub: formatRentRange(minRent, maxRent),
                    },
                    {
                      icon: "🎧",
                      title: "Rental Support",
                      sub: `${localityCount} Localities`,
                    },
                  ].map((f) => (
                    <div
                      key={f.title}
                      className="bg-white rounded-xl p-6 shadow-[0px_10px_30px_rgba(94,35,220,0.04)]"
                    >
                      <div className="text-2xl mb-2">{f.icon}</div>
                      <p className="font-['Plus_Jakarta_Sans'] text-base text-[#151C27]">{f.title}</p>
                      <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#151C27] mt-0.5">{f.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="font-['Plus_Jakarta_Sans'] text-white text-base">
                      {liveFeedText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1260px] mx-auto px-4 -mt-[46px] relative z-20 mb-6">
        <div className="bg-white border border-[#F3F4F6] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex flex-wrap items-end gap-4">
          {filterConfig.map((f) => (
            <div key={f.key} className="flex flex-col gap-1 flex-1 min-w-[140px]">
              <label className="font-['Manrope'] text-[10px] font-bold text-[#6B7280] tracking-[0.5px] uppercase">
                {f.label}
              </label>
              <div className="relative">
                <select
                  value={filters[f.key]}
                  onChange={(event) =>
                    setFilters({ ...filters, [f.key]: event.target.value })
                  }
                  className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-10 py-2 font-['Manrope'] text-sm text-[#111827] outline-none focus:ring-2 focus:ring-[#5E23DC] cursor-pointer"
                >
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown
                  open={false}
                  size="w-4 h-4 text-[#6B7280] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="font-['Manrope'] text-sm font-bold text-[#6B7280] px-6 py-2 hover:text-gray-900 transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleBrowse}
              className="bg-[#5E23DC] shadow-[0px_10px_15px_-3px_rgba(94,35,220,0.2)] text-white font-['Manrope'] text-sm font-bold px-8 py-2 rounded-lg hover:bg-[#4500B4] transition-colors"
            >
              Find Rentals
            </button>
          </div>
        </div>
      </div>

      <section id="featured-rentals" className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-['Manrope'] text-[32px] font-semibold text-[#151C27] tracking-[-0.32px] mb-2">
              Featured Rental Properties
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-base text-[#151C27]">
              Handpicked stays for a seamless living experience.
            </p>
          </div>
          <Link
            href={buildPropertiesLink({ city: PAGE_CITY, ...filters })}
            className="flex items-center gap-2 text-[#5E23DC] font-['Plus_Jakarta_Sans'] text-base whitespace-nowrap hover:gap-3 transition-all"
          >
            View All Listings <ArrowRight className="w-4 h-4 text-[#5E23DC]" />
          </Link>
        </div>
        {displayRentals.length > 0 ? (
          <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {displayRentals.slice(0, 6).map((property, index) => (
              <RentalCard key={property.propertyid} property={property} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-[rgba(203,195,216,0.1)]">
            <p className="text-[#6B7280] mb-4">
              No rentals match your filters right now. Try adjusting your search or talk to our expert.
            </p>
            <button
              type="button"
              onClick={() => openAgentAdvisor(`Help me find rental properties in ${PAGE_CITY}.`)}
              className="bg-[#5E23DC] text-white font-semibold text-sm px-6 py-3 rounded-lg"
            >
              Talk to Expert
            </button>
          </div>
        )}
      </section>

      {popularAreas.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="font-['Manrope'] text-[30px] font-black text-[#111827] leading-9 mb-3">
                Popular Areas for Renting in {PAGE_CITY}
              </h2>
              <p className="font-['Manrope'] text-base text-[#6B7280]">
                Area-wise guides to help you pick the right neighbourhood in {PAGE_CITY}.
              </p>
            </div>
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {popularAreas.map((area) => (
                <AreaCard key={area.name} area={area} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SeoSectionAd />

      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-20">
        <h2 className="font-['Manrope'] text-[30px] font-black text-[#111827] leading-9 text-center mb-14">
          Why Rent Through Reparv?
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <TrustBenefitCard
            iconBg="bg-[rgba(94,35,220,0.1)]"
            emoji="🚫"
            title="Zero Brokerage"
            desc="No hidden fees or agent commissions. You pay only rent."
          />
          <TrustBenefitCard
            iconBg="bg-[#D1FAE5]"
            emoji="✅"
            title="Verified Owners"
            desc="Only genuine property owners listed. No fake profiles."
          />
          <TrustBenefitCard
            iconBg="bg-[#DBEAFE]"
            emoji="⚡"
            title="Fast Move-In"
            desc="Ready properties with quick possession and handover."
          />
          <TrustBenefitCard
            iconBg="bg-[#FEF3C7]"
            emoji="📄"
            title="Agreement Support"
            desc="Assistance with rent agreement & documentation."
          />
        </div>
      </section>

      <section className="py-24 bg-[#F9F9FF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <h2 className="font-['Manrope'] text-[32px] font-semibold text-[#151C27] tracking-[-0.32px] text-center mb-16">
            How Renting Through Reparv Works
          </h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-[rgba(69,0,180,0.1)] via-[rgba(69,0,180,0.3)] to-[rgba(69,0,180,0.1)] z-0" />
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 relative z-10">
              {howSteps.map((step) => (
                <HowStep key={step.label} {...step} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SeoSectionAd variant="seoInFeed" />

      <section className="bg-[#5E23DC] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white blur-[60px] rounded-full opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white blur-[60px] rounded-full opacity-10 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-['Manrope'] text-[32px] font-semibold text-white tracking-[-0.32px] mb-4">
              Why Rent Through Reparv?
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-base text-[#CFBFFF]">
              Reimagining the rental journey with trust and technology.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: <ZapIcon />,
                title: "Zero Brokerage",
                desc: "Save significantly. We connect you directly with homeowners, eliminating middlemen fees completely.",
              },
              {
                icon: <ShieldCheck />,
                title: "Quick Move-In",
                desc: "Our properties are vetted for readiness. From viewing to moving, experience the fastest rental turnaround.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-3xl p-10 flex items-center gap-8 hover:bg-white/15 transition-colors"
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-['Manrope'] text-base text-white mb-2">{c.title}</h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-base text-[#CFBFFF] leading-6">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-20">
        <div className="mb-16">
          <h2 className="font-['Manrope'] text-[32px] font-semibold text-[#151C27] tracking-[-0.32px] mb-2">
            Success Stories
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-base text-[#151C27]">
            Real experiences from our rental community.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <StoryCard
            name="Arav Sharma"
            role={`Software Engineer${popularAreas[0]?.name ? ` near ${popularAreas[0].name}` : ""}`}
            problem="I spent weeks looking for a place near my office but was overwhelmed by high brokerage fees and unverified listings."
            solution="Reparv's verified listings were all owner-checked. I found a 2BHK and connected with the owner instantly."
            outcome="Moved in within 48 hours with 0 brokerage."
          />
          <StoryCard
            name="Priya & Family"
            role={`${popularAreas[1]?.name || "Besa"} Residents`}
            problem="Searching for a spacious, family-friendly flat was stressful with unreliable agents."
            solution="Reparv scheduled all visits in one weekend. The transparent process was a relief."
            outcome="Settled in a beautiful 3BHK home they love."
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="font-['Manrope'] text-[30px] font-black text-[#111827] leading-9 mb-3">
              What Type of Tenant Are You?
            </h2>
            <p className="font-['Manrope'] text-base text-[#6B7280]">
              We cater to diverse lifestyles and rental needs across {PAGE_CITY}.
            </p>
          </div>
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {tenantTypes.map((tenant) => (
              <TenantCard key={tenant.title} tenant={tenant} onSelect={handleTenantSelect} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1312px] mx-auto px-4 py-12">
        <div className="bg-[#3F2D62] rounded-[32px] overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-violet-900 to-transparent" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-10 lg:p-20">
            <div className="flex-1 max-w-[736px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-0.5 bg-white" />
                <h2 className="font-['Manrope'] text-[30px] font-black text-white leading-9">
                  Rent Your Property on Reparv — 100% Free
                </h2>
              </div>
              <p className="font-['Manrope'] text-base text-white/80 leading-6 mb-6 max-w-[671px]">
                List your house on India&apos;s best real estate platform and connect directly with
                pre-screened, quality tenants seeking long-term stability.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "Verified tenant profiles + background checks",
                  "Free legal support",
                  "Access to high-income tenant segments",
                  "Professional photography included",
                ].map((item) => (
                  <li
                    key={item}
                    className="font-['Manrope'] text-sm font-medium text-white flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/rent-property"
                className="inline-block bg-white text-[#5E23DC] font-['Manrope'] text-base font-black px-10 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                List Your Property Free
              </Link>
            </div>
            <div className="w-full lg:w-[280px] flex-shrink-0">
              <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-3xl p-8 text-center">
                <p className="text-5xl text-white mb-3">🏠</p>
                <p className="font-['Manrope'] font-black text-[30px] text-white leading-9 mb-1">
                  {formatVerifiedStatValue(rentalListings)}
                </p>
                <p className="font-['Manrope'] text-xs font-bold text-white/70 uppercase tracking-[1.2px] mb-6">
                  Active Listings
                </p>
                <p className="font-['Manrope'] font-bold text-[36px] text-white leading-10">₹0</p>
                <p className="font-['Manrope'] text-xs font-bold text-white/70 uppercase tracking-wide">
                  Listing Fee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SeoSectionAd />

      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-['Manrope'] text-[36px] font-black text-[#111827] leading-10 mb-4">
              Talk to a Rental Expert
            </h2>
            <p className="font-['Manrope'] text-base text-[#6B7280] leading-6 mb-10">
              Get personalized rental options in {PAGE_CITY} matching your budget, area, and
              move-in timeline.
            </p>
            <div className="flex flex-col gap-6 pt-6">
              {[
                "Pre-filtered listings — no brokerage",
                "Direct owner contact — zero brokerage",
                "Site visits in options available",
                "Agreement and documentation support",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#5E23DC] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-['Manrope'] font-bold text-xs">{index + 1}</span>
                  </div>
                  <span className="font-['Manrope'] font-bold text-base text-[#374151]">{item}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => openAgentAdvisor(`I need help finding rental properties in ${PAGE_CITY}.`)}
              className="mt-8 border-2 border-[#5E23DC] text-[#5E23DC] font-['Manrope'] font-bold text-sm px-8 py-3 rounded-lg hover:bg-[#5E23DC] hover:text-white transition-colors"
            >
              Chat with Expert
            </button>
          </div>

          <div className="bg-[#F9FAFB] border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-3xl p-10">
            <h3 className="font-['Manrope'] font-bold text-xl text-[#111827] mb-8">
              Get Rental Options
            </h3>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {[
                { label: "YOUR NAME", placeholder: "Enter your name", key: "name", type: "text" },
                { label: "PHONE NUMBER", placeholder: "Enter phone number", key: "phone", type: "tel" },
              ].map((f) => (
                <div key={f.key} className="flex flex-col gap-2">
                  <label className="font-['Manrope'] text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(event) => setForm({ ...form, [f.key]: event.target.value })}
                    className="w-full bg-white border border-[#F3F4F6] rounded-xl px-4 py-3.5 font-['Manrope'] text-base text-[#111827] placeholder-[#6B7280] outline-none focus:ring-2 focus:ring-[#5E23DC] transition"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#5E23DC] shadow-[0px_10px_15px_-3px_rgba(94,35,220,0.2),0px_4px_6px_-4px_rgba(94,35,220,0.2)] text-white font-['Manrope'] font-black text-base py-4 rounded-xl hover:bg-[#4500B4] transition-colors disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Get Rental Options"}
              </button>
              <p className="font-['Manrope'] text-[10px] font-medium text-[#9CA3AF] text-center">
                No spam. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="max-w-[1248px] mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-[#5E23DC] to-[#A855F7] rounded-3xl overflow-hidden relative min-h-[280px] flex items-center">
          <div className="relative z-10 p-10 sm:p-16 max-w-xl">
            <h2 className="font-['Manrope'] font-black text-[30px] text-white leading-9 mb-4">
              Find the Right Rental with Reparv
            </h2>
            <p className="font-['Manrope'] text-base text-white/80 leading-6 mb-8">
              Browse verified rentals in {PAGE_CITY} with transparent pricing, owner verification,
              and zero brokerage.
            </p>
            <Link
              href={buildPropertiesLink({ city: PAGE_CITY })}
              className="inline-flex bg-white text-[#5E23DC] font-['Manrope'] font-bold text-base px-8 py-3 rounded-xl items-center gap-3 hover:bg-gray-50 transition-colors shadow-lg"
            >
              <DownloadIcon />
              Browse Rentals
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:flex items-center justify-center">
            <img
              src="/assets/seoPages/rentalProperties/image.svg"
              alt="Reparv rental app"
              className="w-56 h-56 object-contain opacity-90"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F9F9FF] py-24">
        <div className="max-w-[768px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Manrope'] text-[36px] font-bold text-[#151C27] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-base text-[#151C27]">
              Everything you need to know about renting with Reparv.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
