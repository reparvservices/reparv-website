
export default function WhyWeekendSiteVisitsMatter() {
  const checks = [
    {
      badge: "Reality Check #1",
      title: "Real Traffic Reality",
      description:
        "That 15-minute weekday commute? It becomes 45 minutes on Saturday mornings when everyone's out shopping, visiting relatives, or running errands. Experience the actual travel time before you commit.",
      note: "Weekend traffic patterns are 3x more congested in key Nagpur corridors.",
      image: "/assets/seopageassets/visitproperties/visit1.svg",
    },
    {
      badge: "Reality Check #2",
      title: "Water & Noise Check",
      description:
        "Water pressure drops on weekends when all residents are home. Neighborhood noise peaks when families are around. Visit during actual living hours to understand daily comfort levels.",
      note: "Check water supply during peak usage hours (7–9 AM, 6–8 PM).",
      image: "/assets/seopageassets/visitproperties/visit2.svg",
    },
    {
      badge: "Reality Check #3",
      title: "Neighborhood Livability",
      description:
        "See the real community. Are shops open? Are parks crowded? Is there parking available? Weekend visits show you the actual neighborhood energy and social fabric you'll be living in.",
      note: "Observe community vibe, amenities accessibility, and local culture.",
      image: "/assets/seopageassets/visitproperties/visit3.svg",
    },
    {
      badge: "Reality Check #4",
      title: "Return Commute Stress",
      description:
        "Experience the evening return journey. How does it feel after a tiring day? Is public transport available? Are roads well-lit? These factors determine your quality of life.",
      note: "Test evening commute scenarios and safety perception.",
      image: "/assets/seopageassets/visitproperties/visit4.svg",
    },
  ];

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Why Weekend Site Visits Matter
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Weekdays hide critical realities. Weekend visits reveal what life
            will actually be like.
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="space-y-16">
          {checks.map((item, index) => {
            const reverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                  reverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* IMAGE */}
                <div className={reverse ? "lg:order-2" : ""}>
                  <div className="rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* TEXT */}
                <div className={reverse ? "lg:order-1" : ""}>
                  <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-[#EEE7FF] text-[#7C3AED]">
                    {item.badge}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#3F2D62] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* CHECK NOTE */}
                  <div className="flex items-start gap-3 bg-[#F6F2FF] rounded-lg px-4 py-3">
                    <div className="w-6 h-6 rounded-full  flex items-center justify-center mt-0.5">
                      <img src="/assets/seopageassets/visitproperties/check.svg" alt="" className="w-5 h-5" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-[#3F2D62]">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
