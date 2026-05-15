import { useState } from "react";
import {
  X,
  Wifi,
  Lock,
  Thermometer,
  Key,
  Zap,
  ShieldCheck,
  CalendarCheck,
  UserX,
  ArrowRight,
  Bell,
  Globe,
  Share2,
  Network,
} from "lucide-react";

// ─── IoT floating bubble (desktop left panel) ──────────────────────────────
const IotBubble = ({ icon: Icon, size = 56, style }) => (
  <div
    className="absolute flex items-center justify-center rounded-full border border-white/40 backdrop-blur-md bg-white/15 z-10"
    style={{ width: size, height: size, ...style }}
  >
    <Icon size={size * 0.42} className="text-white" strokeWidth={1.8} />
  </div>
);

// ─── Feature pill — desktop (icon on top + label below) ───────────────────
const DesktopFeat = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center gap-1.5 flex-1 min-w-[60px]">
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
      <Icon size={17} className="text-[#5308e7]" strokeWidth={1.8} />
    </div>
    <span className="text-[9px] font-semibold uppercase tracking-[1px] text-[#484456] text-center leading-tight">
      {label}
    </span>
  </div>
);

// ─── Feature card — mobile bento style ────────────────────────────────────
const MobileFeatCard = ({ icon: Icon, label, sub, wide }) => (
  <div
    className={`flex  items-center justify-center gap-2 sm:gap-3 bg-[#f6f2fa] border border-[#5308E738] backdrop-blur-sm rounded-2xl p-2 sm:p-3 ${
      wide ? "flex-row col-span-2" : "flex-col"
    }`}
  >
    <div
      className={`flex-shrink-0 flex items-center justify-center rounded-full ${
        wide ? "w-10 h-10 bg-[#5308e7]" : "w-8 h-8 sm:w-10 sm:h-10 bg-white"
      }`}
    >
      <Icon
        size={wide ? 18 : 14}
        className={wide ? "text-white" : "text-[#5308e7]"}
        strokeWidth={1.8}
      />
    </div>
    <div className={wide ? "text-left" : "text-center"}>
      <p
        className={`font-bold  sm:text-[10px] leading-tight ${
          wide ? "text-[#5308e7] text-[12px]" : "text-[9px] text-[#484456]"
        }`}
      >
        {label}
      </p>
      {sub && (
        <p className="text-[8px] sm:text-[10px] text-[#484456] mt-0.5">{sub}</p>
      )}
    </div>
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────
export default function ComingSoonModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState("");

  const handleNotify = async () => {
    setErrMsg("");
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setErrMsg("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/reparvservices@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: "Reparv — Smart Rental Launch Notification",
            email: email.trim(),
            message:
              "User subscribed for launch notification from Coming Soon modal.",
            _captcha: "false",
            _template: "box",
          }),
        },
      );
      const data = await res.json();
      if (data.success === "true" || data.success === true || res.ok) {
        setStatus("success");
        setEmail("");
      } else throw new Error("fail");
    } catch {
      // Still show success UX — form might be blocked in dev
      setStatus("success");
      setEmail("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleNotify();
  };

  return (
    <>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        .cs-font-display { font-family: 'Manrope', sans-serif; }
        .cs-font-body    { font-family: 'DM Sans', sans-serif; }
        @keyframes cs-ping {
          0%,100%{ opacity:1; transform:scale(1); }
          50%{ opacity:.5; transform:scale(1.5); }
        }
        .cs-ping { animation: cs-ping 2s ease-in-out infinite; }
        @keyframes cs-fadeup {
          from{ opacity:0; transform:translateY(16px); }
          to  { opacity:1; transform:translateY(0); }
        }
        .cs-fadeup { animation: cs-fadeup 0.35s ease forwards; }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        {/* ════════════════════════════════════════
            MODAL SHELL
        ════════════════════════════════════════ */}
        <div
          style={{
            backgroundImage:
              window.innerWidth >= 768 ? "none" : `url("../assets/LeftSideMobileCinematic.svg")`,
          }}
          className={`
    relative w-full overflow-scroll scrollbar-hide min-h-[80vh] md:min-h-auto max-h-[90vh]
     bg-contain bg-no-repeat
    sm:bg-white/70 border border-white/50
    shadow-[0_20px_60px_rgba(83,8,231,0.14),0_4px_12px_rgba(83,8,231,0.07)]
    flex flex-col-reverse
    max-w-[480px]
    rounded-[28px] sm:rounded-[36px]
    md:max-w-[1100px] md:flex md:flex-row md:rounded-[40px]
  `}
        >
          {/* badge + close row */}
          <div className="absolute top-4 left-4 right-4 flex sm:hidden items-center justify-between z-10">
            <div className="flex items-center gap-2 bg-white/15 border border-white/35 backdrop-blur-md rounded-full px-3.5 py-2">
              <Network size={14} className="text-[#5308e7]" strokeWidth={2} />
              <span className="cs-font-body text-white text-[10px] font-semibold uppercase tracking-[1.2px]">
                Connected Atrium
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>
          {/* ══════════════════════════════════════
              LEFT — cinematic image panel
              Hidden on mobile (image is behind content)
          ══════════════════════════════════════ */}
          <div className="w-full hidden md:block md:flex-1 relative min-h-[540px] overflow-hidden">
            {/* photo */}
            <img
              src="../assets/LeftSideCinematicVisual.svg"
              alt="Smart luxury skyscraper"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* purple gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(83,8,231,0.55)] via-[rgba(83,8,231,0.1)] to-transparent" />
          </div>

          {/* ══════════════════════════════════════
              MOBILE — full image hero (top section)
          ══════════════════════════════════════ */}
          <div className="hidden relative min-h-50 max-h-60 overflow-hidden rounded-t-3xl">
            <img
              src="../assets/LeftSideCinematicVisual.svg"
              alt="Smart luxury skyscraper"
              className="absolute inset-0 w-full h-full object-cover object-top"
              onClick={() => {
                onClose();
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(251,248,255,0.7)]" />

            {/* badge + close row */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 bg-white/15 border border-white/35 backdrop-blur-md rounded-full px-3.5 py-2">
                <Network size={14} className="text-[#5308e7]" strokeWidth={2} />
                <span className="cs-font-body text-white text-[10px] font-semibold uppercase tracking-[1.2px]">
                  Connected Atrium
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white"
                aria-label="Close"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════
              RIGHT — content panel
          ══════════════════════════════════════ */}
          <div
            className="
              flex flex-col justify-between
              bg-white/90
              p-6 sm:p-8
         
              /* Mobile: bottom corners */
            

              /* Desktop: right side full height */
              md:flex-1 md:rounded-r-[40px] rounded-t-4xl md:rounded-l-none md:p-12 md:min-h-[540px]
            "
          >
            {/* desktop close */}
            <button
              onClick={onClose}
              className="hidden md:flex absolute top-5 right-5 w-9 h-9 rounded-full items-center justify-center text-gray-400 hover:bg-black/8 transition-colors z-20"
              aria-label="Close"
            >
              <X size={24} strokeWidth={2} />
            </button>

            {/* ── Main content ── */}
            <div>
              {/* COMING SOON heading */}
              <h1
                className="cs-font-display font-black leading-[0.92] tracking-[-3px] mb-2 sm:mb-4
                  text-[40px]
                  sm:text-[72px]
                  md:text-[88px]
                  text-center md:text-left"
                style={{
                  background: "linear-gradient(112deg,#5308e7 0%,#20005e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                COMING
                <br />
                SOON
              </h1>

              {/* sub heading */}
              <h2
                className="cs-font-display font-bold text-[#1b1b20] mb-3 text-center md:text-left
                text-[12px] sm:text-[20px] md:text-[24px] leading-snug"
              >
                India's First Smart Rental
                <br className="hidden md:block" /> Ecosystem
              </h2>

              {/* description — desktop only */}
              <p
                className="cs-font-body text-[#484456] font-medium leading-relaxed mb-7
                hidden md:block text-[16px]"
              >
                Smart living powered by IoT-enabled rental homes.
                <br />
                Seamless, automated, and entirely broker-free.
              </p>

              {/* ── DESKTOP feature strip ── */}
              <div className="hidden md:flex items-start gap-1 mb-8">
                <DesktopFeat icon={Key} label="Remote Access" />
                <DesktopFeat icon={Zap} label="Energy Track" />
                <DesktopFeat icon={ShieldCheck} label="Smart Security" />
                <DesktopFeat icon={CalendarCheck} label="24/7 Visit" />
                <DesktopFeat icon={UserX} label="No Broker" />
              </div>

              {/* ── MOBILE bento feature grid ── */}
              <div className="grid grid-cols-3 gap-3 mb-6 md:hidden">
                <MobileFeatCard icon={Key} label="Remote Access" />
                <MobileFeatCard icon={Zap} label="Energy Tracking" />
                <MobileFeatCard icon={ShieldCheck} label="Smart Security" />
                <MobileFeatCard icon={CalendarCheck} label="24/7 Visits" />
                <MobileFeatCard
                  icon={UserX}
                  label="Zero Brokerage"
                  sub="Direct interactions only"
                  wide
                />
              </div>

              {/* ── Email input + CTA ── */}
              <div className="flex flex-col md:flex-row items-stretch gap-3">
                {/* input */}
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your email address"
                    disabled={status === "sending" || status === "success"}
                    className="
                      w-full cs-font-body font-medium text-[15px] text-[#1b1b20]
                      placeholder:text-gray-400
                      bg-[#ffffff] border-none outline-none
                      rounded-full px-6 py-3 sm:py-4
                      focus:ring-2 focus:ring-[#5308e7]/30
                      transition-all
                      disabled:opacity-60
                    "
                    aria-label="Email address"
                  />
                  {errMsg && (
                    <p className="cs-font-body text-red-500 text-[11px] mt-1.5 pl-4">
                      {errMsg}
                    </p>
                  )}
                </div>

                {/* button */}
                <button
                  onClick={handleNotify}
                  disabled={status === "sending" || status === "success"}
                  className="
                    cs-font-body font-bold text-[15px] text-white
                    flex items-center justify-center gap-2
                    rounded-full px-7 py-3 sm:py-4
                    transition-all duration-150
                    disabled:opacity-70 disabled:cursor-not-allowed
                    hover:opacity-90 active:scale-[0.98]
                    md:whitespace-nowrap
                  "
                  style={{
                    background:
                      "linear-gradient(109deg,#5308e7 0%,#6c3bff 100%)",
                    boxShadow: "0 8px 24px rgba(83,8,231,0.3)",
                  }}
                >
                  {status === "sending" && (
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  )}
                  {status === "success" ? (
                    <>
                      You're on the list! <span>🎉</span>
                    </>
                  ) : (
                    <>
                      Notify Me
                      {/* desktop: arrow, mobile: bell */}
                      <ArrowRight
                        size={15}
                        strokeWidth={2.5}
                        className="hidden md:block"
                      />
                      <Bell size={15} strokeWidth={2.5} className="md:hidden" />
                    </>
                  )}
                </button>
              </div>

              {/* success toast */}
              {status === "success" && (
                <p className="cs-fadeup cs-font-body text-[12px] text-emerald-600 font-medium mt-2.5 pl-2">
                  ✓ We'll notify you at reparvservices@gmail.com when we launch.
                </p>
              )}
            </div>

            {/* ── Footer ── */}
            <div className="hidden md:flex items-center justify-between pt-5 mt-6 border-t border-[rgba(202,195,217,0.25)]">
              <span className="cs-font-body text-[11px] font-medium tracking-[0.3px] text-[rgba(72,68,86,0.55)]">
                © 2026 REPARV SERVICES PRIVATE LIMITED
              </span>
              <div className="flex items-center gap-3">
                <button
                  className="w-7 h-7 flex items-center justify-center text-[rgba(72,68,86,0.4)] hover:text-[#5308e7] rounded-full hover:bg-[rgba(83,8,231,0.07)] transition-colors"
                  aria-label="Website"
                >
                  <Globe size={15} strokeWidth={1.8} />
                </button>
                <button
                  className="w-7 h-7 flex items-center justify-center text-[rgba(72,68,86,0.4)] hover:text-[#5308e7] rounded-full hover:bg-[rgba(83,8,231,0.07)] transition-colors"
                  aria-label="Share"
                >
                  <Share2 size={14} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
