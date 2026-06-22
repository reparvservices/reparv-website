'use client';

export default function CTASection() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#5E23DC] rounded-3xl px-8 md:px-16 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start your own story?
          </h2>
          <p className="text-white/80 text-base mb-10 max-w-md mx-auto leading-relaxed">
            Join thousands of families who found their sanctuary through a transparent, narrative-driven experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-[#5323DC] font-semibold px-7 py-3 rounded-lg hover:bg-purple-50 transition-colors text-sm">
              Find Your Home
            </button>
            <button className="border border-white/60 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm">
              Speak to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}