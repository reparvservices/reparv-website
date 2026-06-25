"use client";

export default function Hero() {
  return (
    <section className="bg-white px-6 py-16 md:px-8 lg:px-12">
      <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Based on Real Family Experiences
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-[#4500B4] sm:text-5xl">
            Family Decision Stories –
            <span className="block lg:inline"> How Families Aligned</span>{" "}
            Before Buying a Home
          </h1>

          <p className="max-w-lg text-base leading-8 text-slate-500">
            Real stories of families navigating different opinions, emotional
            pressure, and priorities—before reaching a decision everyone felt
            confident about.
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden overflow-hidden rounded-3xl lg:block">
          <div className="aspect-[4/3]">
            <img
              src="/assets/seoPages/familyDecision/hero.svg"
              alt="Happy family standing in front of their new home"
              className="w-full h-[380px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
