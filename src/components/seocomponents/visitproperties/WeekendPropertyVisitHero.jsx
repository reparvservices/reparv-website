"use client";

export default function WeekendPropertyVisitHero({
  city = "Nagpur",
  stats,
  onPlanVisit,
  onTalkExpert,
}) {
  const propertyCount = stats?.verifiedProperties || 0;
  const localityCount = stats?.localities || 0;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-snug lg:leading-[1.25]">
              Visit Properties on Weekends – Make{" "}
              <span className="text-[#7C3AED]">Smarter Decisions</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto lg:mx-0">
              Experience real traffic, check water supply, and hear actual noise
              levels. Our local experts guide you through weekend reality checks
              in {city}
              {propertyCount > 0
                ? ` across ${propertyCount} verified listings`
                : ""}
              {localityCount > 0 ? ` in ${localityCount} localities` : ""}.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                type="button"
                onClick={onPlanVisit}
                className="h-[48px] px-6 rounded-xl bg-[#7C3AED] text-white font-semibold shadow-[0_8px_20px_#8A38F529] hover:opacity-95 transition"
              >
                Plan My Weekend Visit
              </button>

              <button
                type="button"
                onClick={onTalkExpert}
                className="h-[48px] px-6 rounded-xl border-2 border-[#7C3AED] text-[#7C3AED] font-semibold hover:bg-[#7C3AED]/5 transition"
              >
                Talk to a Local Expert
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 justify-center lg:justify-start text-sm">
              {["RERA Verified", "Local Team", "No Pressure"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    <img
                      src="/assets/seopageassets/visitproperties/check.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                  </div>
                  <span className="font-medium text-black">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <img
              src="/assets/seopageassets/visitproperties/banner-image.svg"
              alt="Weekend property visit"
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
