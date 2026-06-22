"use client";
import { Map, Users, Brain } from "lucide-react";

const reasons = [
  {
    icon: Map,
    title: "Information Overload",
    desc: "Online listings, ads, and conflicting opinions create a digital noise that makes it hard to distinguish value from marketing.",
  },
  {
    icon: Users,
    title: "Conflicting Advice",
    desc: "Advice from family, friends, and brokers often clash, leading to hesitation and the fear of making a costly mistake.",
  },
  {
    icon: Brain,
    title: "Normalizing Doubt",
    desc: "The confusion is a natural part of the process. Every story of clarity begins with a moment of deep uncertainty.",
  },
];

export default function WhyConfused() {
  return (
    <section className="bg-[#EEF0FF] py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why First-Time Buyers Feel Confused
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Buying a home is more than just a transaction; it&apos;s a massive
            life transition that often lacks a clear roadmap.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Icon box */}
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-7">
                <Icon className="w-6 h-6 text-purple-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-900 font-semibold text-xl mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}