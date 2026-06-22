'use client';
import { BookOpen, ShieldCheck, Lightbulb } from 'lucide-react';

const pillars = [
  {
    icon: BookOpen,
    title: 'Human Narrative',
    desc: 'We believe in stories that go beyond square footage and price tags to capture the human element of home.',
  },
  {
    icon: ShieldCheck,
    title: 'Earned Trust',
    desc: 'Real experiences shared by real people to help you navigate the complexities of modern real estate.',
  },
  {
    icon: Lightbulb,
    title: 'Shared Wisdom',
    desc: 'Lessons learned from every journey, distilling the confusion of buying into actionable guidance for you.',
  },
];

export default function HeartOfJourney() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-[#F9F4FF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5323DC] inline-block relative">
            The Heart <span className="">of the</span> Journey
            <span className="block h-1 w-28 bg-[#5323DC] mx-auto mt-3 rounded" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#FAF6FF] rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-5 shadow-sm">
                <Icon className="w-6 h-6 text-[#5323DC]" />
              </div>
              <h3 className="text-gray-800 font-semibold text-lg mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}