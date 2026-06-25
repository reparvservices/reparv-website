"use client";
import { useState } from "react";

// ── Icons ────────────────────────────────────────────────────────────────────
const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const ChevronDown = ({ open }) => (
  <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const BedIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12V8a1 1 0 011-1h5a1 1 0 011 1v4M3 12h18M3 12v4m18-4v4m0 0H3m18 0v-4M7 7V5m10 2V5" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-left gap-4 py-4 px-0">
        <span className="text-sm sm:text-base font-medium text-gray-800">{q}</span>
        <ChevronDown open={open} />
      </button>
      {open && <p className="pb-4 text-sm text-gray-600 leading-relaxed">{a}</p>}
    </div>
  );
}

// ── Circular Score Ring ───────────────────────────────────────────────────────
function ScoreRing({ score = 9.4 }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const pct = (score / 10) * circ;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="90" cy="90" r={r} fill="none"
          stroke="#7c3aed" strokeWidth="10"
          strokeDasharray={`${pct} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center mb-1">
          <ShieldIcon />
        </div>
        <span className="text-4xl font-black text-violet-700 leading-none">{score}</span>
        <span className="text-xs text-gray-500 font-medium">/10</span>
        <span className="text-xs text-gray-400 mt-0.5">Trust Score</span>
        <span className="text-[10px] text-gray-400">Based on 500+ listings</span>
      </div>
    </div>
  );
}

// ── Verification Step ─────────────────────────────────────────────────────────
function VerifStep({ icon, label, sub, active }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg shadow-sm border-2 transition-colors
        ${active ? "bg-violet-600 border-violet-600 text-white" : "bg-white border-violet-200 text-violet-500"}`}>
        {icon}
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-700 leading-tight">{label}</p>
        <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{sub}</p>
      </div>
    </div>
  );
}

// ── Trust Signal Card ─────────────────────────────────────────────────────────
function TrustCard({ icon, label, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center gap-2 hover:shadow-md hover:border-violet-200 transition-all">
      <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center text-2xl">{icon}</div>
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      <p className="text-xs text-gray-500 leading-snug">{sub}</p>
    </div>
  );
}

// ── Property Card ─────────────────────────────────────────────────────────────
function PropertyCard({ badge, title, location, price, bhk }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex-shrink-0 w-72 sm:w-auto">
      <div className="relative">
        <div className="h-44 bg-gradient-to-br from-amber-800 to-amber-600 flex items-center justify-center">
          <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <span className="absolute top-3 left-3 bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
        <button className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="text-xs text-gray-400">{location}</span>
        </div>
        <h4 className="font-bold text-gray-800 text-sm mb-2">{title}</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-base font-black text-gray-900">{price}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <BedIcon />{bhk}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <UserIcon /> Agent
          </div>
          <button className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Framework Row ─────────────────────────────────────────────────────────────
function FrameworkRow({ icon, label, pct, desc }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <span className="text-sm font-bold text-violet-600 ml-3">{pct}%</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function TrustScorePage() {
  const faqs = [
    {
      q: "What makes a property 'Trusted' on Reparv?",
      a: "A 'Trusted' status is only awarded to properties that pass our 100-point audit covering legal framework, builder track record, construction material quality, and post-handover resident feedback. It must score above 7.0 on our Trust Score framework.",
    },
    {
      q: "Are all properties in Nagpur listed here?",
      a: "No. We only list properties that meet our rigorous verification standards. We actively exclude properties with pending legal disputes, builder complaints, or insufficient documentation. This ensures every listing you see is genuinely verified.",
    },
    {
      q: "Can a Trust Score change over time?",
      a: "Yes. Trust Scores are reviewed quarterly and can increase or decrease based on new resident feedback, any emerging legal issues, changes in builder reputation, and updated construction inspections.",
    },
    {
      q: "Do builders pay for higher scores?",
      a: "Absolutely not. Our Trust Score is independently calculated and cannot be purchased. We maintain strict separation between our sales and verification teams. Builders with unresolved legal issues are never featured, regardless of commercial relationship.",
    },
  ];

  const properties = [
    { badge: "9.2", title: "3 BHK Marlboro House", location: "Nagpur, 00000", price: "₹35 Lakh", bhk: "3 BHK" },
    { badge: "8.8", title: "3 BHK Marlboro House", location: "Nagpur, 00000", price: "₹35 Lakh", bhk: "3 BHK" },
    { badge: "9.0", title: "3 BHK Marlboro House", location: "Nagpur, 00000", price: "₹35 Lakh", bhk: "3 BHK" },
  ];

  const trustCards = [
    { icon: "🏅", label: "Advisor Recommended", sub: "Shortlisted by senior property advisors." },
    { icon: "⚖️", label: "Legal Clear", sub: "Title, RERA, and possession status verified." },
    { icon: "⭐", label: "Top Rated", sub: "Highest buyer satisfaction scores." },
    { icon: "🏗️", label: "Builder Trusted", sub: "Zero project delays in last 3 years." },
    { icon: "📈", label: "High Resale Value", sub: "Strong appreciation & resale demand." },
    { icon: "🔍", label: "Quality Audited", sub: "Verified superior build standards." },
  ];

  const verifySteps = [
    { icon: "⚖️", label: "Legal Check", sub: "100% Title Verification", active: false },
    { icon: "🏗️", label: "Builder Audit", sub: "Past Record Analysis", active: false },
    { icon: "🔍", label: "Quality Audit", sub: "On-ground Inspections", active: false },
    { icon: "💬", label: "Buyer Feedback", sub: "New Resident Insights", active: false },
    { icon: "✅", label: "Score Assigned", sub: "Final Trust Rating", active: true },
  ];

  const framework = [
    { icon: "⚖️", label: "Legal Safety", pct: 30, desc: "Title search, RERA approvals, encumbrance scan, and litigation history audit." },
    { icon: "🏗️", label: "Builder Reliability", pct: 25, desc: "Delivery history, past complaints, financial stability, and reputation scan." },
    { icon: "🔨", label: "Construction Quality", pct: 25, desc: "On-ground audit of materials, finishing quality, and amenity standards." },
    { icon: "😊", label: "Buyer Satisfaction", pct: 20, desc: "Post-handover experience, society feedback, and management quality." },
  ];

  return (
    <div className="bg-white font-sans text-gray-800 min-w-0">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-violet-900 via-violet-800 to-violet-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-violet-300 text-xs mb-5 flex-wrap">
            <span>Homes</span><span>/</span><span>Properties</span><span>/</span><span>Nagpur</span><span>/</span><span className="text-white font-medium">Buyer Trusted</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight mb-3">
                Top Trusted Property in<br className="hidden sm:block" /> Nagpur
              </h1>
              <p className="text-sm sm:text-base text-violet-200 leading-relaxed mb-6 max-w-lg">
                Legally verified, builder-checked, and buyer-approved properties in Nagpur. Shortlisted by Reparv advisors after rigorous auditing.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <button className="bg-white text-violet-700 hover:bg-violet-50 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow">
                  View Trusted Properties
                </button>
                <button className="border border-white/40 text-white hover:bg-white/10 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
                  How Trust Scores Work
                </button>
              </div>
              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                {[
                  { icon: "⚖️", label: "Legal Verified" },
                  { icon: "🏗️", label: "Builder Checked" },
                  { icon: "✅", label: "Quality Verified" },
                  { icon: "😊", label: "Buyer Approved" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-violet-200">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Building image + trust badge */}
            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="h-52 sm:h-64 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-500 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" strokeWidth={0.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                {/* Trust score pill */}
                <div className="absolute bottom-4 right-4 bg-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
                  <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center">
                    <ShieldIcon />
                  </div>
                  <div>
                    <p className="text-lg font-black text-violet-700 leading-none">9.2</p>
                    <p className="text-[10px] text-gray-500">Trust Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Score Framework ─────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">The Reparv Trust Score Framework</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              Our proprietary algorithm analyses over 100 data points across financial, legal, and structural pillars to calculate an objective score for every listing.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Score ring */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <ScoreRing score={9.4} />
              <div className="text-center">
                <p className="text-sm font-bold text-violet-700">Exceptional Trust Level</p>
                <p className="text-xs text-gray-400 mt-0.5">Top 5% of verified properties</p>
              </div>
            </div>

            {/* Framework rows */}
            <div className="flex-1 min-w-0 w-full">
              {framework.map(f => (
                <FrameworkRow key={f.label} {...f} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Most Trusted Properties ───────────────────────────────────────── */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Most Trusted Properties in Nagpur</h2>
              <p className="text-sm text-gray-500 mt-1">Hand-picked premium listings with the highest trust ratings.</p>
            </div>
            <a href="#" className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap hidden sm:flex items-center gap-1">
              See All 120+ Listings <ArrowRight />
            </a>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {properties.map((p, i) => <PropertyCard key={i} {...p} />)}
          </div>

          <a href="#" className="mt-5 flex sm:hidden items-center justify-center gap-1 text-violet-600 text-sm font-semibold">
            See All 120+ Listings <ArrowRight />
          </a>
        </div>
      </section>

      {/* ── Verification Journey ──────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Our Verification Journey</h2>
            <p className="text-sm text-gray-500">Every property goes through a multi-step audit before it appears on our trusted listings.</p>
          </div>

          {/* Steps row with connecting line */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-5 left-0 right-0 h-0.5 bg-violet-100 mx-16 z-0" />
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 relative z-10">
              {verifySteps.map((s, i) => (
                <div key={i} className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0 sm:flex-1 sm:text-center">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl shadow border-2 flex-shrink-0 sm:mb-3
                    ${s.active ? "bg-violet-600 border-violet-600 text-white" : "bg-white border-violet-200 text-violet-500"}`}>
                    {s.icon}
                  </div>
                  <div className="sm:text-center">
                    <p className="text-xs font-bold text-gray-800">{s.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Signals & Certifications ───────────────────────────────── */}
      <section className="py-14 bg-violet-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Trust Signals &amp; Certifications</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Look for these badges on property cards to instantly see its strengths.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustCards.map((t, i) => (
              <TrustCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── What Does a Trust Score Mean + Reparv Guarantee ─────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left — What Does It Mean */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What Does a Trust Score Mean?</h2>
              <p className="text-sm text-gray-500 mb-6">Our scores are binary — either a property meets our rigorous standards or it doesn't. We only feature properties that score above 7.0.</p>

              <div className="space-y-4">
                {[
                  { range: "9–10", label: "Exceptional Choice", color: "bg-green-500", desc: "Ultra-safe, premium builds with zero legacy issues." },
                  { range: "8–8.9", label: "Highly Trusted", color: "bg-violet-500", desc: "Robust legal standing and great build quality." },
                  { range: "7–7.9", label: "Verified", color: "bg-blue-400", desc: "Safe with standard risk profile and typical features." },
                ].map(item => (
                  <div key={item.range} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-violet-200 transition-colors">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className={`w-2 h-10 rounded-full ${item.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-base font-black text-gray-900">{item.range}</span>
                        <span className="text-sm font-bold text-gray-700">— {item.label}</span>
                      </div>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Reparv Guarantee */}
            <div>
              <div className="bg-gradient-to-br from-violet-700 to-violet-900 text-white rounded-3xl p-7 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ShieldIcon />
                  </div>
                  <h3 className="text-xl font-bold">Reparv Guarantee</h3>
                </div>
                <p className="text-sm text-violet-200 leading-relaxed mb-6">
                  We never rank or promote projects with unresolved legal issues, disputed delivery delays, or negative buyer history — even if they pay higher commissions.
                </p>
                <ul className="space-y-3 mb-7">
                  {[
                    "Unbiased Algorithm",
                    "Zero conflict of interest",
                    "Continuous Monitoring",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-violet-100">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-3 h-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-white text-violet-700 hover:bg-violet-50 font-bold text-sm py-3 rounded-xl transition-colors">
                  Talk to Our Trust Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="bg-violet-600 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">Confused Between Multiple Properties?</h2>
          <p className="text-sm text-violet-200 mb-8 max-w-xl mx-auto">
            Get a professional Trust Audit for any property you're considering, even if it's not listed on Reparv.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-violet-700 hover:bg-violet-50 font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow">
              Get Your Free Trust Consultation
            </button>
            <button className="border border-white/40 text-white hover:bg-white/10 font-semibold text-sm px-6 py-3 rounded-xl transition-colors">
              Download Sample Audit Report
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-500">Everything you need to know about our trust verification process.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 px-6 divide-y divide-gray-100">
            {faqs.map((faq, i) => <FAQ key={i} {...faq} />)}
          </div>
        </div>
      </section>

    </div>
  );
}