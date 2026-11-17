import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../../store/auth";

const POINTS = [
  "Reach genuine buyers and tenants",
  "Your listing is verified by Reparv",
  "Track enquiries and site visits in one place",
];

/** Home page call-to-action: owners and agents listing a property. */
const ListPropertySection = () => {
  const router = useRouter();
  const { user, setShowLogin } = useAuth();

  const onList = () => (user ? router.push("/sell-properties") : setShowLogin(true));

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-6 lg:py-10">
      <div className="grid items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#24104F] via-[#3A1A86] to-[#5B2BC9] px-6 py-8 text-white sm:px-10 md:grid-cols-[1.2fr_1fr] lg:px-14 lg:py-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#CDB9FF]">
            For owners &amp; agents
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-4xl">
            List your property with <span className="text-[#FFB38A]">Reparv</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
            Post your property and reach genuine buyers or tenants.
          </p>
          <ul className="mt-5 space-y-2">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm sm:text-base">
                <FiCheckCircle className="shrink-0 text-[#FFB38A]" /> {p}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onList}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#5E23DC] shadow-lg transition hover:opacity-95 active:scale-[0.98] sm:text-base"
          >
            List Property
            <FiArrowRight size={18} />
          </button>
        </div>

        <div className="hidden justify-center md:flex">
          <img
            src="/assets/home/hero/list-property.webp"
            alt="List your property illustration"
            loading="lazy"
            decoding="async"
            className="h-56 w-auto object-contain lg:h-64"
          />
        </div>
      </div>
    </section>
  );
};

export default ListPropertySection;
