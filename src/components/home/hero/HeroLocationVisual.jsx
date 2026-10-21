import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { formatIndianUnit, getImageURI } from "@/utils/helper";
import { categoryGroup, kindOfCategory } from "@/utils/propertyListing";

// Three preview slots. Each is filled with a real listing of that kind when
// one exists; otherwise it shows the type with an illustration and no price.
const SLOTS = [
  {
    key: "flat",
    label: "Flat",
    match: (p) => /Flat/.test(p.propertyCategory) && kindOfCategory(p.propertyCategory) === "Residential",
    fallbackArt: "/assets/home/propertyType/NewFlat.svg",
    fallbackHref: "/properties/type/buy",
    position: "left-[2%] top-[6%]",
  },
  {
    key: "plot",
    label: "Residential Plot",
    match: (p) => /Plot/.test(p.propertyCategory) && kindOfCategory(p.propertyCategory) === "Residential",
    fallbackArt: "/assets/home/propertyType/OpenLand.svg",
    fallbackHref: "/properties/type/buy",
    position: "right-[2%] top-[24%]",
  },
  {
    key: "commercial",
    label: "Commercial Space",
    match: (p) => kindOfCategory(p.propertyCategory) === "Commercial",
    fallbackArt: "/assets/home/propertyType/Office.svg",
    fallbackHref: "/properties/type/commercial",
    position: "bottom-[6%] left-[16%]",
  },
];

// Dashed connectors from the centre pin (52, 56) to each card, in % units.
const CONNECTORS = [
  [52, 56, 22, 18],
  [52, 56, 80, 36],
  [52, 56, 36, 84],
];

const ROADS = [
  "M0 70 C 20 62, 35 66, 52 56 S 85 40, 100 44",
  "M30 0 C 34 20, 44 38, 52 56 S 60 85, 58 100",
  "M0 30 C 25 34, 60 22, 100 18",
  "M10 100 C 30 82, 70 80, 100 88",
  "M78 0 C 74 30, 82 60, 92 100",
];

const EXTRA_PINS = [
  { left: "70%", top: "64%" },
  { left: "30%", top: "44%" },
  { left: "86%", top: "12%" },
];

function firstImage(frontView) {
  try {
    const list = JSON.parse(frontView || "[]");
    return Array.isArray(list) && list[0] ? getImageURI(list[0]) : "";
  } catch {
    return "";
  }
}

function toPreview(slot, property) {
  if (!property) {
    return { title: slot.label, image: slot.fallbackArt, isArt: true, href: slot.fallbackHref };
  }
  const amount = formatIndianUnit(property.totalOfferPrice);
  const price = amount && categoryGroup(property.propertyCategory) === "rent" ? `${amount}/mo` : amount;
  const image = firstImage(property.frontView);
  return {
    title: slot.label,
    subtitle: property.location || property.city || "",
    price: price ? `₹${price}` : "",
    image: image || slot.fallbackArt,
    isArt: !image,
    fallbackArt: slot.fallbackArt,
    href: property.seoSlug ? `/property-info/${property.seoSlug}` : slot.fallbackHref,
  };
}

function PreviewCard({ preview, className, delay }) {
  const [src, setSrc] = useState(preview.image);
  const [isArt, setIsArt] = useState(preview.isArt);

  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <Link
        href={preview.href}
        className="flex w-[196px] items-center gap-2.5 rounded-xl border border-white/60 bg-white/95 p-2 shadow-[0_10px_30px_rgba(30,10,80,0.25)] backdrop-blur transition-transform hover:-translate-y-0.5"
      >
        <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#EDE3FF]">
          <img
            src={src}
            alt={preview.subtitle ? `${preview.title} in ${preview.subtitle}` : preview.title}
            loading="lazy"
            className={`h-full w-full ${isArt ? "object-contain p-1" : "object-cover"}`}
            onError={() => {
              if (preview.fallbackArt && src !== preview.fallbackArt) {
                setSrc(preview.fallbackArt);
                setIsArt(true);
              }
            }}
          />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[13px] font-semibold text-[#3F2D62]">
            {preview.title}
          </span>
          {preview.subtitle && (
            <span className="mt-0.5 block truncate text-[11px] capitalize text-slate-500">
              {preview.subtitle.toLowerCase()}
            </span>
          )}
          {preview.price && (
            <span className="mt-0.5 block truncate text-xs font-bold text-[#7029E8]">{preview.price}</span>
          )}
        </span>
      </Link>
    </motion.div>
  );
}

export default function HeroLocationVisual({ properties = [] }) {
  const list = Array.isArray(properties) ? properties : [];
  const used = new Set();
  const previews = SLOTS.map((slot) => {
    const property = list.find((p) => !used.has(p.propertyid) && slot.match(p));
    if (property) used.add(property.propertyid);
    return { slot, preview: toPreview(slot, property) };
  });

  return (
    <div className="relative h-full min-h-[340px] w-full lg:min-h-[400px]">
      {/* Glowing city-map photo, faded into the hero at its edges */}
      <img
        src="/assets/home/hero/city-map-pins.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-screen"
        style={{
          maskImage: "radial-gradient(ellipse 60% 58% at 52% 56%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 58% at 52% 56%, #000 30%, transparent 75%)",
        }}
      />

      {/* Roads + connectors */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {ROADS.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="#EDE3FF"
            strokeOpacity="0.22"
            strokeWidth="6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {ROADS.map((d) => (
          <path
            key={`${d}-c`}
            d={d}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {CONNECTORS.map(([x1, y1, x2, y2]) => (
          <line
            key={`${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#EDE3FF"
            strokeOpacity="0.7"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Radius rings around the centre pin */}
      {["w-[62%]", "w-[42%]", "w-[22%]"].map((w, i) => (
        <span
          key={w}
          className={`absolute left-[52%] top-[56%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 ${w}`}
          style={{ background: `rgba(237,227,255,${0.06 + i * 0.05})` }}
        />
      ))}

      {/* Centre pin */}
      <span className="absolute left-[52%] top-[56%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute -inset-3 rounded-full bg-[#EDE3FF]/30 motion-safe:animate-ping [animation-duration:2.5s]" />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_0_24px_rgba(237,227,255,0.8)]">
          <MapPin className="h-5 w-5 text-[#7029E8]" fill="#EDE3FF" aria-hidden="true" />
        </span>
      </span>

      {EXTRA_PINS.map((pin) => (
        <span
          key={pin.left + pin.top}
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EDE3FF] shadow-[0_0_10px_rgba(237,227,255,0.9)]"
          style={pin}
        />
      ))}

      {previews.map(({ slot, preview }, i) => (
        <PreviewCard
          key={slot.key}
          preview={preview}
          className={slot.position}
          delay={0.3 + i * 0.1}
        />
      ))}
    </div>
  );
}
