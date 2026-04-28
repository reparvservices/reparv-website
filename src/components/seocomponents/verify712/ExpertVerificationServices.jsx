import expertImg from "../../../assets/seopageassets/verify712/expert-image.svg";
import auditIcon from "../../../assets/seopageassets/verify712/audit.svg";
import historyIcon from "../../../assets/seopageassets/verify712/history.svg";
import legalIcon from "../../../assets/seopageassets/verify712/hammer.svg";
import headsetIcon from "../../../assets/seopageassets/verify712/headset.svg";

export default function ExpertVerificationServices() {
  return (
    <section className="bg-[#5B2DD8] py-12 sm:py-16">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Expert Verification Services by <br className="hidden sm:block" />
              Reparv
            </h2>

            <p className="text-sm sm:text-base text-white/80 mt-4 max-w-xl">
              Let our legal and property experts handle complete verification
              for you
            </p>

            {/* FEATURES */}
            <div className="space-y-6 mt-8">
              <Feature
                icon={auditIcon}
                title="Manual 7/12 Audit"
                text="Expert review of 7/12 extract for discrepancies, encumbrances, and legal issues"
              />

              <Feature
                icon={historyIcon}
                title="Ownership History Verification"
                text="Complete chain of title verification for past 30+ years to identify disputes"
              />

              <Feature
                icon={legalIcon}
                title="NA Conversion & Legal Guidance"
                text="Assistance with non-agricultural conversion process and legal documentation"
              />
            </div>

            {/* CTA */}
            <div className="mt-10">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-[#5B2DD8] font-semibold px-6 py-3 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:opacity-95 transition">
                <img src={headsetIcon} alt="" className="w-5 h-5" />
                Request Expert Verification
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE (DESKTOP ONLY) */}
          <div className="hidden lg:flex justify-end">
            <img
              src={expertImg}
              alt="Expert Verification"
              className="max-w-[420px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===============================
   FEATURE ITEM
   =============================== */

function Feature({ icon, title, text }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
        <img src={icon} alt="" className="w-5 h-5" />
      </div>

      <div>
        <h4 className="font-semibold text-base sm:text-lg">{title}</h4>
        <p className="text-sm text-white/80 mt-1 max-w-lg">{text}</p>
      </div>
    </div>
  );
}
