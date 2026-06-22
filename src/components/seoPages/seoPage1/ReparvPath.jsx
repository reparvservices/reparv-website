'use client';
import { Star, Search, MapPin, HelpCircle, Compass, CheckCircle } from 'lucide-react';

const steps = [
  { icon: Star, label: 'Dream', desc: 'Picture your dream home' },
  { icon: Search, label: 'Research', desc: 'Bringing data to the decision' },
  { icon: MapPin, label: 'Visits', desc: 'Feeling each space in person' },
  { icon: HelpCircle, label: 'Confusion', desc: 'Every buyer questions reality' },
  { icon: Compass, label: 'Guidance', desc: 'Reparv clarifies the noise' },
  { icon: CheckCircle, label: 'Decision', desc: 'The right choice, made with peace' },
];

export default function ReparvPath() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-[#4500B4]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-14">
          The Reparv Path
        </h2>

        {/* Desktop: horizontal stepper */}
        <div className="hidden md:flex items-start justify-between gap-2 relative">
          {/* Line */}
          <div className="absolute top-6 left-10 right-10 h-0.5 bg-white/30 z-0" />
          {steps.map(({ icon: Icon, label, desc }, i) => (
            <div key={label} className="flex flex-col items-center z-10 flex-1">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow">
                {i+1}
              </div>
              <span className="text-white font-semibold text-sm mb-1">{label}</span>
              <span className="text-white/60 text-xs text-center leading-snug max-w-[90px]">{desc}</span>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden flex flex-col gap-6">
          {steps.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-[#5323Dc]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-white/60 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}