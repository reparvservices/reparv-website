"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { openAgentAdvisor } from "@/utils/openAgentAdvisor";
import {
  applyFamilyStoryOverrides,
  buildFamilyPropertiesLink,
  formatBudgetRange,
  formatVerifiedStatValue,
  getHeroImage,
  getStoryImage,
  mapFaqs,
} from "@/utils/familyDecisionStoriesPage";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const AlarmIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2 2" />
    <path d="M5 3L2 6M22 6l-3-3" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChatIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ShieldSmIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const GridIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ pageData }) {
  const city = pageData?.city || "Nagpur";
  const stats = pageData?.stats || {};
  const heroImage = getHeroImage(pageData);
  const budgetLabel = formatBudgetRange(stats.minPrice, stats.maxPrice);

  return (
    <section className="bg-white px-5 pt-10 pb-12 lg:px-6 lg:py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[rgba(228,224,239,0.5)] border border-[rgba(69,0,180,0.1)] rounded-full px-3 py-1 mb-6">
            <span className="text-[#4500B4]">
              <ShieldIcon />
            </span>
            <span className="text-[11px] font-medium tracking-[0.06em] uppercase text-[#4500B4]">
              {stats.familyHomes
                ? `${formatVerifiedStatValue(stats.familyHomes)} Family Homes in ${city}`
                : "Based on Real Family Experiences"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-manrope font-semibold text-[36px] leading-[45px] tracking-[-0.02em] text-[#5E23DC] mb-5 lg:text-[52px] lg:leading-[1.15]">
            Family Decision Stories –{" "}
            <span className="lg:block">How Families Aligned</span>{" "}
            <span className="lg:block">Before Buying a Home</span>
          </h1>

          {/* Body */}
          <p className="font-jakarta text-[18px] leading-7 text-[#5F5D69] max-w-lg">
            Real stories of {city} families navigating different opinions,
            emotional pressure, and priorities — across{" "}
            {stats.localities ? `${stats.localities}+ localities` : "many areas"}{" "}
            and {budgetLabel} — before reaching a decision everyone felt
            confident about.
          </p>
        </div>

        {/* Hero Image — desktop only */}
        <div className="hidden lg:block rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(94,35,220,0.04)]">
          <img
            src={heroImage}
            alt={`Family-friendly homes in ${city}`}
            className="w-full h-[380px] object-cover rounded-2xl"
          />
        </div>

        {/* Hero Image — mobile (shown below text, matching Figma) */}
        <div className="block lg:hidden rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(94,35,220,0.04)]">
          <img
            src={heroImage}
            alt={`Family-friendly homes in ${city}`}
            className="w-full h-[262px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// ─── WhyHard ──────────────────────────────────────────────────────────────────

function WhyHard() {
  return (
    <section className="bg-[#FFF] px-5 py-16 lg:px-6 lg:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <h2 className="font-manrope font-semibold text-[32px] leading-10 tracking-[-0.32px] text-[#5E23DC] mb-4 lg:text-center lg:text-[38px] lg:max-w-xl lg:mx-auto lg:mb-4">
          Why Family Decisions Feel Hard
        </h2>

        {/* Cards */}
        <div className="flex flex-col gap-4 mt-8 lg:grid lg:grid-cols-3 lg:gap-5">
          {/* Card 1 — lavender */}
          <div className="bg-[#F4F0FF] border border-[#E4E0EF] rounded-2xl p-8 flex flex-col shadow-[0_10px_30px_rgba(94,35,220,0.04)]">
            <div className="w-10 h-10 rounded-xl bg-[rgba(94,35,220,0.1)] flex items-center justify-center text-[#4500B4] mb-4">
              <EyeIcon />
            </div>
            <p className="font-jakarta text-[16px] leading-6 text-[#151C27]">
              Parents, spouses, and children often look at the same home through
              very different lenses — safety, location, budget, schools, or
              long-term stability.
            </p>
          </div>

          {/* Card 2 — white */}
          <div className="bg-white border border-[#E4E0EF] rounded-2xl p-8 flex flex-col shadow-[0_10px_30px_rgba(94,35,220,0.04)]">
            <div className="w-10 h-10 rounded-xl bg-[rgba(94,35,220,0.1)] flex items-center justify-center text-[#4500B4] mb-4">
              <AlarmIcon />
            </div>
            <p className="font-jakarta text-[16px] leading-6 text-[#151C27]">
              Because of this, most delays and stress in family home buying are
              caused by misalignment of expectations, not a lack of money or
              options.
            </p>
          </div>

          {/* Card 3 — deep violet quote */}
          <div className="bg-[#4500B4] rounded-2xl p-8 flex flex-col shadow-[0_10px_30px_rgba(94,35,220,0.04)]">
            <div
              className="w-6 h-[18px] bg-white mb-4"
              style={{ clipPath: "polygon(0 0,100% 0,100% 100%,0 80%)" }}
            >
              {/* quote icon placeholder */}
            </div>
            <p className="font-manrope font-medium text-[24px] leading-8 text-white">
              "Every family you'll read about here faced the same disagreements,
              pauses, and emotional pressure."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WhereDifferent ───────────────────────────────────────────────────────────

const conflicts = [
  {
    title: "Parents vs Budget",
    desc: "Safety and long-term security often clash with what the budget actually allows, creating repeated family standoffs.",
    icon: <EyeIcon />,
  },
  {
    title: "Kids' Schools vs Location",
    desc: "The school zone the children need is rarely the locality the commute or lifestyle priorities point toward.",
    icon: <AlarmIcon />,
  },
  {
    title: "Spouse Lifestyle vs Commute",
    desc: "Daily comfort preferences often conflict with the distance and time required to reach the workplace.",
    icon: <ShieldSmIcon />,
  },
  {
    title: "Safety vs Price",
    desc: "The safest neighbourhoods often carry a premium that pushes beyond what the family had planned to spend.",
    icon: <PinIcon />,
  },
];

function WhereDifferent() {
  return (
    <section className="bg-white md:bg-[#F0F3FF] px-5 pt-1 pb-16 lg:px-6 lg:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading block */}
        <div className="mb-10">
          <h2 className="font-manrope font-semibold text-[32px] leading-10 tracking-[-0.32px] text-[#4500B4] mb-4 lg:text-center lg:text-[38px]">
            Where Families Often See Things Differently
          </h2>
          <p className="font-jakarta text-[16px] leading-6 text-[#5F5D69] lg:text-center lg:max-w-xl lg:mx-auto">
            These are the most common points where families feel stuck or
            divided while deciding on a home.
          </p>
        </div>

        {/* Cards grid */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:gap-5">
          {conflicts.map((item) => (
            <div
              key={item.title}
              className="md:bg-white bg-[#5E23DC1A] border border-[#E4E0EF] rounded-xl p-6 flex flex-col gap-3 transition-all duration-200 hover:border-[#C4B0FF] hover:shadow-[0_4px_20px_rgba(69,0,180,0.08)]"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(94,35,220,0.1)] flex items-center justify-center text-[#4500B4]">
                {item.icon}
              </div>
              <h4 className="font-manrope font-normal text-[20px] leading-6 text-gray-900 md:text-[#4500B4]">
                {item.title}
              </h4>
              <p className="font-jakarta text-[16px] leading-6 text-[#5F5D69]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SVG Scenes ───────────────────────────────────────────────────────────────

function AgnihotriScene() {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <rect width="600" height="400" fill="#E8E0D4" />
      <rect x="310" y="0" width="290" height="260" fill="#B8D4E8" />
      <rect
        x="310"
        y="0"
        width="144"
        height="126"
        fill="#C8E0F4"
        opacity="0.9"
      />
      <rect
        x="458"
        y="0"
        width="142"
        height="126"
        fill="#C8E0F4"
        opacity="0.9"
      />
      <rect
        x="310"
        y="130"
        width="144"
        height="126"
        fill="#C8E0F4"
        opacity="0.85"
      />
      <rect
        x="458"
        y="130"
        width="142"
        height="126"
        fill="#C8E0F4"
        opacity="0.85"
      />
      <rect x="452" y="0" width="6" height="260" fill="#D8CABA" />
      <rect x="310" y="126" width="290" height="6" fill="#D8CABA" />
      <rect x="305" y="258" width="295" height="10" rx="2" fill="#C8B898" />
      <ellipse cx="370" cy="40" rx="55" ry="42" fill="#5A9E50" opacity="0.55" />
      <ellipse cx="430" cy="20" rx="48" ry="38" fill="#4E8E44" opacity="0.5" />
      <ellipse cx="500" cy="50" rx="42" ry="35" fill="#60A856" opacity="0.45" />
      <path
        d="M310 0 C295 40 300 120 308 200 L310 260 L280 260 L270 0 Z"
        fill="#4A8A8A"
        opacity="0.75"
      />
      <path
        d="M600 0 C615 40 610 120 602 200 L600 260 L620 260 L630 0 Z"
        fill="#4A8A8A"
        opacity="0.65"
      />
      <rect x="230" y="20" width="64" height="80" rx="5" fill="#D4C5A8" />
      <rect
        x="234"
        y="24"
        width="56"
        height="72"
        rx="3"
        fill="#C89870"
        opacity="0.5"
      />
      <ellipse cx="262" cy="55" rx="18" ry="22" fill="#E8A87C" opacity="0.6" />
      <rect
        x="0"
        y="310"
        width="600"
        height="90"
        fill="#D4C4A0"
        opacity="0.6"
      />
      <ellipse
        cx="290"
        cy="318"
        rx="240"
        ry="32"
        fill="#A07848"
        opacity="0.7"
      />
      <rect
        x="55"
        y="308"
        width="475"
        height="22"
        rx="4"
        fill="#B88850"
        opacity="0.75"
      />
      <rect
        x="200"
        y="290"
        width="26"
        height="22"
        rx="5"
        fill="#F5F0E8"
        opacity="0.95"
      />
      <path
        d="M226 296 Q234 300 226 308"
        stroke="#D4C8B0"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="300"
        y="288"
        width="26"
        height="22"
        rx="5"
        fill="#F5F0E8"
        opacity="0.9"
      />
      <path d="M328 234 Q110 245 148 230 L155 380 H65 Z" fill="#D4502A" />
      <path d="M72 230 Q110 245 148 230 L155 380 H65 Z" fill="#D4502A" />
      <path
        d="M72 235 Q55 270 60 320 Q65 340 72 360"
        stroke="#4A9090"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <rect x="100" y="192" width="20" height="24" rx="5" fill="#C8906A" />
      <circle cx="110" cy="175" r="34" fill="#C8906A" />
      <path
        d="M80 158 Q110 138 140 158 Q138 135 110 128 Q82 135 80 158Z"
        fill="#1A0E06"
      />
      <circle cx="130" cy="138" r="8" fill="#2A1A0A" />
      <circle cx="78" cy="178" r="4" fill="#D4A030" opacity="0.9" />
      <path
        d="M90 200 Q110 210 130 200"
        stroke="#D4A030"
        strokeWidth="3"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M98 183 Q110 190 122 183"
        stroke="#8B5A32"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <circle cx="103" cy="173" r="2.5" fill="#6B3820" opacity="0.5" />
      <circle cx="118" cy="172" r="2.5" fill="#6B3820" opacity="0.5" />
      <rect x="228" y="218" width="80" height="162" rx="10" fill="#3A7898" />
      <rect x="254" y="190" width="20" height="26" rx="5" fill="#B87858" />
      <circle cx="264" cy="168" r="38" fill="#C08060" />
      <path
        d="M228 155 Q264 130 300 155 Q298 128 264 118 Q230 128 228 155Z"
        fill="#1A0E06"
      />
      <path
        d="M240 190 Q264 202 288 190 Q286 200 264 206 Q242 200 240 190Z"
        fill="#2A1608"
        opacity="0.65"
      />
      <path
        d="M248 178 Q264 186 280 178"
        stroke="#8B5030"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <circle cx="252" cy="168" r="3" fill="#5A3018" opacity="0.55" />
      <circle cx="276" cy="167" r="3" fill="#5A3018" opacity="0.55" />
      <rect x="368" y="248" width="58" height="132" rx="8" fill="#D4A030" />
      <rect x="384" y="222" width="16" height="22" rx="4" fill="#C8906A" />
      <circle cx="392" cy="205" r="28" fill="#D09870" />
      <path
        d="M366 194 Q392 176 418 194 Q416 174 392 166 Q368 174 366 194Z"
        fill="#1A0E06"
      />
      <path
        d="M381 212 Q392 219 403 212"
        stroke="#8B5832"
        strokeWidth="1.5"
        fill="none"
        opacity="0.65"
      />
      <circle cx="384" cy="204" r="2.5" fill="#5A3820" opacity="0.55" />
      <circle cx="400" cy="203" r="2.5" fill="#5A3820" opacity="0.55" />
    </svg>
  );
}

function SharmaScene() {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <rect width="600" height="400" fill="#D8E0E8" />
      <rect
        x="60"
        y="0"
        width="380"
        height="340"
        fill="#A8C8E0"
        opacity="0.6"
      />
      <rect
        x="60"
        y="0"
        width="380"
        height="180"
        fill="#B8D8F0"
        opacity="0.75"
      />
      <rect
        x="60"
        y="180"
        width="380"
        height="160"
        fill="#A0C0D8"
        opacity="0.6"
      />
      <rect
        x="70"
        y="180"
        width="28"
        height="155"
        rx="2"
        fill="#8090A8"
        opacity="0.55"
      />
      <rect
        x="104"
        y="145"
        width="38"
        height="190"
        rx="2"
        fill="#7080A0"
        opacity="0.5"
      />
      <rect
        x="148"
        y="165"
        width="32"
        height="170"
        rx="2"
        fill="#8090A8"
        opacity="0.5"
      />
      <rect
        x="186"
        y="120"
        width="44"
        height="215"
        rx="2"
        fill="#6878A0"
        opacity="0.55"
      />
      <rect
        x="236"
        y="148"
        width="36"
        height="188"
        rx="2"
        fill="#7888A8"
        opacity="0.5"
      />
      <rect
        x="278"
        y="170"
        width="50"
        height="166"
        rx="2"
        fill="#8090A8"
        opacity="0.45"
      />
      <rect
        x="334"
        y="192"
        width="40"
        height="144"
        rx="2"
        fill="#7888A0"
        opacity="0.45"
      />
      <rect x="56" y="0" width="6" height="340" fill="#C8D4DC" />
      <rect x="438" y="0" width="6" height="340" fill="#C8D4DC" />
      <rect x="246" y="0" width="5" height="340" fill="#C8D4DC" opacity="0.7" />
      <rect
        x="60"
        y="168"
        width="384"
        height="5"
        fill="#C8D4DC"
        opacity="0.6"
      />
      <rect
        x="0"
        y="338"
        width="600"
        height="62"
        fill="#C8B898"
        opacity="0.55"
      />
      <rect x="218" y="240" width="72" height="160" rx="10" fill="#607890" />
      <path
        d="M218 260 Q195 290 198 320"
        stroke="#607890"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="240" y="210" width="20" height="28" rx="5" fill="#C09070" />
      <circle cx="250" cy="188" r="36" fill="#C08868" />
      <path
        d="M216 176 Q250 152 284 176 Q282 150 250 140 Q218 150 216 176Z"
        fill="#1A0E06"
      />
      <path
        d="M228 200 Q250 210 272 200 Q270 208 250 213 Q230 208 228 200Z"
        fill="#2A1608"
        opacity="0.5"
      />
      <path
        d="M235 196 Q250 204 265 196"
        stroke="#8B5030"
        strokeWidth="1.5"
        fill="none"
        opacity="0.65"
      />
      <circle cx="238" cy="186" r="3" fill="#5A3018" opacity="0.5" />
      <circle cx="262" cy="185" r="3" fill="#5A3018" opacity="0.5" />
      <rect x="304" y="280" width="52" height="120" rx="8" fill="#D07030" />
      <path
        d="M290 268 Q308 272 312 282"
        stroke="#607890"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="316" y="254" width="16" height="22" rx="4" fill="#D09870" />
      <circle cx="324" cy="236" r="26" fill="#D09870" />
      <path
        d="M300 225 Q324 208 348 225 Q346 206 324 198 Q302 206 300 225Z"
        fill="#1A0E06"
      />
      <path
        d="M313 243 Q324 250 335 243"
        stroke="#8B5832"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <circle cx="315" cy="234" r="2.5" fill="#5A3820" opacity="0.5" />
      <circle cx="333" cy="233" r="2.5" fill="#5A3820" opacity="0.5" />
    </svg>
  );
}

// ─── FamilyStories ────────────────────────────────────────────────────────────

const FALLBACK_STORIES = [
  {
    seed: 0,
    meta: ["Joint Family", "Nagpur", "Renting"],
    title: "The Family Alignment Journey in Nagpur",
    location: "Nagpur",
    videoLabel: "Family Reflection",
    videoDuration: "2:45",
    videoCaption: "Optional short reflection from the family.",
    priorities: [
      "Parents: safety & stability",
      "Spouse: location & convenience",
      "Buyer: affordability",
    ],
    stressPhase: "Repeated discussions, delays, and growing self-doubt.",
    clarityMoment: "Area comparison aligned expectations across the family.",
    clarityOutcome: "Feeling aligned mattered more than price.",
    gradientFrom: "#C8DDEF",
    gradientTo: "#D8E8F4",
    href: "/blog/joint-family-renting-besa-nagpur",
  },
  {
    seed: 1,
    meta: ["Nuclear Family", "Nagpur", "Buying"],
    title: "Finding Shared Priorities in Nagpur",
    location: "Nagpur",
    videoLabel: "Watch Reflection",
    videoDuration: "3:12",
    videoCaption: "Navigating the perfect-home search together.",
    priorities: [
      "Parents: closeness to schools",
      "Spouse: daily commute & lifestyle",
      "Buyer: long-term value",
    ],
    stressPhase: "Conflict over location vs amenities led to a long pause.",
    clarityMoment:
      "Structured guidance helped prioritize needs over wish-list features.",
    clarityOutcome: "We realized joy at home mattered more than square footage.",
    gradientFrom: "#C8D8E8",
    gradientTo: "#D4E0EC",
    href: "/blog/finding-shared-priorities-in-manish-nagar-a-nuclear-familys-home-buying-story",
  },
  {
    seed: 2,
    meta: ["Growing Family", "Manewada", "Planning"],
    title: "Balancing Safety and Budget in Manewada",
    location: "Manewada",
    videoLabel: "Planning Story",
    videoDuration: "2:58",
    videoCaption: "How one family compared communities before deciding.",
    priorities: [
      "Safe neighbourhood for children",
      "Affordable monthly EMI",
      "Room to grow over 5 years",
    ],
    stressPhase:
      "Conflicting expectations from relatives added emotional pressure.",
    clarityMoment:
      "Comparing three localities side-by-side removed guesswork for everyone.",
    clarityOutcome:
      "A balanced choice emerged that the whole family supported.",
    gradientFrom: "#D8E0F0",
    gradientTo: "#E8ECF7",
    href: "/blog/growing-family-planning-manewada",
  },
];

function StoryCard({ story, reverse }) {
  const Scene = story.seed % 2 === 0 ? AgnihotriScene : SharmaScene;
  const storyImage = getStoryImage(story);
  const storyHref =
    story.href ||
    (story.propertySlug
      ? `/property-info/${story.propertySlug}`
      : buildFamilyPropertiesLink(story.location || "Nagpur", story.location));

  const imagePanel = (
    <div className="flex flex-col gap-3">
      {/* Scene container */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
        style={{
          aspectRatio: "16/10",
          background: storyImage.includes("hero.svg")
            ? `linear-gradient(135deg, ${story.gradientFrom} 0%, ${story.gradientTo} 100%)`
            : "#E8E4F4",
        }}
      >
        {storyImage.includes("hero.svg") ? (
          <Scene />
        ) : (
          <img
            src={storyImage}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Play button */}
        <Link
          href={storyHref}
          aria-label={`Explore homes in ${story.location || "Nagpur"}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 border-none cursor-pointer flex items-center justify-center pl-1 text-[#4500B4] shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:scale-110 hover:bg-white z-10"
        >
          <PlayIcon />
        </Link>

        {/* Bottom badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 text-[12px] font-semibold text-white z-10 tracking-[0.01em]">
          {story.priceRange
            ? `${story.priceRange} • ${story.location || "Nagpur"}`
            : `${story.videoLabel} • ${story.videoDuration}`}
        </div>
      </div>

      {/* Caption */}
      {story.videoCaption && (
        <p className="font-jakarta text-[12px] text-slate-400 text-center tracking-[0.01em]">
          {story.videoCaption}
        </p>
      )}
    </div>
  );

  const contentPanel = (
    <div className="flex flex-col gap-0 py-2">
      {/* Meta tags */}
      <div className="flex flex-wrap items-center gap-0 mb-3">
        {story.meta.map((m, i) => (
          <span
            key={m}
            className="font-jakarta text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-400"
          >
            {i > 0 && <span className="mx-1.5 opacity-50">·</span>}
            {m}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-manrope font-semibold text-[24px] leading-8 text-[#4500B4] mb-6 tracking-[-0.01em] lg:text-[34px] lg:leading-[1.15]">
        {story.title}
      </h3>

      {/* Content block (mobile card wrapper) */}
      <div className="bg-[#F9F9FF] rounded-2xl p-6 flex flex-col gap-6 shadow-[0_10px_30px_rgba(94,35,220,0.04)] lg:bg-transparent lg:p-0 lg:shadow-none lg:rounded-none">
        {/* Different Priorities */}
        <div>
          <p className="font-jakarta text-[14px] font-bold uppercase tracking-[0.07em] text-[#151C27] mb-2.5 lg:text-[#4500B4]">
            Different Priorities
          </p>
          <ul className="flex flex-col gap-1 list-none p-0 m-0">
            {story.priorities.map((p) => (
              <li
                key={p}
                className="font-jakarta text-[16px] leading-6 text-[#5F5D69] pl-3.5 relative"
              >
                <span className="absolute left-0 text-[#C4B0FF] font-bold">
                  –
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Emotional Stress Phase */}
        <div>
          <p className="font-jakarta text-[14px] font-bold uppercase tracking-[0.07em] text-[#151C27] mb-2 lg:text-[#4500B4]">
            Emotional Stress Phase
          </p>
          <p className="font-jakarta text-[16px] leading-6 text-[#5F5D69] m-0">
            {story.stressPhase}
          </p>
        </div>

        {/* Clarity Moment */}
        <div className="border-l-2 border-[#4500B4] bg-[rgba(228,224,239,0.3)] rounded-r-xl px-4 py-4">
          <p className="font-jakarta text-[14px] font-bold uppercase tracking-[0.07em] text-[#4500B4] mb-2">
            Clarity Moment
          </p>
          <p className="font-jakarta text-[16px] leading-6 text-[#5F5D69] italic m-0">
            {story.clarityMoment}
          </p>
          <p className="font-jakarta text-[16px] leading-6 text-[#151C27] font-semibold mt-2 m-0">
            "{story.clarityOutcome}"
          </p>
        </div>
      </div>

      {/* CTA link */}
      <Link
        href={storyHref}
        className="inline-flex items-center gap-1.5 font-jakarta text-[16px] font-bold text-[#4500B4] no-underline mt-6 group"
      >
        {storyHref?.startsWith("/blog/") ? "View Family Story" : "View Family Home"}
        <span className="transition-transform duration-200 group-hover:translate-x-1 flex">
          <ArrowIcon />
        </span>
      </Link>
    </div>
  );

  return (
    <article className="mb-0">
      {/* Mobile: always image-first stacked; Desktop: alternating two-column */}
      <div
        className={`
          grid grid-cols-1 gap-6
          lg:grid-cols-2 lg:gap-18 lg:items-center
          ${reverse ? "lg:[&_.story-content]:order-2 lg:[&_.story-image]:order-1" : "lg:[&_.story-content]:order-1 lg:[&_.story-image]:order-2"}
        `}
      >
        {/* On mobile: image always comes first */}
        <div className="story-image order-1 lg:order-none">{imagePanel}</div>
        <div className="story-content order-2 lg:order-none">
          {contentPanel}
        </div>
      </div>
    </article>
  );
}

function FamilyStories({ stories, city = "Nagpur" }) {
  const displayStories = stories?.length ? stories : FALLBACK_STORIES;
  const propertiesLink = buildFamilyPropertiesLink(city);

  return (
    <section className="bg-[#F6F2FB] md:bg-white px-5 py-16 lg:px-6 lg:py-[72px]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 lg:gap-[72px]">
        {displayStories.map((s, i) => (
          <div key={`${s.title}-${i}`}>
            <StoryCard story={s} reverse={i % 2 !== 0} />
            {i < displayStories.length - 1 && (
              <hr className="border-t border-[#E4E0EF] mt-12 lg:hidden" />
            )}
          </div>
        ))}

        {/* View More button */}
        <div className="flex justify-center pt-0 pb-2">
          <Link
            href={propertiesLink}
            className="border-2 border-[#4500B4] rounded-xl px-10 py-3.5 font-jakarta text-[16px] font-bold text-[#4500B4] bg-transparent cursor-pointer transition-all duration-200 hover:bg-[#4500B4] hover:text-white w-full lg:w-auto text-center no-underline inline-block"
          >
            View Family-Friendly Homes in {city}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── WhatLearned ─────────────────────────────────────────────────────────────

const learned = [
  { icon: <CheckIcon />, label: "Alignment matters more than speed" },
  { icon: <PinIcon />, label: "Area decisions shape daily life" },
  { icon: <ChatIcon />, label: "Open conversations reduce regret" },
  { icon: <ShieldSmIcon />, label: "Early alignment prevents burnout" },
  { icon: <GridIcon />, label: "Structure beats emotion" },
];

function WhatLearned() {
  return (
    <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="font-manrope font-semibold text-[32px] leading-10 tracking-[-0.32px] text-[#151C27] mb-4 lg:text-[38px]">
            What These Families Learned
          </h2>
          <p className="font-jakarta text-[16px] leading-6 text-[#5F5D69] max-w-2xl">
            After navigating disagreements, delays, and emotional pressure,
            these families walked away with clarity that went far beyond just
            choosing a home.
          </p>
        </div>

        {/* Mobile: horizontal rows; Desktop: 5-column grid */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-5 lg:gap-5">
          {learned.map((item) => (
            <div
              key={item.label}
              className="
                flex flex-row items-center gap-4
                bg-[#F9F9FF] rounded-xl px-4 py-4
                shadow-[0_10px_30px_rgba(94,35,220,0.04)]
                transition-all duration-200
                hover:shadow-[0_4px_20px_rgba(69,0,180,0.08)]
                lg:flex-col lg:items-center lg:text-center
                lg:border lg:border-[#e5e7eb] lg:bg-white
                lg:p-7 lg:rounded-2xl
                lg:hover:border-[#C4B0FF]
              "
            >
              <div className="w-12 h-12 rounded-full bg-[#EEE8FF] flex items-center justify-center text-[#4500B4] flex-shrink-0 lg:mb-2">
                {item.icon}
              </div>
              <p className="font-jakarta text-[16px] leading-6 text-[#151C27] m-0 lg:text-[14px] lg:leading-snug lg:font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HowHelps ─────────────────────────────────────────────────────────────────

function HowHelps({ city = "Nagpur" }) {
  return (
    <div className="relative lg:pb-50 bg-white">
      {/* Purple banner — rounded top corners on mobile matching Figma */}
      <section
        className="px-5 pt-16 pb-24 lg:px-6 lg:pb-30 lg:text-center bg-[linear-gradient(180deg,_#5E23DC_0%,_#3F2D62_100%)] rounded-tl-4xl md:rounded-tl-none rounded-tr-4xl md:rounded-tr-none"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="font-manrope font-medium text-[32px] leading-10 tracking-[-0.32px] text-white mb-8 lg:text-[52px] lg:leading-[1.15]">
            How This Helps Your Family
          </h2>

          <p className="font-jakarta text-[18px] leading-[29px] text-[#CEBDFF] mb-1">
            If your family is facing confusion or hesitation, these stories are
            meant to reassure you — not pressure you.
          </p>

          {/* Divider */}
          <div className="w-12 h-1 bg-white/30 rounded-full my-6 md:hidden" />

          <p className="font-medium md:font-normal text-[24px] md:text-xs md:text-[#E8DDFF] leading-8 text-white mb-6">
            Disagreement is normal. Clarity comes from shared understanding.
          </p>

          <p className="font-jakarta text-[16px] leading-6 text-[#E8DDFF]">
            The right approach helps families arrive at alignment naturally.
          </p>
        </div>
      </section>

      {/* Next Steps cards — directly below, no overlap trick on mobile */}
      <section className="w-full md:absolute px-5 py-0 pb-10 lg:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 flex-col md:flex-row gap-6 md:gap-8 -mt-6 lg:-mt-16">
          {/* Card 1 */}
          <div className="bg-[#F0F3FF] md:bg-white border border-[rgba(228,224,239,0.5)] rounded-2xl p-8 shadow-[0_7px_5.6px_rgba(94,35,220,0.16)]">
            <h3 className="font-manrope font-medium md:font-normal text-[24px] leading-8 text-[#151C27] md:text-[#4500B4] mb-2">
              Explore More Family Decision Stories
            </h3>
            <p className="font-jakarta text-[16px] leading-6 text-[#5F5D69] mb-6">
              Read more journeys where families found alignment before
              committing.
            </p>
            <Link
              href="/first-time-buyer"
              className="block w-full bg-[#4500B4] text-white border-none rounded-xl py-4 font-jakarta font-bold text-[16px] cursor-pointer transition-colors duration-200 hover:bg-[#3700a0] shadow-[0_10px_15px_-3px_rgba(69,0,180,0.2),0_4px_6px_-4px_rgba(69,0,180,0.2)] text-center no-underline"
            >
              Explore First-Time Buyer Guide
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[rgba(228,224,239,0.2)] rounded-2xl p-8 shadow-[0_10px_30px_rgba(94,35,220,0.21)]">
            <h3 className="font-manrope font-medium md:font-normal text-[24px] leading-8 text-[#151C27] md:text-[#4500B4] mb-2">
              Join a Free Home Buying Guidance Session
            </h3>
            <p className="font-jakarta text-[16px] leading-6 text-[#5F5D69] mb-6">
              A calm, no-pressure session designed for families.
            </p>
            <button
              type="button"
              onClick={() =>
                openAgentAdvisor(
                  `My family in ${city} needs a free home buying guidance session to align on our priorities.`,
                )
              }
              className="w-full border-2 border-[#4500B4] text-[#4500B4] bg-transparent rounded-xl py-4 font-jakarta font-bold text-[16px] cursor-pointer transition-all duration-200 hover:bg-[#4500B4] hover:text-white"
            >
              Join Session
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const DEFAULT_FAQS = [
  {
    q: "Are these real family stories?",
    a: "Yes. Every story reflects real family buying patterns in Nagpur — different priorities, emotional stress, and how alignment was reached before committing.",
  },
  {
    q: "Is this useful if we are not a family?",
    a: "Absolutely. Any shared decision involving multiple stakeholders — roommates, partners, or business partners — will relate to these dynamics.",
  },
  {
    q: "Can parents attend guidance sessions?",
    a: "Yes. Our guidance sessions are designed to include all key decision makers, including parents and extended family members.",
  },
  {
    q: "Is there a fee for this?",
    a: "The family stories and most guidance content are free. Personalised advisory sessions may be available on a case-by-case basis.",
  },
  {
    q: "Do you need to be ready to buy?",
    a: "Not at all. Many families start the alignment process months before they are ready to buy, which is often the healthiest approach.",
  },
];

function FAQ({ initialFaqs = [], pageData = null }) {
  const [open, setOpen] = useState(null);
  const familyHomes = pageData?.stats?.familyHomes || 0;

  const faqs = useMemo(() => {
    const mapped = mapFaqs(initialFaqs || []);
    if (mapped.length > 0) return mapped;

    if (familyHomes) {
      return DEFAULT_FAQS.map((faq, index) =>
        index === 0
          ? {
              ...faq,
              a: `Yes. Every story reflects real family buying patterns in Nagpur, grounded in ${familyHomes}+ family-friendly homes across multiple localities.`,
            }
          : faq,
      );
    }

    return DEFAULT_FAQS;
  }, [initialFaqs, familyHomes]);

  return (
    <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-manrope font-medium text-[32px] leading-10 tracking-[-0.32px] text-[#151C27] md:text-[#4500B4] mb-10 lg:text-center lg:text-[34px]">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border md:border-0 md:border-b border-[#E4E0EF] rounded-xl md:rounded-none overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center gap-4 px-5 py-5 bg-transparent border-none cursor-pointer text-left"
              >
                <span className="font-manrope font-normal text-[18px] leading-6 text-[#151C27]">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 text-[#151C27]">
                  <ChevronDown open={open === i} />
                </span>
              </button>

              {open === i && (
                <div className="px-5 pb-5">
                  <p className="font-jakarta text-[16px] leading-6 text-[#5F5D69] m-0">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function FamilyStoriesPage({
  initialPageData = null,
  initialFaqs = [],
}) {
  const city = initialPageData?.city || "Nagpur";
  const stories = initialPageData?.stories?.length
    ? applyFamilyStoryOverrides(initialPageData.stories)
    : FALLBACK_STORIES;

  return (
    <main
      className="min-h-screen"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/*
        Add to tailwind.config.js:
        fontFamily: {
          manrope: ['Manrope', 'sans-serif'],
          jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        }
        And in globals.css:
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      */}
      <Hero pageData={initialPageData} />
      <WhyHard />
      <WhereDifferent />
      <FamilyStories stories={stories} city={city} />
      <WhatLearned />
      <HowHelps city={city} />
      <FAQ initialFaqs={initialFaqs} pageData={initialPageData} />
    </main>
  );
}
