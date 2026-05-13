import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useEffect } from "react";
import { useAuth } from "../../store/auth";
import FAQSchema from "../FAQSchema";

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

function FAQSection() {
  const { URI } = useAuth();
  const [activeIndex, setActiveIndex] = useState(1);
  const [faqs, setFaqs] = useState([]);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const fetchFAQs = async () => {
    try {
      const response = await fetch(
        `${URI}/admin/faqs/active/${"Reparv Home Page"}`,
      );

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

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <>
      <FAQSchema faqs={faqs} />
      <section className="w-full max-w-[1380px] mx-auto grid md:grid-cols-2 gap-10 p-4 md:p-8 md:pb-15 ">
        {/* LEFT SIDE ILLUSTRATION */}
        <div className="hidden md:flex items-center ">
          <img
            src="/assets/home/FAQLeftImage.svg"
            alt="FAQ Image"
            className="w-full object-cover"
          />
        </div>

        {/* RIGHT SIDE FAQ */}
        <div className="w-full flex flex-col gap-4 mr-4 md:pt-10">
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-segoe ">
            Frequently Ask Questions
          </h2>
          <p className="text-xs md:mb-4">
            Provide Your Details to let us know your Preferences and
            requirements. Our team will get in touch to guide you through the
            process seamlessly.
          </p>

          <div className="space-y-2 md:space-y-4 max-h-[500px] overflow-scroll scrollbar-hide">
            {faqs.map((faq, index) => (
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
      </section>
    </>
  );
}

export default FAQSection;
