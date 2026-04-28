// IMAGES
import snapshotImage from "../../../assets/seopageassets/visitproperties/property-image.jpg";

// ICONS
import userIcon from "../../../assets/seopageassets/visitproperties/profile.svg";
import clockIcon from "../../../assets/seopageassets/visitproperties/clock.svg";

export default function NagpurLocalityRealitySnapshots() {
  const snapshots = Array.from({ length: 6 }).map(() => ({
    title: "Dharampeth",
    description:
      "Established area with excellent connectivity but weekend traffic near commercial zones can add 20+ minutes to commutes.",
    idealFor: "Working professionals",
    bestTime: "Saturday 8–10 AM",
    image: snapshotImage,
  }));

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Nagpur Locality Reality Snapshots
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            Real insights from weekend visits across popular Nagpur
            neighborhoods
          </p>
        </div>

        {/* ================= SNAPSHOT GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {snapshots.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[180px] object-cover"
              />

              {/* CONTENT */}
              <div className="p-5">
                <h4 className="font-semibold text-[#1F1F1F] mb-2">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* META */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#4B3CC4]">
                    <img src={userIcon} alt="" className="w-4 h-4" />
                    <span>
                      <strong>Ideal for:</strong> {item.idealFor}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#4B3CC4]">
                    <img src={clockIcon} alt="" className="w-4 h-4" />
                    <span>
                      <strong>Best visit:</strong> {item.bestTime}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button className="mt-5 w-full h-[40px] rounded-lg bg-[#7C3AED] text-white text-sm font-semibold hover:opacity-90 transition">
                  Reality Snapshot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="flex justify-center mt-12">
          <button className="px-8 h-[44px] rounded-xl border-2 border-[#7C3AED] text-[#7C3AED] font-semibold hover:bg-[#7C3AED]/5 transition">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
