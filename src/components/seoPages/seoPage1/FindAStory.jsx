'use client';
import { Home, Users, Wallet, ArrowRight } from 'lucide-react';

const stories = [
  {
    icon: Home,
    title: 'First-Time Buyers',
    desc: 'Navigating the initial leap with confidence.',
  },
  {
    icon: Users,
    title: 'Family Decisions',
    desc: 'Balancing school zones, space, and safety.',
  },
  {
    icon: Wallet,
    title: 'Budget Journeys',
    desc: 'Maximizing value without compromising dreams.',
  },
];

export default function FindAStory() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-[#F9F4FF]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Find a story like yours
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stories.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <Icon className="w-8 h-8 text-[#5323Dc] mb-4" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm mb-4">{desc}</p>
              <span className="text-[#5323DC] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read full story <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}