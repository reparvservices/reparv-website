
export default function VerifyBeforeYouBuyCTA({ onAction }) {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl text-white"
          style={{
            backgroundImage: `linear-gradient(
              135deg,
              rgba(49, 16, 133, 0.9),
              rgba(124, 58, 237, 0.9)
            ), url("/assets/seopageassets/verify712/rectangle-bg.svg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Decorative overlays (optional but matches design depth) */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/10 pointer-events-none" />

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-12 py-10 sm:py-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Verify Before You Buy
            </h2>

            <p className="text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed mb-8">
              Don&apos;t risk your hard-earned money. Get instant RERA and 7/12
              verification in minutes. Trusted by{" "}
              <span className="font-semibold">50,000+</span> property buyers
              across India.
              <br className="hidden sm:block" />
              <span className="font-semibold">Verify RERA Project</span>
            </p>

            <button
              onClick={onAction}
              className="bg-white text-[#7C3AED] font-semibold px-8 sm:px-10 py-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:opacity-95 transition"
            >
              Talk to Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
