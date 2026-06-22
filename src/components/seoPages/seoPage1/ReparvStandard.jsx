"use client";
import { Wifi, CircleCheckBig, Clock } from "lucide-react";

const standards = [
  {
    icon: Wifi,
    title: "Unbiased Guidance",
    desc: "We don't sell listings; we provide the narrative truth about properties.",
  },
  {
    icon: CircleCheckBig,
    title: "Multi-Step Verification",
    desc: "Every property passes our rigorous 120-point verification protocol.",
  },
  {
    icon: Clock,
    title: "Decisions at Your Pace",
    desc: "No pressure tactics. We move as fast or as slow as your family needs.",
  },
];

export default function ReparvStandard() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5323DC] mb-3">
            The Reparv Standard
          </h2>
          <p className="text-gray-500 text-base">
            Why families choose our editorial approach to real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {standards.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <div className="mb-6">
                <Icon className="w-7 h-7 text-[#5323DC]" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-800 font-semibold text-base mb-3">
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
