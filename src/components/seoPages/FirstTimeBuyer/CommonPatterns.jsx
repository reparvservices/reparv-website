"use client";
import { TriangleAlert, MapPin, HeadphonesIcon } from "lucide-react";

const patterns = [
  {
    icon: TriangleAlert,
    title: "Uncertainty at the Start",
    desc: "Every first-time buyer feels unsure in the beginning and worries about making the wrong decision. This is not a lack of research, but a sign of importance.",
  },
  {
    icon: MapPin,
    title: "Area Over Price",
    desc: "Buyers gradually realize that choosing the right area matters more than simply finding the cheapest option. Lifestyle wins over square footage.",
  },
  {
    icon: HeadphonesIcon,
    title: "Guidance Reduces Stress",
    desc: "Structured thinking and the right guidance significantly reduce emotional stress and confusion, leading to faster, more confident closure.",
  },
];

export default function CommonPatterns() {
  return (
    <section
      className="relative py-20 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #4A1FBF 0%, #5B2DE8 50%, #6B3AF5 100%)",
      }}
    >
      {/* Sparkle decoration top-right */}
      <div className="absolute top-8 right-10 opacity-20 pointer-events-none select-none">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path
            d="M90 0 L100 80 L180 90 L100 100 L90 180 L80 100 L0 90 L80 80 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 max-w-7xl">
            Common Patterns First-Time Buyers Share
          </h2>
          <p className="text-white/70 text-base max-w-xl leading-relaxed">
            Across different budgets and situations, most first-time buyers
            experience the same mental and emotional patterns.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {patterns.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-8 bg-[#3F2D62]"
             
            >
              <div className="mb-6">
                <Icon className="w-7 h-7 text-white/80" strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-medium text-xl mb-4">{title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}