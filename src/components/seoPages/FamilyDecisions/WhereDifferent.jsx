"use client";

const conflicts = [
  {
    title: "Parents vs Budget",
    desc: "This conflict reflects differing priorities that often slow down family decisions.",
  },
  {
    title: "Kids' Schools vs Location",
    desc: "This conflict reflects differing priorities that often slow down family decisions.",
  },
  {
    title: "Spouse Lifestyle vs Commute",
    desc: "This conflict reflects differing priorities that often slow down family decisions.",
  },
  {
    title: "Safety vs Price",
    desc: "This conflict reflects differing priorities that often slow down family decisions.",
  },
];

export default function WhereDifferent() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 md:py-16 lg:px-6 lg:py-[88px]">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Where Families Often See Things Differently
          </h2>

          <p className="text-base leading-7 text-gray-600">
            These are the most common points where families feel stuck or
            divided while deciding on a home.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {conflicts.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#E8E0FF] bg-[#F8F6FF] p-6 transition-all duration-200 hover:border-[#C4B0FF] hover:shadow-[0_4px_20px_rgba(69,0,180,0.08)]"
            >
              <div className="mb-4 h-[10px] w-[10px] rounded-full bg-[#6B46FE]" />

              <h4 className="mb-2 text-sm font-bold leading-[1.4] text-[#4500B4]">
                {item.title}
              </h4>

              <p className="text-[13px] leading-[1.65] text-slate-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}