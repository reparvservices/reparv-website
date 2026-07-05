"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mapFaqs } from "@/utils/firstTimeBuyerPage";

export default function FAQ({ initialFaqs = [], pageData = null }) {
  const affordableHomes = pageData?.stats?.affordableHomes || 0;

  const faqs = useMemo(() => {
    const mapped = mapFaqs(initialFaqs || []);
    if (mapped.length > 0) {
      return mapped.map((item) => ({
        question: item.q,
        answer: item.a,
      }));
    }

    return [
      {
        question: "Are these stories based on real buyers?",
        answer:
          "Yes. Every story on this page is grounded in real first-time buyer journeys and actual Nagpur localities. Names and some personal details may be changed for privacy, but the experiences, emotions, and decisions reflect authentic buying patterns.",
      },
      {
        question: "Is any builder or project promoted here?",
        answer:
          "No. This page is editorially independent. No builder, developer, or project pays to be featured here. Our goal is to share honest buyer experiences, not to promote any specific property or developer.",
      },
      {
        question: "Is this useful before property visits?",
        answer: affordableHomes
          ? `Yes. It is especially helpful before site visits, when buyers are still gaining clarity. With ${affordableHomes}+ starter homes listed in Nagpur, understanding what others went through helps you ask better questions and stay focused on your true priorities.`
          : "Yes. It is especially helpful before site visits, when buyers are still gaining clarity. Understanding what others went through helps you ask better questions and stay focused on your true priorities.",
      },
    ];
  }, [initialFaqs, affordableHomes]);

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-gray-900 text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl transition-all duration-200 ${
                  isOpen
                    ? "bg-[#F9F9FF] border border-[#4500B433]"
                    : "bg-[#F0F3FF] border border-transparent"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
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

        <div className="mt-10 text-center">
          <Link
            href="/find-verified-properties-in-nagpur"
            className="text-[#5323DC] font-semibold text-sm hover:underline"
          >
            Start exploring verified properties in Nagpur →
          </Link>
        </div>
      </div>
    </section>
  );
}
