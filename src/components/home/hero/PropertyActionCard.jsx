import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PropertyActionCard({ title, description, image, onClick, index = 0 }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-[0_4px_18px_rgba(30,10,80,0.08)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(112,41,232,0.16)] sm:p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.07, ease: "easeOut" }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-bold leading-tight text-[#3F2D62] sm:text-lg">{title}</h3>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EDE3FF] text-[#7029E8] transition-colors group-hover:bg-[#7029E8] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
        </span>
      </div>

      <p className="mt-1.5 text-xs leading-snug text-slate-500 sm:text-[13px]">{description}</p>

      <div className="mt-auto flex h-[96px] w-full items-end justify-center pt-3 sm:h-[128px] lg:h-[140px]">
        <img
          src={image}
          alt={`${title} illustration`}
          loading="lazy"
          decoding="async"
          className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    </motion.button>
  );
}
