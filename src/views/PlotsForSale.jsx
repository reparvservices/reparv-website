"use client";
import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const TRUST_BADGES = ["100% Verified", "NA Approved", "Legal Cleared"];

const PLOT_CARDS = [
  {
    title: "Residential Plot",
    location: "MIHAN • 1200 sqft",
    price: "₹32 Lac",
  },
  {
    title: "Residential Plot",
    location: "Wardha Road • 1500 sqft",
    price: "₹45 Lac",
  },
  {
    title: "Residential Plot",
    location: "Outer Ring Road • 900 sqft",
    price: "₹28 Lac",
  },
  {
    title: "Residential Plot",
    location: "Hingna • 1100 sqft",
    price: "₹38 Lac",
  },
];

const AREAS = [
  {
    name: "MIHAN",
    sub: "Multi-modal Hub",
    badge: "Hot Zone",
    plotsLabel: "AVAILABLE PLOTS",
    plotsVal: "IT Hub & airport expansion",
    growthLabel: "GROWTH",
    growthVal: "High",
    growthColor: "text-green-600",
  },
  {
    name: "Outer Ring Road",
    sub: "Expressway Corridor",
    badge: "Hot Zone",
    plotsLabel: "AVAILABLE PLOTS",
    plotsVal: "New highways & layouts",
    growthLabel: "GROWTH",
    growthVal: "Very High",
    growthColor: "text-green-600",
  },
  {
    name: "Wardha Road",
    sub: "Commercial Spine",
    badge: "Hot Zone",
    plotsLabel: "AVAILABLE PLOTS",
    plotsVal: "Metro & commercial growth",
    growthLabel: "GROWTH",
    growthVal: "High",
    growthColor: "text-green-600",
  },
  {
    name: "Hingna",
    sub: "Industrial Hub",
    badge: "Rising",
    plotsLabel: "AVAILABLE PLOTS",
    plotsVal: "Industrial demand",
    growthLabel: "GROWTH",
    growthVal: "Growing",
    growthColor: "text-green-600",
  },
];

const LEGAL_CHECKS_TOP = [
  {
    icon: "🏛",
    title: "NA Status Verified",
    desc: "Confirms land is legally converted for non-agricultural residential or commercial use.",
  },
  {
    icon: "📋",
    title: "Layout Approval Checked",
    desc: "Ensures the plot is part of a government-approved layout with proper demarcation.",
  },
  {
    icon: "📄",
    title: "Clear Title & Ownership",
    desc: "Validates seller ownership, past sale deeds, and uninterrupted title history.",
  },
  {
    icon: "🔒",
    title: "Encumbrance Free",
    desc: "Checks that the plot has no loans, disputes, mortgages, or legal claims attached.",
  },
];

const LEGAL_CHECKS_BOTTOM = [
  {
    title: "Boundary & Measurement Check",
    desc: "Physical site verification to ensure correct plot size, boundaries, and no encroachment.",
  },
  {
    title: "Road Access & Right of Way",
    desc: "Confirms legal road connectivity and approved access to the plot from public roads.",
  },
  {
    title: "Registry & Documentation Support",
    desc: "Assistance with agreement, stamp duty calculation, registration, and mutation process.",
  },
];

const WHY_INVEST = [
  {
    emoji: "📈",
    title: "High Appreciation",
    desc: "Land as an asset grows faster in expanding corridors.",
  },
  {
    emoji: "🛡",
    title: "No Depreciation",
    desc: "Unlike flats, land does not lose structural value.",
  },
  {
    emoji: "🏗",
    title: "Flexible Construction",
    desc: "Build when ready as per your personal design.",
  },
  {
    emoji: "🧹",
    title: "Lower Maintenance",
    desc: "No daily charges or heavy upkeep costs.",
  },
];

const FAQS = [
  {
    q: "What is NA land and why is it important?",
    a: "NA (Non-Agricultural) land is legally approved for residential or commercial use. Buying non-NA land can cause registration and construction issues.",
  },
  { q: "Is layout approval mandatory before buying a plot?", a: null },
  { q: "Can I buy agricultural land and convert it later?", a: null },
  { q: "What documents should I verify before booking a plot?", a: null },
];

const STORIES = [
  {
    tag: "Nagpur Plot",
    loc: "Outer Ring Road",
    gain: "✓ Customer: 1200 sqft bought for future site",
    text: "Reparv helped me verify NA status and layout approval before investing. It's been 2 years and value has appreciated significantly.",
    buyer: "Rahul M.",
    stars: "★★★★★",
  },
  {
    tag: "Nagpur Plot",
    loc: "MIHAN",
    gain: "✓ Confirmed: Investment plot with high growth potential",
    text: "Conversion is possible but time-consuming and risky. It is safer to buy already converted NA plots. Reparv made it hassle-free.",
    buyer: "Priya S.",
    stars: "★★★★★",
  },
  {
    tag: "Nagpur Plot",
    loc: "Wardha Road",
    gain: "✓ Customer: Affordable plot with registry completed",
    text: "Plots usually offer higher long-term appreciation with no depreciation, but require strong legal verification before purchase.",
    buyer: "Amit K.",
    stars: "★★★★★",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function TrustBadge({ label }) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/30 bg-white/20 text-white text-[10px] font-normal leading-[15px] whitespace-nowrap">
      <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
      {label}
    </span>
  );
}

function PlotCard({ card }) {
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
      <div
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-200 to-purple-400 flex-shrink-0"
        style={{ height: "202px" }}
      >
        {/* placeholder image */}
        <div className="w-full h-full bg-gradient-to-br from-amber-100 via-green-100 to-blue-100 flex items-center justify-center">
          <span className="text-4xl opacity-30">🌿</span>
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 shadow-sm backdrop-blur-sm">
          <span className="text-[#4500B4]" style={{ fontSize: 10 }}>
            📍
          </span>
          <span className="text-[#4500B4] font-bold text-[10px] uppercase tracking-wide">
            Verified
          </span>
        </div>
      </div>
      <div className="pt-3">
        <h3 className="font-semibold text-[#151C27] text-2xl leading-8">
          {card.title}
        </h3>
        <p className="flex items-center gap-2 text-[#5F5D69] text-sm font-semibold mt-0.5">
          <span className="text-[#5F5D69]">📍</span>
          {card.location}
        </p>
        <p className="text-[#4500B4] font-bold text-2xl mt-1">{card.price}</p>
      </div>
    </div>
  );
}

function AreaCard({ area }) {
  return (
    <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 flex flex-col gap-6 flex-1 min-w-[220px]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-extrabold text-[#1A1A1A] text-lg leading-7">
            {area.name}
          </h3>
          <p className="text-[#9CA3AF] text-[10px] mt-0.5">{area.sub}</p>
        </div>
        <span className="bg-[#5E23DC] text-white text-[10px] font-bold px-2 py-1 rounded">
          {area.badge}
        </span>
      </div>
      <div className="flex flex-col gap-4 pb-2">
        <div className="flex gap-3 items-start">
          <span className="text-black opacity-60 text-sm">•</span>
          <div>
            <p className="text-[#9CA3AF] text-[10px] font-bold uppercase">
              {area.plotsLabel}
            </p>
            <p className="text-[#1A1A1A] text-xs font-semibold mt-0.5">
              {area.plotsVal}
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-black opacity-60 text-sm">•</span>
          <div>
            <p className="text-[#9CA3AF] text-[10px] font-bold uppercase">
              {area.growthLabel}
            </p>
            <p className={`${area.growthColor} text-xs font-semibold mt-0.5`}>
              {area.growthVal}
            </p>
          </div>
        </div>
      </div>
      <button className="w-full border border-[#5E23DC] text-[#5E23DC] font-bold text-xs rounded-lg py-2 hover:bg-purple-50 transition-colors">
        View Plots
      </button>
    </div>
  );
}

function LegalCheckCard({ icon, title, desc }) {
  return (
    <div className="bg-white border-l-4 border-[#4500B4] shadow-sm rounded-2xl p-6 flex flex-col gap-2 flex-1 min-w-[220px]">
      <div className="w-10 h-10 rounded-full bg-[#4500B4]/10 flex items-center justify-center text-lg flex-shrink-0">
        {icon}
      </div>
      <h4 className="text-[#151C27] font-semibold text-sm pt-2">{title}</h4>
      <p className="text-[#5F5D69] text-sm leading-5">{desc}</p>
    </div>
  );
}

function LegalBottomCard({ title, desc }) {
  return (
    <div className="bg-white border-l-4 border-[#4500B4] shadow-sm rounded-2xl p-6 flex flex-col gap-2 flex-1 min-w-[220px]">
      <h4 className="text-[#151C27] font-semibold text-sm">{title}</h4>
      <p className="text-[#5F5D69] text-sm leading-5">{desc}</p>
    </div>
  );
}

function WhyCard({ item }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center gap-2 flex-1 min-w-[220px]">
      <span className="text-4xl">{item.emoji}</span>
      <h4 className="text-white font-semibold text-2xl text-center mt-2">
        {item.title}
      </h4>
      <p className="text-[#C8C5D3] text-base text-center">{item.desc}</p>
    </div>
  );
}

function StoryCard({ story }) {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col gap-4 flex-1 min-w-[280px]">
      <div className="flex gap-2 flex-wrap">
        <span className="bg-[#5E23DC]/10 text-[#5E23DC] text-[10px] font-bold px-2 py-1 rounded">
          {story.tag}
        </span>
        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded">
          {story.loc}
        </span>
      </div>
      <p className="text-green-600 font-bold text-xs flex gap-1 items-center">
        <span className="text-green-600 font-bold text-base">✓</span>
        {story.gain.replace("✓ ", "")}
      </p>
      <p className="text-[#6B7280] text-xs leading-5 pb-2">{story.text}</p>
      <div className="border-t border-gray-200 pt-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
          {story.buyer[0]}
        </div>
        <span className="text-yellow-500 text-[10px] tracking-wider">
          {story.stars}
        </span>
      </div>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(item.a !== null);
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
      <button
        className="w-full flex items-center justify-between gap-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-[#151C27] font-semibold text-sm leading-5">
          {item.q}
        </span>
        <span className="text-[#5E23DC] text-base font-bold flex-shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && item.a && (
        <p className="text-[#5F5D69] text-sm leading-5 mt-4">{item.a}</p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PlotsForSale() {
  const [plotType, setPlotType] = useState("Any");
  const [budget, setBudget] = useState("Any");
  const [size, setSize] = useState("Any");
  const [area, setArea] = useState("All Areas");

  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sans">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#5E23DC] to-[#8A38F5] pt-7 pb-0 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="flex flex-col md:flex-row md:items-start md:gap-12 relative">
            {/* Left text */}
            <div className="flex flex-col gap-6 w-full md:max-w-[55%] relative z-10 pt-16 pb-8 md:py-16">
              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 opacity-90">
                {TRUST_BADGES.map((b) => (
                  <TrustBadge key={b} label={b} />
                ))}
              </div>

              {/* H1 */}
              <h1 className="text-white font-extrabold text-4xl md:text-5xl leading-[1.2] md:leading-[60px]">
                Plots for Sale in Nagpur
              </h1>

              {/* Sub */}
              <p className="text-white opacity-90 text-base md:text-lg leading-7 max-w-[512px]">
                Buy legally clear residential and investment plots in Nagpur
                with full documentation support and growth guidance.
              </p>

              {/* Buttons */}
              <div className="flex gap-4 flex-wrap pt-2">
                <button className="bg-white text-[#5E23DC] font-bold text-base px-8 py-3.5 rounded-lg shadow-lg hover:bg-purple-50 transition-colors">
                  View Plots
                </button>
                <button className="border-2 border-white/50 text-white font-bold text-base px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                  Contact Us
                </button>
              </div>

              {/* Verified card */}
              <div className="mt-4 md:mt-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 w-fit max-w-[270px]">
                <div className="w-12 h-12 rounded-full bg-[#5E23DC]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#5E23DC] text-xl">✓</span>
                </div>
                <div>
                  <p className="text-[#151C27] font-semibold text-sm leading-5">
                    100% Verified Plots
                  </p>
                  <p className="text-[#5F5D69] text-xs leading-4">
                    Legal clearance guaranteed
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Hero image + chart card */}
            <div className="hidden md:flex flex-col items-end justify-end flex-1 relative min-h-[420px]">
              {/* Fake plot image */}
              <div
                className="rounded-3xl shadow-2xl bg-gradient-to-br from-amber-100 via-green-100 to-sky-200 flex items-center justify-center"
                style={{
                  width: 320,
                  height: 320,
                  transform: "rotate(3deg)",
                  marginTop: 40,
                }}
              >
                <span className="text-7xl opacity-30">🌾</span>
              </div>
              {/* Abstract chart card */}
              <div className="absolute bottom-8 right-0 bg-white rounded-2xl shadow-2xl p-8 w-[360px]">
                <div className="flex flex-col gap-5">
                  {[
                    { label: "MIHAN", val: "↑ 35%", pct: "90%" },
                    { label: "Outer Ring", val: "↑ 28%", pct: "30%" },
                    { label: "Wardha Rd", val: "↑ 32%", pct: "88%" },
                    { label: "Hingna", val: "↑ 22%", pct: "85%" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#5E23DC] rounded-full"
                          style={{ width: row.pct }}
                        />
                      </div>
                      <span className="text-[#22C55E] font-bold text-xs w-12 text-right">
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="relative z-20 -mt-0">
        <div className="max-w-[1120px] mx-auto px-4 md:px-0">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xl mx-0 md:mx-0 my-6 p-4 md:p-6">
            <div className="flex flex-wrap gap-4 items-end">
              {/* Dropdowns */}
              {[
                {
                  label: "PLOT TYPE",
                  val: plotType,
                  set: setPlotType,
                  opts: ["Any", "Residential", "Commercial"],
                },
                {
                  label: "BUDGET",
                  val: budget,
                  set: setBudget,
                  opts: ["Any", "< ₹20 Lac", "₹20–40 Lac", "> ₹40 Lac"],
                },
                {
                  label: "SIZE",
                  val: size,
                  set: setSize,
                  opts: ["Any", "< 1000 sqft", "1000–1500 sqft", "> 1500 sqft"],
                },
                {
                  label: "PREFERRED AREA",
                  val: area,
                  set: setArea,
                  opts: [
                    "All Areas",
                    "MIHAN",
                    "Outer Ring Road",
                    "Wardha Road",
                    "Hingna",
                  ],
                },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col gap-2 flex-1 min-w-[130px]"
                >
                  <label className="text-[#9CA3AF] font-bold text-[10px] uppercase">
                    {f.label}
                  </label>
                  <div className="relative">
                    <select
                      value={f.val}
                      onChange={(e) => f.set(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm text-[#1A1A1A] bg-white appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-[#5E23DC]/30"
                    >
                      {f.opts.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                      ▾
                    </span>
                  </div>
                </div>
              ))}

              {/* Buttons */}
              <div className="flex gap-2 flex-shrink-0">
                <button className="text-[#6B7280] font-bold text-sm px-4 py-3">
                  Reset
                </button>
                <button className="bg-[#5E23DC] text-white font-bold text-base px-6 py-3 rounded-lg hover:bg-[#4a1ab5] transition-colors">
                  Show Plots
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PLOTS ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <h2 className="text-[#151C27] font-semibold text-2xl md:text-[32px] leading-10 tracking-tight">
            Featured & Verified Plots in Nagpur
          </h2>
          <a
            href="#"
            className="text-[#4500B4] font-semibold text-sm flex items-center gap-1 whitespace-nowrap"
          >
            Explore all <span className="text-xs">›</span>
          </a>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-6">
          {PLOT_CARDS.map((c, i) => (
            <PlotCard key={i} card={c} />
          ))}
        </div>
      </section>

      {/* ── BEST AREAS ── */}
      <section className="bg-[#F9F9FF] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-4">
          <div className="flex flex-col items-center gap-4 mb-10 md:mb-16 text-center">
            <span className="bg-[#5E23DC]/10 text-[#5E23DC] font-bold text-[10px] uppercase px-4 py-1.5 rounded-full">
              Investment Growth Corridors
            </span>
            <h2 className="text-[#1A1A1A] font-extrabold text-2xl md:text-[30px] leading-9">
              Best Areas for Buying Plots in Nagpur
            </h2>
            <p className="text-[#6B7280] text-sm md:text-base leading-6 max-w-[640px]">
              High-growth corridors and developing zones offering the best
              appreciation and future infrastructure benefits.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6">
            {AREAS.map((a, i) => (
              <AreaCard key={i} area={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGAL CHECKS ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-12">
          <h2 className="text-[#151C27] font-semibold text-2xl md:text-[32px] leading-10 tracking-tight max-w-[520px]">
            Legal Checks Before Buying a Plot
          </h2>
          <p className="text-[#5F5D69] text-sm md:text-base leading-6 max-w-[768px]">
            Plot transactions carry higher legal risk than flats. At Reparv,
            every plot is verified through multiple legal and planning checks
            before it is listed for sale.
          </p>
        </div>

        {/* 4-column top row */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-6">
          {LEGAL_CHECKS_TOP.map((c, i) => (
            <LegalCheckCard key={i} {...c} />
          ))}
        </div>

        {/* 3-column bottom row */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-8">
          {LEGAL_CHECKS_BOTTOM.map((c, i) => (
            <LegalBottomCard key={i} {...c} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-[#4500B4] text-white font-semibold text-sm px-10 py-4 rounded-xl shadow-lg hover:bg-[#3700a0] transition-colors">
            Request Free Legal Verification
          </button>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-[1248px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <div className="bg-gradient-to-r from-[#5E23DC] to-[#8347FF] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-[500px]">
            <h2 className="text-white font-bold text-2xl leading-8">
              Request Free Legal Verification
            </h2>
            <p className="text-white opacity-90 text-sm leading-5">
              Our legal team verifies every document — title deed, NA order,
              layout approval, encumbrance certificate — before you invest a
              single rupee.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="flex gap-6">
              {[
                { icon: "📞", label: "Talk Now" },
                { icon: "📋", label: "NA Check" },
                { icon: "✅", label: "Legal Team" },
              ].map((it) => (
                <div
                  key={it.label}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                    {it.icon}
                  </div>
                  <span className="text-white font-bold text-[10px] text-center">
                    {it.label}
                  </span>
                </div>
              ))}
            </div>
            <button className="bg-white text-[#5E23DC] font-bold text-base px-8 py-3 rounded-lg shadow-lg hover:bg-purple-50 transition-colors whitespace-nowrap">
              Get Free Verification
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY INVEST ── */}
      <section className="bg-[#3F2D62] py-16 md:py-28">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <h2 className="text-white font-semibold text-2xl md:text-[32px] leading-10 text-center tracking-tight mb-10 md:mb-16">
            Why Invest in Plots in Nagpur?
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6">
            {WHY_INVEST.map((item, i) => (
              <WhyCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERT + FORM ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-16 md:py-20">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          {/* Left */}
          <div className="flex flex-col gap-6 flex-1">
            <h2 className="text-[#151C27] font-semibold text-2xl md:text-[32px] leading-10 tracking-tight">
              Talk to a Plot Investment Expert
            </h2>
            <p className="text-[#5F5D69] text-base md:text-lg leading-7">
              Get personalized advice on which corridors in Nagpur offer the
              best ROI for your specific budget and timeline.
            </p>
            <ul className="flex flex-col gap-4 pt-2">
              {[
                "Corridor appreciation analysis",
                "Legal due diligence guidance",
                "Site visit arrangement",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[#151C27] text-base"
                >
                  <div className="w-5 h-5 rounded-sm bg-[#4500B4] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right form */}
          <div className="flex-1 bg-white border border-[#DCE2F3] rounded-3xl shadow-2xl p-10 w-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#5F5D69] font-semibold text-sm tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="bg-[#F0F3FF] rounded-xl px-6 py-4 text-base text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4500B4]/30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#5F5D69] font-semibold text-sm tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="bg-[#F0F3FF] rounded-xl px-6 py-4 text-base text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4500B4]/30"
                />
              </div>
              <button className="bg-[#4500B4] text-white font-semibold text-sm py-4 rounded-xl shadow-lg hover:bg-[#3700a0] transition-colors">
                Get Plot Options
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section className="px-4 md:px-16 py-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-gradient-to-r from-[#4500B4] to-[#6934E7] rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="flex flex-col gap-6 max-w-[576px] z-10">
              <h2 className="text-white font-bold text-3xl md:text-5xl leading-tight tracking-tight">
                Find the Right Plot with Reparv
              </h2>
              <p className="text-[#CFBFFF] text-sm md:text-lg leading-7">
                Verified layouts • Growth guidance • Safe investment tracking.
                All in one app.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button className="flex items-center gap-2 bg-white text-[#4500B4] font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-purple-50 transition-colors">
                  <span>⬇</span> Download App
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {["A", "B", "C"].map((l, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-purple-300 flex items-center justify-center text-white text-xs font-bold"
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                  <span className="text-white/80 text-sm">
                    1k+ buyers in Nagpur
                  </span>
                </div>
              </div>
            </div>
            {/* Phone mockup placeholder */}
            <div className="hidden md:flex items-center justify-center flex-shrink-0 z-10">
              <div className="w-48 h-80 bg-white/10 border-2 border-white/20 rounded-3xl flex items-center justify-center">
                <span className="text-5xl">📱</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUYER STORIES ── */}
      <section className="bg-[#F9F9FF] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-4">
          <div className="flex flex-col items-center gap-2 mb-10 md:mb-16 text-center">
            <h2 className="text-[#1A1A1A] font-extrabold text-2xl md:text-[30px] leading-9">
              Real Plot Buyer Stories — Nagpur
            </h2>
            <p className="text-[#6B7280] text-sm md:text-base leading-6 max-w-[500px]">
              From first plot to registry complete — stories from real buyers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6">
            {STORIES.map((s, i) => (
              <StoryCard key={i} story={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F0F3FF] py-16 md:py-28">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-16">
            <h2 className="text-[#151C27] font-semibold text-2xl md:text-[32px] leading-10 tracking-tight max-w-[800px]">
              Frequently Asked Questions – Buying Plots in Nagpur
            </h2>
            <p className="text-[#5F5D69] text-sm md:text-base max-w-[700px]">
              Common questions every plot buyer asks before investing in land.
              Clear answers to help you make a safe and confident decision.
            </p>
          </div>
          <div className="flex flex-col gap-4 max-w-[786px] mx-auto">
            {FAQS.map((f, i) => (
              <FaqItem key={i} item={f} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
