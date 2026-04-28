import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const FAQ = ({faqs=[]}) => {
  const fas = [
    {
      question: "How can I generate enquiry for property?",
      answer:
        "Fill out the contact form, call us, or email us directly. Our team will get back to you promptly.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We assist with buying and selling residential and commercial properties in Nagpur.",
    },
    {
      question: "How secure is my data with Reparv?",
      answer:
        "We prioritize security and use encryption to protect your personal information.",
    },
    {
      question: "Do you charge any service fees?",
      answer:
        "Our platform is free to browse. Certain services may have minimal charges, which will be disclosed upfront.",
    },
    {
      question: "How do I schedule a property visit?",
      answer:
        "Simply contact us via phone or email to schedule a visit at your convenience.",
    },
    {
      question: "What documents do I need to buy a property?",
      answer:
        "You'll need ID proof, address proof, and financial documents for a seamless transaction.",
    },
  ];
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const totalPages = Math.ceil(faqs?.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const visibleFaqs = faqs?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="my-12 flex flex-col gap-8">
      <h2 className="text-xl sm:text-4xl font-semibold">
        Frequently Asked Questions
      </h2>

      {/* Small Screens: Show only questions with toggle */}
      <div className="grid gap-4 md:hidden">
        {faqs?.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-lg flex flex-col justify-between items-center"
          >
            <div className="w-full flex gap-4 justify-between">
              <h3 className="font-semibold text-sm">{faq.question}</h3>
              <button onClick={() => toggleAnswer(index)} className="text-lg">
                {expandedIndex === index ? (
                  <FaChevronUp className="w-3 h-3" />
                ) : (
                  <FaChevronDown className="w-3 h-3" />
                )}
              </button>
            </div>
            {expandedIndex === index && (
              <p className="text-[#00000066] text-xs md:text-sm mt-2">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Medium Screens: Pagination with 3 questions per page */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {visibleFaqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-lg">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-[#00000066] text-sm mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="hidden px-5 md:flex items-center justify-between">
        <div className="flex gap-1">
          {page + 1} <p>of</p> {totalPages}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className={`w-12 h-12 flex items-center justify-center rounded-full border border-[#0000001A] ${
              page === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#076300] hover:text-white"
            }`}
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page === totalPages - 1}
            className={`w-12 h-12 flex items-center justify-center rounded-full border border-[#0000001A] ${
              page === totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#076300] hover:text-white"
            }`}
          >
            <FaArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
