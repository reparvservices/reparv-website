// HERO IMAGE
import heroImage from "../../../assets/seopageassets/turstedbuilder/banner-image.svg";

// STATS ICONS
import projectsIcon from "../../../assets/seopageassets/turstedbuilder/projects.svg";
import buildersIcon from "../../../assets/seopageassets/turstedbuilder/builders.svg";
import panIndiaIcon from "../../../assets/seopageassets/turstedbuilder/pan-india.svg";
import verifiedIcon from "../../../assets/seopageassets/turstedbuilder/verified.svg";

export default function TrustedBuilderHero() {
  const stats = [
    {
      value: "500+",
      label: "Verified Projects",
      icon: projectsIcon,
    },
    {
      value: "200+",
      label: "Trusted Builders",
      icon: buildersIcon,
    },
    {
      value: "Pan-India",
      label: "Presence",
      icon: panIndiaIcon,
    },
    {
      value: "100%",
      label: "Legal & Title Verified",
      icon: verifiedIcon,
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        {/* ================= TOP CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-black leading-snug sm:leading-tight lg:leading-[1.5]">
              Trusted Builders & Verified Real Estate Projects
              <span class="text-[#7C3AED]">Across India</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-xl mx-auto lg:mx-0">
              Discover legally verified properties from trusted builders. Your
              dream home awaits with complete transparency and peace of mind.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
              <button className="h-[48px] px-6 rounded-xl bg-[#7C3AED] text-white font-semibold shadow-[0_8px_20px_#8A38F529] hover:opacity-95 transition">
                Explore Projects
              </button>

              <button className="h-[48px] px-6 rounded-xl border-2 border-[#7C3AED] text-[#7C3AED] font-semibold hover:bg-[#7C3AED]/5 transition">
                View Trusted Builders
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE (DESKTOP ONLY) */}
          <div className="hidden lg:flex justify-end">
            <img
              src={heroImage}
              alt="Trusted builders across India"
              className="w-full max-w-lg"
            />
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white border rounded-2xl p-5 sm:p-6 text-center shadow-sm"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#8A38F5] flex items-center justify-center">
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-black">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
