'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '@/store/auth';

// ─── Speech-bubble price tag ──────────────────────────────────────────────
function PriceTag({ price, x, y, selected = false, delay = 0 }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -100%)',
        zIndex: 10,
      }}
      initial={{ opacity: 0, y: 8, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: [0.34, 1.2, 0.64, 1] }}
    >
      {/* Bubble body */}
      <div
        style={{
          background: selected ? '#7C3AED' : '#FFFFFF',
          border: selected ? 'none' : '1px solid #E2E8F0',
          borderRadius: '20px',
          padding: '8px 12px',
          boxShadow:
            '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '16px',
            color: selected ? '#FFFFFF' : '#7C3AED',
            whiteSpace: 'nowrap',
          }}
        >
          {price}
        </span>
      </div>

      {/* Triangle tail */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: selected ? '8px solid #7C3AED' : '8px solid #FFFFFF',
          marginTop: '-1px',
        }}
      />
    </motion.div>
  );
}

// ─── Pulsing location dot ─────────────────────────────────────────────────────
function PulseDot({ x, y, delay = 0 }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%,-50%)',
        zIndex: 5,
      }}
    >
      <motion.div
        className="rounded-full"
        style={{
          width: 28,
          height: 28,
          background: 'rgba(159,103,255,0.25)',
          position: 'absolute',
          top: -14,
          left: -14,
        }}
        animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
        transition={{
          duration: 2.5,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: 9999,
          background: '#A78BFA',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  );
}

const RADIUS_OPTIONS = ['+2 km', '+5 km', '+10 km', '+20 km', '+50 km'];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomeImage() {
  const router = useRouter();

  const { user, setShowLogin, selectedCity, setShowComingSoonModal } =
    useAuth();

  const [radius, setRadius] = useState('+5 km');
  const [showRadius, setShowRadius] = useState(false);

  const cards = [
    {
      to: user ? '/sell-old-property' : 'no',
      img: '/assets/home/HomeSellOldPropertyIcon.svg',
      alt: 'Sell Old Property',
    },
    {
      to: user ? '/rent-property' : 'no',
      img: '/assets/home/HomeRentPropertyIcon.svg',
      alt: 'Rent Property',
    },
    {
      to: '/buy-new-property',
      img: '/assets/home/HomeBuyNewPropertyIcon.svg',
      alt: 'Buy New Property',
    },
    {
      to: '/buy-resale-property',
      img: '/assets/home/HomeBuyResalePropertyIcon.svg',
      alt: 'Buy Resale Property',
    },
  ];

  return (
    <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden rounded-bl-2xl rounded-br-2xl lg:rounded-bl-3xl lg:rounded-br-3xl"
        style={{
          background: 'linear-gradient(132.7deg, #8A38F5 0%, #3F2D62 100%)',
          minHeight: 'clamp(380px, 58vw, 720px)',
          paddingBottom: 'clamp(90px, 12vw, 150px)',
        }}
      >
        {/* World map */}
        <div
          className="absolute pointer-events-none overflow-hidden left-[50%] md:left-[53%]"
          style={{
            right: 0,
            top: '15.12%',
            bottom: 0,
            borderRadius: '100px 0 0 0',
            mixBlendMode: 'overlay',
          }}
        >
          <img
            className="h-[95%] w-full min-w-[50vw] object-cover opacity-90 md:max-w-[50vw]"
            src="/assets/home/heroWorldMap.svg"
            alt="map image"
          />

          <img
            className="absolute top-4 right-5 w-full max-w-[30vw] rounded-full border-2 border-white bg-[#FFFFFF60] object-cover opacity-100 md:top-10 md:right-10 md:max-w-[25vw] lg:max-w-[20vw]"
            src="/assets/home/heroMapCircle.svg"
            alt="map image"
          />
        </div>

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '12%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 560,
            height: 560,
            background:
              'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[15vw] overflow-hidden bg-gradient-to-b from-transparent via-transparent to-white/10 pointer-events-none md:h-[10vw]"
          style={{
            background:
              'linear-gradient(180deg, rgba(78,40,158,0) -15.92%, rgba(79,41,158,0) 30.85%, #FFFFFF 80%)',
          }}
        />

        {/* Coming Soon */}
        <div
          onClick={() => {
            setShowComingSoonModal(true);
            //console.log('clicked');
          }}
          className="group absolute top-[5vw] right-[5vw] z-20 cursor-pointer animate-bounce sm:top-[4vw] sm:right-[4vw]"
        >
          <span
            className="
              relative flex items-center gap-2 overflow-hidden rounded-full
              border border-white/40 bg-gradient-to-r from-[#5E23DC] to-[#8A38F5]
              px-4 py-2 text-[10px] font-semibold text-white
              shadow-[0_0_20px_rgba(138,56,245,0.5)]
              transition-all duration-300
              group-hover:scale-110
              group-hover:shadow-[0_0_30px_rgba(138,56,245,0.8)]
              sm:text-xs
            "
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>

            IOT Coming Soon

            <span
              className="
                absolute inset-0 -translate-x-full skew-x-12
                bg-gradient-to-r from-transparent via-white/30 to-transparent
                transition-transform duration-1000
                group-hover:translate-x-[250%]
              "
            ></span>
          </span>
        </div>

        {/* ── CONTENT ROW ─────────────────────────────────────────────────── */}
        <div
          className="relative z-10 flex flex-col items-start lg:flex-row"
          style={{ padding: 'clamp(36px,5vw,80px) clamp(20px,3.5vw,50px) 0' }}
        >
          {/* LEFT */}
          <div className="flex flex-1 flex-col" style={{ maxWidth: 616 }}>
            {/* Badge */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="inline-flex items-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: 99999,
                  padding: '4px 10px',
                  height: 36,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    flexShrink: 0,
                    background: '#FFFFFF',
                    boxShadow: '0px 0px 8px rgba(255,255,255,0.8)',
                    borderRadius: 9999,
                    display: 'inline-block',
                  }}
                />

                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(10px, 1.2vw, 13px)',
                    letterSpacing: '0.3px',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    lineHeight: '14px',
                  }}
                >
                  Live Near You
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(24px, 3vw, 42px)',
                lineHeight: '1.24',
                color: '#FFFFFF',
                margin: '0 0 12px 0',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Discover Nearby
              <br />
              Properties
            </motion.h1>

            {/* Sub */}
            <motion.p
              className="mb-5 max-w-[50vw] sm:mb-8"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(14px, 1.6vw, 20px)',
                lineHeight: '19px',
                color: 'rgba(255,255,255,0.8)',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              Find plots, flats &amp; homes within your radius
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex items-center gap-[67px] mb-5 sm:mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.22 }}
            >
              {[
                { value: "500+", label: "Active Listings" },
                { value: "20+", label: "Major Cities" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 9999,
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(6px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i === 0 ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 14 12"
                        fill="none"
                      >
                        <polyline
                          points="0,10 4,4 7.5,7 13,0"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <polyline
                          points="9.5,0 13,0 13,3.5"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <rect
                          x="1"
                          y="4"
                          width="12"
                          height="9"
                          rx="1"
                          stroke="#fff"
                          strokeWidth="1.2"
                          fill="none"
                        />
                        <path
                          d="M4 4V2.5a3 3 0 0 1 6 0V4"
                          stroke="#fff"
                          strokeWidth="1.2"
                          fill="none"
                        />
                        <line
                          x1="5"
                          y1="4"
                          x2="5"
                          y2="13"
                          stroke="#fff"
                          strokeWidth="1.2"
                        />
                        <line
                          x1="9"
                          y1="4"
                          x2="9"
                          y2="13"
                          stroke="#fff"
                          strokeWidth="1.2"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: "14px",
                        color: "#FFFFFF",
                        margin: 0,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: 10,
                        lineHeight: "15px",
                        color: "rgba(255,255,255,0.7)",
                        margin: "2px 0 0 0",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.45 }}
              onClick={() => router.push("/map-view")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex md:hidden items-center gap-2 bg-white text-[#744DE8] font-bold rounded-full shadow-lg w-fit mb-5 sm:mb-10"
              style={{
                padding: "clamp(10px, 2vw, 14px) clamp(20px, 4vw, 32px)",
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              }}
            >
              View on Map
              <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#744DE8] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </motion.button>

            {/* Search bar — spec: Background+Border pill, height 66px */}
            <motion.div
              className="hidden md:flex items-center"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 9999,
                height: 66,
                padding: "8px",
                boxShadow:
                  "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px -1px rgba(0,0,0,0.1)",
                marginBottom: 20,
                maxWidth: 616,
                position: "relative",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
            >
              {/* Location section */}
              <div
                className="flex items-center gap-2 flex-1 px-4"
                style={{ borderRight: "1px solid #E2E8F0", height: 36 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="#5E23DC"
                  />
                </svg>
                <div style={{ minWidth: 0, overflow: "hidden" }}>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: "16px",
                      color: "#64748B",
                      margin: 0,
                    }}
                  >
                    Current Location
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      lineHeight: "20px",
                      color: "#0F172A",
                      margin: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {"Near " + selectedCity}
                  </p>
                </div>
              </div>

              {/* Radius picker */}
              <div
                className="relative flex items-center"
                style={{ padding: "0 16px", height: 36, gap: 8 }}
              >
                <button
                  onClick={() => setShowRadius(!showRadius)}
                  className="flex items-center gap-1"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "#0F172A",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {radius}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 10l5 5 5-5H7z" fill="#64748B" />
                  </svg>
                </button>
                <AnimatePresence>
                  {showRadius && (
                    <motion.div
                      className="absolute bg-white rounded-xl border border-gray-100 py-1"
                      style={{
                        bottom: "calc(100% + 8px)",
                        left: 0,
                        minWidth: 110,
                        zIndex: 200,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                      }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.14 }}
                    >
                      {RADIUS_OPTIONS.map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            setRadius(r);
                            setShowRadius(false);
                          }}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            padding: "8px 16px",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 500,
                            fontSize: 14,
                            color: radius === r ? "#7C3AED" : "#374151",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {r}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Explore CTA */}
              <motion.button
                onClick={() => router.push("/map-view")}
                style={{
                  background: "#5E23DC",
                  borderRadius: 9999,
                  border: "none",
                  height: 48,
                  padding: "0 32px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  flexShrink: 0,
                  boxShadow:
                    "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore
              </motion.button>
            </motion.div>

            {/* View on Map Instead */}
            <motion.button
              onClick={() => router.push("/map-view")}
              className="flex items-center"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                gap: 4,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
                className="hidden md:block"
                style={{ opacity: 0.85, flexShrink: 0 }}
              >
                <path d="M9 3L3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5L15 5.1 9 3zm6 16l-6-2.11V5l6 2.11V19z" />
              </svg>
              <div className="hidden md:flex items-center" style={{ gap: 22 }}>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "#FFFFFF",
                    lineHeight: "20px",
                  }}
                >
                  View on Map Instead
                </span>
                {/* Circle arrow — spec: Ellipse 8 #F2EBFF, arrow rotated */}
                <div
                  style={{
                    width: 34.58,
                    height: 34.58,
                    borderRadius: 9999,
                    background: "#F2EBFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="#3F2D62"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid w-full grid-cols-2 gap-2 px-4 -mt-[15vw] md:grid-cols-4 md:px-8 md:-mt-[10vw]">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              card.to === 'no'
                ? setShowLogin(true)
                : router.push(card.to);
            }}
          >
            <motion.img
              src={card.img}
              alt={card.alt}
              loading="lazy"
              className="w-full cursor-pointer object-cover"
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{
                duration: 0.4,
                delay: 0.12 + index * 0.07,
                ease: 'easeOut',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}