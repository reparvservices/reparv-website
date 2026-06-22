"use client";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";

const smallCards = [
  {
    tag: "Family Reflection Video",
    meta: "Joint Family · Nagpur · Renting",
    title: "Different Priorities",
    points: [
      "Parents: safety & stability",
      "Spouse: location & convenience",
      "Buyer: affordability",
    ],
    image: null,
  },
  {
    tag: null,
    meta: "Nuclear Family · Nagpur · IT Sector",
    title: "Overcoming Feature Creep",
    points: [
      'Realized "Must-haves" vs "Nice-to-haves"',
      "Balancing commute with community",
      "Found peace in an older neighbourhood",
    ],
    image: null,
  },
  {
    tag: null,
    meta: "Single Professional · Nagpur",
    title: "Financial Readiness",
    points: [
      "Understanding hidden closing costs",
      'The "Safe" budget vs "Bank" budget',
      "Navigating EMI anxiety",
    ],
    image: "/assets/seoPages/seoPage2/keys.jpg",
  },
];

export default function RealStories() {
  return (
    <section className="bg-white py-14 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 leading-tight mb-3">
              Real First-Time Buyer Stories From Nagpur
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Each story below follows the real emotional and practical journey
              of first-time home buyers—without exaggeration, pressure, or
              promotion.
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-purple-700 font-semibold text-sm whitespace-nowrap mt-1 sm:mt-2 hover:underline">
            Browse by region: Nagpur
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Featured card */}
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-6">
          <div className="md:w-[55%] flex-shrink-0">
            <img
              src="/assets/seoPages/firstTimeBuyer/leftImage.svg"
              alt="Couple reviewing home plans"
              className="w-full h-full min-h-[300px] object-cover"
            />
          </div>
          <div className="flex-1 bg-white p-8 flex flex-col justify-center">
            <div className="flex gap-2 mb-4">
              {["Joint Family", "Renting"].map((t) => (
                <span key={t} className="text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-snug">
              The Path to Multi-Generational Harmony
            </h3>
            <div className="mb-3">
              <span className="text-purple-700 text-xs font-bold tracking-widest uppercase">Clarity Moment</span>
              <p className="text-gray-600 text-sm italic mt-1 leading-relaxed">
                &ldquo;Area comparison aligned expectations across the family. Feeling aligned mattered more than price.&rdquo;
              </p>
            </div>
            <div className="mb-6">
              <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Emotional Stress Phase</span>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                Repeated discussions, delays, and growing self-doubt over six months of searching.
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-purple-700 font-semibold text-sm hover:gap-2.5 transition-all">
              Read Full Family Story <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 small cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {smallCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="relative bg-purple-50 h-44 flex items-center justify-center flex-shrink-0">
                {card.image ? (
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-9 h-9 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9l4-4 4 4 4-5 4 5" />
                  </svg>
                )}
                {card.tag && (
                  <span className="absolute bottom-3 left-3 bg-gray-900/70 text-white text-xs px-2.5 py-1 rounded-full">
                    {card.tag}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-gray-400 text-xs mb-2">{card.meta}</p>
                <h4 className="text-gray-900 font-bold text-lg mb-3 leading-snug">{card.title}</h4>
                <ul className="flex flex-col gap-1 mb-5 flex-1">
                  {card.points.map((pt) => (
                    <li key={pt} className="text-gray-600 text-sm flex gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-1 text-purple-700 font-semibold text-sm hover:gap-2 transition-all">
                  View Journey <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <button className="border-2 border-[#5323DC] text-[#5323DC] hover:bg-purple-50 font-semibold px-10 py-3.5 rounded-xl text-sm transition-colors">
            View More Family Stories
          </button>
        </div>
      </div>
    </section>
  );
}