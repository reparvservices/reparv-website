'use client';
import { ArrowRight } from 'lucide-react';

const narratives = [
  {
    id: 1,
    name: 'THE MILLER FAMILY',
    subtitle: 'From Studio to Sanctuary',
    challenge: 'Expanding from a downtown loft to a family-ready home without losing the urban spirit.',
    learning: 'Patience in the inspection phase saved them from a $40k hidden infrastructure debt.',
    image: '/assets/seoPages/seoPage1/leftImage.svg',
    imageLeft: false,
  },
  {
    id: 2,
    name: 'MARCUS & SARAH',
    subtitle: 'Trusting the Unseen Potential',
    challenge: 'Seeing past outdated interiors to find the structural integrity they craved.',
    learning: 'Guided verification gave them the courage to bid on a diamond in the rough.',
    image: '/assets/seoPages/seoPage1/rightImage.svg',
    imageLeft: true,
  },
];

export default function FeaturedNarratives() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5323DC] text-center mb-16">
          Featured Narratives
        </h2>

        <div className="flex flex-col gap-20">
          {narratives.map((n) => (
            <div
              key={n.id}
              className={`flex flex-col ${n.imageLeft ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 flex-shrink-0 rounded-xl overflow-hidden">
                <img
                  src={n.image}
                  alt={n.name}
                  className="w-full h-[340px] object-cover rounded-2xl"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h3 className="text-[#5223DC] font-bold text-xl tracking-wide mb-1">{n.name}</h3>
                <p className="text-gray-600 text-base mb-6">{n.subtitle}</p>

                <div className="mb-4">
                  <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">The Challenge</span>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">{n.challenge}</p>
                </div>

                <div className="mb-6">
                  <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">The Learning</span>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">{n.learning}</p>
                </div>

                <button className="text-[#5323Dc] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all group">
                  Read full story <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}