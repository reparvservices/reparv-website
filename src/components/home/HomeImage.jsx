'use client';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/store/auth';
import HeroContent from './hero/HeroContent';
import HeroSearchBar from './hero/HeroSearchBar';
import HeroLocationVisual from './hero/HeroLocationVisual';
import PropertyActionCard from './hero/PropertyActionCard';

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomeImage({ trendingProperties = [] }) {
  const router = useRouter();

  const { user, setShowLogin, selectedCity, setShowComingSoonModal } =
    useAuth();

  const cards = [
    {
      to: user ? '/sell-properties' : 'no',
      title: 'List Property',
      description: 'Post your property and reach genuine buyers or tenants.',
      image: '/assets/home/hero/list-property.webp',
    },
    {
      to: '/properties/type/buy',
      title: 'Buy Properties',
      description: 'Explore properties that match your needs.',
      image: '/assets/home/hero/buy-property.webp',
    },
    {
      to: '/rental-properties',
      title: 'Rent Properties',
      description: 'Find the right rental space in your preferred location.',
      image: '/assets/home/hero/rent-property.webp',
    },
    {
      to: '/properties/type/commercial',
      title: 'Commercial Properties',
      description: 'Discover shops, offices and commercial spaces for your business.',
      image: '/assets/home/hero/commercial-property.webp',
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[1440px] px-3 pt-3 sm:px-4 lg:px-6">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-3xl pb-24 md:pb-28"
        style={{
          background:
            'linear-gradient(100deg, #24104F 0%, #3A1A86 38%, #5B2BC9 70%, #8A5CF6 100%)',
        }}
      >
        {/* Dusk glow behind the skyline */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 60% at 85% 95%, rgba(255,176,150,0.35) 0%, rgba(237,227,255,0.12) 45%, transparent 75%)',
          }}
        />

        {/* Dusk city photo, faded out towards the text side */}
        <img
          src="/assets/home/hero/city-skyline-dusk.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-full object-cover object-[70%_center] opacity-70 lg:w-[75%]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #24104F 0%, rgba(36,16,79,0.92) 28%, rgba(58,26,134,0.55) 55%, rgba(91,43,201,0.25) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: 'linear-gradient(0deg, rgba(36,16,79,0.6) 0%, transparent 100%)' }}
        />

        {/* IOT Coming Soon */}
        <button
          type="button"
          onClick={() => setShowComingSoonModal(true)}
          className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-6 sm:top-5 sm:text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 motion-safe:animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>
          IOT Coming Soon
        </button>

        {/* ── CONTENT ROW ─────────────────────────────────────────────────── */}
        <div className="relative z-10 grid items-center gap-6 px-5 pt-12 sm:px-8 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-4 lg:px-12 lg:pt-12">
          <div className="max-w-[580px]">
            <HeroContent />
            <HeroSearchBar city={selectedCity} />
          </div>

          {/* Location visual is simplified to the skyline on small screens */}
          <div className="hidden lg:block">
            <HeroLocationVisual properties={trendingProperties} />
          </div>
        </div>
      </section>

      {/* ── ACTION CARDS ───────────────────────────────────────────────────── */}
      <div className="relative z-10 -mt-16 grid grid-cols-2 gap-3 px-2 max-[359px]:grid-cols-1 sm:gap-4 sm:px-4 md:-mt-20 lg:grid-cols-4 lg:px-8">
        {cards.map((card, index) => (
          <PropertyActionCard
            key={card.title}
            index={index}
            title={card.title}
            description={card.description}
            image={card.image}
            onClick={() =>
              card.to === 'no' ? setShowLogin(true) : router.push(card.to)
            }
          />
        ))}
      </div>
    </div>
  );
}
