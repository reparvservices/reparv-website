"use client";
import { Lightbulb, ArrowLeftRight, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Lightbulb,
    title: "You Don't Need to Know Everything",
    desc: "You do not need to understand every technical detail on day one. Learning happens gradually as clarity improves.",
  },
  {
    icon: ArrowLeftRight,
    title: "Confusion Is Part of the Process",
    desc: "Feeling confused or slow is a normal part of the first-time buying journey and not a sign of making mistakes.",
  },
  {
    icon: ShieldCheck,
    title: "The Right Approach Simplifies Decisions",
    desc: "With the right approach and guidance, complex decisions become manageable and far less stressful.",
  },
];

export default function HowThisHelps() {
  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How This Helps You As a First-Time Buyer
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            If you&apos;re at the beginning of your home buying journey, these
            insights are meant to reduce pressure—not add to it.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#F0F3FF] rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              {/* Circular icon */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-7 shadow-sm">
                <Icon className="w-6 h-6 text-purple-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-3 leading-snug">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}