"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Are these stories based on real buyers?",
    answer:
      "Yes. Every story on this page is based on real first-time buyers who went through the home buying journey. Names and some personal details may be changed for privacy, but the experiences, emotions, and decisions are entirely authentic.",
  },
  {
    question: "Is any builder or project promoted here?",
    answer:
      "No. This page is editorially independent. No builder, developer, or project pays to be featured here. Our goal is to share honest buyer experiences, not to promote any specific property or developer.",
  },
  {
    question: "Is this useful before property visits?",
    answer:
      "Yes. It is especially helpful before site visits, when buyers are still gaining clarity. Understanding what others went through helps you ask better questions and stay focused on your true priorities.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(2); // third open by default like the image

  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-gray-900 text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl transition-all duration-200 ${
                  isOpen
                    ? "bg-[#F9F9FF] border border-[#4500B433]"
                    : "bg-[#F0F3FF] border border-transparent"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-gray-900 font-medium text-base md:text-lg leading-snug">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}