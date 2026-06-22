"use client";
import { ArrowRight } from "lucide-react";

export default function WhatNext() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto bg-[#4500B40D] py-20 px-6 md:px-16 lg:px-24 rounded-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            What Would You Like To Do Next?
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            There is no urgency here. Choose the next step that feels right for
            you and your journey.
          </p>
        </div>

        {/* Two cards */}
        <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 — solid button */}
          <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-sm">
            <h3 className="text-gray-900 font-bold text-xl leading-snug">
              Explore More First-Time Buyer Stories
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed flex-1">
              Read more real journeys from buyers who started exactly where you
              are today and found clarity step by step.
            </p>
            <button className="mt-2 w-full bg-[#5323DC] hover:bg-purple-800 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
              Explore Stories <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2 — outline button */}
          <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-sm">
            <h3 className="text-gray-900 font-bold text-xl leading-snug">
              Attend a Free Home Buying Guidance Session
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed flex-1">
              Join a calm, no-pressure session designed to help first-time buyers
              understand the process before making any decisions.
            </p>
            <button className="mt-2 w-full border-2 border-[#5323DC] text-[#5323DC] hover:bg-purple-50 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
              Attend a Session <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}