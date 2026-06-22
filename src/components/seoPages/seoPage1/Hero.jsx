"use client";

export default function Hero() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">

      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/seoPages/seoPage1/hero.svg')" }}
        />

        {/* Stronger purple push on the left where text lives */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(83,35,205,0.80) 0%, rgba(83,35,205,0.60) 30%, rgba(83,35,205,0.30) 58%, rgba(83,35,205,0.08) 100%)",
          }}
        />

        {/* Bottom vignette for button readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(60,20,160,0.40) 0%, transparent 38%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">

          {/* Badge */}
          <span className="hidden md:inline-block bg-[#5323DC]/80 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Lyrical Real Estate
          </span>

          {/* Headline */}
          <h1 className="text-[42px] md:text-5xl lg:text-6xl font-bold text-white max-w-2xl leading-tight mb-5">
            Real Home Buying Stories from Real Families
          </h1>

          {/* Subtext */}
          <p className="hidden md:block text-white/85 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Buying a home isn&apos;t just a transaction; it&apos;s the beginning
            of a new chapter. Explore the authentic journeys of families who
            found their place with Reparv.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            <button className="bg-[#5323DC] hover:bg-purple-800 text-white font-medium px-8 py-3.5 rounded-lg transition-colors text-sm border border-white/30">
              Read Stories
            </button>
            <button className="bg-white hover:bg-purple-50 text-[#5323DC] font-medium px-8 py-3.5 rounded-lg transition-colors text-sm">
              Explore Journeys
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}