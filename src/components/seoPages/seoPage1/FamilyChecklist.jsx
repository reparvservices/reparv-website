'use client';
import { CheckCircle, Smile } from 'lucide-react';

const checklistItems = [
  {
    title: 'Audit the Commute',
    desc: "Don't rely on distances alone; test it during rush hour, not just a Sunday.",
  },
  {
    title: 'Listen to the Builders',
    desc: 'Tour at least one new development to calibrate your appreciation versus older stock.',
  },
  {
    title: 'Verify the Subtext',
    desc: "Ask why the previous owner left — and if there's no clear answer, keep looking.",
  },
];

export default function FamilyChecklist() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-[#F8F2FF]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              The Family Checklist
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              After 500+ successful closings, we&apos;ve distilled the common wisdom. Shared by our families into a master checklist.
            </p>

            <div className="flex flex-col gap-6">
              {checklistItems.map(({ title, desc }) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-[#5323DC] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{title}</p>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Testimonial */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-5">
                <Smile className="w-6 h-6 text-[#5323Dc]" />
                <span className="text-sm font-semibold text-[#5323DC]">The Lyrical Budget Plan</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed italic mb-6">
                &ldquo;Reparv&apos;s checklist focuses on the true deal-breakers. In one new development, I noticed a strange appreciation swing — the agent couldn&apos;t explain it. We walked away and saved $60k.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center text-[#5323DC] font-bold text-sm">
                  AJ
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-semibold">Aisha Jonson</p>
                  <p className="text-gray-400 text-xs">Homeowner since 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}