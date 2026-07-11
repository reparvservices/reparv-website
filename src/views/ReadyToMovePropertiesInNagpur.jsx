"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SeoSectionAd from "../components/seocomponents/common/SeoSectionAd";
import { useAuth } from "../store/auth";
import { openAgentAdvisor } from "../utils/openAgentAdvisor";
import {
  buildPropertiesLink,
  filterReadyHomes,
  formatIndianPriceShort,
  formatPriceLabel,
  formatPropertyCategory,
  formatVerifiedStatValue,
  getAreaImage,
  getPropertyBadge,
  getPropertyImage,
  getPropertyLocationText,
  getReadyHomeTitle,
  mapFaqs,
} from "../utils/readyToMovePage";

const PAGE_CITY = "Nagpur";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const CheckDot = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronDownSm = ({ open = false }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={open ? "rotate-180 transition-transform" : "transition-transform"}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const LocationPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const VerifiedBadge = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1l2.39 2.39 3.3-.66.66 3.3L21 8.39 19.39 11l1.61 2.61-2.61 1.61.66 3.3-3.3.66L12 22.61l-2.39-2.39-3.3.66-.66-3.3L3 14.61 4.61 12 3 9.39l2.61-1.61-.66-3.3 3.3-.66L12 1z" />
    <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="1" /><line x1="9" y1="6" x2="9" y2="6" />
    <line x1="9" y1="10" x2="9" y2="10" /><line x1="15" y1="6" x2="15" y2="6" /><line x1="15" y1="10" x2="15" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5E23DC" strokeWidth="2">
    <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const WrenchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);

const ReceiptIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <path d="M4 2h16v20l-2-1-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="16" y2="11" />
  </svg>
);

const EyeBuildingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const DocCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><path d="M9 15l2 2 4-4" />
  </svg>
);

const ScaleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <path d="M12 3v18M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0zM5 7h14M9 21h6" />
  </svg>
);

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8">
    <circle cx="7.5" cy="15.5" r="5.5" /><path d="M21 2l-9.6 9.6M15.5 7.5l3 3L22 7l-3-3" />
  </svg>
);

const AppleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.624 0 2.879.06 4.365 2.19-.115.07-2.611 1.52-2.611 4.66 0 3.71 3.282 5.02 3.191 4.98z" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M3.6 2.27a1 1 0 0 0-.6.91v17.64a1 1 0 0 0 .6.91l9.6-9.73-9.6-9.73z" fill="#4285F4" />
    <path d="M13.2 8.36L16.81 12l-3.61 3.64L3.6 21.73 13.2 8.36z" fill="#34A853" />
    <path d="M20.4 10.18L16.8 8.04 13.2 12l3.6 3.96 3.6-2.14a1.1 1.1 0 0 0 0-3.64z" fill="#FBBC04" />
    <path d="M3.6 2.27L13.2 8.36 16.8 4.7a1 1 0 0 0-1.34-.05L3.6 2.27z" fill="#EA4335" />
  </svg>
);

function FilterSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex min-w-[160px] flex-1 flex-col gap-2">
      <label className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-3 text-sm text-[#0F172A]"
      >
        {value}
        <ChevronDownSm open={open} />
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-52 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2.5 text-left text-sm hover:bg-[#F8FAFC] ${
                value === option ? "font-bold text-[#5E23DC]" : "text-[#0F172A]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PropertyCard({ property }) {
  const badge = getPropertyBadge(property);
  const salesPrice = Number(property?.totalSalesPrice);
  const offerPrice = Number(property?.totalOfferPrice);
  const showStrike = salesPrice > offerPrice && offerPrice > 0;

  return (
    <div className="w-full max-w-[317px] rounded-2xl bg-white shadow-[6px_4px_23px_1px_rgba(63,45,98,0.15)]">
      <div className="relative h-[211px] w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#DDD5FF] to-[#EBE5FF]">
        <img
          src={getPropertyImage(property)}
          alt={getReadyHomeTitle(property)}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/assets/property/propertyPicture.svg";
          }}
        />
        <span className="absolute left-3.5 top-3.5 flex items-center gap-1 rounded-md bg-[#8A38F5] px-2.5 py-1.5 text-[8px] font-bold uppercase text-white">
          <VerifiedBadge /> {badge.label}
        </span>
      </div>

      <div className="px-3.5 pb-4 pt-3.5">
        <div className="mb-1.5 flex items-center gap-1.5 text-slate-400">
          <LocationPin />
          <span className="text-sm text-slate-500">{getPropertyLocationText(property)}</span>
        </div>
        <h4 className="mb-3 line-clamp-2 text-base font-bold text-[#0F172A]">
          {property?.propertyName || getReadyHomeTitle(property)}
        </h4>

        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8A38F5]/10 px-3 py-1.5 text-xs font-semibold text-[#8A38F5]">
            <BuildingIcon /> {formatPropertyCategory(property?.propertyCategory)}
          </span>
          <div className="text-right">
            {showStrike ? (
              <p className="text-xs font-bold text-slate-400 line-through">
                {formatIndianPriceShort(salesPrice)}
              </p>
            ) : null}
            <p className="text-xl font-bold text-[#0F172A]">{formatPriceLabel(property)}</p>
          </div>
        </div>

        <div className="mb-3 h-px w-full bg-gray-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#8A38F5] bg-white">
              <UserIcon />
            </div>
            <div>
              <p className="text-xs font-medium text-[#868686]">
                {property?.partnerName || "Verified"}
              </p>
              <p className="text-[8px] font-medium text-[#868686]">Seller</p>
            </div>
          </div>
          <Link
            href={`/property-info/${property?.seoSlug}`}
            className="rounded-lg bg-[#8A38F5] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#7a28e5]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function AreaCard({ area }) {
  return (
    <div className="flex w-full max-w-[290px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
      <div className="relative h-32 w-full overflow-hidden">
        <img
          src={getAreaImage(area)}
          alt={area.name}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/assets/property/propertyPicture.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded bg-white/90 px-2 py-1 text-[10px] font-bold text-[#5E23DC]">
          {area.priceLabel}
        </span>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-1">
          <span className="inline-flex w-fit rounded bg-[#5E23DC]/5 px-2 py-1 text-[10px] font-bold text-[#5E23DC]">
            Best for {area.idealFor}
          </span>
          <h3 className="text-xl font-extrabold text-[#0F172A]">{area.name}</h3>
          <p className="text-[11px] font-bold uppercase text-slate-400">
            {area.count} ready {area.count === 1 ? "home" : "homes"} listed
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {area.points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-slate-400">–</span> {point}
            </li>
          ))}
        </ul>
        <Link
          href={buildPropertiesLink({ city: PAGE_CITY, area: area.name })}
          className="rounded-lg border border-[#5E23DC]/10 py-2 text-center text-xs font-bold text-[#5E23DC] transition-colors hover:bg-[#5E23DC]/5"
        >
          View Homes
        </Link>
      </div>
    </div>
  );
}

export default function ReadyToMovePropertiesInNagpur({
  initialPageData = null,
  initialFaqs = [],
}) {
  const { URI, setShowAlert } = useAuth();
  const pageData = initialPageData;

  const [filters, setFilters] = useState({
    type: "Any",
    budget: "Any",
    bhk: "Any",
    area: "All Areas",
  });
  const [form, setForm] = useState({ name: "", phone: "", budget: "Any", area: "All Areas" });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const propertyCount = pageData?.stats?.propertyCount || 0;
  const flatCount = pageData?.stats?.flatCount || 0;
  const plotCount = pageData?.stats?.plotCount || 0;
  const localityCount = pageData?.stats?.localities || 0;
  const minPrice = pageData?.stats?.minPrice;

  const allProperties = pageData?.properties || [];
  const heroHomes = pageData?.heroHomes || [];
  const popularAreas = pageData?.popularAreas || [];
  const localityOptions = pageData?.localities || [];
  const bhkOptions = pageData?.bhkOptions || [];
  const categoryOptions = pageData?.categoryOptions || ["Any", "Flat", "Plot"];

  const filteredProperties = useMemo(
    () => filterReadyHomes(allProperties, filters),
    [allProperties, filters],
  );

  const hasActiveFilters =
    filters.type !== "Any" ||
    filters.budget !== "Any" ||
    filters.bhk !== "Any" ||
    filters.area !== "All Areas";

  const displayProperties = hasActiveFilters
    ? filteredProperties.slice(0, 8)
    : (pageData?.featuredProperties || allProperties).slice(0, 8);

  const dashboardStats = [
    { label: "Avg Possession Time", value: "7 Days", sub: "After registration" },
    { label: "GST Savings", value: "0%", suffix: "Applicable", sub: "No GST on ready homes" },
    {
      label: "Properties Listed",
      value: formatVerifiedStatValue(propertyCount) || "39+",
      sub: "Verified ready homes",
    },
    { label: "Move-In Timeline", value: "Today", sub: "No waiting period" },
  ];

  const filterConfig = useMemo(
    () => [
      { label: "Property Type", key: "type", opts: categoryOptions },
      { label: "Budget", key: "budget", opts: ["Any", "₹20-40L", "₹40-60L", "₹60-80L", "₹80L+"] },
      { label: "BHK", key: "bhk", opts: ["Any", ...bhkOptions] },
      { label: "Preferred Area", key: "area", opts: ["All Areas", ...localityOptions] },
    ],
    [categoryOptions, bhkOptions, localityOptions],
  );

  const faqs = useMemo(() => {
    const mapped = mapFaqs(initialFaqs || []);
    if (mapped.length > 0) return mapped;

    return [
      {
        q: "Do ready-to-move homes have GST?",
        a: "No. GST is not applicable on completed and ready-to-move properties.",
      },
      {
        q: "Can I get a home loan on ready homes?",
        a: "Yes. Banks easily provide loans for completed and registered properties.",
      },
      {
        q: "How soon can I move in after buying?",
        a: "Possession is typically available within 7 days of registration, since the home is already complete.",
      },
      {
        q: "Are these properties fully verified?",
        a: `Yes. Reparv lists ${propertyCount || "verified"} ready homes across ${localityCount || "multiple"} Nagpur localities with legal verification and transparent pricing.`,
      },
      {
        q: "Is there any brokerage charged to buyers?",
        a: "No. Reparv charges zero brokerage to buyers on all ready-to-move property purchases.",
      },
    ];
  }, [initialFaqs, propertyCount, localityCount]);

  const stories = useMemo(() => {
    const samples = (pageData?.featuredProperties || allProperties).slice(0, 3);
    const defaults = [
      { name: "Rahul Patil", role: "Buyer", budget: "Mid Range" },
      { name: "Meera Joshi", role: "Buyer", budget: "Flexible" },
      { name: "Agarwal Family", role: "Buyer", budget: "Affordable Range" },
    ];

    return defaults.map((item, index) => ({
      ...item,
      location: samples[index]?.location || popularAreas[index]?.name || PAGE_CITY,
      fieldLabel: index === 1 ? "Challenge" : "Decision",
      fieldValue:
        index === 0
          ? "Chose ready home for instant possession"
          : index === 1
            ? "Wanted zero GST & no waiting"
            : `Bought ready ${formatPropertyCategory(samples[index]?.propertyCategory || "Flat").toLowerCase()}`,
      timeline:
        index === 0 ? "Within 1 week" : index === 1 ? "10 days after registration" : "Shifted in same week",
      outcome:
        index === 0
          ? "Moved in within 1 week after booking"
          : index === 1
            ? "Zero GST and immediate possession"
            : "Found a verified ready home quickly on Reparv",
    }));
  }, [allProperties, pageData?.featuredProperties, popularAreas]);

  const handleReset = () => {
    setFilters({ type: "Any", budget: "Any", bhk: "Any", area: "All Areas" });
  };

  const handleSearch = () => scrollToSection("featured-ready-homes");

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
          subject: `Ready to Move - ${PAGE_CITY}`,
          message: `Callback requested from Ready to Move page. City: ${PAGE_CITY}. Budget: ${form.budget}. Area: ${form.area}.`,
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

      setForm({ name: "", phone: "", budget: "Any", area: "All Areas" });
    } catch (error) {
      console.error("Ready to move callback error:", error);
      alert("Server error, please try again later");
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    { icon: <WrenchIcon />, bg: "#FFEDD5", title: "Immediate Possession", desc: "Move in without waiting for construction. Your home is already built, registered, and ready to be yours today." },
    { icon: <ShieldCheckIcon />, bg: "#DBEAFE", title: "No Construction Risk", desc: "Finished property with exact size & layout. What you see is exactly what you get — no changes, no surprises." },
    { icon: <ReceiptIcon />, bg: "#FEE2E2", title: "No GST", desc: "Save on GST applicable on under-construction homes. Ready homes carry zero GST, saving you lakhs on purchase." },
    { icon: <EyeBuildingIcon />, bg: "#FEF9C3", title: "What You See Is What You Buy", desc: "Inspect the actual flat before making your final decision. Touch, see, and feel your home before signing the agreement." },
  ];

  const steps = [
    { label: "Explore Homes", sub: "Browse verified ready properties", color: "#F97316" },
    { label: "Schedule Visit", sub: "Visit a property nearby", color: "#3B82F6" },
    { label: "Legal Verification", sub: "Documents & ownership verified", color: "#A855F7" },
    { label: "Registration", sub: "Sale deed & registration", color: "#6366F1" },
    { label: "Receive Keys", sub: "Immediate handover of keys", color: "#EC4899" },
    { label: "Move In", sub: "Your new home awaits", color: "#22C55E" },
  ];

  const readyPoints = ["Immediate possession", "No GST applicable", "No delay or construction risk", "Inspect actual flat before buying", "Start living or renting instantly"];
  const constructionPoints = ["Possession after 2–4 years", "GST applicable on price", "Risk of construction delay", "Only sample flat available", "EMI + rent burden during wait"];

  const expertItems = [
    { icon: <PhoneIcon />, bg: "#FFEDD5", title: "Expert Consultation", desc: "Personalized ready-home search tailored to your needs." },
    { icon: <DocCheckIcon />, bg: "#DBEAFE", title: "Property Verification", desc: "Full legal and document verification before purchase." },
    { icon: <ScaleIcon />, bg: "#F3E8FF", title: "Legal Guidance", desc: "End-to-end legal support for safe property buying." },
    { icon: <KeyIcon />, bg: "#FEF9C3", title: "Immediate Possession Support", desc: "We help you move in quickly without unnecessary hassle." },
  ];

  return (
    <main className="min-h-screen bg-white font-sans">
      <section className="bg-[#5E23DC] px-6 pt-16 pb-32 md:px-8 lg:px-12">
        <div className="container mx-auto grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col items-start">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              {["Immediate Possession", "Zero Brokerage", "Verified Properties"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mb-8 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[60px] lg:leading-[60px]">
              Ready to Move
              <br />
              Properties in {PAGE_CITY}
            </h1>

            <p className="mb-8 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              Buy ready-to-move flats, plots and houses in {PAGE_CITY} with instant possession, no construction risk, and complete legal verification by Reparv.
            </p>

            <div className="mb-7 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("featured-ready-homes")}
                className="rounded-xl bg-white px-8 py-[18px] text-base font-bold text-[#5E23DC] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.02]"
              >
                Explore Ready Homes
              </button>
              <button
                type="button"
                onClick={() => openAgentAdvisor("Ready to Move Properties")}
                className="rounded-xl border-2 border-white/30 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                Talk to Expert
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-white/60">
              {[
                `${propertyCount || 39}+ Ready Homes`,
                `${flatCount || 0} Flats & Houses`,
                `${plotCount || 0} Ready Plots`,
                "Zero Brokerage",
              ].map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />}
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                  <BuildingIcon />
                </div>
                <span className="text-sm font-bold text-white">Homes Ready Today</span>
              </div>
              <div className="flex flex-col gap-3">
                {(heroHomes.length ? heroHomes : [{ title: "2 BHK Ready Flat - Nagpur", price: minPrice ? formatIndianPriceShort(minPrice) : "From ₹20 Lakh" }]).map((home) => (
                  <Link
                    key={home.propertyid || home.title}
                    href={home.seoSlug ? `/property-info/${home.seoSlug}` : buildPropertiesLink({ city: PAGE_CITY })}
                    className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/5 px-3 py-3 transition-colors hover:bg-white/10"
                  >
                    <span className="text-xs text-white">{home.title}</span>
                    <span className="whitespace-nowrap rounded bg-green-400/20 px-2 py-0.5 text-[10px] text-green-300">
                      {home.price}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {dashboardStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-white/60">{stat.label}</p>
                  <p className="mb-1 text-2xl font-extrabold text-white">
                    {stat.value}
                    {stat.suffix ? <span className="ml-1 text-sm font-extrabold text-white">{stat.suffix}</span> : null}
                  </p>
                  <p className="text-[10px] text-white/40">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 -mt-20 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] md:flex-row md:flex-wrap md:items-end lg:flex-nowrap">
            {filterConfig.map((field) => (
              <FilterSelect
                key={field.key}
                label={field.label}
                value={filters[field.key]}
                options={field.opts}
                onChange={(value) => setFilters((prev) => ({ ...prev, [field.key]: value }))}
              />
            ))}
            <div className="flex items-center gap-4 pt-1 md:pt-0">
              <button type="button" onClick={handleReset} className="text-sm font-bold text-slate-400 hover:text-slate-600">
                Reset
              </button>
              <button
                type="button"
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#8A38F5] px-8 py-3 text-base font-bold text-white transition-colors hover:bg-[#7a28e5]"
              >
                <SearchIcon /> Show Homes
              </button>
            </div>
          </div>
        </div>
      </div>

      <section id="featured-ready-homes" className="bg-white px-6 pb-24 pt-20 md:px-8 lg:px-12">
        <div className="container mx-auto flex flex-col items-center gap-12">
          <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#5E23DC]">Handpicked Homes</span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
              Featured Ready to Move Properties in {PAGE_CITY}
            </h2>
            <p className="text-base leading-6 text-slate-500">
              {hasActiveFilters
                ? `${filteredProperties.length} homes match your filters — verified, completed homes with immediate possession.`
                : "Verified, completed homes with immediate possession — no construction delays, no waiting."}
            </p>
          </div>

          {displayProperties.length > 0 ? (
            <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayProperties.map((property) => (
                <PropertyCard key={property.propertyid} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#5E23DC]/20 bg-[#F8FAFC] px-8 py-16 text-center">
              <p className="mb-4 text-lg font-bold text-[#0F172A]">No homes match your filters</p>
              <p className="mb-6 text-sm text-slate-500">Try adjusting your budget, BHK, or area preferences.</p>
              <button type="button" onClick={handleReset} className="rounded-xl bg-[#8A38F5] px-6 py-3 text-sm font-bold text-white">
                Reset Filters
              </button>
            </div>
          )}

          <Link
            href={buildPropertiesLink({ city: PAGE_CITY, ...filters })}
            className="flex items-center gap-2 rounded-xl bg-[#8A38F5] px-10 py-4 text-base font-bold text-white transition-colors hover:bg-[#7a28e5]"
          >
            View More Ready Homes <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="bg-[#F9FAFB] px-6 py-24 md:px-8 lg:px-12">
        <div className="container mx-auto flex flex-col gap-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#5E23DC]">The Advantage</span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">Why Choose Ready to Move Homes?</h2>
            <p className="text-base leading-6 text-slate-500">Own your home today — no waiting, no uncertainty, no construction delays.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: benefit.bg }}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-extrabold leading-snug text-[#0F172A]">{benefit.title}</h3>
                  <p className="text-sm leading-[1.6] text-slate-500">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoSectionAd />

      <section className="bg-white px-6 py-24 md:px-8 lg:px-12">
        <div className="container mx-auto flex flex-col gap-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#5E23DC]">Step by Step</span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">Your Journey to Move Into Your Home</h2>
            <p className="text-base leading-6 text-slate-500">From discovery to keys in hand — your complete ready-home roadmap with Reparv.</p>
          </div>
          <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:justify-between">
            <div className="absolute left-[10%] right-[10%] top-8 hidden h-0.5 bg-[#F1F5F9] lg:block" />
            {steps.map((step, index) => (
              <div key={step.label} className="relative z-10 flex flex-col items-center px-2 text-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-xl font-bold text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  style={{ background: step.color }}
                >
                  {index + 1}
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <h4 className="text-sm font-extrabold text-[#0F172A]">{step.label}</h4>
                  <p className="max-w-[130px] text-[10px] leading-[1.5] text-slate-500">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {popularAreas.length > 0 ? (
        <section className="bg-[#F8FAFC] px-6 py-24 md:px-8 lg:px-12">
          <div className="container mx-auto flex flex-col items-center gap-16">
            <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#5E23DC]">Neighbourhood Guides</span>
              <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
                Popular Areas for Ready Homes in {PAGE_CITY}
              </h2>
              <p className="text-base leading-6 text-slate-500">
                Locations with high availability of completed projects and strong resale value.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {popularAreas.map((area) => (
                <AreaCard key={area.name} area={area} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white px-6 py-24 md:px-8 lg:px-12">
        <div className="container mx-auto flex flex-col items-center gap-16">
          <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#5E23DC]">Make the Right Choice</span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">Ready to Move vs Under-Construction Homes</h2>
            <p className="text-base leading-6 text-slate-500">
              Confused between buying now or waiting for a new project? Here&apos;s a quick comparison to help you decide better.
            </p>
          </div>
          <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] md:grid-cols-2">
            <div className="flex flex-col gap-8 bg-[#5E23DC] p-10 md:p-12">
              <span className="w-fit rounded-lg bg-white/10 px-4 py-2 text-xs font-bold uppercase text-white">Ready to Move Homes</span>
              <h3 className="text-3xl font-extrabold text-white">The Certain Choice</h3>
              <ul className="flex flex-col gap-4">
                {readyPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm font-medium text-white">
                    <CheckDot /> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-8 border border-l-0 border-gray-100 bg-white p-10 md:p-12">
              <span className="w-fit rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold uppercase text-slate-500">Under-Construction Homes</span>
              <h3 className="text-3xl font-extrabold text-[#0F172A]">The Waiting Game</h3>
              <ul className="flex flex-col gap-4">
                {constructionPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm font-medium text-slate-500">
                    <span className="text-slate-400">✕</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SeoSectionAd variant="seoInFeed" />

      <section className="bg-[#5E23DC] px-6 py-16 md:px-8 lg:px-12">
        <div className="container mx-auto flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
          <div className="flex max-w-2xl flex-col gap-6">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/80">For Property Owners</span>
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">Sell Your Ready Property Faster with Reparv</h2>
            <p className="max-w-lg text-base leading-6 text-white/70">
              Have a ready flat or house to sell? List your property on Reparv for free and connect with serious, verified buyers looking for immediate possession.
            </p>
            <ul className="flex flex-col gap-3">
              {["Zero brokerage for sellers", "Verified buyer enquiries", "Faster closure with ready buyers", "Legal & documentation support"].map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm font-medium text-white">
                  <CheckDot /> {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-10 backdrop-blur-md">
            <h3 className="mb-4 text-2xl font-extrabold text-white">List Your Property Free</h3>
            <p className="mb-6 text-sm leading-5 text-white/60">
              Join hundreds of verified sellers who found serious buyers quickly on Reparv — zero brokerage, complete support.
            </p>
            <Link
              href="/list-property"
              className="block w-full rounded-xl bg-white py-4 text-center text-base font-bold text-[#5E23DC] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.01]"
            >
              List Your Ready Property Free
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:px-8 lg:px-12">
        <div className="container mx-auto flex flex-col gap-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#5E23DC]">Journey Cards</span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">Ready Home Buyer Stories</h2>
            <p className="text-base leading-6 text-slate-500">Real buyers who found their ready homes and moved in faster than they imagined.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <div key={story.name} className="flex w-full flex-col gap-6 rounded-2xl border border-gray-100 bg-[#F9FAFB] p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#DDD5FF] to-[#C9B8FF] text-sm font-bold text-[#5E23DC] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    {story.name[0]}
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-[#0F172A]">{story.name}</p>
                    <p className="text-[10px] font-bold uppercase text-slate-400">{story.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-slate-100 bg-white p-3">
                    <p className="mb-1 text-[9px] font-bold uppercase text-slate-400">Budget</p>
                    <p className="text-xs font-bold text-[#0F172A]">{story.budget}</p>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-white p-3">
                    <p className="mb-1 text-[9px] font-bold uppercase text-slate-400">Location</p>
                    <p className="text-xs font-bold text-[#0F172A]">{story.location}</p>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-white p-3">
                    <p className="mb-1 text-[9px] font-bold uppercase text-slate-400">{story.fieldLabel}</p>
                    <p className="text-xs font-bold leading-tight text-[#0F172A]">{story.fieldValue}</p>
                  </div>
                  <div className="rounded-lg border border-slate-100 bg-white p-3">
                    <p className="mb-1 text-[9px] font-bold uppercase text-slate-400">Move-in Timeline</p>
                    <p className="text-xs font-bold leading-tight text-[#0F172A]">{story.timeline}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-[#5E23DC]/5 p-4">
                  <p className="mb-1 text-[9px] font-bold uppercase text-[#5E23DC]">Outcome</p>
                  <p className="text-sm font-bold text-[#1E293B]">{story.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoSectionAd />

      <section className="bg-[#F9FAFB] px-6 py-24 md:px-8 lg:px-12">
        <div className="container mx-auto flex flex-col gap-16 lg:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col gap-10">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8A38F5]">Get Expert Help</span>
              <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">Talk to a Ready Home Expert</h2>
              <p className="text-base leading-6 text-slate-500">
                Our ready-home specialists help you find verified properties, confirm legality, and move in without delays.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {expertItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: item.bg }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#1E293B]">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex-1 rounded-2xl border border-gray-100 bg-white p-10 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
            <h3 className="mb-2 text-2xl font-extrabold text-[#0F172A]">Get Ready Home Options</h3>
            <p className="mb-6 text-sm leading-5 text-slate-400">
              Tell us what you need and our expert will match you with verified ready homes today.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="rounded-lg bg-[#F8FAFC] px-3 py-3 text-sm text-[#0F172A] outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#8A38F5]/30"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Phone Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  className="rounded-lg bg-[#F8FAFC] px-3 py-3 text-sm text-[#0F172A] outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#8A38F5]/30"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Budget Range</label>
                  <select
                    className="rounded-lg bg-[#F8FAFC] px-3 py-3 text-sm text-[#0F172A] outline-none focus:ring-2 focus:ring-[#8A38F5]/30"
                    value={form.budget}
                    onChange={(event) => setForm({ ...form, budget: event.target.value })}
                  >
                    {["Any", "₹20-40L", "₹40-60L", "₹60-80L", "₹80L+"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Preferred Area</label>
                  <select
                    className="rounded-lg bg-[#F8FAFC] px-3 py-3 text-sm text-[#0F172A] outline-none focus:ring-2 focus:ring-[#8A38F5]/30"
                    value={form.area}
                    onChange={(event) => setForm({ ...form, area: event.target.value })}
                  >
                    {["All Areas", ...localityOptions].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-xl bg-[#8A38F5] py-4 text-base font-bold text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#7a28e5] disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Get Ready Home Options"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#5E23DC] px-6 py-16 md:px-8 lg:px-12">
        <div className="container mx-auto grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-8">
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/80">Mobile App</span>
            <h2 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">Find Ready Homes on Reparv App</h2>
            <p className="max-w-lg text-base leading-6 text-white/70">
              Search, visit, and move in faster. Browse all ready homes, schedule visits, sign legal paperwork, and get instant possession right from your phone.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-3">
                <AppleIcon />
                <div className="text-left">
                  <p className="text-[10px] text-white/60">Download on the</p>
                  <p className="text-sm font-bold text-white">App Store</p>
                </div>
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-3">
                <PlayStoreIcon />
                <div className="text-left">
                  <p className="text-[10px] text-white/60">Get it on</p>
                  <p className="text-sm font-bold text-white">Google Play</p>
                </div>
              </a>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {["Discover Nearby Properties", "Live Chat", "EMI Calculator", "Booking", "Document Vault"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto flex justify-center">
            <div className="absolute h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />
            <div className="relative h-[560px] w-[280px] rounded-[40px] border-4 border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
              <div className="flex h-full w-full flex-col gap-3 rounded-[28px] bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#5E23DC]">reparv</span>
                  <div className="h-6 w-6 rounded-full bg-[#5E23DC]/10" />
                </div>
                <div className="rounded-xl bg-[#5E23DC] p-4 text-white">
                  <p className="text-[10px] opacity-80">Ready to Move</p>
                  <p className="text-sm font-bold">{propertyCount || 39}+ Homes in {PAGE_CITY}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {(heroHomes.length ? heroHomes : [{ title: "Ready Home", price: "Verified" }]).slice(0, 3).map((home) => (
                    <div key={home.propertyid || home.title} className="flex items-center gap-2 rounded-lg border border-gray-100 p-2">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-[#DDD5FF] to-[#C9B8FF]">
                        {home.frontView ? (
                          <img src={getPropertyImage({ frontView: home.frontView })} alt="" className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <div className="flex-1">
                        <div className="truncate text-[10px] font-bold text-[#0F172A]">{home.title}</div>
                        <div className="text-[10px] text-[#5E23DC]">{home.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:px-8 lg:px-12">
        <div className="container mx-auto flex max-w-3xl flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#5E23DC]">Got Questions?</span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
              Frequently Asked Questions — Ready to Move Homes
            </h2>
            <p className="text-base leading-6 text-slate-500">
              Everything you need to know before buying a ready-to-move property in {PAGE_CITY}.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-extrabold text-[#1E293B]">{faq.q}</span>
                  <span className={`flex-shrink-0 text-[#5E23DC] transition-transform ${openFaq === index ? "rotate-180" : ""}`}>
                    <ChevronDownSm open={openFaq === index} />
                  </span>
                </button>
                {openFaq === index ? (
                  <p className="px-6 pb-6 text-sm leading-[1.6] text-slate-500">{faq.a}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
