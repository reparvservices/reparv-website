import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

/** Centered "View All" link used under home page sections. */
export default function ViewAllButton({ href, label = "View All", className = "" }) {
  return (
    <div className={`flex justify-center mt-6 sm:mt-0 ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5E23DC] to-[#8A38F5] px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0px_4px_14px_rgba(94,35,220,0.35)] transition hover:opacity-95 active:scale-[0.98]"
      >
        {label}
        <FiArrowRight size={18} />
      </Link>
    </div>
  );
}
