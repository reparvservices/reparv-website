

export default function VerifiedBuilders() {
  const builders = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: "Prestige Group",
    location: "Property Location (5KM)",
    years: "35+ Years",
    projects: "280 Projects",
    image: "/assets/seopageassets/turstedbuilder/property-image.jpg",
  }));

  return (
    <section className="bg-[#F7F5FF] py-12 sm:py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
              Verified Builders
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Explore our network of trusted and verified construction partners
            </p>
          </div>

          <select className="w-[140px] h-[40px] rounded-lg border border-gray-300 px-3 text-sm">
            <option>All Cities</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Bangalore</option>
            <option>Pune</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {builders.map((builder) => (
            <div
              key={builder.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-[200px]">
                <img
                  src={builder.image}
                  alt={builder.name}
                  className="w-full h-full object-cover"
                />

                {/* VERIFIED BADGE */}
                <div className="absolute top-3 left-3 bg-[#7C3AED] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <img src="/assets/seopageassets/turstedbuilder/verified-badge.svg" className="w-3 h-3" />
                  Verified
                </div>

                {/* HEART */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                  <img src="/assets/seopageassets/turstedbuilder/heart.svg" className="w-4 h-4" />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <img src="/assets/seopageassets/turstedbuilder/location.svg" className="w-4 h-4" />
                  {builder.location}
                </div>

                <h4 className="font-semibold text-sm mb-3">{builder.name}</h4>

                <div className="flex justify-between text-xs text-[#7C3AED] mb-4">
                  <div className="flex items-center gap-1">
                    <img src="/assets/seopageassets/turstedbuilder/calender.svg" className="w-4 h-4" />
                    {builder.years}
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/assets/seopageassets/turstedbuilder/projects.svg" className="w-4 h-4" />
                    {builder.projects}
                  </div>
                </div>

                <button className="mt-auto w-full h-[40px] bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <button className="px-8 h-[44px] border border-[#7C3AED] text-[#7C3AED] rounded-lg font-semibold hover:bg-[#7C3AED] hover:text-white transition">
            View All Builders
          </button>
        </div>
      </div>
    </section>
  );
}
