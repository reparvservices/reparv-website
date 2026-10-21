import { motion } from "framer-motion";
import { Building2, TrendingUp } from "lucide-react";

const STATS = [
  { value: "500+", label: "Active Listings", Icon: TrendingUp },
  { value: "20+", label: "Major Cities", Icon: Building2 },
];

export default function HeroContent() {
  return (
    <div className="flex flex-col">
      <motion.span
        className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        Live Near You
      </motion.span>

      <motion.h1
        className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl lg:text-[44px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06 }}
      >
        Discover Nearby
        <br />
        Properties
      </motion.h1>

      <motion.p
        className="mt-3 max-w-[460px] text-[15px] leading-relaxed text-white/80 sm:text-base lg:text-[17px]"
        style={{ textWrap: "balance" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
      >
        Find rental apartments, plots, flats and commercial properties near you.
      </motion.p>

      <motion.ul
        className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18 }}
      >
        {STATS.map(({ value, label, Icon }) => (
          <li key={label} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDE3FF]/20 text-white ring-1 ring-white/20">
              <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-white">{value}</span>
              <span className="block text-[11px] text-white/70">{label}</span>
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
