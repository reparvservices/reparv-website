"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import SeoSectionAd from "../components/seocomponents/common/SeoSectionAd";
import { useAuth } from "../store/auth";
import { openAgentAdvisor } from "../utils/openAgentAdvisor";
import {
  buildPropertiesLink,
  filterTrustedProperties,
  formatPriceLabel,
  formatPropertyCategory,
  formatVerifiedStatValue,
  getPropertyImage,
  getPropertyLocationText,
  getScoreLabel,
  getTrustedTitle,
  mapFaqs,
} from "../utils/topTrustedPropertiesPage";

const PAGE_CITY = "Nagpur";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const ChevronDown = ({ open }) => (
  <svg
    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckPurple = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="none">
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

const ShieldIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
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

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#E5E0F0] rounded-2xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-4 px-5 py-5 sm:px-6 sm:py-6 text-left"
      >
        <span className="font-semibold text-sm sm:text-base text-[#151C27] flex-1 leading-snug">
          {q}
        </span>
        <ChevronDown open={open} />
      </button>
      {open && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm leading-relaxed text-[#494455]">
          {a}
        </div>
      )}
    </div>
  );
}

// ── Score Ring ────────────────────────────────────────────────────────────────
function ScoreRing({ score = 9.4, listingCount = 500 }) {
  const r = 60;
  const circ = 2 * Math.PI * r;
  const dash = (score / 10) * circ;
  return (
    <div className="relative inline-flex items-center justify-center w-[160px] h-[160px] sm:w-[180px] sm:h-[180px]">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 180 180"
        className="-rotate-90 absolute inset-0"
      >
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="#E5E0F0"
          strokeWidth="12"
        />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="#5E23DC"
          strokeWidth="12"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10 text-center">
        <div className="w-7 h-7 rounded-full bg-[#5E23DC] flex items-center justify-center mb-1 text-white">
          <ShieldIcon className="w-3.5 h-3.5" />
        </div>
        <span className="font-black text-3xl sm:text-4xl text-[#4500B4] leading-none">
          {score}
        </span>
        <span className="text-[11px] text-[#494455]">/10</span>
        <span className="text-[11px] font-semibold text-[#494455] mt-0.5">
          Trust Score
        </span>
        <span className="text-[9px] text-[#8B83A0] mt-0.5">
          Based on {formatVerifiedStatValue(listingCount) || listingCount} listings
        </span>
      </div>
    </div>
  );
}

// ── Pillar Card ───────────────────────────────────────────────────────────────
function PillarCard({ icon, title, pct, desc }) {
  return (
    <div className="flex items-start gap-4 bg-[#F0F3FF] border border-[#CBC3D8] rounded-xl p-4 sm:p-5">
      <div className="w-10 h-10 rounded-xl bg-[#E8DDFF] flex items-center justify-center flex-shrink-0 text-lg">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-bold text-sm sm:text-base text-[#151C27]">
            {title}
          </span>
          <span className="font-black text-sm text-[#4500B4] flex-shrink-0">
            {pct}%
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#494455] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

// ── Property Card ─────────────────────────────────────────────────────────────
function PropertyCard({ property }) {
  const salesPrice = Number(property?.totalSalesPrice);
  const offerPrice = Number(property?.totalOfferPrice);
  const showStrike = salesPrice > offerPrice && offerPrice > 0;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(63,45,98,0.13)] overflow-hidden flex flex-col">
      <div className="relative">
        <div className="h-44 sm:h-52 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500 overflow-hidden">
          <img
            src={getPropertyImage(property)}
            alt={getTrustedTitle(property)}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/assets/property/propertyPicture.svg";
            }}
          />
        </div>
        <span className="absolute top-3 left-4 bg-[#8A38F5] text-white font-bold text-xs px-2.5 py-1 rounded-lg">
          {property?.trustScore || "8.0"}/10
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-1.5 text-[#868686]">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
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
          <span className="text-xs line-clamp-1">{getPropertyLocationText(property)}</span>
        </div>
        <h4 className="font-bold text-sm text-[#151C27] line-clamp-2">
          {property?.propertyName || getTrustedTitle(property)}
        </h4>

        <div className="relative rounded-full overflow-hidden mt-1">
          <div className="absolute inset-0 bg-[#8A38F5] opacity-10" />
          <div className="relative flex items-center justify-between px-3 py-2 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <svg
                className="w-4 h-4 text-[#8A38F5] flex-shrink-0"
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
              <span className="text-xs font-semibold text-[#8A38F5] truncate">
                {formatPropertyCategory(property?.propertyCategory)}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              {showStrike ? (
                <p className="text-[10px] font-bold text-[#868686] line-through">
                  ₹{Math.round(salesPrice / 100000)} Lakh
                </p>
              ) : null}
              <p className="text-base font-black text-[#151C27] leading-tight">
                {formatPriceLabel(property)}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#EFEFEF] mt-1 pt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full border border-[#8A38F5] bg-white flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3.5 h-3.5 text-[#5E23DC]"
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
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#868686] truncate">
                {property?.partnerName || "Verified"}
              </p>
              <p className="text-[9px] text-[#868686]">{getScoreLabel(property?.trustScore)}</p>
            </div>
          </div>
          <Link
            href={`/property-info/${property?.seoSlug}`}
            className="bg-[#8A38F5] text-white font-bold text-xs px-4 py-2 rounded-lg whitespace-nowrap"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Verification Step ─────────────────────────────────────────────────────────
function VerifStep({ icon, label, sub, active, isLast }) {
  return (
    <div className="flex lg:flex-col items-center lg:items-center gap-4 lg:gap-0 flex-1 relative">
      {/* Connector line — desktop only */}
      {!isLast && (
        <div className="hidden lg:block absolute top-[22px] left-1/2 right-[-50%] h-0.5 bg-[#CBC3D8] z-0" />
      )}
      {/* Mobile connector — vertical */}
      {!isLast && (
        <div className="lg:hidden absolute left-[19px] top-[44px] bottom-[-16px] w-0.5 bg-[#CBC3D8] z-0" />
      )}
      <div
        className={`relative z-10 w-11 h-11 lg:w-12 lg:h-12 rounded-full flex items-center justify-center flex-shrink-0 border-[3px] lg:mb-4
        ${
          active
            ? "bg-[#4500B4] border-[#4500B4] text-white shadow-[0_8px_20px_rgba(69,0,180,0.3)]"
            : "bg-white border-[#5E23DC] text-[#5E23DC]"
        }`}
      >
        <span className="text-base lg:text-lg">{icon}</span>
      </div>
      <div className="lg:text-center">
        <p
          className={`font-bold text-sm leading-tight ${active ? "text-[#4500B4]" : "text-[#151C27]"}`}
        >
          {label}
        </p>
        <p className="text-xs text-[#8B83A0] mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

// ── Trust Signal Card ─────────────────────────────────────────────────────────
function TrustSignalCard({ iconBg, iconEl, title, sub }) {
  return (
    <div className="bg-white border border-[#E5E0F0] rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center gap-2 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}
      >
        {iconEl}
      </div>
      <p className="font-bold text-sm text-[#151C27] mt-1">{title}</p>
      <p className="text-xs text-[#494455] leading-relaxed">{sub}</p>
    </div>
  );
}

// ── Score Row ─────────────────────────────────────────────────────────────────
function ScoreRow({ range, rangeColor, label, sub }) {
  return (
    <div className="flex items-start gap-4 p-4 border border-[#E5E0F0] rounded-xl">
      <span
        className={`font-black text-lg sm:text-xl w-14 flex-shrink-0 ${rangeColor}`}
      >
        {range}
      </span>
      <div>
        <p className="font-bold text-sm sm:text-base text-[#151C27]">{label}</p>
        <p className="text-xs sm:text-sm text-[#494455] mt-0.5 leading-relaxed">
          {sub}
        </p>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function TrustScorePage({
  initialPageData = null,
  initialFaqs = [],
}) {
  const { URI, setShowAlert } = useAuth();
  const pageData = initialPageData;

  const [filters, setFilters] = useState({
    minScore: "Any",
    type: "Any",
    budget: "Any",
    bhk: "Any",
    area: "All Areas",
  });
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const trustedCount = pageData?.stats?.trustedCount || 0;
  const topPicksCount = pageData?.stats?.topPicksCount || 0;
  const avgTrustScore = pageData?.stats?.avgTrustScore || 9.2;
  const localityCount = pageData?.stats?.localities || 0;
  const reraVerified = pageData?.stats?.reraVerified || 0;

  const allProperties = pageData?.properties || [];
  const localityOptions = pageData?.localities || [];
  const bhkOptions = pageData?.bhkOptions || [];
  const categoryOptions = pageData?.categoryOptions || ["Any", "Flat", "Plot"];
  const heroProperty = pageData?.heroProperty || null;
  const heroImage = heroProperty
    ? getPropertyImage(heroProperty)
    : "/assets/seoPages/TrustScorePage/hero.jpg";

  const filteredProperties = useMemo(
    () => filterTrustedProperties(allProperties, filters),
    [allProperties, filters],
  );

  const hasActiveFilters =
    filters.minScore !== "Any" ||
    filters.type !== "Any" ||
    filters.budget !== "Any" ||
    filters.bhk !== "Any" ||
    filters.area !== "All Areas";

  const displayProperties = hasActiveFilters
    ? filteredProperties.slice(0, 9)
    : (pageData?.featuredProperties || allProperties).slice(0, 9);

  const faqs = useMemo(() => {
    const mapped = mapFaqs(initialFaqs || []);
    if (mapped.length > 0) return mapped;

    return [
      {
        q: "What makes a property 'Trusted' on Reparv?",
        a: `A 'Trusted' status is awarded after a property passes our verification audit covering legal paperwork, builder track record, and listing quality. Reparv features ${trustedCount || "verified"} trusted listings in Nagpur scoring 7.0+ on our Trust Framework.`,
      },
      {
        q: "Are all properties in Nagpur listed here?",
        a: "No. We only highlight properties that meet our verification standards — including RERA checks, partner validation, and engagement signals from verified buyers.",
      },
      {
        q: "Can a Trust Score change over time?",
        a: "Yes. Trust Scores are reviewed based on new buyer feedback, legal updates, builder reputation changes, and listing performance signals.",
      },
      {
        q: "Do builders pay for higher scores?",
        a: "Absolutely not. Our Trust Score is independently calculated and cannot be purchased. We maintain strict separation between sales and verification.",
      },
    ];
  }, [initialFaqs, trustedCount]);

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
          subject: `Top Trusted Properties - ${PAGE_CITY}`,
          message: `Trust consultation requested from Top Trusted Properties page. City: ${PAGE_CITY}.`,
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
      console.error("Trust consultation callback error:", error);
      alert("Server error, please try again later");
    } finally {
      setSubmitting(false);
    }
  };

  const properties = displayProperties;

  const pillars = [
    {
      icon: (
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 19V17H12V19H0ZM5.65 14.15L0 8.5L2.1 6.35L7.8 12L5.65 14.15ZM12 7.8L6.35 2.1L8.5 0L14.15 5.65L12 7.8ZM16.6 18L3.55 4.95L4.95 3.55L18 16.6L16.6 18Z"
            fill="#4500B4"
          />
        </svg>
      ),
      title: "Legal Safety",
      pct: 30,
      desc: "Title search, RERA approvals, encumbrance scan, and litigation history audit.",
    },
    {
      icon: (
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V0H10V4H20V18H0ZM2 16H4V14H2V16ZM2 12H4V10H2V12ZM2 8H4V6H2V8ZM2 4H4V2H2V4ZM6 16H8V14H6V16ZM6 12H8V10H6V12ZM6 8H8V6H6V8ZM6 4H8V2H6V4ZM10 16H18V6H10V8H12V10H10V12H12V14H10V16ZM14 10V8H16V10H14ZM14 14V12H16V14H14Z"
            fill="#4500B4"
          />
        </svg>
      ),
      title: "Builder Reliability",
      pct: 25,
      desc: "Delivery history, past complaints, financial stability, and reputation scan.",
    },
    {
      icon: (
        <svg
          width="11"
          height="18"
          viewBox="0 0 11 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.25 18L0 15.8L2.85 7.95C3.1 8.18333 3.37083 8.37917 3.6625 8.5375C3.95417 8.69583 4.26667 8.81667 4.6 8.9L1.85 16.45L0.25 18ZM10.75 18L9.15 16.45L6.4 8.9C6.73333 8.81667 7.04583 8.69583 7.3375 8.5375C7.62917 8.37917 7.9 8.18333 8.15 7.95L11 15.8L10.75 18ZM5.5 8C4.66667 8 3.95833 7.70833 3.375 7.125C2.79167 6.54167 2.5 5.83333 2.5 5C2.5 4.35 2.6875 3.77083 3.0625 3.2625C3.4375 2.75417 3.91667 2.4 4.5 2.2V0H6.5V2.2C7.08333 2.4 7.5625 2.75417 7.9375 3.2625C8.3125 3.77083 8.5 4.35 8.5 5C8.5 5.83333 8.20833 6.54167 7.625 7.125C7.04167 7.70833 6.33333 8 5.5 8ZM5.5 6C5.78333 6 6.02083 5.90417 6.2125 5.7125C6.40417 5.52083 6.5 5.28333 6.5 5C6.5 4.71667 6.40417 4.47917 6.2125 4.2875C6.02083 4.09583 5.78333 4 5.5 4C5.21667 4 4.97917 4.09583 4.7875 4.2875C4.59583 4.47917 4.5 4.71667 4.5 5C4.5 5.28333 4.59583 5.52083 4.7875 5.7125C4.97917 5.90417 5.21667 6 5.5 6Z"
            fill="#4500B4"
          />
        </svg>
      ),
      title: "Construction Quality",
      pct: 25,
      desc: "On-ground audit of materials, finishing quality, and amenity standards.",
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.075 12.25L10 10.475L12.925 12.25L12.15 8.925L14.75 6.675L11.325 6.4L10 3.25L8.675 6.4L5.25 6.675L7.85 8.925L7.075 12.25ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14ZM2 14V2V14Z"
            fill="#4500B4"
          />
        </svg>
      ),
      title: "Buyer Satisfaction",
      pct: 20,
      desc: "Post-handover experience, society feedback, and management quality.",
    },
  ];

  const verifySteps = [
    {
      icon: (
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 10.5167 15.7583 11.8792 15.275 13.1875C14.7917 14.4958 14.1 15.65 13.2 16.65L10 13.45C9.7 13.6333 9.37917 13.7708 9.0375 13.8625C8.69583 13.9542 8.35 14 8 14C6.9 14 5.95833 13.6083 5.175 12.825C4.39167 12.0417 4 11.1 4 10C4 8.9 4.39167 7.95833 5.175 7.175C5.95833 6.39167 6.9 6 8 6C9.1 6 10.0417 6.39167 10.825 7.175C11.6083 7.95833 12 8.9 12 10C12 10.3667 11.9542 10.7208 11.8625 11.0625C11.7708 11.4042 11.6333 11.7333 11.45 12.05L12.95 13.55C13.2833 12.8667 13.5417 12.15 13.725 11.4C13.9083 10.65 14 9.88333 14 9.1V4.375L8 2.125L2 4.375V9.1C2 11.1167 2.56667 12.95 3.7 14.6C4.83333 16.25 6.26667 17.35 8 17.9C8.43333 17.7667 8.84583 17.5958 9.2375 17.3875C9.62917 17.1792 10.0167 16.9333 10.4 16.65L11.8 18.05C11.25 18.5 10.6542 18.8917 10.0125 19.225C9.37083 19.5583 8.7 19.8167 8 20ZM8 12C8.55 12 9.02083 11.8042 9.4125 11.4125C9.80417 11.0208 10 10.55 10 10C10 9.45 9.80417 8.97917 9.4125 8.5875C9.02083 8.19583 8.55 8 8 8C7.45 8 6.97917 8.19583 6.5875 8.5875C6.19583 8.97917 6 9.45 6 10C6 10.55 6.19583 11.0208 6.5875 11.4125C6.97917 11.8042 7.45 12 8 12Z"
            fill="#4500B4"
          />
        </svg>
      ),
      label: "Legal Check",
      sub: "100% Title Verification",
      active: false,
    },
    {
      icon: (
        <svg
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V15.2C0 14.65 0.141667 14.1333 0.425 13.65C0.708333 13.1667 1.1 12.8 1.6 12.55C2.45 12.1167 3.40833 11.75 4.475 11.45C5.54167 11.15 6.71667 11 8 11C9.28333 11 10.4583 11.15 11.525 11.45C12.5917 11.75 13.55 12.1167 14.4 12.55C14.9 12.8 15.2917 13.1667 15.575 13.65C15.8583 14.1333 16 14.65 16 15.2V18H0ZM2 16H14V15.2C14 15.0167 13.9542 14.85 13.8625 14.7C13.7708 14.55 13.65 14.4333 13.5 14.35C12.9 14.05 12.1292 13.75 11.1875 13.45C10.2458 13.15 9.18333 13 8 13C6.81667 13 5.75417 13.15 4.8125 13.45C3.87083 13.75 3.1 14.05 2.5 14.35C2.35 14.4333 2.22917 14.55 2.1375 14.7C2.04583 14.85 2 15.0167 2 15.2V16ZM8 10C6.9 10 5.95833 9.60833 5.175 8.825C4.39167 8.04167 4 7.1 4 6H3.75C3.6 6 3.47917 5.95417 3.3875 5.8625C3.29583 5.77083 3.25 5.65 3.25 5.5C3.25 5.35 3.29583 5.22917 3.3875 5.1375C3.47917 5.04583 3.6 5 3.75 5H4C4 4.25 4.18333 3.575 4.55 2.975C4.91667 2.375 5.4 1.9 6 1.55V2.5C6 2.65 6.04583 2.77083 6.1375 2.8625C6.22917 2.95417 6.35 3 6.5 3C6.65 3 6.77083 2.95417 6.8625 2.8625C6.95417 2.77083 7 2.65 7 2.5V1.15C7.15 1.1 7.30833 1.0625 7.475 1.0375C7.64167 1.0125 7.81667 1 8 1C8.18333 1 8.35833 1.0125 8.525 1.0375C8.69167 1.0625 8.85 1.1 9 1.15V2.5C9 2.65 9.04583 2.77083 9.1375 2.8625C9.22917 2.95417 9.35 3 9.5 3C9.65 3 9.77083 2.95417 9.8625 2.8625C9.95417 2.77083 10 2.65 10 2.5V1.55C10.6 1.9 11.0833 2.375 11.45 2.975C11.8167 3.575 12 4.25 12 5H12.25C12.4 5 12.5208 5.04583 12.6125 5.1375C12.7042 5.22917 12.75 5.35 12.75 5.5C12.75 5.65 12.7042 5.77083 12.6125 5.8625C12.5208 5.95417 12.4 6 12.25 6H12C12 7.1 11.6083 8.04167 10.825 8.825C10.0417 9.60833 9.1 10 8 10ZM8 8C8.55 8 9.02083 7.80417 9.4125 7.4125C9.80417 7.02083 10 6.55 10 6H6C6 6.55 6.19583 7.02083 6.5875 7.4125C6.97917 7.80417 7.45 8 8 8ZM15.5 12L15.35 11.25C15.25 11.2167 15.1542 11.1792 15.0625 11.1375C14.9708 11.0958 14.8833 11.0333 14.8 10.95L14.1 11.2L13.6 10.3L14.15 9.8C14.15 9.75 14.15 9.7 14.15 9.65C14.15 9.6 14.15 9.55 14.15 9.5C14.15 9.45 14.15 9.4 14.15 9.35C14.15 9.3 14.15 9.25 14.15 9.2L13.6 8.7L14.1 7.8L14.8 8.05C14.8667 7.98333 14.95 7.925 15.05 7.875C15.15 7.825 15.25 7.78333 15.35 7.75L15.5 7H16.5L16.65 7.75C16.75 7.78333 16.85 7.825 16.95 7.875C17.05 7.925 17.1333 7.98333 17.2 8.05L17.9 7.8L18.4 8.7L17.85 9.2C17.85 9.25 17.85 9.3 17.85 9.35C17.85 9.4 17.85 9.45 17.85 9.5C17.85 9.55 17.85 9.6 17.85 9.65C17.85 9.7 17.85 9.75 17.85 9.8L18.4 10.3L17.9 11.2L17.2 10.95C17.1167 11.0333 17.0292 11.0958 16.9375 11.1375C16.8458 11.1792 16.75 11.2167 16.65 11.25L16.5 12H15.5ZM16 10.25C16.2 10.25 16.375 10.175 16.525 10.025C16.675 9.875 16.75 9.7 16.75 9.5C16.75 9.3 16.675 9.125 16.525 8.975C16.375 8.825 16.2 8.75 16 8.75C15.8 8.75 15.625 8.825 15.475 8.975C15.325 9.125 15.25 9.3 15.25 9.5C15.25 9.7 15.325 9.875 15.475 10.025C15.625 10.175 15.8 10.25 16 10.25ZM17.8 7L17.6 5.95C17.45 5.9 17.3125 5.8375 17.1875 5.7625C17.0625 5.6875 16.95 5.6 16.85 5.5L15.8 5.85L15.1 4.65L15.95 3.9C15.9167 3.81667 15.9 3.75 15.9 3.7C15.9 3.65 15.9 3.58333 15.9 3.5C15.9 3.41667 15.9 3.35 15.9 3.3C15.9 3.25 15.9167 3.18333 15.95 3.1L15.1 2.35L15.8 1.15L16.85 1.5C16.95 1.4 17.0625 1.3125 17.1875 1.2375C17.3125 1.1625 17.45 1.1 17.6 1.05L17.8 0H19.2L19.4 1.05C19.55 1.1 19.6875 1.1625 19.8125 1.2375C19.9375 1.3125 20.05 1.4 20.15 1.5L21.2 1.15L21.9 2.35L21.05 3.1C21.0833 3.18333 21.1 3.25 21.1 3.3C21.1 3.35 21.1 3.41667 21.1 3.5C21.1 3.58333 21.1 3.65 21.1 3.7C21.1 3.75 21.0833 3.81667 21.05 3.9L21.9 4.65L21.2 5.85L20.15 5.5C20.05 5.6 19.9375 5.6875 19.8125 5.7625C19.6875 5.8375 19.55 5.9 19.4 5.95L19.2 7H17.8ZM18.5 4.75C18.85 4.75 19.1458 4.62917 19.3875 4.3875C19.6292 4.14583 19.75 3.85 19.75 3.5C19.75 3.15 19.6292 2.85417 19.3875 2.6125C19.1458 2.37083 18.85 2.25 18.5 2.25C18.15 2.25 17.8542 2.37083 17.6125 2.6125C17.3708 2.85417 17.25 3.15 17.25 3.5C17.25 3.85 17.3708 4.14583 17.6125 4.3875C17.8542 4.62917 18.15 4.75 18.5 4.75Z"
            fill="#4500B4"
          />
        </svg>
      ),
      label: "Builder Audit",
      sub: "Past Record Analysis",
      active: false,
    },
    {
      icon: (
        <svg
          width="11"
          height="18"
          viewBox="0 0 11 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.25 18L0 15.8L2.85 7.95C3.1 8.18333 3.37083 8.37917 3.6625 8.5375C3.95417 8.69583 4.26667 8.81667 4.6 8.9L1.85 16.45L0.25 18ZM10.75 18L9.15 16.45L6.4 8.9C6.73333 8.81667 7.04583 8.69583 7.3375 8.5375C7.62917 8.37917 7.9 8.18333 8.15 7.95L11 15.8L10.75 18ZM5.5 8C4.66667 8 3.95833 7.70833 3.375 7.125C2.79167 6.54167 2.5 5.83333 2.5 5C2.5 4.35 2.6875 3.77083 3.0625 3.2625C3.4375 2.75417 3.91667 2.4 4.5 2.2V0H6.5V2.2C7.08333 2.4 7.5625 2.75417 7.9375 3.2625C8.3125 3.77083 8.5 4.35 8.5 5C8.5 5.83333 8.20833 6.54167 7.625 7.125C7.04167 7.70833 6.33333 8 5.5 8ZM5.5 6C5.78333 6 6.02083 5.90417 6.2125 5.7125C6.40417 5.52083 6.5 5.28333 6.5 5C6.5 4.71667 6.40417 4.47917 6.2125 4.2875C6.02083 4.09583 5.78333 4 5.5 4C5.21667 4 4.97917 4.09583 4.7875 4.2875C4.59583 4.47917 4.5 4.71667 4.5 5C4.5 5.28333 4.59583 5.52083 4.7875 5.7125C4.97917 5.90417 5.21667 6 5.5 6Z"
            fill="#4500B4"
          />
        </svg>
      ),
      label: "Quality Audit",
      sub: "On-ground Inspections",
      active: false,
    },
    {
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12H12V10H4V12ZM4 9H16V7H4V9ZM4 6H16V4H4V6ZM0 20V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H4L0 20ZM3.15 14H18V2H2V15.125L3.15 14ZM2 14V2V14Z"
            fill="#4500B4"
          />
        </svg>
      ),
      label: "Buyer Feedback",
      sub: "New Resident Insights",
      active: false,
    },
    {
      icon: (
        <svg
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.85 14.825L10 12.925L13.15 14.85L12.325 11.25L15.1 8.85L11.45 8.525L10 5.125L8.55 8.5L4.9 8.825L7.675 11.25L6.85 14.825ZM3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
            fill="white"
          />
        </svg>
      ),
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
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 16H12.5C12.7833 16 13.0458 15.9292 13.2875 15.7875C13.5292 15.6458 13.7 15.45 13.8 15.2L15.9 10.3C15.9333 10.2167 15.9583 10.1333 15.975 10.05C15.9917 9.96667 16 9.88333 16 9.8V9C16 8.71667 15.9042 8.47917 15.7125 8.2875C15.5208 8.09583 15.2833 8 15 8H10.4L11 4.6C11.0333 4.43333 11.025 4.275 10.975 4.125C10.925 3.975 10.8417 3.84167 10.725 3.725L10 3L5.4 8C5.26667 8.13333 5.16667 8.28333 5.1 8.45C5.03333 8.61667 5 8.8 5 9V14C5 14.55 5.19583 15.0208 5.5875 15.4125C5.97917 15.8042 6.45 16 7 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z"
            fill="#4500B4"
          />
        </svg>
      ),
      title: "Advisor Recommended",
      sub: "Shortlisted by senior property advisors.",
    },
    {
      iconBg: "bg-[#DCFCE7]",
      iconEl: (
        <svg
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.6 21L5.7 17.8L2.1 17L2.45 13.3L0 10.5L2.45 7.7L2.1 4L5.7 3.2L7.6 0L11 1.45L14.4 0L16.3 3.2L19.9 4L19.55 7.7L22 10.5L19.55 13.3L19.9 17L16.3 17.8L14.4 21L11 19.55L7.6 21ZM9.95 14.05L15.6 8.4L14.2 6.95L9.95 11.2L7.8 9.1L6.4 10.5L9.95 14.05Z"
            fill="#15803D"
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
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
            fill="#C2410C"
          />
        </svg>
      ),
      title: "Top Rated",
      sub: "Highest buyer satisfaction scores.",
    },
    {
      iconBg: "bg-[#DBEAFE]",
      iconEl: (
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 18V0H10V4H20V18H0ZM2 16H8V14H2V16ZM2 12H8V10H2V12ZM2 8H8V6H2V8ZM2 4H8V2H2V4ZM10 16H18V6H10V16ZM12 10V8H16V10H12ZM12 14V12H16V14H12Z"
            fill="#1D4ED8"
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
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.4 12L0 10.6L7.4 3.15L11.4 7.15L16.6 2H14V0H20V6H18V3.4L11.4 10L7.4 6L1.4 12Z"
            fill="#7E22CE"
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
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.15 17.7L8.1 11.6C7.76667 11.7333 7.42917 11.8333 7.0875 11.9C6.74583 11.9667 6.38333 12 6 12C4.33333 12 2.91667 11.4167 1.75 10.25C0.583333 9.08333 0 7.66667 0 6C0 5.4 0.0833333 4.82917 0.25 4.2875C0.416667 3.74583 0.65 3.23333 0.95 2.75L4.6 6.4L6.4 4.6L2.75 0.95C3.23333 0.65 3.74583 0.416667 4.2875 0.25C4.82917 0.0833333 5.4 0 6 0C7.66667 0 9.08333 0.583333 10.25 1.75C11.4167 2.91667 12 4.33333 12 6C12 6.38333 11.9667 6.74583 11.9 7.0875C11.8333 7.42917 11.7333 7.76667 11.6 8.1L17.7 14.15C17.9 14.35 18 14.5917 18 14.875C18 15.1583 17.9 15.4 17.7 15.6L15.6 17.7C15.4 17.9 15.1583 18 14.875 18C14.5917 18 14.35 17.9 14.15 17.7Z"
            fill="#B91C1C"
          />
        </svg>
      ),
      title: "Quality Audited",
      sub: "Verified superior build standards.",
    },
  ];

  return (
    <div className="bg-white font-sans min-w-0 overflow-x-hidden">
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-[#5E23DC] via-[#4e1bc4] to-[#3a0ea0] relative overflow-hidden">
        {/* Decorative skew shape — desktop only */}
        <div
          className="hidden lg:block absolute top-0 right-[8%] bottom-0 w-[30%] bg-white/5"
          style={{ transform: "skewX(-8deg)" }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 sm:pt-10 sm:pb-14 lg:py-20 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center flex-wrap gap-1 text-[#CFBFFF] text-xs mb-5">
            <span>Homes</span>
            <span>/</span>
            <span>Properties</span>
            <span>/</span>
            <span>Nagpur</span>
            <span>/</span>
            <span className="text-white font-semibold">Buyer Trusted</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center">
            {/* ── Left text ── */}
            <div className="flex-1 min-w-0 order-1 text-center md:text-left">
              <h1 className="font-semibold text-3xl sm:text-4xl lg:text-[42px] text-white mb-3">
                Top Trusted Property
                <br className="hidden sm:block" /> in Nagpur
              </h1>
              <p className="text-sm sm:text-base text-[#CFBFFF] leading-relaxed md:mb-6 max-w-md">
                Legally verified, builder-checked, and buyer-approved properties
                in {PAGE_CITY}. {formatVerifiedStatValue(trustedCount) || trustedCount} listings
                shortlisted by Reparv advisors after rigorous auditing.
              </p>

              {/* CTA buttons */}
              <div className="hidden md:flex flex-col sm:flex-row gap-3 mb-7">
                <button
                  type="button"
                  onClick={() => scrollToSection("trusted-properties")}
                  className="bg-white text-[#4500B4] hover:bg-gray-50 font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg w-full sm:w-auto"
                >
                  View Trusted Properties
                </button>
                <button
                  type="button"
                  onClick={() => openAgentAdvisor("Top Trusted Properties")}
                  className="border border-white/40 text-white hover:bg-white/10 font-semibold text-sm px-6 py-3 rounded-xl transition-colors w-full sm:w-auto"
                >
                  Talk to an Advisor
                </button>
              </div>

              {/* Trust badges grid */}
              <div className="hidden md:grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  {
                    icon: (
                      <svg
                        width="16"
                        height="20"
                        viewBox="0 0 16 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.95 13.55L12.6 7.9L11.175 6.475L6.95 10.7L4.85 8.6L3.425 10.025L6.95 13.55ZM8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.2458 13.9375 13.7375 16.0125C12.2292 18.0875 10.3167 19.4167 8 20ZM8 17.9C9.73333 17.35 11.1667 16.25 12.3 14.6C13.4333 12.95 14 11.1167 14 9.1V4.375L8 2.125L2 4.375V9.1C2 11.1167 2.56667 12.95 3.7 14.6C4.83333 16.25 6.26667 17.35 8 17.9Z"
                          fill="#CEBDFF"
                        />
                      </svg>
                    ),
                    label: "Legal Verified",
                  },
                  {
                    icon: (
                      <svg
                        width="22"
                        height="18"
                        viewBox="0 0 22 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 18V15.2C0 14.65 0.141667 14.1333 0.425 13.65C0.708333 13.1667 1.1 12.8 1.6 12.55C2.45 12.1167 3.40833 11.75 4.475 11.45C5.54167 11.15 6.71667 11 8 11C9.28333 11 10.4583 11.15 11.525 11.45C12.5917 11.75 13.55 12.1167 14.4 12.55C14.9 12.8 15.2917 13.1667 15.575 13.65C15.8583 14.1333 16 14.65 16 15.2V18H0ZM2 16H14V15.2C14 15.0167 13.9542 14.85 13.8625 14.7C13.7708 14.55 13.65 14.4333 13.5 14.35C12.9 14.05 12.1292 13.75 11.1875 13.45C10.2458 13.15 9.18333 13 8 13C6.81667 13 5.75417 13.15 4.8125 13.45C3.87083 13.75 3.1 14.05 2.5 14.35C2.35 14.4333 2.22917 14.55 2.1375 14.7C2.04583 14.85 2 15.0167 2 15.2V16ZM8 10C6.9 10 5.95833 9.60833 5.175 8.825C4.39167 8.04167 4 7.1 4 6H3.75C3.6 6 3.47917 5.95417 3.3875 5.8625C3.29583 5.77083 3.25 5.65 3.25 5.5C3.25 5.35 3.29583 5.22917 3.3875 5.1375C3.47917 5.04583 3.6 5 3.75 5H4C4 4.25 4.18333 3.575 4.55 2.975C4.91667 2.375 5.4 1.9 6 1.55V2.5C6 2.65 6.04583 2.77083 6.1375 2.8625C6.22917 2.95417 6.35 3 6.5 3C6.65 3 6.77083 2.95417 6.8625 2.8625C6.95417 2.77083 7 2.65 7 2.5V1.15C7.15 1.1 7.30833 1.0625 7.475 1.0375C7.64167 1.0125 7.81667 1 8 1C8.18333 1 8.35833 1.0125 8.525 1.0375C8.69167 1.0625 8.85 1.1 9 1.15V2.5C9 2.65 9.04583 2.77083 9.1375 2.8625C9.22917 2.95417 9.35 3 9.5 3C9.65 3 9.77083 2.95417 9.8625 2.8625C9.95417 2.77083 10 2.65 10 2.5V1.55C10.6 1.9 11.0833 2.375 11.45 2.975C11.8167 3.575 12 4.25 12 5H12.25C12.4 5 12.5208 5.04583 12.6125 5.1375C12.7042 5.22917 12.75 5.35 12.75 5.5C12.75 5.65 12.7042 5.77083 12.6125 5.8625C12.5208 5.95417 12.4 6 12.25 6H12C12 7.1 11.6083 8.04167 10.825 8.825C10.0417 9.60833 9.1 10 8 10ZM8 8C8.55 8 9.02083 7.80417 9.4125 7.4125C9.80417 7.02083 10 6.55 10 6H6C6 6.55 6.19583 7.02083 6.5875 7.4125C6.97917 7.80417 7.45 8 8 8ZM15.5 12L15.35 11.25C15.25 11.2167 15.1542 11.1792 15.0625 11.1375C14.9708 11.0958 14.8833 11.0333 14.8 10.95L14.1 11.2L13.6 10.3L14.15 9.8C14.15 9.75 14.15 9.7 14.15 9.65C14.15 9.6 14.15 9.55 14.15 9.5C14.15 9.45 14.15 9.4 14.15 9.35C14.15 9.3 14.15 9.25 14.15 9.2L13.6 8.7L14.1 7.8L14.8 8.05C14.8667 7.98333 14.95 7.925 15.05 7.875C15.15 7.825 15.25 7.78333 15.35 7.75L15.5 7H16.5L16.65 7.75C16.75 7.78333 16.85 7.825 16.95 7.875C17.05 7.925 17.1333 7.98333 17.2 8.05L17.9 7.8L18.4 8.7L17.85 9.2C17.85 9.25 17.85 9.3 17.85 9.35C17.85 9.4 17.85 9.45 17.85 9.5C17.85 9.55 17.85 9.6 17.85 9.65C17.85 9.7 17.85 9.75 17.85 9.8L18.4 10.3L17.9 11.2L17.2 10.95C17.1167 11.0333 17.0292 11.0958 16.9375 11.1375C16.8458 11.1792 16.75 11.2167 16.65 11.25L16.5 12H15.5ZM16 10.25C16.2 10.25 16.375 10.175 16.525 10.025C16.675 9.875 16.75 9.7 16.75 9.5C16.75 9.3 16.675 9.125 16.525 8.975C16.375 8.825 16.2 8.75 16 8.75C15.8 8.75 15.625 8.825 15.475 8.975C15.325 9.125 15.25 9.3 15.25 9.5C15.25 9.7 15.325 9.875 15.475 10.025C15.625 10.175 15.8 10.25 16 10.25ZM17.8 7L17.6 5.95C17.45 5.9 17.3125 5.8375 17.1875 5.7625C17.0625 5.6875 16.95 5.6 16.85 5.5L15.8 5.85L15.1 4.65L15.95 3.9C15.9167 3.81667 15.9 3.75 15.9 3.7C15.9 3.65 15.9 3.58333 15.9 3.5C15.9 3.41667 15.9 3.35 15.9 3.3C15.9 3.25 15.9167 3.18333 15.95 3.1L15.1 2.35L15.8 1.15L16.85 1.5C16.95 1.4 17.0625 1.3125 17.1875 1.2375C17.3125 1.1625 17.45 1.1 17.6 1.05L17.8 0H19.2L19.4 1.05C19.55 1.1 19.6875 1.1625 19.8125 1.2375C19.9375 1.3125 20.05 1.4 20.15 1.5L21.2 1.15L21.9 2.35L21.05 3.1C21.0833 3.18333 21.1 3.25 21.1 3.3C21.1 3.35 21.1 3.41667 21.1 3.5C21.1 3.58333 21.1 3.65 21.1 3.7C21.1 3.75 21.0833 3.81667 21.05 3.9L21.9 4.65L21.2 5.85L20.15 5.5C20.05 5.6 19.9375 5.6875 19.8125 5.7625C19.6875 5.8375 19.55 5.9 19.4 5.95L19.2 7H17.8ZM18.5 4.75C18.85 4.75 19.1458 4.62917 19.3875 4.3875C19.6292 4.14583 19.75 3.85 19.75 3.5C19.75 3.15 19.6292 2.85417 19.3875 2.6125C19.1458 2.37083 18.85 2.25 18.5 2.25C18.15 2.25 17.8542 2.37083 17.6125 2.6125C17.3708 2.85417 17.25 3.15 17.25 3.5C17.25 3.85 17.3708 4.14583 17.6125 4.3875C17.8542 4.62917 18.15 4.75 18.5 4.75Z"
                          fill="#CEBDFF"
                        />
                      </svg>
                    ),
                    label: "Builder Checked",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H2ZM2 16H18V2H2V16ZM3 14H8V12H3V14ZM12.55 12L17.5 7.05L16.075 5.625L12.55 9.175L11.125 7.75L9.725 9.175L12.55 12ZM3 10H8V8H3V10ZM3 6H8V4H3V6ZM2 16V2V16Z"
                          fill="#CEBDFF"
                        />
                      </svg>
                    ),
                    label: "Quality Verified",
                  },
                  {
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5 9C13.9167 9 14.2708 8.85417 14.5625 8.5625C14.8542 8.27083 15 7.91667 15 7.5C15 7.08333 14.8542 6.72917 14.5625 6.4375C14.2708 6.14583 13.9167 6 13.5 6C13.0833 6 12.7292 6.14583 12.4375 6.4375C12.1458 6.72917 12 7.08333 12 7.5C12 7.91667 12.1458 8.27083 12.4375 8.5625C12.7292 8.85417 13.0833 9 13.5 9ZM6.5 9C6.91667 9 7.27083 8.85417 7.5625 8.5625C7.85417 8.27083 8 7.91667 8 7.5C8 7.08333 7.85417 6.72917 7.5625 6.4375C7.27083 6.14583 6.91667 6 6.5 6C6.08333 6 5.72917 6.14583 5.4375 6.4375C5.14583 6.72917 5 7.08333 5 7.5C5 7.91667 5.14583 8.27083 5.4375 8.5625C5.72917 8.85417 6.08333 9 6.5 9ZM10 15.5C11.1333 15.5 12.1625 15.1792 13.0875 14.5375C14.0125 13.8958 14.6833 13.05 15.1 12H13.45C13.0833 12.6167 12.5958 13.1042 11.9875 13.4625C11.3792 13.8208 10.7167 14 10 14C9.28333 14 8.62083 13.8208 8.0125 13.4625C7.40417 13.1042 6.91667 12.6167 6.55 12H4.9C5.31667 13.05 5.9875 13.8958 6.9125 14.5375C7.8375 15.1792 8.86667 15.5 10 15.5ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                          fill="#CEBDFF"
                        />
                      </svg>
                    ),
                    label: "Buyer Approved",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm text-[#CFBFFF]"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right image ── */}
            <div className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 order-2 mt-2 lg:mt-0">
              
              <div className="relative rounded-2xl overflow-visible">
                {/* Building photo placeholder */}
                <div className="w-[80%] md:w-full h-52 sm:h-64 lg:h-100 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden mx-auto">
                  <img
                    src={heroImage}
                    alt={heroProperty?.propertyName || "Trusted property in Nagpur"}
                    className="w-full h-full object-cover"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/assets/seoPages/TrustScorePage/hero.jpg";
                    }}
                  />
                </div>

                {/* Floating trust score pill */}
                <div className="absolute bottom-5 md:-bottom-5 left-4 sm:left-6 bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
                  <div className="w-12 h-12 rounded-full bg-[#5E23DC] flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-white text-base leading-none">
                      {heroProperty?.trustScore || avgTrustScore}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#151C27] leading-tight">
                      Trust Score
                    </p>
                    <p className="text-xs text-[#8B83A0]">
                      {getScoreLabel(heroProperty?.trustScore || avgTrustScore)}
                    </p>
                  </div>
                </div>
              </div>
              {/* CTA buttons */}
              <div className="md:hidden flex flex-col sm:flex-row gap-3 mt-10">
                <button
                  type="button"
                  onClick={() => scrollToSection("trusted-properties")}
                  className="bg-white text-[#4500B4] hover:bg-gray-50 font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg w-full sm:w-auto"
                >
                  View Trusted Properties
                </button>
                <button
                  type="button"
                  onClick={() => openAgentAdvisor("Top Trusted Properties")}
                  className="border border-white/40 text-white hover:bg-white/10 font-semibold text-sm px-6 py-3 rounded-xl transition-colors w-full sm:w-auto"
                >
                  Talk to an Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* spacer to clear floating pill */}
      <div className="h-8 bg-white" />

      {/* ══ TRUST SCORE FRAMEWORK ═════════════════════════════════════════════ */}
      <section className="bg-white py-6 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-semibold text-3xl sm:text-3xl text-[#5E23DC] mb-3">
              The Reparv Trust Score Framework
            </h2>
            <p className="text-sm sm:text-base text-[#494455] max-w-xl mx-auto leading-relaxed">
              Our proprietary algorithm analyzes over 150 data points across
              four core pillars to calculate an objective score for every
              listing.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div className="hidden md:flex flex-col items-center justify-center gap-3 flex-shrink-0">
              <ScoreRing score={avgTrustScore} listingCount={trustedCount || allProperties.length} />
            </div>
            {/* Pillars */}
            <div className="flex-1 w-full grid grid-cols-1 gap-4">
              {pillars.map((p) => (
                <PillarCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MOST TRUSTED PROPERTIES ════════════════════════════════════════════ */}
      <section id="trusted-properties" className="bg-[#F0F3FF] py-14 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="font-semibold text-2xl sm:text-3xl text-[#5E23DC] mb-1">
                Most Trusted Properties in {PAGE_CITY}
              </h2>
              <p className="text-sm text-[#494455]">
                {hasActiveFilters
                  ? `${filteredProperties.length} properties match your filters.`
                  : `${formatVerifiedStatValue(trustedCount) || trustedCount} verified listings with trust scores above 7.0.`}
              </p>
            </div>
            <Link
              href={buildPropertiesLink({ city: PAGE_CITY, ...filters })}
              className="hidden sm:inline-flex bg-[#5E23DC] hover:bg-[#4a1ab8] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap flex-shrink-0"
            >
              See All {formatVerifiedStatValue(trustedCount) || trustedCount} Listings
            </Link>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {[
              {
                label: "Min Score",
                key: "minScore",
                opts: ["Any", "9.0", "8.0", "7.0"],
              },
              {
                label: "Type",
                key: "type",
                opts: categoryOptions,
              },
              {
                label: "Budget",
                key: "budget",
                opts: ["Any", "₹20-40L", "₹40-60L", "₹60-80L", "₹80L+"],
              },
              {
                label: "BHK",
                key: "bhk",
                opts: ["Any", ...bhkOptions],
              },
              {
                label: "Area",
                key: "area",
                opts: ["All Areas", ...localityOptions],
              },
            ].map((field) => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wide text-[#8B83A0]">
                  {field.label}
                </label>
                <select
                  value={filters[field.key]}
                  onChange={(event) =>
                    setFilters((prev) => ({ ...prev, [field.key]: event.target.value }))
                  }
                  className="rounded-xl border border-[#E5E0F0] bg-white px-3 py-2.5 text-sm text-[#151C27] outline-none focus:ring-2 focus:ring-[#5E23DC]/20"
                >
                  {field.opts.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {displayProperties.length > 0 ? (
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none">
              {properties.map((property) => (
                <div
                  key={property.propertyid}
                  className="flex-shrink-0 w-[78vw] sm:w-auto snap-start"
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#5E23DC]/20 bg-white px-8 py-16 text-center">
              <p className="mb-4 text-lg font-bold text-[#151C27]">No trusted properties match your filters</p>
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    minScore: "Any",
                    type: "Any",
                    budget: "Any",
                    bhk: "Any",
                    area: "All Areas",
                  })
                }
                className="rounded-xl bg-[#5E23DC] px-6 py-3 text-sm font-bold text-white"
              >
                Reset Filters
              </button>
            </div>
          )}

          <div className="mt-5 flex sm:hidden justify-center">
            <Link
              href={buildPropertiesLink({ city: PAGE_CITY })}
              className="bg-[#5E23DC] text-white font-bold text-sm px-8 py-3 rounded-xl w-full max-w-xs text-center"
            >
              See All {formatVerifiedStatValue(trustedCount) || trustedCount} Listings
            </Link>
          </div>
        </div>
      </section>

      <SeoSectionAd />

      {/* ══ VERIFICATION JOURNEY ══════════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:text-center mb-10 sm:mb-14">
            <h2 className="font-medium text-2xl sm:text-3xl text-[#151C27] mb-2">
              Our Verification Journey
            </h2>
            <p className="text-sm text-[#494455] max-w-md mx-auto">
              Every property goes through a multi-step audit before it appears
              on our trusted listings.
            </p>
          </div>

          {/* Desktop: row with connecting line. Mobile: vertical list */}
          <div className="relative">
            {/* Desktop connector line */}
            <div className="hidden lg:block absolute top-[22px] left-[80px] right-[80px] h-0.5 bg-[#E5E0F0] z-0" />
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 relative z-10">
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

      {/* ══ TRUST SIGNALS ═════════════════════════════════════════════════════ */}
      <section className="bg-[#F0F3FF] py-14 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:text-center mb-10 sm:mb-12">
            <h2 className="font-semibold text-2xl sm:text-3xl text-[#151C27] mb-2">
              Trust Signals &amp; Certifications
            </h2>
            <p className="text-sm text-[#494455] max-w-md mx-auto leading-relaxed">
              Look for these badges on property cards to instantly see its
              strengths and verified credentials.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5">
            {trustSignals.map((t, i) => (
              <TrustSignalCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      <SeoSectionAd variant="seoInFeed" />

      {/* ══ SCORE MEANING + GUARANTEE ═════════════════════════════════════════ */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left — score meaning */}
            <div>
              <h2 className="font-medium text-2xl sm:text-3xl text-[#151C27] mb-2">
                What Does a Trust Score Mean?
              </h2>
              <p className="text-sm sm:text-base text-[#494455] mb-6 leading-relaxed">
                Our scores are binary — either a property meets our rigorous
                standards or it doesn't. We only feature properties that score
                above 7.0.
              </p>
              <div className="flex flex-col gap-4">
                <ScoreRow
                  range="9–10"
                  rangeColor="text-[#16A34A]"
                  label="Exceptional Choice"
                  sub="Ultra-safe, premium builds with zero legacy issues."
                />
                <ScoreRow
                  range="8–8.9"
                  rangeColor="text-[#4500B4]"
                  label="Highly Trusted"
                  sub="Robust legal standing and great build quality."
                />
                <ScoreRow
                  range="7–7.9"
                  rangeColor="text-[#6B7280]"
                  label="Verified"
                  sub="Safe with standard risk profiles and typical features."
                />
              </div>
            </div>

            {/* Right — Reparv Guarantee */}
            <div>
              <div className="bg-gradient-to-br from-[#5E23DC] to-[#3a0ea0] text-white rounded-3xl p-7 sm:p-9 h-full relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <ShieldIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-medium text-xl sm:text-2xl">
                    Reparv Guarantee
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#CFBFFF] leading-relaxed mb-6 relative z-10">
                  We never rank or promote projects with unresolved legal
                  issues, repeated delivery delays, or negative buyer history —
                  even if they pay higher commissions. {reraVerified} listings include
                  RERA verification across {localityCount} Nagpur localities.
                </p>

                <ul className="flex flex-col gap-3 mb-7 relative z-10">
                  {[
                    "Unbiased Algorithm-driven scoring",
                    "Zero conflict of interest policy",
                    "Continuous monitoring & updates",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckPurple />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => openAgentAdvisor("Trust Advisor")}
                  className="w-full bg-white hover:bg-gray-50 text-[#4500B4] font-bold text-sm py-3.5 rounded-xl transition-colors relative z-10"
                >
                  Talk to Our Trust Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#5E23DC] to-[#3a0ea0] rounded-3xl px-6 sm:px-12 lg:px-16 py-12 sm:py-16 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <h2 className="font-medium text-2xl sm:text-3xl lg:text-4xl text-white mb-3 leading-tight">
                Confused Between Multiple Properties?
              </h2>
              <p className="text-sm sm:text-base text-[#CFBFFF] mb-8 max-w-lg mx-auto leading-relaxed">
                Get a professional Trust Audit for any property you're
                considering, even if it's not listed on Reparv.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => scrollToSection("trust-consultation")}
                  className="bg-white hover:bg-gray-50 text-[#4500B4] font-bold text-sm px-7 py-3.5 rounded-xl transition-colors shadow-lg"
                >
                  Get Your Free Trust Consultation
                </button>
                <Link
                  href="/find-verified-properties-in-nagpur"
                  className="border border-white/40 text-white hover:bg-white/10 font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors text-center"
                >
                  Browse Verified Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SeoSectionAd />

      {/* ══ TRUST CONSULTATION ═════════════════════════════════════════════════ */}
      <section id="trust-consultation" className="bg-[#F0F3FF] py-12 sm:py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-[#E5E0F0] bg-white p-8 shadow-sm">
            <h3 className="font-semibold text-xl text-[#151C27] mb-2 text-center">
              Get a Free Trust Consultation
            </h3>
            <p className="text-sm text-[#494455] mb-6 text-center">
              Tell us which property you are evaluating and our advisor will share a trust audit summary.
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="rounded-xl border border-[#E5E0F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5E23DC]/20"
              />
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                className="rounded-xl border border-[#E5E0F0] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5E23DC]/20"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-[#5E23DC] py-3.5 text-sm font-bold text-white disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Request Trust Consultation"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="md:text-center mb-8 sm:mb-10">
            <h2 className="font-medium text-2xl sm:text-3xl text-[#151C27] mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#494455]">
              Everything you need to know about our trust verification process.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQ key={i} q={faq.q} a={faq.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
