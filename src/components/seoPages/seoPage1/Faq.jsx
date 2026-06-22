'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How does Reparv verify the stories shared here?',
    answer:
      'Every story goes through a multi-step editorial process. We collect documentation, conduct recorded interviews, and cross-reference key claims with public records and agent confirmations before a story is published.',
  },
  {
    question: 'Are these families professional actors or real clients?',
    answer:
      'All families featured on Reparv are genuine clients who completed their home purchase with our guidance. They volunteer their stories to help others navigate the same journey — no scripts, no actors.',
  },
  {
    question: 'Can I share my home buying story with Reparv?',
    answer:
      'Absolutely. We love hearing from families who\'ve been through the process. Visit our "Share Your Story" page to submit your experience. Our editorial team will review it and reach out within 5–7 business days.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-gray-200">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-6 text-left gap-4 group"
                aria-expanded={openIndex === i}
              >
                <span className="text-gray-800 text-base font-normal leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer panel */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}