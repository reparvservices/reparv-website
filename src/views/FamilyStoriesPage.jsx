"use client";

import { useState } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const AlarmIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2 2" />
    <path d="M5 3L2 6M22 6l-3-3" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ShieldSmIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ background: "#fff", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}
        className="hero-grid">
        {/* Text */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#EDE9FF", borderRadius: 999, padding: "8px 16px",
            fontSize: 13, fontWeight: 600, color: "#4500B4", marginBottom: 24,
          }}>
            <ShieldIcon /> Based on Real Family Experiences
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800,
            lineHeight: 1.15, color: "#4500B4", marginBottom: 20, letterSpacing: "-0.02em",
          }}>
            Family Decision Stories –<br />
            How Families Aligned<br />
            Before Buying a Home
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#64748b", maxWidth: 520 }}>
            Real stories of families navigating different opinions, emotional pressure, and
            priorities—before reaching a decision everyone felt confident about.
          </p>
        </div>

        {/* Illustration */}
        <div className="hero-illustration" style={{ borderRadius: 24, overflow: "hidden" }}>
          <img
            src="/assets/seoPages/familyDecision/hero.svg"
            alt="Happy family standing in front of their new home"
            className="w-full h-[380px] object-cover rounded-2xl"
          />
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 1023px) {
          .hero-illustration { display: none; }
        }
      `}</style>
    </section>
  );
}

// ─── WhyHard ──────────────────────────────────────────────────────────────────

function WhyHard() {
  return (
    <section style={{ background: "#F8F6FF", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "#111827", marginBottom: 16 }}>
            Why Family Decisions Feel Hard
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4b5563" }}>
            Buying a home is rarely an individual decision. It directly affects the daily life,
            comfort, and security of everyone in the family.
          </p>
        </div>

        <div className="why-grid">
          {/* Card 1 — lavender tint */}
          <div style={{ background: "#F0EBFF", border: "1px solid #E0D5FF", borderRadius: 20, padding: "36px 32px", display: "flex", flexDirection: "column" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#EEE8FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#4500B4", marginBottom: 20 }}>
              <EyeIcon />
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#374151" }}>
              Parents, spouses, and children often look at the same home through very different
              lenses — safety, location, budget, schools, or long-term stability.
            </p>
          </div>

          {/* Card 2 — white */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, padding: "36px 32px", display: "flex", flexDirection: "column" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#EEE8FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#4500B4", marginBottom: 20 }}>
              <AlarmIcon />
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#374151" }}>
              Because of this, most delays and stress in family home buying are caused by
              misalignment of expectations, not a lack of money or options.
            </p>
          </div>

          {/* Card 3 — deep violet quote */}
          <div style={{ background: "#5323DC", border: "1px solid #5323DC", borderRadius: 20, padding: "36px 32px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, color: "rgba(255,255,255,0.3)", marginBottom: 12, fontFamily: "Georgia, serif" }}>
              "
            </div>
            <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.65, color: "#fff", flex: 1 }}>
              Every family you'll read about here faced the same disagreements, pauses, and
              emotional pressure.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .why-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) { .why-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .why-grid { grid-template-columns: 1fr 1fr 1fr; } }
      `}</style>
    </section>
  );
}

// ─── WhereDifferent ───────────────────────────────────────────────────────────

const conflicts = [
  { title: "Parents vs Budget", desc: "Safety and long-term security often clash with what the budget actually allows, creating repeated family standoffs." },
  { title: "Kids' Schools vs Location", desc: "The school zone the children need is rarely the locality the commute or lifestyle priorities point toward." },
  { title: "Spouse Lifestyle vs Commute", desc: "Daily comfort preferences often conflict with the distance and time required to reach the workplace." },
  { title: "Safety vs Price", desc: "The safest neighbourhoods often carry a premium that pushes beyond what the family had planned to spend." },
];

function WhereDifferent() {
  return (
    <section style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "#111827", marginBottom: 16 }}>
            Where Families Often See Things Differently
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4b5563" }}>
            These are the most common points where families feel stuck or divided while
            deciding on a home.
          </p>
        </div>

        <div className="conflict-grid">
          {conflicts.map((item) => (
            <div key={item.title} style={{
              background: "#F8F6FF", border: "1px solid #E8E0FF", borderRadius: 16,
              padding: "24px", transition: "box-shadow 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#C4B0FF"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(69,0,180,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E0FF"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#6B46FE", marginBottom: 16 }} />
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#4500B4", marginBottom: 8, lineHeight: 1.4 }}>{item.title}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#64748b" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .conflict-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 600px) { .conflict-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .conflict-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }
      `}</style>
    </section>
  );
}

// ─── FamilyStories ────────────────────────────────────────────────────────────

// Agnihotri scene: Indian family (woman in sari, man, child) sitting at a table
// with a bright window, curtains, plant, and wall art in the background.
function AgnihotriScene() {
  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Background wall — warm off-white */}
      <rect width="600" height="400" fill="#E8E0D4" />

      {/* Window — large, bright, with curtains */}
      <rect x="310" y="0" width="290" height="260" fill="#B8D4E8" />
      {/* Window panes */}
      <rect x="310" y="0" width="144" height="126" fill="#C8E0F4" opacity="0.9" />
      <rect x="458" y="0" width="142" height="126" fill="#C8E0F4" opacity="0.9" />
      <rect x="310" y="130" width="144" height="126" fill="#C8E0F4" opacity="0.85" />
      <rect x="458" y="130" width="142" height="126" fill="#C8E0F4" opacity="0.85" />
      {/* Window frame */}
      <rect x="452" y="0" width="6" height="260" fill="#D8CABA" />
      <rect x="310" y="126" width="290" height="6" fill="#D8CABA" />
      {/* Window sill */}
      <rect x="305" y="258" width="295" height="10" rx="2" fill="#C8B898" />
      {/* Green leaves outside */}
      <ellipse cx="370" cy="40" rx="55" ry="42" fill="#5A9E50" opacity="0.55" />
      <ellipse cx="430" cy="20" rx="48" ry="38" fill="#4E8E44" opacity="0.5" />
      <ellipse cx="500" cy="50" rx="42" ry="35" fill="#60A856" opacity="0.45" />

      {/* Left teal curtain */}
      <path d="M310 0 C295 40 300 120 308 200 L310 260 L280 260 L270 0 Z" fill="#4A8A8A" opacity="0.75" />
      <path d="M270 0 C260 50 265 140 272 220" stroke="#3A7A7A" strokeWidth="2" fill="none" opacity="0.4" />
      {/* Right teal curtain */}
      <path d="M600 0 C615 40 610 120 602 200 L600 260 L620 260 L630 0 Z" fill="#4A8A8A" opacity="0.65" />

      {/* Wall art — top right of wall area */}
      <rect x="230" y="20" width="64" height="80" rx="5" fill="#D4C5A8" />
      <rect x="234" y="24" width="56" height="72" rx="3" fill="#C89870" opacity="0.5" />
      <ellipse cx="262" cy="55" rx="18" ry="22" fill="#E8A87C" opacity="0.6" />
      <rect x="255" y="94" width="14" height="6" rx="1" fill="#B8986A" opacity="0.5" />

      {/* Floor */}
      <rect x="0" y="310" width="600" height="90" fill="#D4C4A0" opacity="0.6" />
      {/* Floor highlight line */}
      <line x1="0" y1="310" x2="600" y2="310" stroke="#C4B490" strokeWidth="2" opacity="0.4" />

      {/* Dining table surface */}
      <ellipse cx="290" cy="318" rx="240" ry="32" fill="#A07848" opacity="0.7" />
      <rect x="55" y="308" width="475" height="22" rx="4" fill="#B88850" opacity="0.75" />
      {/* Table edge highlight */}
      <rect x="55" y="308" width="475" height="5" rx="2" fill="#C89860" opacity="0.5" />

      {/* Mugs on table */}
      <rect x="200" y="290" width="26" height="22" rx="5" fill="#F5F0E8" opacity="0.95" />
      <path d="M226 296 Q234 300 226 308" stroke="#D4C8B0" strokeWidth="2" fill="none" />
      <rect x="300" y="288" width="26" height="22" rx="5" fill="#F5F0E8" opacity="0.9" />
      <path d="M326 294 Q334 298 326 306" stroke="#D4C8B0" strokeWidth="2" fill="none" />
      {/* Plate */}
      <ellipse cx="250" cy="306" rx="22" ry="5" fill="#E8E0D0" opacity="0.7" />

      {/* ── Person 1: Woman in sari (left) ── */}
      {/* Body / sari — orange-red with teal drape */}
      <path d="M72 230 Q110 245 148 230 L155 380 H65 Z" fill="#D4502A" />
      {/* Sari drape across shoulder */}
      <path d="M72 235 Q55 270 60 320 Q65 340 72 360" stroke="#4A9090" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.75" />
      <path d="M72 235 Q55 270 60 320" stroke="#3A8080" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Blouse detail */}
      <path d="M75 240 Q110 250 145 240" stroke="#B83C1A" strokeWidth="3" fill="none" opacity="0.4" />
      {/* Neck */}
      <rect x="100" y="192" width="20" height="24" rx="5" fill="#C8906A" />
      {/* Head */}
      <circle cx="110" cy="175" r="34" fill="#C8906A" />
      {/* Hair — bun style */}
      <path d="M80 158 Q110 138 140 158 Q138 135 110 128 Q82 135 80 158Z" fill="#1A0E06" />
      <ellipse cx="128" cy="140" rx="12" ry="9" fill="#1A0E06" />
      {/* Bun */}
      <circle cx="130" cy="138" r="8" fill="#2A1A0A" />
      {/* Ear jewelry */}
      <circle cx="78" cy="178" r="4" fill="#D4A030" opacity="0.9" />
      {/* Necklace */}
      <path d="M90 200 Q110 210 130 200" stroke="#D4A030" strokeWidth="3" fill="none" opacity="0.8" />
      {/* Face — smiling, looking right */}
      <ellipse cx="116" cy="178" rx="5" ry="3" fill="#A06840" opacity="0.25" />
      <path d="M98 183 Q110 190 122 183" stroke="#8B5A32" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="103" cy="173" r="2.5" fill="#6B3820" opacity="0.5" />
      <circle cx="118" cy="172" r="2.5" fill="#6B3820" opacity="0.5" />
      {/* Eyebrows */}
      <path d="M99 167 Q106 163 113 165" stroke="#3A2010" strokeWidth="1.5" fill="none" />
      <path d="M116 164 Q122 161 129 163" stroke="#3A2010" strokeWidth="1.5" fill="none" />

      {/* ── Person 2: Man (center) ── */}
      {/* Body — teal/blue shirt */}
      <rect x="228" y="218" width="80" height="162" rx="10" fill="#3A7898" />
      {/* Shirt collar */}
      <path d="M248 222 L268 235 L288 222" stroke="#2A6080" strokeWidth="2" fill="none" />
      {/* Neck */}
      <rect x="254" y="190" width="20" height="26" rx="5" fill="#B87858" />
      {/* Head */}
      <circle cx="264" cy="168" r="38" fill="#C08060" />
      {/* Hair — short dark */}
      <path d="M228 155 Q264 130 300 155 Q298 128 264 118 Q230 128 228 155Z" fill="#1A0E06" />
      {/* Beard */}
      <path d="M240 190 Q264 202 288 190 Q286 200 264 206 Q242 200 240 190Z" fill="#2A1608" opacity="0.65" />
      {/* Face */}
      <path d="M248 178 Q264 186 280 178" stroke="#8B5030" strokeWidth="1.5" fill="none" opacity="0.7" />
      <circle cx="252" cy="168" r="3" fill="#5A3018" opacity="0.55" />
      <circle cx="276" cy="167" r="3" fill="#5A3018" opacity="0.55" />
      <path d="M248 160 Q255 156 262 158" stroke="#2A1608" strokeWidth="1.5" fill="none" />
      <path d="M266 157 Q273 154 280 157" stroke="#2A1608" strokeWidth="1.5" fill="none" />

      {/* ── Person 3: Child (right) ── */}
      {/* Body — yellow polo */}
      <rect x="368" y="248" width="58" height="132" rx="8" fill="#D4A030" />
      {/* Polo collar */}
      <path d="M380 252 L397 261 L414 252" stroke="#B88020" strokeWidth="2" fill="none" />
      {/* Neck */}
      <rect x="384" y="222" width="16" height="22" rx="4" fill="#C8906A" />
      {/* Head */}
      <circle cx="392" cy="205" r="28" fill="#D09870" />
      {/* Hair */}
      <path d="M366 194 Q392 176 418 194 Q416 174 392 166 Q368 174 366 194Z" fill="#1A0E06" />
      {/* Face */}
      <path d="M381 212 Q392 219 403 212" stroke="#8B5832" strokeWidth="1.5" fill="none" opacity="0.65" />
      <circle cx="384" cy="204" r="2.5" fill="#5A3820" opacity="0.55" />
      <circle cx="400" cy="203" r="2.5" fill="#5A3820" opacity="0.55" />
      <path d="M380 197 Q386 194 392 196" stroke="#2A1608" strokeWidth="1.2" fill="none" />
      <path d="M392 195 Q398 193 404 195" stroke="#2A1608" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

// Sharma scene: father + child standing at a large floor-to-ceiling window,
// city skyline visible outside, unfinished/newly built flat aesthetic.
function SharmaScene() {
  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Room background — bare concrete/plaster */}
      <rect width="600" height="400" fill="#D8E0E8" />

      {/* Large floor-to-ceiling window — full left portion */}
      <rect x="60" y="0" width="380" height="340" fill="#A8C8E0" opacity="0.6" />
      {/* Sky gradient inside window */}
      <rect x="60" y="0" width="380" height="180" fill="#B8D8F0" opacity="0.75" />
      <rect x="60" y="180" width="380" height="160" fill="#A0C0D8" opacity="0.6" />

      {/* City skyline through window */}
      <rect x="70" y="180" width="28" height="155" rx="2" fill="#8090A8" opacity="0.55" />
      <rect x="104" y="145" width="38" height="190" rx="2" fill="#7080A0" opacity="0.5" />
      <rect x="148" y="165" width="32" height="170" rx="2" fill="#8090A8" opacity="0.5" />
      <rect x="186" y="120" width="44" height="215" rx="2" fill="#6878A0" opacity="0.55" />
      <rect x="236" y="148" width="36" height="188" rx="2" fill="#7888A8" opacity="0.5" />
      <rect x="278" y="170" width="50" height="166" rx="2" fill="#8090A8" opacity="0.45" />
      <rect x="334" y="192" width="40" height="144" rx="2" fill="#7888A0" opacity="0.45" />
      {/* Building windows dots */}
      {[110, 132, 154].map(y =>
        [108, 120, 132].map(x => (
          <rect key={`${x}-${y}`} x={x} y={y} width="5" height="4" rx="1" fill="#F0E890" opacity="0.4" />
        ))
      )}
      {[125, 147, 169].map(y =>
        [192, 206, 220].map(x => (
          <rect key={`${x}-${y}`} x={x} y={y} width="5" height="4" rx="1" fill="#F0E890" opacity="0.35" />
        ))
      )}

      {/* Window frame — vertical and horizontal bars */}
      <rect x="56" y="0" width="6" height="340" fill="#C8D4DC" />
      <rect x="438" y="0" width="6" height="340" fill="#C8D4DC" />
      <rect x="246" y="0" width="5" height="340" fill="#C8D4DC" opacity="0.7" />
      <rect x="60" y="168" width="384" height="5" fill="#C8D4DC" opacity="0.6" />

      {/* Bare floor */}
      <rect x="0" y="338" width="600" height="62" fill="#C8B898" opacity="0.55" />
      <line x1="0" y1="338" x2="600" y2="338" stroke="#B8A888" strokeWidth="2" opacity="0.5" />

      {/* Right wall — plain with paint bucket suggestion */}
      <rect x="490" y="0" width="110" height="340" fill="#D0D8E0" opacity="0.5" />
      {/* Paint roller / construction hint */}
      <rect x="520" y="200" width="12" height="80" rx="3" fill="#B0B8C0" opacity="0.45" />
      <rect x="512" y="195" width="28" height="18" rx="4" fill="#A0A8B0" opacity="0.4" />
      {/* Paint bucket */}
      <rect x="510" y="310" width="36" height="28" rx="4" fill="#9098A8" opacity="0.45" />
      <rect x="514" y="306" width="28" height="6" rx="2" fill="#8090A0" opacity="0.4" />

      {/* ── Father (left) ── */}
      {/* Body — grey casual shirt */}
      <rect x="218" y="240" width="72" height="160" rx="10" fill="#607890" />
      {/* Arms slightly out — left arm toward child */}
      <path d="M218 260 Q195 290 198 320" stroke="#607890" strokeWidth="22" strokeLinecap="round" fill="none" />
      {/* Neck */}
      <rect x="240" y="210" width="20" height="28" rx="5" fill="#C09070" />
      {/* Head */}
      <circle cx="250" cy="188" r="36" fill="#C08868" />
      {/* Hair */}
      <path d="M216 176 Q250 152 284 176 Q282 150 250 140 Q218 150 216 176Z" fill="#1A0E06" />
      {/* Face — looking toward window */}
      <path d="M235 196 Q250 204 265 196" stroke="#8B5030" strokeWidth="1.5" fill="none" opacity="0.65" />
      <circle cx="238" cy="186" r="3" fill="#5A3018" opacity="0.5" />
      <circle cx="262" cy="185" r="3" fill="#5A3018" opacity="0.5" />
      <path d="M234 178 Q242 174 250 176" stroke="#2A1608" strokeWidth="1.5" fill="none" />
      <path d="M252 175 Q260 172 268 174" stroke="#2A1608" strokeWidth="1.5" fill="none" />
      {/* Beard hint */}
      <path d="M228 200 Q250 210 272 200 Q270 208 250 213 Q230 208 228 200Z" fill="#2A1608" opacity="0.5" />

      {/* ── Child (right of father) ── */}
      {/* Body — orange top */}
      <rect x="304" y="280" width="52" height="120" rx="8" fill="#D07030" />
      {/* Father's hand on child's shoulder */}
      <path d="M290 268 Q308 272 312 282" stroke="#607890" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Neck */}
      <rect x="316" y="254" width="16" height="22" rx="4" fill="#D09870" />
      {/* Head */}
      <circle cx="324" cy="236" r="26" fill="#D09870" />
      {/* Hair */}
      <path d="M300 225 Q324 208 348 225 Q346 206 324 198 Q302 206 300 225Z" fill="#1A0E06" />
      {/* Face */}
      <path d="M313 243 Q324 250 335 243" stroke="#8B5832" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="315" cy="234" r="2.5" fill="#5A3820" opacity="0.5" />
      <circle cx="333" cy="233" r="2.5" fill="#5A3820" opacity="0.5" />
    </svg>
  );
}

const stories = [
  {
    seed: 0,
    meta: ["Joint Family", "Nagpur", "Renting"],
    title: "The Agnihotri Journey",
    videoLabel: "Family Reflection",
    videoDuration: "2:45",
    videoCaption: "Optional short reflection from the family.",
    priorities: [
      "Parents: safety & stability",
      "Spouse: location & convenience",
      "Buyer: affordability",
    ],
    stressPhase: "Repeated discussions, delays, and growing self-doubt.",
    clarityMoment: "Area comparison aligned expectations across the family.",
    clarityOutcome: "Feeling aligned mattered more than price.",
  },
  {
    seed: 1,
    meta: ["Nuclear Family", "Pune", "Buying"],
    title: "The Sharma Alignment",
    videoLabel: "Watch Reflection",
    videoDuration: "3:12",
    videoCaption: "Navigating 'The Perfect' Search.",
    priorities: [
      "Parents: closeness to school",
      "Spouse: kitchen size & light",
      "Buyer: resale value",
    ],
    stressPhase: "Conflict over location vs. amenities led to a 3-month pause.",
    clarityMoment: "Structured guidance helped prioritize features over location.",
    clarityOutcome: "We realized square footage wasn't the goal—joy was.",
  },
];

function StoryCard({ story, reverse }) {
  const Scene = story.seed === 0 ? AgnihotriScene : SharmaScene;

  const imagePanel = (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Image container — rounded, no border, overflow hidden */}
      <div style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        aspectRatio: "16/10",
        background: story.seed === 0
          ? "linear-gradient(135deg,#C8DDEF 0%,#D8E8F4 100%)"
          : "linear-gradient(135deg,#C8D8E8 0%,#D4E0EC 100%)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
      }}>
        <Scene />

        {/* Play button — centered */}
        <button
          aria-label={`Play ${story.title} video`}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 64, height: 64,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.93)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center",
            justifyContent: "center",
            paddingLeft: 4,
            color: "#4500B4",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            transition: "transform 0.2s, background 0.2s",
            zIndex: 2,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1.1)"; e.currentTarget.style.background = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translate(-50%,-50%) scale(1)"; e.currentTarget.style.background = "rgba(255,255,255,0.93)"; }}>
          <PlayIcon />
        </button>

        {/* Bottom badge */}
        <div style={{
          position: "absolute", bottom: 14, left: 14,
          background: "rgba(15,15,25,0.60)",
          backdropFilter: "blur(6px)",
          borderRadius: 8,
          padding: "5px 13px",
          fontSize: 12, fontWeight: 600, color: "#fff",
          zIndex: 2, letterSpacing: "0.01em",
        }}>
          {story.videoLabel} • {story.videoDuration}
        </div>
      </div>

      {/* Caption below image */}
      {story.videoCaption && (
        <p style={{
          fontSize: 12, color: "#94a3b8",
          textAlign: "center", margin: 0,
          letterSpacing: "0.01em",
        }}>
          {story.videoCaption}
        </p>
      )}
    </div>
  );

  const contentPanel = (
    <div style={{
      display: "flex", flexDirection: "column",
      justifyContent: "center", gap: 0,
      padding: "8px 0",
    }}>
      {/* Meta tags */}
      <div style={{
        display: "flex", flexWrap: "wrap",
        alignItems: "center", gap: 0,
        marginBottom: 14,
      }}>
        {story.meta.map((m, i) => (
          <span key={m} style={{
            fontSize: 11, fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.07em", color: "#94a3b8",
          }}>
            {i > 0 && <span style={{ margin: "0 6px", opacity: 0.5 }}>·</span>}
            {m}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: "clamp(24px, 2.8vw, 34px)",
        fontWeight: 800, lineHeight: 1.15,
        color: "#4500B4", marginBottom: 24,
        letterSpacing: "-0.01em",
      }}>
        {story.title}
      </h3>

      {/* Different Priorities */}
      <div style={{ marginBottom: 20 }}>
        <p style={{
          fontSize: 13, fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em", color: "#4500B4",
          marginBottom: 10,
        }}>
          Different Priorities
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5 }}>
          {story.priorities.map(p => (
            <li key={p} style={{
              fontSize: 14, lineHeight: 1.65,
              color: "#374151", paddingLeft: 14, position: "relative",
            }}>
              <span style={{ position: "absolute", left: 0, color: "#C4B0FF", fontWeight: 700 }}>–</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Emotional Stress Phase */}
      <div style={{ marginBottom: 20 }}>
        <p style={{
          fontSize: 13, fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em", color: "#4500B4",
          marginBottom: 8,
        }}>
          Emotional Stress Phase
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#374151", margin: 0 }}>
          {story.stressPhase}
        </p>
      </div>

      {/* Clarity Moment — left border blockquote style */}
      <div style={{
        borderLeft: "3px solid #7C3AED",
        background: "#F5F3FF",
        borderRadius: "0 12px 12px 0",
        padding: "16px 20px",
        marginBottom: 28,
      }}>
        <p style={{
          fontSize: 12, fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em", color: "#7C3AED",
          marginBottom: 8,
        }}>
          Clarity Moment
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.72, color: "#374151", margin: 0 }}>
          {story.clarityMoment}
        </p>
        <p style={{
          fontSize: 13, lineHeight: 1.65,
          color: "#5b21b6", margin: "8px 0 0",
          fontStyle: "italic",
        }}>
          "{story.clarityOutcome}"
        </p>
      </div>

      {/* CTA */}
      <a href="#"
        style={{
          display: "inline-flex", alignItems: "center",
          gap: 6, fontSize: 14, fontWeight: 800,
          color: "#4500B4", textDecoration: "none",
        }}
        onMouseEnter={e => { e.currentTarget.querySelector(".arr").style.transform = "translateX(5px)"; }}
        onMouseLeave={e => { e.currentTarget.querySelector(".arr").style.transform = "translateX(0)"; }}>
        Read Full Family Story
        <span className="arr" style={{ transition: "transform 0.2s", display: "flex" }}>
          <ArrowIcon />
        </span>
      </a>
    </div>
  );

  return (
    <article style={{ marginBottom: 72 }}>
      <div className={`sc-inner${reverse ? " sc-rev" : ""}`}>
        <div className="sc-text">{contentPanel}</div>
        <div className="sc-img">{imagePanel}</div>
      </div>

      <style>{`
        .sc-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        .sc-text { order: 2; }
        .sc-img  { order: 1; }
        @media (min-width: 1024px) {
          .sc-inner { grid-template-columns: 1fr 1fr; gap: 72px; }
          .sc-text  { order: 1; }
          .sc-img   { order: 2; }
          .sc-inner.sc-rev .sc-text { order: 2; }
          .sc-inner.sc-rev .sc-img  { order: 1; }
        }
      `}</style>
    </article>
  );
}

function FamilyStories() {
  return (
    <section style={{ background: "#fff", padding: "72px 24px 40px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        {stories.map((s, i) => (
          <StoryCard key={s.title} story={s} reverse={i % 2 !== 0} />
        ))}

        <div style={{ display: "flex", justifyContent: "center", paddingTop: 8, paddingBottom: 24 }}>
          <button style={{
            border: "2px solid #4500B4", borderRadius: 12,
            padding: "14px 40px", fontSize: 14, fontWeight: 700,
            color: "#4500B4", background: "transparent",
            cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#4500B4"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4500B4"; }}>
            View More Family Stories
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── WhatLearned ─────────────────────────────────────────────────────────────

const learned = [
  { icon: <CheckIcon />, label: "Alignment matters more than speed" },
  { icon: <PinIcon />, label: "Area decisions shape daily life" },
  { icon: <ChatIcon />, label: "Open conversations reduce regret" },
  { icon: <ShieldSmIcon />, label: "Early alignment prevents burnout" },
  { icon: <GridIcon />, label: "Structure beats emotion" },
];

function WhatLearned() {
  return (
    <section style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "#4500B4", marginBottom: 16 }}>
            What These Families Learned
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#4b5563", maxWidth: 760 }}>
            After navigating disagreements, delays, and emotional pressure, these families walked
            away with clarity that went far beyond just choosing a home.
          </p>
        </div>

        <div className="learned-grid">
          {learned.map((item) => (
            <div key={item.label} style={{
              border: "1px solid #e5e7eb", borderRadius: 16, padding: "28px 20px",
              display: "flex", flexDirection: "column", alignItems: "center",
              textAlign: "center", background: "#fff", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#C4B0FF"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(69,0,180,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", background: "#EEE8FF",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#4500B4", marginBottom: 20,
              }}>
                {item.icon}
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.55, color: "#374151", margin: 0 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .learned-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 768px) { .learned-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .learned-grid { grid-template-columns: repeat(5, 1fr); gap: 20px; } }
      `}</style>
    </section>
  );
}

// ─── HowHelps ─────────────────────────────────────────────────────────────────

function HowHelps() {
  return (
    <div style={{ position: "relative" }}>
      {/* Purple gradient banner — text lives in top portion */}
      <section style={{
        background: "linear-gradient(135deg, #5B21B6 0%, #4500B4 40%, #6D28D9 100%)",
        padding: "80px 24px 140px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 800, color: "#fff",
            lineHeight: 1.15, marginBottom: 28, letterSpacing: "-0.01em",
          }}>
            How This Helps Your Family
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.82)", marginBottom: 20 }}>
            If your family is facing confusion or hesitation, these stories are meant to
            reassure you — not pressure you.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.82)", marginBottom: 20 }}>
            Disagreement is normal. Clarity comes from shared understanding.
          </p>
          <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>
            The right approach helps families arrive at alignment naturally.
          </p>
        </div>
      </section>

      {/* Cards — absolutely positioned to straddle the bottom edge */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0, right: 0,
        transform: "translateY(50%)",
        padding: "0 24px",
        zIndex: 10,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }} className="helps-cards">
          {/* Card 1 — ghost/lavender button */}
          <div style={{
            background: "#fff",
            borderRadius: 20,
            padding: "36px 40px",
            boxShadow: "0 8px 40px rgba(69,0,180,0.10)",
          }}>
            <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "#4500B4", marginBottom: 10, lineHeight: 1.3 }}>
              Explore More Family Decision Stories
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6b7280", marginBottom: 28 }}>
              Read more journeys where families found alignment before committing.
            </p>
            <button style={{
              background: "#EDE9FF", color: "#4500B4", border: "none",
              borderRadius: 10, padding: "13px 28px",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              transition: "background 0.2s",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#DDD5FF"}
              onMouseLeave={e => e.currentTarget.style.background = "#EDE9FF"}>
              Explore Stories →
            </button>
          </div>

          {/* Card 2 — solid violet button */}
          <div style={{
            background: "#fff",
            borderRadius: 20,
            padding: "36px 40px",
            boxShadow: "0 8px 40px rgba(69,0,180,0.10)",
          }}>
            <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "#4500B4", marginBottom: 10, lineHeight: 1.3 }}>
              Join a Free Home Buying Guidance Session
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6b7280", marginBottom: 28 }}>
              A calm, no-pressure session designed for families.
            </p>
            <button style={{
              background: "#4500B4", color: "#fff", border: "none",
              borderRadius: 10, padding: "13px 28px",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              transition: "background 0.2s",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#3700a0"}
              onMouseLeave={e => e.currentTarget.style.background = "#4500B4"}>
              Join Session →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .helps-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .helps-cards { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  { q: "Are these real family stories?", a: "Yes, every story is based on real families who worked through their home buying decisions with guidance from Reparv advisors." },
  { q: "Is this useful if we are not a family?", a: "Absolutely. Any shared decision involving multiple stakeholders — roommates, partners, or business partners — will relate to these dynamics." },
  { q: "Can parents attend guidance sessions?", a: "Yes. Our guidance sessions are designed to include all key decision makers, including parents and extended family members." },
  { q: "Is there a fee for this?", a: "The family stories and most guidance content are free. Personalised advisory sessions may be available on a case-by-case basis." },
  { q: "Do you need to be ready to buy?", a: "Not at all. Many families start the alignment process months before they are ready to buy, which is often the healthiest approach." },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ background: "#fff", padding: "0 24px 80px", paddingTop: "clamp(160px, 18vw, 200px)" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#4500B4", marginBottom: 40 }}>
          Frequently Asked Questions
        </h2>
        <div style={{ borderTop: "1px solid #e5e7eb" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between",
                  alignItems: "center", gap: 16, padding: "22px 0",
                  background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ flexShrink: 0, color: "#4500B4" }}><ChevronDown open={open === i} /></span>
              </button>
              {open === i && (
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "#4b5563", margin: "0 0 20px" }}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function FamilyStoriesPage() {
  return (
    <main style={{ minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <Hero />
      <WhyHard />
      <WhereDifferent />
      <FamilyStories />
      <WhatLearned />
      <HowHelps />
      <FAQ />
    </main>
  );
}