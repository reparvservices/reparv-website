"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SeoSectionAd from "../components/seocomponents/common/SeoSectionAd";
import { useAuth } from "../store/auth";
import { openAgentAdvisor } from "../utils/openAgentAdvisor";
import {
  buildPropertiesLink,
  filterProjects,
  formatIndianPriceShort,
  formatVerifiedStatValue,
  getProjectImage,
  mapFaqs,
  mapFeaturedProject,
} from "../utils/newProjectsPage";

const PAGE_CITY = "Nagpur";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10M8 3l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const LocationIcon = () => (
  <svg width="15" height="18" viewBox="0 0 15 18" fill="none">
    <path
      d="M7.5 0C3.36 0 0 3.36 0 7.5c0 5.63 7.5 10.5 7.5 10.5S15 13.13 15 7.5C15 3.36 11.64 0 7.5 0zm0 10.5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
      fill="#494455"
    />
  </svg>
);
const BedIcon = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <rect x="0" y="5" width="18" height="7" rx="1" fill="#494455" />
    <rect x="2" y="1" width="6" height="5" rx="1" fill="#494455" />
    <rect x="10" y="1" width="6" height="5" rx="1" fill="#494455" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
);
const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <polyline points="14,2 14,8 20,8" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <polyline points="9,22 9,12 15,12 15,22" stroke="white" strokeWidth="2" />
  </svg>
);
const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
);
const KeyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="7.5" cy="14.5" r="4.5" stroke="white" strokeWidth="2" />
    <path d="M10.5 11.5l8-8M16 8l2 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const BuildingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
    <path d="M9 21V12h6v9" stroke="white" strokeWidth="2" />
  </svg>
);
const ClipboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"
      stroke="white"
      strokeWidth="2"
    />
    <rect x="8" y="2" width="8" height="4" rx="1" stroke="white" strokeWidth="2" />
  </svg>
);
const VerifiedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3B82F6" strokeWidth="2" />
    <path d="M9 12l2 2 4-4" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const CurrencyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#EAB308" strokeWidth="2" />
    <path d="M9 10h6M9 14h6M12 7v10" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const TrendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
    <polyline points="16,7 22,7 22,13" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const steps = [
  { num: "1", title: "Discover Projects", sub: "Browse listings", color: "bg-orange-100", numBg: "bg-orange-400", icon: <SearchIcon /> },
  { num: "2", title: "Compare Builders", sub: "Evaluate options", color: "bg-blue-100", numBg: "bg-blue-400", icon: <StarIcon /> },
  { num: "3", title: "Book Site Visit", sub: "Visit in person", color: "bg-pink-100", numBg: "bg-pink-400", icon: <HomeIcon /> },
  { num: "4", title: "Verify Documents", sub: "Check RERA docs", color: "bg-yellow-100", numBg: "bg-yellow-400", icon: <DocumentIcon /> },
  { num: "5", title: "Reserve Unit", sub: "Block your unit", color: "bg-purple-100", numBg: "bg-purple-400", icon: <KeyIcon /> },
  { num: "6", title: "Own Your Home", sub: "Get possession", color: "bg-orange-100", numBg: "bg-orange-500", icon: <HomeIcon /> },
];

const advantages = [
  { bg: "bg-orange-100", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#F97316" strokeWidth="2" /></svg>, title: "Lower Launch Prices", desc: "Early buyers get the best rates before price appreciation. Lock in pre-launch pricing for maximum ROI." },
  { bg: "bg-blue-100", icon: <VerifiedIcon />, title: "Modern Amenities", desc: "Latest layouts, amenities, parking and lifestyle facilities designed for contemporary living." },
  { bg: "bg-yellow-100", icon: <CurrencyIcon />, title: "Flexible Payment Plans", desc: "Construction-linked and subvention schemes available. Pay as you go, stress-free ownership journey." },
  { bg: "bg-purple-100", icon: <TrendingIcon />, title: "High Appreciation Potential", desc: "Strong value growth by possession time. Nagpur's fastest-growing corridors deliver superior returns." },
];

const verificationBadges = [
  { icon: <ClipboardIcon />, label: "RERA Verified" },
  { icon: <ShieldIcon />, label: "Legal Checked" },
  { icon: <BuildingIcon />, label: "Builder Verified" },
  { icon: <DocumentIcon />, label: "Project Approved" },
];

const paymentPlans = [
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.5 5L18 8l-4 3.9 0.9 5.6L10 15l-4.9 2.5 0.9-5.6L2 8l5.5-1L10 2z" stroke="#EAB308" strokeWidth="1.5" /></svg>, iconBg: "bg-yellow-50", label: "PAYMENT SCHEME", title: "Construction Linked Plan", desc: "Pay as construction progresses. Milestone-linked payments give you full transparency of progress.", highlighted: false },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5" /><path d="M6 5V3a1 1 0 011-1h6a1 1 0 011 1v2" stroke="white" strokeWidth="1.5" /><line x1="2" y1="9" x2="18" y2="9" stroke="white" strokeWidth="1.5" /></svg>, iconBg: "bg-white/20", label: "PAYMENT SCHEME", title: "Subvention Scheme", desc: "Builder pays EMI till possession. Zero interest during construction, enjoy stress-free ownership.", highlighted: true, tag: "POPULAR" },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4h12v12H4z" stroke="#F97316" strokeWidth="1.5" rx="1" /><path d="M10 3v3M10 14v3M3 10h3M14 10h3" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" /></svg>, iconBg: "bg-orange-50", label: "OFFER", title: "Early Bird Discount", desc: "Lower launch price for early buyers. Construction linked and subvention schemes available with exclusive pre-launch pricing.", highlighted: false },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#3B82F6" strokeWidth="1.5" /><path d="M2 8h16" stroke="#3B82F6" strokeWidth="1.5" /><path d="M6 12h2M10 12h4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" /></svg>, iconBg: "bg-blue-50", label: "BOOKING", title: "Flexible Booking Amount", desc: "Start with minimum initial payment. Reserve your preferred unit with a small booking amount.", highlighted: false },
];

function ProjectCard({ project }) {
  return (
    <div
      className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col"
      style={{ boxShadow: "0 10px 30px rgba(94,35,220,0.04)" }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={getProjectImage(project)}
          alt={project.name}
          className="w-full h-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/assets/property/propertyPicture.svg";
          }}
        />
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <span className="bg-[#4500B4] text-white text-sm px-3 py-1 rounded-full">
            {project.bhk}
          </span>
          <span
            className="text-gray-800 text-sm px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}
          >
            {project.phase}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-gray-900 font-semibold text-base mb-1">{project.name}</h3>
          <p className="text-[#494455] text-sm">
            {project.location} • Launch Price {project.price}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <BedIcon />
            <span className="text-[#494455] text-sm ml-1">{project.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <LocationIcon />
            <span className="text-[#494455] text-sm ml-1">{PAGE_CITY}</span>
          </div>
        </div>
        <Link
          href={project.seoSlug ? `/property-info/${project.seoSlug}` : "/properties"}
          className="w-full py-3 rounded-xl text-[#4500B4] font-semibold text-sm text-center hover:bg-[#e8edff] transition"
          style={{ background: "#F0F3FF" }}
        >
          View Project
        </Link>
      </div>
    </div>
  );
}

export default function NewProjects({ initialPageData = null, initialFaqs = [] }) {
  const { URI, setShowAlert } = useAuth();
  const pageData = initialPageData;

  const [filters, setFilters] = useState({
    name: "",
    budget: "Any",
    unit: "Any",
    area: "All Areas",
  });
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const projectCount = pageData?.stats?.projectCount || 0;
  const localityCount = pageData?.stats?.localities || 0;
  const builderCount = pageData?.stats?.trustedBuilders || 0;
  const avgDiscount = pageData?.stats?.avgLaunchDiscount;
  const minPrice = pageData?.stats?.minPrice;
  const allProjects = pageData?.projects || [];
  const featuredProjects = pageData?.featuredProjects || [];
  const popularLocations = pageData?.popularLocations || [];
  const topBuilders = pageData?.topBuilders || [];
  const localityOptions = pageData?.localities || [];
  const bhkOptions = pageData?.bhkOptions || [];
  const heroProject = pageData?.heroProject || featuredProjects[0] || null;

  const filteredProjects = useMemo(
    () => filterProjects(allProjects, filters),
    [allProjects, filters],
  );

  const hasActiveFilters =
    filters.name.trim() ||
    filters.budget !== "Any" ||
    filters.unit !== "Any" ||
    filters.area !== "All Areas";

  const displayProjects = useMemo(() => {
    const source = hasActiveFilters
      ? filteredProjects
      : (pageData?.featuredProjects || allProjects).slice(0, 8);

    return source.map(mapFeaturedProject);
  }, [hasActiveFilters, filteredProjects, pageData?.featuredProjects, allProjects]);

  const faqs = useMemo(() => {
    const mapped = mapFaqs(initialFaqs || []);
    if (mapped.length > 0) return mapped;

    return [
      {
        q: "Is it safe to buy in new projects?",
        a: "Yes, if the builder is registered and approvals are in place. Reparv verifies all documentation before listing.",
      },
      {
        q: "Do new projects offer launch prices?",
        a: "Yes, most projects offer special pre-launch and launch pricing for early buyers, typically lower than ready-to-move market rates.",
      },
      {
        q: "What documents should I check before booking?",
        a: "Verify RERA registration, layout approval, builder credentials, title documents, and payment schedule before booking any unit.",
      },
    ];
  }, [initialFaqs]);

  const stories = useMemo(() => {
    const samples = featuredProjects.slice(0, 3);
    const defaults = [
      { name: "Sanjay Kulkarni", role: "IT Professional", budget: "₹50 Lakhs" },
      { name: "Ritu Sharma", role: "Teacher", budget: "₹40 Lakhs" },
      { name: "Kapoor Family", role: "Business Family", budget: "₹75 Lakhs" },
    ];

    return defaults.map((item, index) => ({
      ...item,
      project: samples[index]?.name || `New Project in ${popularLocations[index]?.name || PAGE_CITY}`,
      reason: index === 0 ? "Pre-launch pricing & RERA" : index === 1 ? "Subvention scheme" : "Modern amenities",
      benefit: index === 0 ? "Strong appreciation potential" : index === 1 ? "Flexible payment plan" : "Premium lifestyle upgrade",
      outcome:
        index === 0
          ? "Booked a verified under-construction unit with expert guidance."
          : index === 1
            ? "Flexible payment plan made buying easy."
            : "Chose a new project for modern amenities and location.",
    }));
  }, [featuredProjects, popularLocations]);

  const handleReset = () => {
    setFilters({ name: "", budget: "Any", unit: "Any", area: "All Areas" });
  };

  const handleSearch = () => scrollToSection("featured-projects");

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
          subject: `New Projects - ${PAGE_CITY}`,
          message: `Callback requested from New Projects page. City: ${PAGE_CITY}.`,
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
      console.error("New projects callback error:", error);
      alert("Server error, please try again later");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-white" style={{ fontFamily: "'Manrope', 'Inter', sans-serif" }}>
      <section
        className="flex flex-col justify-center items-center py-16"
        style={{ background: "linear-gradient(112.65deg, #5E23DC 0%, #7C3AED 100%)" }}
      >
        <div className="w-full max-w-[1280px] px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="flex flex-wrap gap-3">
              {["🏠 New Launches", "✅ RERA Verified", `📍 ${PAGE_CITY} Projects`].map((t) => (
                <span
                  key={t}
                  className="text-white text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              New Projects in {PAGE_CITY}
            </h1>
            <p className="text-white/80 text-lg max-w-lg leading-relaxed">
              Discover verified new and under-construction projects in {PAGE_CITY}. Compare prices,
              amenities, payment plans and book your dream home with expert guidance.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={handleSearch}
                className="bg-white text-[#5E23DC] font-bold px-8 py-3 rounded-lg text-base hover:bg-white/90 transition"
              >
                Explore New Projects
              </button>
              <button
                type="button"
                onClick={() =>
                  openAgentAdvisor(`I want help finding new projects in ${PAGE_CITY}.`)
                }
                className="text-white font-bold px-8 py-3 rounded-lg text-base border border-white/40 hover:bg-white/10 transition"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                Talk to Expert
              </button>
            </div>
            <div className="flex flex-wrap gap-6 pt-1">
              {[
                `${formatVerifiedStatValue(projectCount)} Projects`,
                "RERA Verified",
                `${builderCount} Builders`,
                "Free Consultation",
              ].map((t) => (
                <span key={t} className="text-white/70 text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full max-w-[600px]">
            {heroProject && (
              <div
                className="rounded-2xl p-5 mb-4 border border-white/20 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <div className="flex justify-between items-start mb-4 gap-3">
                  <div>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">
                      FEATURED PROJECT
                    </p>
                    <p className="text-white font-bold text-base">{heroProject.name}</p>
                    <p className="text-white/60 text-xs">
                      {heroProject.location}, {PAGE_CITY}
                    </p>
                  </div>
                  <span className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-medium">
                    {heroProject.phase}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white font-bold text-base">{heroProject.price}</p>
                  <p className="text-white/60 text-xs">
                    {heroProject.bhk}
                    {heroProject.possessionDate ? ` • ${heroProject.possessionDate}` : ""}
                  </p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-2xl p-5 border border-white/20 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-white/60 text-[10px] font-bold uppercase mb-1">RERA VERIFIED</p>
                <p className="text-white font-bold text-2xl mt-1">100%</p>
                <p className="text-white/60 text-[10px]">All listed projects</p>
              </div>
              <div
                className="rounded-2xl p-5 border border-white/20 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-white/60 text-[10px] font-bold uppercase mb-1">
                  STARTING PRICE
                </p>
                <p className="text-white font-bold text-2xl mt-1">
                  {formatIndianPriceShort(minPrice) || "On request"}
                </p>
                <p className="text-white/60 text-[10px]">
                  {avgDiscount ? `${avgDiscount}% avg. launch benefit` : "Verified launch pricing"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center relative z-10 px-4">
        <div className="w-full max-w-[1280px] bg-white border border-gray-200 rounded-xl shadow-xl p-6 flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-2 flex-1 min-w-[160px]">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              PROJECT NAME
            </label>
            <input
              type="text"
              placeholder="Search project or builder"
              value={filters.name}
              onChange={(event) => setFilters({ ...filters, name: event.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#5E23DC]/30"
            />
          </div>
          {[
            {
              label: "BUDGET",
              key: "budget",
              options: ["Any", "₹20-40L", "₹40-60L", "₹60-80L", "₹80L+"],
            },
            {
              label: "UNIT",
              key: "unit",
              options: ["Any", ...bhkOptions, ...(bhkOptions.includes("4 BHK") ? [] : ["4+ BHK"])],
            },
            {
              label: "PREFERRED AREA",
              key: "area",
              options: ["All Areas", ...localityOptions],
            },
          ].map(({ label, key, options }) => (
            <div key={key} className="flex flex-col gap-2 flex-1 min-w-[130px]">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {label}
              </label>
              <div className="relative">
                <select
                  value={filters[key]}
                  onChange={(event) => setFilters({ ...filters, [key]: event.target.value })}
                  className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white outline-none focus:ring-2 focus:ring-[#5E23DC]/30"
                >
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown />
                </span>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-400 font-semibold text-sm"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center gap-2 bg-[#5E23DC] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#4c1cb8] transition"
            >
              <SearchIcon />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      <section id="featured-projects" className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">
              PROJECTS
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Featured & Upcoming Projects in {PAGE_CITY}
            </h2>
            <p className="text-gray-500 text-base">
              Browse our curated selection of RERA-verified new launches to find your perfect home
            </p>
          </div>
          {displayProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProjects.slice(0, 8).map((project) => (
                <ProjectCard key={project.propertyid || project.name} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center">
              <p className="text-gray-500 mb-4">
                No projects match your filters right now. Try adjusting your search or talk to our expert.
              </p>
              <button
                type="button"
                onClick={() => openAgentAdvisor(`Help me find new projects in ${PAGE_CITY}.`)}
                className="bg-[#5E23DC] text-white px-6 py-3 rounded-lg font-bold text-sm"
              >
                Talk to Expert
              </button>
            </div>
          )}
          <div className="flex justify-center mt-10">
            <Link
              href={buildPropertiesLink({ city: PAGE_CITY, ...filters })}
              className="flex items-center gap-2 bg-[#5E23DC] text-white px-10 py-3 rounded-lg font-bold text-base hover:bg-[#4c1cb8] transition"
            >
              View All New Projects <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">
              HOW TO BUY
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Project Buying Journey</h2>
            <p className="text-gray-500 text-base">
              From discovery to possession — we guide you every step of the way
            </p>
          </div>
          <div className="relative flex flex-wrap justify-between gap-4">
            <div className="absolute top-10 left-10 right-10 h-0.5 bg-gray-100 hidden lg:block" />
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-1 z-10 flex-1 min-w-[120px]">
                <div
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${s.color}`}
                >
                  <span className="text-gray-600">{s.icon}</span>
                  <span
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${s.numBg} text-white text-xs font-bold flex items-center justify-center`}
                  >
                    {s.num}
                  </span>
                </div>
                <p className="text-gray-900 font-bold text-sm text-center mt-4">{s.title}</p>
                <p className="text-gray-400 text-xs text-center">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoSectionAd />

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">
              WHY BUY IN NEW PROJECTS?
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Why Buy in New Projects?</h2>
            <p className="text-gray-500 text-base">
              From lower prices to better amenities — new projects offer unmatched advantages
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a) => (
              <div
                key={a.title}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.bg}`}>
                  {a.icon}
                </div>
                <h3 className="text-gray-800 font-bold text-base mt-2">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {popularLocations.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">
                POPULAR LOCATIONS
              </p>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Popular Locations for New Projects in {PAGE_CITY}
              </h2>
              <p className="text-gray-500 text-base">
                Fast developing zones with infrastructure and industry driving investment demand
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularLocations.map((location) => (
                <div
                  key={location.name}
                  className="relative rounded-2xl overflow-hidden h-80 flex flex-col justify-end cursor-pointer group"
                >
                  <img
                    src={getProjectImage(location)}
                    alt={location.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/assets/property/propertyPicture.svg";
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
                    }}
                  />
                  <div className="relative z-10 p-6 flex flex-col gap-2">
                    <span
                      className={`${location.badgeBg} text-white text-[10px] px-2 py-1 rounded inline-block self-start`}
                    >
                      {location.badge}
                    </span>
                    <h3 className="text-white font-bold text-lg">{location.name}</h3>
                    <p className="text-blue-200 text-[10px]">Ideal for: {location.desc}</p>
                    <ul className="mb-2">
                      {location.features.map((feature) => (
                        <li key={feature} className="text-white/70 text-[10px]">
                          ✔ {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={buildPropertiesLink({ city: PAGE_CITY, area: location.name })}
                      className="border border-white/40 text-white text-[10px] font-bold py-2 rounded text-center hover:bg-white/10 transition"
                    >
                      View Projects
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-[#5E23DC]">
        <div className="max-w-[1280px] mx-auto px-4 text-center">
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-3">
            TRUST & SAFETY
          </p>
          <h2 className="text-white font-extrabold text-4xl mb-4">
            100% RERA & Legally Verified Projects
          </h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto mb-12">
            Every project on Reparv is verified by our legal team. RERA compliance, builder background
            checks and document verification before listing.
          </p>
          <div className="flex flex-wrap justify-center gap-12 mb-8">
            {verificationBadges.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  {b.icon}
                </div>
                <p className="text-white text-xs font-bold">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoSectionAd variant="seoInFeed" />

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">
              FLEXIBLE FINANCING
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Flexible Payment Plans & Launch Offers
            </h2>
            <p className="text-gray-500 text-base">
              We connect you with builders offering the most flexible payment plans
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentPlans.map((p) => (
              <div
                key={p.title}
                className={`relative rounded-2xl p-6 flex flex-col gap-3 overflow-hidden ${p.highlighted ? "bg-[#5E23DC] shadow-2xl" : "bg-white border border-gray-100"}`}
              >
                {p.tag && (
                  <div className="absolute -right-8 top-[-8px] bg-yellow-400 text-black text-[8px] font-extrabold px-8 py-1 rotate-45 translate-x-4">
                    POPULAR
                  </div>
                )}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${p.iconBg}`}>
                  {p.icon}
                </div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-wide ${p.highlighted ? "text-white/60" : "text-gray-400"}`}
                >
                  {p.label}
                </p>
                <h3 className={`font-bold text-base ${p.highlighted ? "text-white" : "text-gray-800"}`}>
                  {p.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${p.highlighted ? "text-white/80" : "text-gray-500"}`}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {topBuilders.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">
                TOP BUILDERS
              </p>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Top Builders in {PAGE_CITY} – Reparv Ranking
              </h2>
              <p className="text-gray-500 text-base">
                Trusted and verified builders with active new projects in {PAGE_CITY}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {topBuilders.map((b) => (
                <div key={b.name} className="relative border border-gray-200 rounded-2xl p-6 flex flex-col gap-6">
                  <span
                    className={`absolute -top-3 right-4 text-[10px] font-bold px-3 py-1 rounded-full ${b.tagBg}`}
                  >
                    {b.tag}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold text-base">
                      {b.name[0]}
                    </div>
                    <div>
                      <p className="text-gray-800 font-bold text-sm">{b.name}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xs">
                          {"★".repeat(Math.floor(Number(b.rating)))}
                        </span>
                        <span className="text-gray-400 text-[10px] font-bold">{b.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold">Projects</span>
                      <span className="text-gray-900 font-bold">{b.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold">Since</span>
                      <span className="text-gray-900 font-bold">{b.since}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold">Status</span>
                      <span className={`font-bold ${b.statusColor}`}>{b.status}</span>
                    </div>
                  </div>
                  <Link
                    href="/trusted-builders"
                    className="border border-[#5E23DC] text-[#5E23DC] text-xs font-bold py-2 rounded-lg hover:bg-purple-50 transition text-center"
                  >
                    View All Projects
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link
                href="/trusted-builders"
                className="bg-[#5E23DC] text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-[#4c1cb8] transition"
              >
                Explore All Builders
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">
              BUYER STORIES
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">New Project Buyer Stories</h2>
            <p className="text-gray-500 text-base">
              Real buyers, real results — how Reparv helped them find the best new project investment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((s) => (
              <div key={s.name} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-300 to-violet-500 flex items-center justify-center text-white font-bold">
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold text-sm">{s.name}</p>
                    <p className="text-gray-400 text-[10px]">{s.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["BUDGET", s.budget],
                    ["PROJECT SELECTED", s.project],
                    ["REASON FOR CHOOSING", s.reason],
                    ["INVESTMENT BENEFIT", s.benefit],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-gray-400 text-[8px] font-bold uppercase">{k}</p>
                      <p className="text-gray-800 text-[10px] font-bold">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-4 bg-purple-50">
                  <p className="text-[#5E23DC] text-[10px] font-bold mb-1">OUTCOME</p>
                  <p className="text-gray-600 text-xs">{s.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoSectionAd />

      <section className="py-12 bg-[#5E23DC]">
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4 max-w-lg">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
              FOR DEVELOPERS
            </p>
            <h2 className="text-3xl font-extrabold text-white">Launch Your Project with Reparv</h2>
            <p className="text-white/80 text-base leading-relaxed">
              List your project on Reparv to reach verified buyers actively searching for new projects
              in {PAGE_CITY}.
            </p>
          </div>
          <div
            className="border border-white/20 rounded-3xl p-8 flex flex-col items-center gap-4 max-w-sm w-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <h3 className="text-white font-bold text-xl">List Your Project</h3>
            <p className="text-white/70 text-xs text-center leading-relaxed">
              Join verified developers who trust Reparv to sell their projects faster and smarter.
            </p>
            <Link
              href="/buy-new-property"
              className="bg-white text-[#5E23DC] font-bold py-3 w-full rounded-lg text-base hover:bg-white/90 transition text-center"
            >
              List Your Project
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1152px] mx-auto px-4 flex flex-col lg:flex-row gap-6">
          <div
            className="flex-1 rounded-3xl p-12 border flex flex-col gap-8"
            style={{ background: "#F9F9FF", borderColor: "rgba(220,226,243,0.4)" }}
          >
            <h3 className="text-gray-900 font-bold text-2xl">Talk to a New Project Expert</h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="border-0 bg-white shadow-sm rounded-xl px-6 py-4 text-gray-800 text-base outline-none w-full"
                placeholder="Your Name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
              <input
                className="border-0 bg-white shadow-sm rounded-xl px-6 py-4 text-gray-800 text-base outline-none w-full"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#4500B4] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#3700a0] transition disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Request a Call Back"}
              </button>
            </form>
          </div>
          <div className="flex-1 rounded-3xl p-12 bg-[#5E23DC] flex flex-col justify-center gap-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-white text-base mb-2">Explore New Launches on Reparv</h3>
              <p className="text-white/80 text-base mb-8">Discover • Compare • Book early</p>
              <Link
                href={buildPropertiesLink({ city: PAGE_CITY })}
                className="inline-block bg-white text-[#4500B4] font-semibold px-8 py-3 rounded-xl text-base hover:bg-white/90 transition"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[896px] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">FAQ</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Frequently Asked Questions – New Projects
            </h2>
            <p className="text-gray-500 text-base">
              Quick answers to common questions about buying new projects in {PAGE_CITY}
            </p>
          </div>
          <div className="flex flex-col gap-4 mb-10">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-gray-200 pb-4">
                <button
                  type="button"
                  className="flex justify-between items-center w-full py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span className="text-gray-900 font-bold text-base">{f.q}</span>
                  <span className="text-[#5E23DC] font-bold text-xl">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-gray-500 text-sm leading-relaxed pb-2">{f.a}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => openAgentAdvisor(`I want to talk to a new project expert in ${PAGE_CITY}.`)}
              className="flex items-center gap-2 bg-[#5E23DC] text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-[#4c1cb8] transition"
            >
              <PhoneIcon />
              <span>Talk to Our New Project Expert</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
