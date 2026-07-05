import { formatVerifiedStatValue } from "@/utils/verifiedPropertiesPage";

export default function Hero({ pageData = null }) {
  const city = pageData?.city || "Nagpur";
  const stats = pageData?.stats || {};
  const verifiedListings = stats.verifiedListings || 0;
  const localities = stats.localities || 0;

  return (
    <section className="relative min-h-[500px] md:min-h-[560px] flex items-center overflow-hidden bg-gradient-to-br from-[#f5f0ff] via-[#ede8ff] to-[#f9f7ff]">
      <div className="relative z-10 w-full py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#4500B4]/10 border border-[#4500B4]/20 text-[#1a0a3d] md:text-[#5E23DC] text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4500B4] animate-pulse" />
            {verifiedListings
              ? `${formatVerifiedStatValue(verifiedListings)} Verified Home Stories in ${city}`
              : "Real Home Buying Journeys"}
          </div>

          <h1 className="text-[42px] md:text-5xl lg:text-6xl font-bold text-[#1a0a3d] md:text-[#5323DC] max-w-3xl leading-tight mb-5">
            Home Buying Stories –{" "}
            <span className="text-[#000] md:text-[#5323DC]">
              Real Journeys from Real Families
            </span>
          </h1>

          <p className="text-[#4a4470] md:text-black/80 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Buying a home isn&apos;t just a transaction; it&apos;s the beginning
            of a new chapter. Explore authentic journeys from {city} families
            {localities ? ` across ${localities}+ localities` : ""} who found
            their place with Reparv.
          </p>

          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            <a
              href="#featured-narratives"
              className="inline-block text-center bg-[#5323DC] hover:bg-[#4500B4] text-white font-medium px-8 py-3.5 rounded-lg transition-colors text-sm"
            >
              Read Stories
            </a>
            <a
              href="/first-time-buyer"
              className="inline-block text-center bg-white hover:bg-purple-50 text-[#5323DC] font-medium px-8 py-3.5 rounded-lg transition-colors text-sm border border-[#5323DC]/20"
            >
              Explore Journeys
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
