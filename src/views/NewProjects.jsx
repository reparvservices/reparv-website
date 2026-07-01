"use client";

import { useState } from "react";

// Icons as SVG components
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const LocationIcon = () => (
  <svg width="15" height="18" viewBox="0 0 15 18" fill="none">
    <path d="M7.5 0C3.36 0 0 3.36 0 7.5c0 5.63 7.5 10.5 7.5 10.5S15 13.13 15 7.5C15 3.36 11.64 0 7.5 0zm0 10.5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#494455"/>
  </svg>
);
const BedIcon = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
    <rect x="0" y="5" width="18" height="7" rx="1" fill="#494455"/>
    <rect x="2" y="1" width="6" height="5" rx="1" fill="#494455"/>
    <rect x="10" y="1" width="6" height="5" rx="1" fill="#494455"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7l4 4 6-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" stroke="white" strokeWidth="2"/>
  </svg>
);
const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <polyline points="14,2 14,8 20,8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <polyline points="9,22 9,12 15,12 15,22" stroke="white" strokeWidth="2"/>
  </svg>
);
const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="white" strokeWidth="2"/>
  </svg>
);
const KeyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="7.5" cy="14.5" r="4.5" stroke="white" strokeWidth="2"/>
    <path d="M10.5 11.5l8-8M16 8l2 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
    <path d="M9 21V12h6v9" stroke="white" strokeWidth="2"/>
    <path d="M9 8h.01M12 8h.01M15 8h.01M9 12h.01M15 12h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const ClipboardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke="white" strokeWidth="2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" stroke="white" strokeWidth="2"/>
  </svg>
);
const GiftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="14" rx="1" stroke="white" strokeWidth="2"/>
    <path d="M21 8H3V5a1 1 0 011-1h16a1 1 0 011 1v3z" stroke="white" strokeWidth="2"/>
    <line x1="12" y1="4" x2="12" y2="22" stroke="white" strokeWidth="2"/>
    <path d="M12 4C12 4 9 2 9 4s3 4 3 4M12 4c0 0 3-2 3 0s-3 4-3 4" stroke="white" strokeWidth="2"/>
  </svg>
);
const TrendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" stroke="#A855F7" strokeWidth="2" strokeLinecap="round"/>
    <polyline points="16,7 22,7 22,13" stroke="#A855F7" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const VerifiedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#3B82F6" strokeWidth="2"/>
    <path d="M9 12l2 2 4-4" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const CurrencyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#EAB308" strokeWidth="2"/>
    <path d="M9 10h6M9 14h6M12 7v10" stroke="#EAB308" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const projects = [
  { name: "Reparv Heights Phase 1", location: "Wardha Road", price: "₹45 Lakh", beds: "2 BHK", bhk: "2 BHK", phase: "Phase 1", status: "New Launch", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=256&fit=crop" },
  { name: "Reparv Heights Phase 2", location: "Wardha Road", price: "₹52 Lakh", beds: "3 BHK", bhk: "3 BHK", phase: "Phase 2", status: "Under Construction", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=256&fit=crop" },
  { name: "Reparv Heights Phase 3", location: "Wardha Road", price: "₹58 Lakh", beds: "2 BHK", bhk: "2 BHK", phase: "Phase 3", status: "Pre-Launch", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=256&fit=crop" },
  { name: "Reparv Heights Phase 4", location: "Wardha Road", price: "₹65 Lakh", beds: "4 BHK", bhk: "4 BHK", phase: "Phase 4", status: "Upcoming", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=256&fit=crop" },
];

const steps = [
  { num: "1", title: "Discover Projects", sub: "Browse listings", color: "bg-orange-100", numBg: "bg-orange-400", icon: <SearchIcon /> },
  { num: "2", title: "Compare Builders", sub: "Evaluate options", color: "bg-blue-100", numBg: "bg-blue-400", icon: <StarIcon /> },
  { num: "3", title: "Book Site Visit", sub: "Visit in person", color: "bg-pink-100", numBg: "bg-pink-400", icon: <HomeIcon /> },
  { num: "4", title: "Verify Documents", sub: "Check RERA docs", color: "bg-yellow-100", numBg: "bg-yellow-400", icon: <DocumentIcon /> },
  { num: "5", title: "Reserve Unit", sub: "Block your unit", color: "bg-purple-100", numBg: "bg-purple-400", icon: <KeyIcon /> },
  { num: "6", title: "Own Your Home", sub: "Get possession", color: "bg-orange-100", numBg: "bg-orange-500", icon: <HomeIcon /> },
];

const advantages = [
  { bg: "bg-orange-100", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#F97316" strokeWidth="2"/></svg>, title: "Lower Launch Prices", desc: "Early buyers get the best rates before price appreciation. Lock in pre-launch pricing for maximum ROI." },
  { bg: "bg-blue-100", icon: <VerifiedIcon />, title: "Modern Amenities", desc: "Latest layouts, amenities, parking & lifestyle facilities designed for contemporary living." },
  { bg: "bg-yellow-100", icon: <CurrencyIcon />, title: "Flexible Payment Plans", desc: "Construction-linked and subvention schemes available. Pay as you go, stress-free ownership journey." },
  { bg: "bg-purple-100", icon: <TrendingIcon />, title: "High Appreciation Potential", desc: "Strong value growth by possession time. Nagpur's fastest-growing corridors deliver superior returns." },
];

const locations = [
  { name: "Wardha Road", badge: "8 Projects", badgeBg: "bg-blue-600", desc: "Best for professionals", features: ["Highway, campus & airport proximity", "Premium appreciation corridor", "Metro connectivity upcoming"], img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=320&fit=crop" },
  { name: "MIHAN", badge: "SEZ", badgeBg: "bg-purple-600", desc: "Special Economic Zone", features: ["International airport zone", "IT & aerospace hub", "High ROI potential"], img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=320&fit=crop" },
  { name: "Besa", badge: "Eco District", badgeBg: "bg-green-600", desc: "Green lifestyle zone", features: ["Peaceful residential area", "Good school zones", "Affordable pricing"], img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=320&fit=crop" },
  { name: "Hingna", badge: "Industrial", badgeBg: "bg-orange-600", desc: "Industrial corridor", features: ["Industrial proximity", "Affordable plots", "Fast development"], img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=320&fit=crop" },
];

const verificationBadges = [
  { icon: <ClipboardIcon />, label: "RERA Verified" },
  { icon: <ShieldIcon />, label: "Legal Checked" },
  { icon: <BuildingIcon />, label: "Builder Verified" },
  { icon: <DocumentIcon />, label: "Project Approved" },
];

const paymentPlans = [
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.5 5L18 8l-4 3.9 0.9 5.6L10 15l-4.9 2.5 0.9-5.6L2 8l5.5-1L10 2z" stroke="#EAB308" strokeWidth="1.5"/></svg>, iconBg: "bg-yellow-50", label: "PAYMENT SCHEME", title: "Construction Linked Plan", desc: "Pay as construction progresses. Pay in pre-construction stages, linked to milestones, gives you full transparency of progress.", highlighted: false },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5"/><path d="M6 5V3a1 1 0 011-1h6a1 1 0 011 1v2" stroke="white" strokeWidth="1.5"/><line x1="2" y1="9" x2="18" y2="9" stroke="white" strokeWidth="1.5"/></svg>, iconBg: "bg-white/20", label: "PAYMENT SCHEME", title: "Subvention Scheme", desc: "Builder pays EMI till possession. Zero interest during construction, enjoy stress-free ownership.", highlighted: true, tag: "POPULAR" },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4h12v12H4z" stroke="#F97316" strokeWidth="1.5" rx="1"/><path d="M10 3v3M10 14v3M3 10h3M14 10h3" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/></svg>, iconBg: "bg-orange-50", label: "OFFER", title: "Early Bird Discount", desc: "Lower launch price for early buyers. Construction linked and subvention schemes available with exclusive pre-launch pricing.", highlighted: false },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#3B82F6" strokeWidth="1.5"/><path d="M2 8h16" stroke="#3B82F6" strokeWidth="1.5"/><path d="M6 12h2M10 12h4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/></svg>, iconBg: "bg-blue-50", label: "BOOKING", title: "Flexible Booking Amount", desc: "Start with minimum initial payment. Reserve your preferred unit with a small booking amount.", highlighted: false },
];

const builders = [
  { name: "ABC Developers", rating: "4.5", projects: "12 Projects", since: "Since 2005", status: "✓ RERA Verified", statusColor: "text-green-600", tag: "Top Rated", tagBg: "bg-orange-100 text-orange-600" },
  { name: "Sunrise Group", rating: "4.2", projects: "8 Projects", since: "Since 2010", status: "✓ RERA Verified", statusColor: "text-green-600", tag: "Verified", tagBg: "bg-blue-100 text-blue-600" },
  { name: "Green Valley Builders", rating: "4.7", projects: "15 Projects", since: "Since 2001", status: "✓ RERA Verified", statusColor: "text-green-600", tag: "Premium", tagBg: "bg-green-100 text-green-600" },
  { name: "Elite Infra", rating: "4.0", projects: "6 Projects", since: "Since 2015", status: "✓ RERA Verified", statusColor: "text-green-600", tag: "New", tagBg: "bg-pink-100 text-pink-600" },
];

const stories = [
  { name: "Sanjay Kulkarni", role: "IT Professional", budget: "₹50 Lakhs", project: "Reparv Heights Phase 1", reason: "Pre-launch pricing & RERA", benefit: "12% appreciation expected", outcome: "Booked pre-launch unit and saved 8% appreciation.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&face" },
  { name: "Ritu Sharma", role: "Teacher", budget: "₹40 Lakhs", project: "Reparv Heights Phase 2", reason: "Subvention scheme", benefit: "Zero EMI till possession", outcome: "Flexible payment plan made buying easy.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&face" },
  { name: "Kapoor Family", role: "Business Family", budget: "₹75 Lakhs", project: "Reparv Heights Phase 3", reason: "Modern amenities", benefit: "Premium lifestyle upgrade", outcome: "Chose new project for modern amenities.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&face" },
];

const faqs = [
  { q: "Is it safe to buy in new projects?", a: "Yes, if the builder is registered and approvals are in place. Reparv verifies all documentation before listing." },
  { q: "Do new projects offer launch prices?", a: "Yes, most projects offer special pre-launch and launch pricing for early buyers, typically 8–15% lower than market rates." },
];

export default function NewProjects() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen font-sans bg-white" style={{ fontFamily: "'Manrope', 'Inter', sans-serif" }}>
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center py-16" style={{ background: "linear-gradient(112.65deg, #5E23DC 0%, #7C3AED 100%)" }}>
        <div className="w-full max-w-[1280px] px-4 flex flex-col lg:flex-row items-center gap-12">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="flex flex-wrap gap-3">
              {["🏠 New Launches", "✅ RERA Verified", "📍 Nagpur Projects"].map((t) => (
                <span key={t} className="text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>{t}</span>
              ))}
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">New Projects in Nagpur</h1>
            <p className="text-white/80 text-lg max-w-lg leading-relaxed">Discover verified new projects in Nagpur. Compare prices, amenities, payment plans and book your dream home with expert guidance.</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-white text-[#5E23DC] font-bold px-8 py-3 rounded-lg text-base hover:bg-white/90 transition">Explore New Projects</button>
              <button className="text-white font-bold px-8 py-3 rounded-lg text-base border border-white/40 hover:bg-white/10 transition" style={{ background: "rgba(255,255,255,0.1)" }}>Talk to Expert</button>
            </div>
            <div className="flex flex-wrap gap-6 pt-1">
              {["500+ Projects", "RERA Verified", "Expert Guidance", "Free Consultation"].map((t) => (
                <span key={t} className="text-white/70 text-xs">{t}</span>
              ))}
            </div>
          </div>

          {/* Right widgets */}
          <div className="flex-1 min-w-0 w-full max-w-[600px]">
            {/* Widget 1 - Featured Project */}
            <div className="rounded-2xl p-5 mb-4 border border-white/20 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">FEATURED PROJECT</p>
                  <p className="text-white font-bold text-base">Reparv Heights Phase 2</p>
                  <p className="text-white/60 text-xs">Wardha Road, Nagpur</p>
                </div>
                <span className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-medium">Hot Deal</span>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-bold text-base">Reparv Heights Phase 2</p>
                <p className="text-white/60 text-xs">Wardha Road • Oct 2025</p>
              </div>
            </div>
            {/* Widget 2 & 3 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 border border-white/20 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-white/60 text-[10px] font-bold uppercase mb-1">RERA VERIFIED</p>
                <p className="text-white font-bold text-2xl mt-1">100%</p>
                <p className="text-white/60 text-[10px]">All listed projects</p>
              </div>
              <div className="rounded-2xl p-5 border border-white/20 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-white/60 text-[10px] font-bold uppercase mb-1">AVG. LAUNCH DISCOUNT</p>
                <p className="text-white font-bold text-2xl mt-1">12%</p>
                <p className="text-white/60 text-[10px]">vs Market price</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Filter Bar */}
      <div className="flex justify-center -mt-0 relative z-10 px-4">
        <div className="w-full max-w-[1280px] bg-white border border-gray-200 rounded-xl shadow-xl p-6 flex flex-wrap gap-4 items-end">
          {[{ label: "PROJECT NAME", placeholder: "Any" }, { label: "BUDGET", placeholder: "Any" }, { label: "UNIT", placeholder: "Any" }, { label: "PREFERRED AREA", placeholder: "All Areas" }].map(({ label, placeholder }) => (
            <div key={label} className="flex flex-col gap-2 flex-1 min-w-[130px]">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</label>
              <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-white cursor-pointer">
                <span className="text-sm text-gray-800">{placeholder}</span>
                <ChevronDown />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <button className="text-gray-400 font-semibold text-sm">Reset</button>
            <button className="flex items-center gap-2 bg-[#5E23DC] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#4c1cb8] transition">
              <SearchIcon /><span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">PROJECTS</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Featured & Upcoming Projects in Nagpur</h2>
            <p className="text-gray-500 text-base">Browse our curated selection of RERA-verified new launches to find your perfect home</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p) => (
              <div key={p.name} className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col" style={{ boxShadow: "0 10px 30px rgba(94,35,220,0.04)" }}>
                <div className="relative h-56 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#4500B4] text-white text-sm px-3 py-1 rounded-full">{p.bhk}</span>
                    <span className="text-gray-800 text-sm px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}>{p.phase}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <h3 className="text-gray-900 font-semibold text-base mb-1">{p.name}</h3>
                    <p className="text-[#494455] text-sm">{p.location} • Launch Price {p.price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <BedIcon />
                      <span className="text-[#494455] text-sm ml-1">{p.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LocationIcon />
                      <span className="text-[#494455] text-sm ml-1">Nagpur</span>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-xl text-[#4500B4] font-semibold text-sm text-center hover:bg-[#e8edff] transition" style={{ background: "#F0F3FF" }}>View Project</button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button className="flex items-center gap-2 bg-[#5E23DC] text-white px-10 py-3 rounded-lg font-bold text-base hover:bg-[#4c1cb8] transition">
              View All New Projects <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      {/* Buying Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">HOW TO BUY</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Project Buying Journey</h2>
            <p className="text-gray-500 text-base">From discovery to possession — we guide you every step of the way</p>
          </div>
          <div className="relative flex flex-wrap justify-between gap-4">
            {/* Connecting line */}
            <div className="absolute top-10 left-10 right-10 h-0.5 bg-gray-100 hidden lg:block" />
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-1 z-10 flex-1 min-w-[120px]">
                <div className={`relative w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${s.color}`}>
                  <span className="text-gray-600">{s.icon}</span>
                  <span className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${s.numBg} text-white text-xs font-bold flex items-center justify-center`}>{s.num}</span>
                </div>
                <p className="text-gray-900 font-bold text-sm text-center mt-4">{s.title}</p>
                <p className="text-gray-400 text-xs text-center">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy - Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">WHY BUY IN NEW PROJECTS?</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Why Buy in New Projects?</h2>
            <p className="text-gray-500 text-base">From lower prices to better amenities — new projects offer unmatched advantages</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.bg}`}>{a.icon}</div>
                <h3 className="text-gray-800 font-bold text-base mt-2">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">POPULAR LOCATIONS</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Popular Locations for New Projects in Nagpur</h2>
            <p className="text-gray-500 text-base">Fast developing zones with Nagpur's infrastructure & industry driving investment demand</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((l) => (
              <div key={l.name} className="relative rounded-2xl overflow-hidden h-80 flex flex-col justify-end cursor-pointer group">
                <img src={l.img} alt={l.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)" }} />
                <div className="relative z-10 p-6 flex flex-col gap-2">
                  <span className={`${l.badgeBg} text-white text-[10px] px-2 py-1 rounded inline-block self-start`}>{l.badge}</span>
                  <h3 className="text-white font-bold text-lg">{l.name}</h3>
                  <p className="text-blue-200 text-[10px]">Ideal for: {l.desc}</p>
                  <ul className="mb-2">
                    {l.features.map((f) => <li key={f} className="text-white/70 text-[10px]">✔ {f}</li>)}
                  </ul>
                  <button className="border border-white/40 text-white text-[10px] font-bold py-2 rounded text-center hover:bg-white/10 transition">View Projects</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Banner */}
      <section className="py-16 bg-[#5E23DC]">
        <div className="max-w-[1280px] mx-auto px-4 text-center">
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-3">TRUST & SAFETY</p>
          <h2 className="text-white font-extrabold text-4xl mb-4">100% RERA & Legally Verified Projects</h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto mb-12">Every project on Reparv is verified by our legal team. RERA compliance, builder background checks and document verification before listing.</p>
          <div className="flex flex-wrap justify-center gap-12 mb-8">
            {verificationBadges.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.1)" }}>{b.icon}</div>
                <p className="text-white text-xs font-bold">{b.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {["RERA Registered", "Builder Verified", "Legal Cleared", "Document Checked"].map((t) => (
              <span key={t} className="text-white text-[10px] font-bold">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">FLEXIBLE FINANCING</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Flexible Payment Plans & Launch Offers</h2>
            <p className="text-gray-500 text-base">We connect you with builders offering the most flexible payment plans to make your home ownership journey smooth</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentPlans.map((p) => (
              <div key={p.title} className={`relative rounded-2xl p-6 flex flex-col gap-3 overflow-hidden ${p.highlighted ? "bg-[#5E23DC] shadow-2xl" : "bg-white border border-gray-100"}`}>
                {p.tag && (
                  <div className="absolute -right-8 top-[-8px] bg-yellow-400 text-black text-[8px] font-extrabold px-8 py-1 rotate-45 translate-x-4">POPULAR</div>
                )}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${p.iconBg}`}>{p.icon}</div>
                <p className={`text-[10px] font-bold uppercase tracking-wide ${p.highlighted ? "text-white/60" : "text-gray-400"}`}>{p.label}</p>
                <h3 className={`font-bold text-base ${p.highlighted ? "text-white" : "text-gray-800"}`}>{p.title}</h3>
                <p className={`text-xs leading-relaxed ${p.highlighted ? "text-white/80" : "text-gray-500"}`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Builders */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">TOP BUILDERS</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Top Builders in Nagpur – Reparv Ranking</h2>
            <p className="text-gray-500 text-base">Only the most trusted and RERA-verified builders with proven track records and happy buyers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {builders.map((b) => (
              <div key={b.name} className="relative border border-gray-200 rounded-2xl p-6 flex flex-col gap-6">
                <span className={`absolute -top-3 right-4 text-[10px] font-bold px-3 py-1 rounded-full ${b.tagBg}`}>{b.tag}</span>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold text-base">{b.name[0]}</div>
                  <div>
                    <p className="text-gray-800 font-bold text-sm">{b.name}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xs">{"★".repeat(Math.floor(Number(b.rating)))}</span>
                      <span className="text-gray-400 text-[10px] font-bold">{b.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[10px]">
                  <div className="flex justify-between"><span className="text-gray-400 font-bold">Projects</span><span className="text-gray-900 font-bold">{b.projects}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400 font-bold">Since</span><span className="text-gray-900 font-bold">{b.since}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400 font-bold">Status</span><span className={`font-bold ${b.statusColor}`}>{b.status}</span></div>
                </div>
                <button className="border border-[#5E23DC] text-[#5E23DC] text-xs font-bold py-2 rounded-lg hover:bg-purple-50 transition">View All Projects</button>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="bg-[#5E23DC] text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-[#4c1cb8] transition">Explore All Builders</button>
          </div>
        </div>
      </section>

      {/* Buyer Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">BUYER STORIES</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">New Project Buyer Stories</h2>
            <p className="text-gray-500 text-base">Real buyers, real results — how Reparv helped them find the best new project investment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((s) => (
              <div key={s.name} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <img src={s.img} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-gray-800 font-bold text-sm">{s.name}</p>
                    <p className="text-gray-400 text-[10px]">{s.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[["BUDGET", s.budget], ["PROJECT SELECTED", s.project], ["REASON FOR CHOOSING", s.reason], ["INVESTMENT BENEFIT", s.benefit]].map(([k, v]) => (
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

      {/* Developer CTA */}
      <section className="py-12 bg-[#5E23DC]">
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4 max-w-lg">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">FOR DEVELOPERS</p>
            <h2 className="text-3xl font-extrabold text-white">Launch Your Project with Reparv</h2>
            <p className="text-white/80 text-base leading-relaxed">List your project on Reparv to reach 50,000+ verified buyers actively searching for new projects in Nagpur.</p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 mt-2">
              {["✓ Pan-India buyer reach", "✓ Verified leads only", "✓ RERA compliance support", "✓ Digital marketing", "✓ Sales support team"].map((f) => (
                <p key={f} className="text-white/90 text-xs font-medium">{f}</p>
              ))}
            </div>
          </div>
          <div className="border border-white/20 rounded-3xl p-8 flex flex-col items-center gap-4 max-w-sm w-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <h3 className="text-white font-bold text-xl">List Your Project</h3>
            <p className="text-white/70 text-xs text-center leading-relaxed">Join 200+ developers who trust Reparv to sell their projects faster and smarter.</p>
            <button className="bg-white text-[#5E23DC] font-bold py-3 w-full rounded-lg text-base hover:bg-white/90 transition">List Your Project</button>
          </div>
        </div>
      </section>

      {/* Expert Contact + App Download */}
      <section className="py-20 bg-white">
        <div className="max-w-[1152px] mx-auto px-4 flex flex-col lg:flex-row gap-6">
          {/* Talk to Expert */}
          <div className="flex-1 rounded-3xl p-12 border flex flex-col gap-8" style={{ background: "#F9F9FF", borderColor: "rgba(220,226,243,0.4)" }}>
            <h3 className="text-gray-900 font-bold text-2xl">Talk to a New Project Expert</h3>
            <div className="flex flex-col gap-4">
              <input className="border-0 bg-white shadow-sm rounded-xl px-6 py-4 text-gray-500 text-base outline-none w-full" placeholder="Your Name" />
              <input className="border-0 bg-white shadow-sm rounded-xl px-6 py-4 text-gray-500 text-base outline-none w-full" placeholder="Phone Number" />
              <button className="bg-[#4500B4] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#3700a0] transition">Request a Call Back</button>
            </div>
          </div>
          {/* App Download */}
          <div className="flex-1 rounded-3xl p-12 bg-[#5E23DC] flex flex-col justify-center gap-6 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-10 text-white">
              <svg width="150" height="220" viewBox="0 0 150 220"><rect width="150" height="220" rx="20" fill="white"/></svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-white text-base mb-2">Explore New Launches on Reparv App</h3>
              <p className="text-white/80 text-base mb-8">Discover • Compare • Book early</p>
              <button className="bg-white text-[#4500B4] font-semibold px-8 py-3 rounded-xl text-base hover:bg-white/90 transition">Download App</button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 bg-[#5E23DC]">
        <div className="max-w-[1280px] mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 flex flex-col gap-6">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">MOBILE APP</p>
            <h2 className="text-white font-extrabold text-4xl leading-tight">Explore New Launches on Reparv App</h2>
            <p className="text-white/70 text-lg leading-relaxed">Discover • Compare • Book easily. Browse all new projects, upcoming launches, RERA verified builders and get early bird notifications right on your phone.</p>
            <div className="flex gap-4 flex-wrap">
              <button className="flex items-center gap-3 px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div>
                  <p className="text-white text-[8px] uppercase font-medium">GET IT ON</p>
                  <p className="text-white font-bold text-sm">Google Play</p>
                </div>
              </button>
              <button className="flex items-center gap-3 px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 transition" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div>
                  <p className="text-white text-[8px] uppercase font-medium">DOWNLOAD ON</p>
                  <p className="text-white font-bold text-sm">App Store</p>
                </div>
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {["500+ Projects", "RERA Verified", "Expert Guidance", "Free Consultation", "Best Prices"].map((t) => (
                <span key={t} className="text-white text-[10px] font-bold px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-[420px] bg-white/10 rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl">
              <div className="absolute inset-4 rounded-2xl bg-white/5 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-2xl font-extrabold">R</span>
                </div>
                <p className="text-white font-bold text-lg">Reparv App</p>
                <p className="text-white/60 text-xs text-center px-4">Find your dream project</p>
                <div className="flex gap-2 mt-4">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-[896px] mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#5E23DC] text-xs font-bold tracking-widest uppercase mb-2">FAQ</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Frequently Asked Questions – New Projects</h2>
            <p className="text-gray-500 text-base">Quick answers to common questions about buying new projects in Nagpur</p>
          </div>
          <div className="flex flex-col gap-4 mb-10">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-gray-200 pb-4">
                <button className="flex justify-between items-center w-full py-4 text-left" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span className="text-gray-900 font-bold text-base">{f.q}</span>
                  <span className="text-[#5E23DC] font-bold text-xl">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="text-gray-500 text-sm leading-relaxed pb-2">{f.a}</p>}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="flex items-center gap-2 bg-[#5E23DC] text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-[#4c1cb8] transition">
              <PhoneIcon /><span>Talk to Our New Project Expert</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}