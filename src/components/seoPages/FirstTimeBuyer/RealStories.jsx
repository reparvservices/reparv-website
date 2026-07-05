"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  buildStarterPropertiesLink,
  formatVerifiedStatValue,
  getStoryImage,
} from "@/utils/firstTimeBuyerPage";

const PAGE_CITY = "Nagpur";

const FALLBACK_FEATURED = {
  tags: ["Joint Family", "Renting"],
  title: "The Path to Multi-Generational Harmony",
  clarityMoment:
    "Area comparison aligned expectations across the family. Feeling aligned mattered more than price.",
  stressPhase:
    "Repeated discussions, delays, and growing self-doubt over six months of searching.",
  href: "/properties?city=Nagpur",
};

const FALLBACK_STORIES = [
  {
    meta: "Nuclear Family · Nagpur · IT Sector",
    title: "Overcoming Feature Creep",
    points: [
      'Realized "Must-haves" vs "Nice-to-haves"',
      "Balancing commute with community",
      "Found peace in an older neighbourhood",
    ],
    href: "/properties?city=Nagpur",
  },
  {
    meta: "Single Professional · Nagpur",
    title: "Financial Readiness",
    points: [
      "Understanding hidden closing costs",
      'The "Safe" budget vs "Bank" budget',
      "Navigating EMI anxiety",
    ],
    href: "/emi-calculator",
  },
];

export default function RealStories({ pageData = null }) {
  const featured = pageData?.featuredStory || FALLBACK_FEATURED;
  const stories = pageData?.stories?.length ? pageData.stories : FALLBACK_STORIES;
  const affordableHomes = pageData?.stats?.affordableHomes || 0;
  const featuredImage = getStoryImage(featured);

  return (
    <section id="buyer-stories" className="bg-white py-14 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 leading-tight mb-3">
              Real First-Time Buyer Stories From {PAGE_CITY}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Each story below follows the real emotional and practical journey
              of first-time home buyers — grounded in actual {PAGE_CITY} localities
              {affordableHomes
                ? ` and ${formatVerifiedStatValue(affordableHomes)} starter listings`
                : ""}.
            </p>
          </div>
          <Link
            href={buildStarterPropertiesLink(PAGE_CITY)}
            className="flex items-center gap-1.5 text-purple-700 font-semibold text-sm whitespace-nowrap mt-1 sm:mt-2 hover:underline"
          >
            Browse starter homes in {PAGE_CITY}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-6">
          <div className="md:w-[55%] flex-shrink-0">
            <img
              src={featuredImage}
              alt={featured.title}
              className="w-full h-full min-h-[300px] object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/assets/seoPages/firstTimeBuyer/leftImage.svg";
              }}
            />
          </div>
          <div className="flex-1 bg-white p-8 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {(featured.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
              {featured.location ? (
                <span className="text-xs text-purple-700 border border-purple-100 rounded-full px-3 py-1">
                  {featured.location}
                </span>
              ) : null}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-snug">
              {featured.title}
            </h3>
            <div className="mb-3">
              <span className="text-purple-700 text-xs font-bold tracking-widest uppercase">
                Clarity Moment
              </span>
              <p className="text-gray-600 text-sm italic mt-1 leading-relaxed">
                &ldquo;{featured.clarityMoment}&rdquo;
              </p>
            </div>
            <div className="mb-6">
              <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
                Emotional Stress Phase
              </span>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {featured.stressPhase}
              </p>
            </div>
            {featured.priceRange ? (
              <p className="mb-4 text-sm font-semibold text-[#5323DC]">
                Starter range in this journey: {featured.priceRange}
              </p>
            ) : null}
            <Link
              href={featured.href || buildStarterPropertiesLink(PAGE_CITY)}
              className="flex items-center gap-1.5 text-purple-700 font-semibold text-sm hover:gap-2.5 transition-all w-fit"
            >
              Explore Similar Homes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {stories.map((story) => (
            <div
              key={story.title}
              className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative bg-purple-50 h-44 flex-shrink-0 overflow-hidden">
                <img
                  src={getStoryImage(story)}
                  alt={story.title}
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/assets/seoPages/seoPage2/keys.jpg";
                  }}
                />
                {story.tag ? (
                  <span className="absolute bottom-3 left-3 bg-gray-900/70 text-white text-xs px-2.5 py-1 rounded-full">
                    {story.tag}
                  </span>
                ) : null}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-gray-400 text-xs mb-2">{story.meta}</p>
                <h4 className="text-gray-900 font-bold text-lg mb-3 leading-snug">
                  {story.title}
                </h4>
                <ul className="flex flex-col gap-1 mb-5 flex-1">
                  {(story.points || []).map((point) => (
                    <li key={point} className="text-gray-600 text-sm flex gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                {story.priceRange ? (
                  <p className="text-xs font-semibold text-[#5323DC] mb-3">
                    From {story.priceRange}
                  </p>
                ) : null}
                <Link
                  href={story.href || buildStarterPropertiesLink(PAGE_CITY)}
                  className="flex items-center gap-1 text-purple-700 font-semibold text-sm hover:gap-2 transition-all w-fit"
                >
                  View Journey <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/family-decision-stories"
            className="border-2 border-[#5323DC] text-[#5323DC] hover:bg-purple-50 font-semibold px-10 py-3.5 rounded-xl text-sm transition-colors"
          >
            View More Family Stories
          </Link>
          <Link
            href="/budget-to-dream-home"
            className="bg-[#5323DC] hover:bg-purple-800 text-white font-semibold px-10 py-3.5 rounded-xl text-sm transition-colors"
          >
            Budget to Dream Home Guide
          </Link>
        </div>
      </div>
    </section>
  );
}
