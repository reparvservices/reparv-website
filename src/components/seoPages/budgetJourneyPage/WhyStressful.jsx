const reasons = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.911 3.374h14.784c1.694 0 2.777-1.874 1.911-3.374L13.911 5.625a2.121 2.121 0 00-3.822 0L2.697 16.126z"
        />
      </svg>
    ),
    title: "Fear of Mistakes",
    desc: "Budget is not just a number; it represents years of savings and the fear of a mistake that can't be easily undone.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
        />
      </svg>
    ),
    title: "Overstretching",
    desc: "Buyers worry about stretching finances too far while facing competitive choices and financial impact opportunities.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    title: "Social Pressure",
    desc: "Online conversations and peer comparisons to quickly and artificially inflate budgets can feel inadequate.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    title: "Emotional Weight",
    desc: "Beyond buying fear, emotional buying heightens uncertainty. Doubts cause likely emotional regret from monthly EMI calculations.",
  },
];

export default function WhyStressful() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="block w-8 h-0.5 bg-[#4500B4]" />
          <p className="text-[#4500B4] text-sm font-semibold tracking-wide uppercase">
            Understanding the Challenge
          </p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a0a3d] mb-10">
          Why Budget Decisions Feel Stressful
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="flex md:flex-col gap-3 bg-[#ffffff] rounded-2xl p-6 border border-[#ede8ff] hover:border-[#4500B4]/30 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#4500B4]/10 flex shrink-0 items-center justify-center text-[#4500B4] mb-4 group-hover:bg-[#4500B4] group-hover:text-white transition-colors duration-200">
                {r.icon}
              </div>
              <div>
                <h3 className="text-[#1a0a3d] font-semibold text-base mb-2">
                  {r.title}
                </h3>
                <p className="text-[#6b6490] text-sm leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
