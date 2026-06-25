const PlayIcon = () => (
  <svg
    width="22"
    height="22"
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

function StoryIllustration({ seed = 0 }) {
  const fills = ["#EEE8FF", "#F3EFFF", "#E8E2FF"];
  const bg = fills[seed % fills.length];

  return (
    <svg
      viewBox="0 0 440 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <rect width="440" height="300" fill={bg} />

      <circle
        cx={seed === 0 ? 160 : 280}
        cy="120"
        r="44"
        fill="#C4B0FF"
      />
      <rect
        x={seed === 0 ? 114 : 234}
        y="168"
        width="92"
        height="120"
        rx="12"
        fill="#D4C5FF"
      />

      <circle
        cx={seed === 0 ? 310 : 150}
        cy="130"
        r="32"
        fill="#B39DFF"
      />
      <rect
        x={seed === 0 ? 278 : 118}
        y="164"
        width="64"
        height="120"
        rx="10"
        fill="#C9B8FF"
      />

      <circle cx="220" cy="200" r="20" fill="#A78BFA" />
      <rect
        x="200"
        y="222"
        width="40"
        height="72"
        rx="8"
        fill="#BBA8FF"
      />

      <circle cx="60" cy="280" r="5" fill="#7C5CC4" opacity=".3" />
      <circle cx="400" cy="30" r="7" fill="#C4B0FF" opacity=".4" />
    </svg>
  );
}

export default function StoryCard({ story, reverse = false }) {
  const {
    meta,
    title,
    priorities,
    stressPoints,
    clarityMoment,
    clarityOutcome,
    seed,
  } = story;

  return (
    <article
      className={`mb-7 overflow-hidden rounded-3xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(69,0,180,0.10)]
      ${
        reverse
          ? "grid lg:grid-cols-2 lg:[direction:rtl]"
          : "grid lg:grid-cols-2"
      }`}
    >
      {/* Image Column */}
      <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#DDD5FF] to-[#EBE5FF] lg:min-h-[300px]">
        <StoryIllustration seed={seed} />

        <button
          aria-label={`Play ${title} story video`}
          className="relative z-10 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white/90 pl-1 text-[#4500B4] transition-transform duration-200 hover:scale-110 hover:bg-white"
        >
          <PlayIcon />
        </button>

        <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#4500B4]">
          Watch Story
        </div>
      </div>

      {/* Content Column */}
      <div className="flex flex-col justify-center p-6 lg:p-11 lg:[direction:ltr]">
        {/* Meta */}
        <div className="mb-4 flex flex-wrap items-center gap-1">
          {meta.map((item, index) => (
            <span
              key={item}
              className="text-[11px] font-bold uppercase tracking-[0.06em] text-slate-500"
            >
              {index > 0 && (
                <span className="mx-1 opacity-50">·</span>
              )}
              {item}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="mb-5 text-[clamp(20px,2.5vw,28px)] font-extrabold leading-[1.25] text-[#4500B4]">
          {title}
        </h3>

        {/* Priorities */}
        <div className="mb-4">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">
            Different Priorities
          </div>

          <ul className="space-y-1">
            {priorities.map((item) => (
              <li
                key={item}
                className="relative pl-4 text-sm leading-[1.55] text-gray-700 before:absolute before:left-0 before:content-['–'] before:text-[#C4B0FF]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Stress Points */}
        <div className="mb-4">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-400">
            Emotional Stress Points
          </div>

          <ul className="space-y-1">
            {stressPoints.map((item) => (
              <li
                key={item}
                className="relative pl-4 text-sm leading-[1.55] text-gray-700 before:absolute before:left-0 before:content-['–'] before:text-[#C4B0FF]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Clarity Box */}
        <div className="mb-6 rounded-xl bg-[#EEE8FF] p-5">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.07em] text-[#4500B4]">
            Clarity Moment
          </div>

          <p className="text-sm leading-[1.65] text-gray-700">
            {clarityMoment}
          </p>

          {clarityOutcome && (
            <p className="mt-2 text-sm italic text-gray-700/75">
              {clarityOutcome}
            </p>
          )}
        </div>

        {/* CTA */}
        <a
          href="#"
          className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#4500B4]"
        >
          Read Full Family Story

          <span className="transition-all duration-200 group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </a>
      </div>
    </article>
  );
}