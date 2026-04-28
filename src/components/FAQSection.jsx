import React, { useState, useEffect } from "react";
import FAQLeftImage from "../assets/FAQLeftImage.svg";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useAuth } from "../store/auth";
import FAQSchema from "./FAQSchema";

const defaultFaqs = [
  {
    question: "What is the process to Buy Property?",
    answer:
      "First, identify your requirements and budget. Shortlist properties, visit sites, verify documents, negotiate pricing, pay the booking amount, and complete registration with legal verification.",
  },
  {
    question: "What documents are required?",
    answer:
      "You need ID proof, address proof, PAN card, sale agreement, title deed, and bank loan documents (if applicable).",
  },
  {
    question: "Do you help with home loans?",
    answer:
      "Yes, we assist buyers in getting home loans from trusted banks with competitive interest rates.",
  },
  {
    question: "Is site visit free?",
    answer:
      "Yes, site visits are completely free and coordinated by our expert property consultants.",
  },
  {
    question: "Are properties legally verified?",
    answer:
      "All listed properties are legally verified for clear title, approvals, and documentation.",
  },
];

function FAQSection({ id, location }) {
  const { URI } = useAuth();
  const [activeIndex, setActiveIndex] = useState(1);
  const [faqs, setFaqs] = useState([]);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const fetchFAQs = async () => {
    try {
      const response = await fetch(`${URI}/admin/faqs/active/${location}`);

      if (!response.ok) {
        throw new Error("Failed to fetch FAQs");
      }

      const data = await response.json();
      const faqsData = data.length > 0 ? data : defaultFaqs;
      setFaqs(faqsData);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const fetchBlogFAQs = async () => {
    try {
      const response = await fetch(`${URI}/admin/faqs/active/blog/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch FAQs");
      }

      const data = await response.json();
      console.log(data);
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    if (location === "Reparv Blog Details Page" || id) {
      fetchBlogFAQs();
    } else {
      fetchFAQs();
    }
  }, [location, id]);

  return (
    <>
      <FAQSchema faqs={faqs} />
      <section className="w-full max-w-[1380px] mx-auto p-4 md:p-8 md:pb-15 ">
        {/* Heading */}
        <div className="flex items-center justify-center gap-6 pb-2">
          <div className="hidden md:flex flex-1 h-[3px] bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF]" />
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="flex-1 h-[3px] bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF]" />
        </div>

        <h2 className="text-xs md:text-xl md:text-[#868686] my-2 md:text-center pb-2 md:pb-10">
          Get answers to common questions about buying new properties
        </h2>
        <div className="w-full grid md:grid-cols-2 gap-10">
          {/* LEFT SIDE ILLUSTRATION */}
          <div className="hidden md:flex items-center ">
            <img
              src={FAQLeftImage}
              alt="FAQ Image"
              className="w-full object-cover"
            />
          </div>

          {/* RIGHT SIDE FAQ */}
          <div className="w-full flex flex-col gap-4 mr-4">
            <div className="space-y-2 md:space-y-4 max-h-[500px] overflow-scroll scrollbar-hide">
              {faqs?.map((faq, index) => (
                <div
                  key={index}
                  className={` ${
                    activeIndex === index
                      ? "bg-[#FFFFFF] shadow-[0_4px_18px_2px_rgba(138,56,245,0.18)] hover:shadow-[0_6px_24px_3px_rgba(138,56,245,0.28)] transition-shadow duration-300 rounded-3xl p-5 m-2 md:m-5"
                      : "py-2"
                  }`}
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="font-semibold text-base sm:text-lg lg:text-xl xl:text-2xl">
                      {faq.question}
                    </h3>

                    <span className="">
                      {activeIndex === index ? (
                        <FiMinusCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#5E23DC]" />
                      ) : (
                        <FiPlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </span>
                  </div>

                  {activeIndex === index && (
                    <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQSection;
