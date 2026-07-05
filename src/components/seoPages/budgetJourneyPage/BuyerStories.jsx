import Link from "next/link";
import { mapJourneyStories } from "@/utils/budgetToDreamHomePage";

const FALLBACK_STORIES = [
  {
    label: "A BUYER JOURNEY REVIEWED",
    name: "Nagpur: Prioritising Peace of Mind",
    text: "A family had their eyes on a 3BHK in a prime locality, but realised the EMI would leave very little breathing room. They chose a well-designed 2BHK in an upcoming neighbourhood — and haven't looked back.",
    quote:
      "Once we focused on what we could comfortably afford, the decision felt lighter and more confident.",
    stars: 5,
    readMore: "Explore Homes →",
    imageRight: true,
    image: null,
    href: "/properties?city=Nagpur",
    avatar: "NG",
    avatarColor: "bg-[#4500B4]",
  },
  {
    label: "A BUYER JOURNEY REVIEWED",
    name: "Nagpur: Quality Over Quantity",
    text: "A buyer wanted a spacious flat but the budget capped at a lower range. They pivoted to a compact, premium-finished flat in a quieter neighbourhood — and now sleep better.",
    quote:
      "I realised that a smaller well-designed home in the right neighbourhood gave me time back every day.",
    stars: 5,
    readMore: "Explore Homes →",
    imageRight: false,
    image: null,
    href: "/properties?city=Nagpur",
    avatar: "NG",
    avatarColor: "bg-[#5323DC]",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#4500B4]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BuyerStories({ pageData = null }) {
  const stories = pageData?.journeys?.length
    ? mapJourneyStories(pageData.journeys)
    : FALLBACK_STORIES;

  return (
    <section id="stories" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {stories.map((s, i) => (
          <div
            key={`${s.name}-${i}`}
            className={`flex flex-col ${s.imageRight ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center`}
          >
            <div className="md:max-w-[50%] flex-1 space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#4500B4] uppercase">
                {s.label}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1a0a3d] leading-snug">
                {s.name}
              </h3>
              <p className="text-[#6b6490] text-sm leading-relaxed">{s.text}</p>

              <div className="bg-[#f8f5ff] border-l-4 border-[#4500B4] rounded-r-xl p-4">
                <p className="text-[#2d1a6e] text-sm italic leading-relaxed">
                  &ldquo;{s.quote}&rdquo;
                </p>
              </div>

              {s.priceRange && (
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4500B4]">
                  Budget range: {s.priceRange}
                </p>
              )}

              <StarRating count={s.stars} />

              <Link
                href={s.href}
                className="inline-flex items-center gap-1.5 text-[#4500B4] font-semibold text-sm hover:text-[#5323DC] transition-colors"
              >
                {s.readMore}
              </Link>
            </div>

            <div
              className={`md:max-w-[50%] flex-shrink-0 w-full h-56 sm:h-64 rounded-2xl ${
                s.image ? "bg-[#ede8ff]" : "bg-gradient-to-br from-[#ede8ff] to-[#d5c8ff]"
              } flex items-center justify-center shadow-md relative overflow-hidden`}
            >
              {s.image ? (
                <img
                  src={s.image}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <div
                        key={j}
                        className="absolute bg-[#4500B4]/20 rounded-full"
                        style={{
                          width: `${40 + j * 20}px`,
                          height: `${40 + j * 20}px`,
                          top: `${10 + j * 8}%`,
                          left: `${5 + j * 12}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div
                    className={`w-20 h-20 rounded-full ${s.avatarColor} flex items-center justify-center text-white text-2xl font-bold shadow-lg z-10`}
                  >
                    {s.avatar}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
