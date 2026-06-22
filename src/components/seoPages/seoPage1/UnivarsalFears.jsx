"use client";

const fears = [
  '"What if I\'m overpaying in a peaking market?"',
  '"Is there a structural flaw I\'m not seeing?"',
  '"Will this neighborhood change for the worse?"',
  '"Am I rushing into this because of FOMO?"',
];

export default function UniversalFears() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Universal Fears, Solved
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fears.map((fear, i) => (
            <div
              key={i}
              className="bg-purple-50/70 border-l-4 border-[#5323DC] rounded-r-xl px-5 py-6"
            >
              <p className="text-gray-800 text-sm font-medium italic leading-relaxed">
                {fear}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
