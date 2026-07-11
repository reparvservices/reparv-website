"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import SeoSectionAd from "../components/seocomponents/common/SeoSectionAd";
import { useAuth } from "../store/auth";
import { openAgentAdvisor } from "../utils/openAgentAdvisor";
import {
  buildPropertiesLink,
  filterPlots,
  formatPlotStatPrice,
  formatPriceLabel,
  formatVerifiedStatValue,
  getPlotLocationLine,
  getPlotTitle,
  getPropertyBadge,
  getPropertyImage,
  mapFaqs,
} from "../utils/plotsForSalePage";

const PAGE_CITY = "Nagpur";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const TRUST_BADGES = ["100% Verified", "NA Approved", "Legal Cleared"];

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

function TrustBadge({ label }) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/30 bg-white/20 text-white text-[10px] font-normal leading-[15px] whitespace-nowrap">
      <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
      {label}
    </span>
  );
}

function PlotCard({ property }) {
  const badge = getPropertyBadge(property);

  return (
    <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
      <Link
        href={`/property-info/${property?.seoSlug}`}
        className="relative rounded-2xl overflow-hidden flex-shrink-0 block"
        style={{ height: "202px" }}
      >
        <img
          src={getPropertyImage(property)}
          alt={getPlotTitle(property)}
          className="w-full h-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/assets/seoPages/plotsForSale/hero.svg";
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 shadow-sm backdrop-blur-sm">
          <span className="text-[#4500B4]" style={{ fontSize: 10 }}>
            📍
          </span>
          <span className="text-[#4500B4] font-bold text-[10px] uppercase tracking-wide">
            {badge.label}
          </span>
        </div>
      </Link>
      <div className="pt-3">
        <h3 className="font-semibold text-[#151C27] text-2xl leading-8">
          {getPlotTitle(property)}
        </h3>
        <p className="flex items-center gap-2 text-[#5F5D69] text-sm font-semibold mt-0.5">
          <span className="text-[#5F5D69]">📍</span>
          {getPlotLocationLine(property)}
        </p>
        <p className="text-[#4500B4] font-bold text-2xl mt-1">
          {formatPriceLabel(property)}
        </p>
        <Link
          href={`/property-info/${property?.seoSlug}`}
          className="inline-block mt-2 text-[#4500B4] font-semibold text-sm hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

function AreaCard({ area }) {
  return (
    <div className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 flex flex-col gap-6 flex-1 min-w-[220px]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-extrabold text-[#1A1A1A] text-lg leading-7">{area.name}</h3>
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
            <p className="text-[#9CA3AF] text-[10px] font-bold uppercase">{area.plotsLabel}</p>
            <p className="text-[#1A1A1A] text-xs font-semibold mt-0.5">{area.plotsVal}</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-black opacity-60 text-sm">•</span>
          <div>
            <p className="text-[#9CA3AF] text-[10px] font-bold uppercase">{area.growthLabel}</p>
            <p className={`${area.growthColor} text-xs font-semibold mt-0.5`}>
              {area.growthVal}
            </p>
          </div>
        </div>
      </div>
      <Link
        href={buildPropertiesLink({ city: PAGE_CITY, area: area.name })}
        className="w-full border border-[#5E23DC] text-[#5E23DC] font-bold text-xs rounded-lg py-2 hover:bg-purple-50 transition-colors text-center"
      >
        View Plots
      </Link>
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
      <h4 className="text-white font-semibold text-2xl text-center mt-2">{item.title}</h4>
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
        {story.gain}
      </p>
      <p className="text-[#6B7280] text-xs leading-5 pb-2">{story.text}</p>
      <div className="border-t border-gray-200 pt-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
          {story.buyer[0]}
        </div>
        <span className="text-yellow-500 text-[10px] tracking-wider">{story.stars}</span>
      </div>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 text-left"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="text-[#151C27] font-semibold text-sm leading-5">{item.q}</span>
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

export default function PlotsForSale({ initialPageData = null, initialFaqs = [] }) {
  const { URI, setShowAlert } = useAuth();
  const pageData = initialPageData;

  const [filters, setFilters] = useState({
    plotType: "Any",
    budget: "Any",
    size: "Any",
    area: "All Areas",
  });
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const plotListings = pageData?.stats?.plotListings || 0;
  const localityCount = pageData?.stats?.localities || 0;
  const minPricePerSqft = pageData?.stats?.minPricePerSqft;
  const allPlots = pageData?.plots || pageData?.featuredPlots || [];
  const popularAreas = pageData?.popularAreas || [];
  const growthCorridors = pageData?.growthCorridors || [];
  const localityOptions = pageData?.localities || [];
  const plotTypeOptions = pageData?.plotTypeOptions || ["Residential", "Commercial"];

  const heroImage = pageData?.heroProperty
    ? getPropertyImage(pageData.heroProperty)
    : "/assets/seoPages/plotsForSale/hero.svg";

  const filteredPlots = useMemo(
    () => filterPlots(allPlots, filters),
    [allPlots, filters],
  );

  const hasActiveFilters =
    filters.plotType !== "Any" ||
    filters.budget !== "Any" ||
    filters.size !== "Any" ||
    filters.area !== "All Areas";

  const displayPlots = hasActiveFilters
    ? filteredPlots
    : (pageData?.featuredPlots || allPlots).slice(0, 8);

  const filterConfig = useMemo(
    () => [
      {
        label: "PLOT TYPE",
        key: "plotType",
        opts: ["Any", ...plotTypeOptions],
      },
      {
        label: "BUDGET",
        key: "budget",
        opts: ["Any", "< ₹20 Lac", "₹20–40 Lac", "> ₹40 Lac"],
      },
      {
        label: "SIZE",
        key: "size",
        opts: ["Any", "< 1000 sqft", "1000–1500 sqft", "> 1500 sqft"],
      },
      {
        label: "PREFERRED AREA",
        key: "area",
        opts: ["All Areas", ...localityOptions],
      },
    ],
    [plotTypeOptions, localityOptions],
  );

  const faqs = useMemo(() => {
    const mapped = mapFaqs(initialFaqs || []);
    if (mapped.length > 0) return mapped;

    return [
      {
        q: "What is NA land and why is it important?",
        a: "NA (Non-Agricultural) land is legally approved for residential or commercial use. Buying non-NA land can cause registration and construction issues.",
      },
      {
        q: "Is layout approval mandatory before buying a plot?",
        a: "Yes. Layout approval confirms the plot is part of a government-sanctioned development with proper roads, utilities, and demarcated boundaries.",
      },
      {
        q: "Can I buy agricultural land and convert it later?",
        a: "Conversion is possible but time-consuming and risky. It is safer to buy already converted NA plots verified by Reparv's legal team.",
      },
      {
        q: "What documents should I verify before booking a plot?",
        a: "Verify title deed, NA order, layout approval, encumbrance certificate, and boundary measurements before making any payment.",
      },
    ];
  }, [initialFaqs]);

  const stories = useMemo(
    () => [
      {
        tag: "Nagpur Plot",
        loc: popularAreas[0]?.name || "Outer Ring Road",
        gain: "Verified NA status before investing",
        text: "Reparv helped me verify NA status and layout approval before investing. The process was transparent and hassle-free.",
        buyer: "Rahul M.",
        stars: "★★★★★",
      },
      {
        tag: "Nagpur Plot",
        loc: popularAreas[1]?.name || "MIHAN",
        gain: "Investment plot with growth potential",
        text: "Reparv's team guided me to a corridor with strong infrastructure growth. Legal verification gave me confidence to proceed.",
        buyer: "Priya S.",
        stars: "★★★★★",
      },
      {
        tag: "Nagpur Plot",
        loc: popularAreas[2]?.name || "Wardha Road",
        gain: "Affordable plot with registry completed",
        text: "Plots offer long-term appreciation with no depreciation, but legal verification is critical. Reparv handled it end to end.",
        buyer: "Amit K.",
        stars: "★★★★★",
      },
    ],
    [popularAreas],
  );

  const handleReset = () => {
    setFilters({
      plotType: "Any",
      budget: "Any",
      size: "Any",
      area: "All Areas",
    });
  };

  const handleShowPlots = () => {
    scrollToSection("featured-plots");
  };

  const handleLegalVerification = () => {
    openAgentAdvisor(`I need free legal verification for a plot in ${PAGE_CITY}.`);
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
          subject: `Plots for Sale - ${PAGE_CITY}`,
          message: `Callback requested from Plots for Sale page. City: ${PAGE_CITY}.`,
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
      console.error("Plot callback form error:", error);
      alert("Server error, please try again later");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sans">
      <section className="bg-gradient-to-b from-[#5E23DC] to-[#8A38F5] pt-7 pb-0 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="flex flex-col md:flex-row md:items-start md:gap-12 relative">
            <div className="flex flex-col gap-6 w-full md:max-w-[55%] relative z-10 pt-16 pb-8 md:py-16">
              <div className="flex flex-wrap gap-3 opacity-90">
                {TRUST_BADGES.map((b) => (
                  <TrustBadge key={b} label={b} />
                ))}
              </div>

              <h1 className="text-white font-extrabold text-4xl md:text-5xl leading-[1.2] md:leading-[60px]">
                Plots for Sale in {PAGE_CITY}
              </h1>

              <p className="text-white opacity-90 text-base md:text-lg leading-7 max-w-[512px]">
                Buy legally clear residential and investment plots in {PAGE_CITY} with full
                documentation support. Browse {plotListings || "verified"} listings across{" "}
                {localityCount || "multiple"} localities.
              </p>

              <div className="flex gap-4 flex-wrap pt-2">
                <button
                  type="button"
                  onClick={handleShowPlots}
                  className="bg-white text-[#5E23DC] font-bold text-base px-8 py-3.5 rounded-lg shadow-lg hover:bg-purple-50 transition-colors"
                >
                  View Plots
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openAgentAdvisor(`I want help finding plots for sale in ${PAGE_CITY}.`)
                  }
                  className="border-2 border-white/50 text-white font-bold text-base px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </button>
              </div>

              <div className="mt-4 md:mt-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 w-fit max-w-[270px]">
                <div className="w-12 h-12 rounded-full bg-[#5E23DC]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#5E23DC] text-xl">✓</span>
                </div>
                <div>
                  <p className="text-[#151C27] font-semibold text-sm leading-5">
                    {formatVerifiedStatValue(plotListings)} Verified Plots
                  </p>
                  <p className="text-[#5F5D69] text-xs leading-4">
                    From {formatPlotStatPrice(minPricePerSqft) || "verified listings"}
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end justify-end flex-1 relative min-h-[420px]">
              <div
                className="rounded-3xl shadow-2xl overflow-hidden"
                style={{
                  width: 320,
                  height: 320,
                  transform: "rotate(3deg)",
                  marginTop: 40,
                }}
              >
                <img
                  src={heroImage}
                  alt={`Plots for sale in ${PAGE_CITY}`}
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/assets/seoPages/plotsForSale/hero.svg";
                  }}
                />
              </div>

              {growthCorridors.length > 0 && (
                <div className="absolute bottom-8 right-0 bg-white rounded-2xl shadow-2xl p-8 w-[360px]">
                  <p className="text-[#9CA3AF] text-[10px] font-bold uppercase mb-4">
                    Top Plot Corridors
                  </p>
                  <div className="flex flex-col gap-5">
                    {growthCorridors.map((row) => (
                      <div key={row.fullName} className="flex items-center gap-3">
                        <span className="text-[#151C27] text-xs font-semibold w-24 truncate">
                          {row.label}
                        </span>
                        <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#5E23DC] rounded-full"
                            style={{ width: row.pct }}
                          />
                        </div>
                        <span className="text-[#22C55E] font-bold text-xs w-16 text-right">
                          {row.listingsLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-0">
        <div className="max-w-[1120px] mx-auto px-4 md:px-0">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-xl mx-0 md:mx-0 my-6 p-4 md:p-6">
            <div className="flex flex-wrap gap-4 items-end">
              {filterConfig.map((f) => (
                <div key={f.key} className="flex flex-col gap-2 flex-1 min-w-[130px]">
                  <label className="text-[#9CA3AF] font-bold text-[10px] uppercase">
                    {f.label}
                  </label>
                  <div className="relative">
                    <select
                      value={filters[f.key]}
                      onChange={(event) =>
                        setFilters({ ...filters, [f.key]: event.target.value })
                      }
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

              <div className="flex gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[#6B7280] font-bold text-sm px-4 py-3"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleShowPlots}
                  className="bg-[#5E23DC] text-white font-bold text-base px-6 py-3 rounded-lg hover:bg-[#4a1ab5] transition-colors"
                >
                  Show Plots
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-plots" className="max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <h2 className="text-[#151C27] font-semibold text-2xl md:text-[32px] leading-10 tracking-tight">
            Featured & Verified Plots in {PAGE_CITY}
          </h2>
          <Link
            href={buildPropertiesLink({ city: PAGE_CITY, plotType: filters.plotType, area: filters.area })}
            className="text-[#4500B4] font-semibold text-sm flex items-center gap-1 whitespace-nowrap"
          >
            Explore all <span className="text-xs">›</span>
          </Link>
        </div>
        {displayPlots.length > 0 ? (
          <div className="flex flex-col sm:flex-row flex-wrap gap-6">
            {displayPlots.slice(0, 8).map((plot) => (
              <PlotCard key={plot.propertyid} property={plot} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
            <p className="text-[#6B7280] mb-4">
              No plots match your filters right now. Try adjusting your search or talk to our expert.
            </p>
            <button
              type="button"
              onClick={() => openAgentAdvisor(`Help me find plots for sale in ${PAGE_CITY}.`)}
              className="bg-[#5E23DC] text-white font-semibold text-sm px-6 py-3 rounded-lg"
            >
              Talk to Expert
            </button>
          </div>
        )}
      </section>

      {popularAreas.length > 0 && (
        <section className="bg-[#F9F9FF] py-16 md:py-24">
          <div className="max-w-[1280px] mx-auto px-4 md:px-4">
            <div className="flex flex-col items-center gap-4 mb-10 md:mb-16 text-center">
              <span className="bg-[#5E23DC]/10 text-[#5E23DC] font-bold text-[10px] uppercase px-4 py-1.5 rounded-full">
                Investment Growth Corridors
              </span>
              <h2 className="text-[#1A1A1A] font-extrabold text-2xl md:text-[30px] leading-9">
                Best Areas for Buying Plots in {PAGE_CITY}
              </h2>
              <p className="text-[#6B7280] text-sm md:text-base leading-6 max-w-[640px]">
                High-growth corridors and developing zones offering the best appreciation and future
                infrastructure benefits.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-6">
              {popularAreas.map((area) => (
                <AreaCard key={area.name} area={area} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-12">
          <h2 className="text-[#151C27] font-semibold text-2xl md:text-[32px] leading-10 tracking-tight max-w-[520px]">
            Legal Checks Before Buying a Plot
          </h2>
          <p className="text-[#5F5D69] text-sm md:text-base leading-6 max-w-[768px]">
            Plot transactions carry higher legal risk than flats. At Reparv, every plot is verified
            through multiple legal and planning checks before it is listed for sale.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-6">
          {LEGAL_CHECKS_TOP.map((c) => (
            <LegalCheckCard key={c.title} {...c} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-8">
          {LEGAL_CHECKS_BOTTOM.map((c) => (
            <LegalBottomCard key={c.title} {...c} />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleLegalVerification}
            className="bg-[#4500B4] text-white font-semibold text-sm px-10 py-4 rounded-xl shadow-lg hover:bg-[#3700a0] transition-colors"
          >
            Request Free Legal Verification
          </button>
        </div>
      </section>

      <SeoSectionAd />

      <section className="max-w-[1248px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <div className="bg-gradient-to-r from-[#5E23DC] to-[#8347FF] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-[500px]">
            <h2 className="text-white font-bold text-2xl leading-8">
              Request Free Legal Verification
            </h2>
            <p className="text-white opacity-90 text-sm leading-5">
              Our legal team verifies every document — title deed, NA order, layout approval,
              encumbrance certificate — before you invest a single rupee.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="flex gap-6">
              {[
                { icon: "📞", label: "Talk Now" },
                { icon: "📋", label: "NA Check" },
                { icon: "✅", label: "Legal Team" },
              ].map((it) => (
                <div key={it.label} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                    {it.icon}
                  </div>
                  <span className="text-white font-bold text-[10px] text-center">{it.label}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleLegalVerification}
              className="bg-white text-[#5E23DC] font-bold text-base px-8 py-3 rounded-lg shadow-lg hover:bg-purple-50 transition-colors whitespace-nowrap"
            >
              Get Free Verification
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#3F2D62] py-16 md:py-28">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <h2 className="text-white font-semibold text-2xl md:text-[32px] leading-10 text-center tracking-tight mb-10 md:mb-16">
            Why Invest in Plots in {PAGE_CITY}?
          </h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6">
            {WHY_INVEST.map((item) => (
              <WhyCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <SeoSectionAd variant="seoInFeed" />

      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-16 md:py-20">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          <div className="flex flex-col gap-6 flex-1">
            <h2 className="text-[#151C27] font-semibold text-2xl md:text-[32px] leading-10 tracking-tight">
              Talk to a Plot Investment Expert
            </h2>
            <p className="text-[#5F5D69] text-base md:text-lg leading-7">
              Get personalized advice on which corridors in {PAGE_CITY} offer the best ROI for your
              specific budget and timeline.
            </p>
            <ul className="flex flex-col gap-4 pt-2">
              {[
                "Corridor appreciation analysis",
                "Legal due diligence guidance",
                "Site visit arrangement",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#151C27] text-base">
                  <div className="w-5 h-5 rounded-sm bg-[#4500B4] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 bg-white border border-[#DCE2F3] rounded-3xl shadow-2xl p-10 w-full">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-[#5F5D69] font-semibold text-sm tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="bg-[#F0F3FF] rounded-xl px-6 py-4 text-base text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4500B4]/30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#5F5D69] font-semibold text-sm tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className="bg-[#F0F3FF] rounded-xl px-6 py-4 text-base text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#4500B4]/30"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#4500B4] text-white font-semibold text-sm py-4 rounded-xl shadow-lg hover:bg-[#3700a0] transition-colors disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Get Plot Options"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-16 py-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-gradient-to-r from-[#4500B4] to-[#6934E7] rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="flex flex-col gap-6 max-w-[576px] z-10">
              <h2 className="text-white font-bold text-3xl md:text-5xl leading-tight tracking-tight">
                Find the Right Plot with Reparv
              </h2>
              <p className="text-[#CFBFFF] text-sm md:text-lg leading-7">
                Verified layouts • Growth guidance • Safe investment tracking. All in one app.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  href={buildPropertiesLink({ city: PAGE_CITY })}
                  className="flex items-center gap-2 bg-white text-[#4500B4] font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-purple-50 transition-colors"
                >
                  <span>⬇</span> Browse Plots
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {["A", "B", "C"].map((l) => (
                      <div
                        key={l}
                        className="w-10 h-10 rounded-full border-2 border-white bg-purple-300 flex items-center justify-center text-white text-xs font-bold"
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                  <span className="text-white/80 text-sm">
                    {formatVerifiedStatValue(plotListings)} plots in {PAGE_CITY}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center flex-shrink-0 z-10">
              <img
                src="/assets/seoPages/plotsForSale/hero.svg"
                alt="Reparv plots app"
                className="w-48 h-48 object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      <SeoSectionAd />

      <section className="bg-[#F9F9FF] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-4">
          <div className="flex flex-col items-center gap-2 mb-10 md:mb-16 text-center">
            <h2 className="text-[#1A1A1A] font-extrabold text-2xl md:text-[30px] leading-9">
              Real Plot Buyer Stories — {PAGE_CITY}
            </h2>
            <p className="text-[#6B7280] text-sm md:text-base leading-6 max-w-[500px]">
              From first plot to registry complete — stories from real buyers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6">
            {stories.map((s) => (
              <StoryCard key={s.buyer} story={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F0F3FF] py-16 md:py-28">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-16">
            <h2 className="text-[#151C27] font-semibold text-2xl md:text-[32px] leading-10 tracking-tight max-w-[800px]">
              Frequently Asked Questions – Buying Plots in {PAGE_CITY}
            </h2>
            <p className="text-[#5F5D69] text-sm md:text-base max-w-[700px]">
              Common questions every plot buyer asks before investing in land. Clear answers to help
              you make a safe and confident decision.
            </p>
          </div>
          <div className="flex flex-col gap-4 max-w-[786px] mx-auto">
            {faqs.map((f) => (
              <FaqItem key={f.q} item={f} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
