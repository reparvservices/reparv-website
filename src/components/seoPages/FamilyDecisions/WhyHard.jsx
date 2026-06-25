"use client";

export default function WhyHard() {
  const EyeIcon = () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const AlarmIcon = () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3L2 6M22 6l-3-3" />
    </svg>
  );

  return (
    <section className="bg-[#F8F6FF] px-4 py-14 sm:px-6 md:py-16 lg:px-6 lg:py-[88px]">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Why Family Decisions Feel Hard
          </h2>

          <p className="text-base leading-7 text-gray-600">
            Buying a home is rarely an individual decision. It directly affects
            the daily life, comfort, and security of everyone in the family.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col rounded-[20px] border border-[#E0D5FF] bg-[#F0EBFF] p-[28px] md:p-[36px]">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEE8FF] text-[#4500B4]">
              <EyeIcon />
            </div>

            <p className="flex-1 text-[15px] leading-[1.78] text-gray-700">
              Parents, spouses, and children often look at the same home through
              very different lenses — safety, location, budget, schools, or
              long-term stability.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col rounded-[20px] border border-gray-200 bg-white p-[28px] md:p-[36px]">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEE8FF] text-[#4500B4]">
              <AlarmIcon />
            </div>

            <p className="flex-1 text-[15px] leading-[1.78] text-gray-700">
              Because of this, most delays and stress in family home buying are
              caused by misalignment of expectations, not a lack of money or
              options.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col rounded-[20px] border border-[#5323DC] bg-[#5323DC] p-[28px] md:p-[36px]">
            <div className="mb-3 font-serif text-[52px] font-black leading-none text-white/45">
              99
            </div>

            <p className="flex-1 text-lg font-semibold leading-[1.6] text-white">
              “Every family you’ll read about here faced the same disagreements,
              pauses, and emotional pressure.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}