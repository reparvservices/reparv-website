import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Map as MapIcon, MapPin } from "lucide-react";

const RADIUS_OPTIONS = ["+2 km", "+5 km", "+10 km", "+20 km", "+50 km"];

function RadiusPicker({ radius, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Search radius ${radius}`}
        className="flex h-11 items-center gap-1 whitespace-nowrap rounded-full px-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
      >
        {radius}
        <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            className="absolute bottom-[calc(100%+8px)] left-0 z-[200] min-w-[110px] rounded-xl border border-slate-100 bg-white py-1 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.14 }}
          >
            {RADIUS_OPTIONS.map((r) => (
              <li key={r}>
                <button
                  type="button"
                  role="option"
                  aria-selected={radius === r}
                  onClick={() => {
                    onChange(r);
                    setOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm font-medium hover:bg-[#EDE3FF]/60 ${
                    radius === r ? "text-[#7029E8]" : "text-slate-700"
                  }`}
                >
                  {r}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HeroSearchBar({ city }) {
  const router = useRouter();
  const [radius, setRadius] = useState("+5 km");

  const goToMap = () => router.push("/map-view");

  return (
    <motion.div
      className="mt-6 w-full max-w-[560px]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.24 }}
    >
      {/* Mobile: stacked card. sm+: single pill. */}
      <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_8px_24px_rgba(30,10,80,0.18)] sm:h-[60px] sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-1.5">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3 sm:border-r sm:border-slate-200">
            <MapPin className="h-5 w-5 shrink-0 text-[#7029E8]" fill="#EDE3FF" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">Current Location</p>
              <p className="truncate text-sm font-semibold text-slate-900">Near {city}</p>
            </div>
          </div>
          <div className="border-l border-slate-200 pl-1 sm:border-l-0 sm:px-2">
            <RadiusPicker radius={radius} onChange={setRadius} />
          </div>
        </div>

        <motion.button
          type="button"
          onClick={goToMap}
          className="h-12 shrink-0 rounded-xl bg-[#7029E8] px-7 text-[15px] font-semibold text-white shadow-[0_4px_12px_rgba(112,41,232,0.35)] hover:bg-[#6020D0] sm:h-[46px] sm:rounded-full"
          whileTap={{ scale: 0.97 }}
        >
          Explore
        </motion.button>
      </div>

      <button
        type="button"
        onClick={goToMap}
        className="group mt-4 flex items-center gap-2 text-sm font-medium text-white"
      >
        <MapIcon className="h-4 w-4 opacity-85" aria-hidden="true" />
        View on Map Instead
        <span className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#EDE3FF] text-[#3F2D62] transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
        </span>
      </button>
    </motion.div>
  );
}
