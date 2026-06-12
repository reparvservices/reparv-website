"use client";

// SVG placeholders that mimic each logo's identity
// Replace src values with your actual logo files

const logos = [
  {
    id: "bhau",
    alt: "Bhau Institute",
    // Orange sunburst / gear emblem
    svg: (
      <svg
        viewBox="0 0 60 60"
        className="w-12 h-12"
        aria-label="Bhau Institute"
      >
        <circle cx="30" cy="30" r="28" fill="#F97316" opacity="0.15" />
        <circle cx="30" cy="30" r="18" fill="#F97316" opacity="0.35" />
        <circle cx="30" cy="30" r="10" fill="#F97316" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <rect
            key={i}
            x="28"
            y="4"
            width="4"
            height="10"
            rx="2"
            fill="#F97316"
            transform={`rotate(${angle} 30 30)`}
          />
        ))}
        <text
          x="30"
          y="34"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fill="white"
        >
          भाऊ
        </text>
      </svg>
    ),
    label: "BHAU INSTITUTE",
    labelColor: "text-orange-600",
  },
  {
    id: "dst",
    alt: "Department of Science and Technology",
    svg: (
      <svg viewBox="0 0 60 60" className="w-12 h-12" aria-label="Govt of India">
        {/* Ashoka Chakra simplified */}
        <circle
          cx="30"
          cy="22"
          r="14"
          fill="none"
          stroke="#1a3a6b"
          strokeWidth="2"
        />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={30 + 5 * Math.sin(angle)}
              y1={22 - 5 * Math.cos(angle)}
              x2={30 + 13 * Math.sin(angle)}
              y2={22 - 13 * Math.cos(angle)}
              stroke="#1a3a6b"
              strokeWidth="1.5"
            />
          );
        })}
        <circle cx="30" cy="22" r="3" fill="#1a3a6b" />
        <text
          x="30"
          y="46"
          textAnchor="middle"
          fontSize="5.5"
          fill="#1a3a6b"
          fontWeight="600"
        >
          भारत सरकार
        </text>
        <text x="30" y="54" textAnchor="middle" fontSize="4.5" fill="#555">
          Govt. of India
        </text>
      </svg>
    ),
    label: "Dept. of Science & Technology",
    labelColor: "text-blue-900",
  },
  {
    id: "dstnidhi",
    alt: "DST NIDHI",
    svg: (
      <svg viewBox="0 0 80 44" className="h-10 w-auto" aria-label="DST NIDHI">
        <rect x="0" y="0" width="80" height="44" rx="4" fill="#1a3a6b" />
        {/* Arrow/growth mark */}
        <polyline
          points="12,32 24,20 36,26 52,10"
          fill="none"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon points="52,10 58,16 62,6" fill="#F97316" />
        <text
          x="40"
          y="40"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fill="white"
          letterSpacing="1"
        >
          DST NIDHI
        </text>
      </svg>
    ),
    label: "",
    labelColor: "",
  },
  {
    id: "msis",
    alt: "Maharashtra State Innovation Society",
    svg: (
      <svg
        viewBox="0 0 60 60"
        className="w-12 h-12"
        aria-label="Maharashtra State Innovation Society"
      >
        <circle
          cx="30"
          cy="30"
          r="26"
          fill="none"
          stroke="#8B2131"
          strokeWidth="2"
        />
        <circle
          cx="30"
          cy="30"
          r="18"
          fill="none"
          stroke="#8B2131"
          strokeWidth="1.5"
        />
        {/* Simplified Maharashtriya emblem circle */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={30 + 22 * Math.sin(angle)}
              cy={30 - 22 * Math.cos(angle)}
              r="2"
              fill="#8B2131"
            />
          );
        })}
        <text
          x="30"
          y="28"
          textAnchor="middle"
          fontSize="5"
          fill="#8B2131"
          fontWeight="bold"
        >
          महाराष्ट्र
        </text>
        <text x="30" y="35" textAnchor="middle" fontSize="4.5" fill="#8B2131">
          शासन
        </text>
      </svg>
    ),
    label: "Maharashtra State Innovation Society",
    labelColor: "text-red-900",
  },
  {
    id: "coep-seal",
    alt: "COEP Seal",
    svg: (
      <svg
        viewBox="0 0 60 60"
        className="w-12 h-12"
        aria-label="COEP Technological University"
      >
        <circle
          cx="30"
          cy="30"
          r="27"
          fill="none"
          stroke="#1a3a6b"
          strokeWidth="2"
        />
        <circle
          cx="30"
          cy="30"
          r="20"
          fill="none"
          stroke="#1a3a6b"
          strokeWidth="1"
        />
        {/* Gear teeth */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          return (
            <rect
              key={i}
              x="28.5"
              y="2"
              width="3"
              height="6"
              rx="1"
              fill="#1a3a6b"
              transform={`rotate(${i * 22.5} 30 30)`}
            />
          );
        })}
        <text
          x="30"
          y="28"
          textAnchor="middle"
          fontSize="7"
          fontWeight="bold"
          fill="#1a3a6b"
        >
          COEP
        </text>
        <text x="30" y="37" textAnchor="middle" fontSize="5" fill="#1a3a6b">
          Est. 1854
        </text>
      </svg>
    ),
    label: "",
    labelColor: "",
  },
];

export default function AssociatedWith() {
  return (
    <section className="w-full py-12 px-4 flex flex-col items-center">
      {/* Section heading */}
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-[0.10em] uppercase text-[#5323DC] mb-5">
        Associated With
      </h2>

      {/* Logo strip card */}
      <div className="hidden w-full max-w-4xl border border-gray-200 rounded-lg shadow-sm bg-white px-6 py-5">
        <div className="flex flex-wrap items-center justify-around gap-6">
          {logos.map((logo, index) => (
            <div key={logo.id} className="flex flex-col items-center gap-1">
              {/* Divider between logos (except first) */}
              {index > 0 && <div className="hidden sm:block absolute" />}
              {logo.svg}
              {logo.label && (
                <span
                  className={`text-[10px] font-semibold text-center max-w-[90px] leading-tight ${logo.labelColor}`}
                >
                  {logo.label}
                </span>
              )}
            </div>
          ))}

          {/* Vertical divider + text block for last item */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block w-px h-16 bg-gray-300" />
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800 leading-snug max-w-[160px]">
                COEP's Bhau Institute of
                <br />
                Innovation, Entrepreneurship
                <br />
                and Leadership
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Temperory Used Image */}
      <div className="max-w-4xl mx-auto px-4 py-1 bg-white shadow rounded-lg overflow-hidden">
        <img
          src="/assets/home/associatedWith.svg"
          alt="COEP Institute"
          className="w-full max-w-xl md:max-w-3xl mx-auto h-auto object-cover"
        />
      </div>

      {/* Institute info below */}
      <div className="mt-5 text-center space-y-1">
        <h3 className="text-xl sm:text-3xl font-semibold tracking-wide">
          COEP's Bhau Institute
        </h3>
        <p className="text-gray-500 text-sm sm:text-lg">
          Startup Incubation Center
        </p>
        <p className="text-gray-500 text-sm">Pune, Maharashtra</p>
      </div>
    </section>
  );
}
