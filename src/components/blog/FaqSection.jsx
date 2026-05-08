import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useAuth } from "../../store/auth";
import ContactForm from "./ContactForm";
import ScheduleForm from "./ScheduleForm";
export default function FaqSection() {
  const { blogId } = useParams();
  const { URI, setLoading } = useAuth();
  const [blog, setBlog] = useState({});
  const [FAQS, setFAQS] = useState();

  // Fetch Property Info
  const fetchBlog = async () => {
    try {
      const response = await fetch(`${URI}/frontend/blog/details/${blogId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch property info.");
      const data = await response.json();
      setBlog(data);
    } catch (err) {
      console.error("Error fetching property info:", err);
    }
  };

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URI}/admin/faqs/active/blog/${blog?.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch FAQS.");
      const data = await response.json();
      console.log(data);
      setFAQS(data);
    } catch (err) {
      console.error("Error fetching FAQS:", err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    fetchData();
  }, [blog?.id]);

  // Only group if FAQS exists and is an array
  const groupedFaqs = Array.isArray(FAQS)
    ? FAQS.reduce((acc, faq) => {
        if (!acc[faq.type]) acc[faq.type] = [];
        acc[faq.type].push(faq);
        return acc;
      }, {})
    : {};

  // Convert to array safely
  const formattedFaqs = Object.keys(groupedFaqs).length
    ? Object.entries(groupedFaqs).map(([type, items]) => ({
        type,
        items: items.map(({ question, answer }) => ({
          question,
          answer,
        })),
      }))
    : [];
  console.log(formattedFaqs);

  const [openIndex, setOpenIndex] = useState({
    group: null,
    item: null,
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const toggleFAQ = (groupIndex, itemIndex) => {
    setOpenIndex((prev) => ({
      group:
        prev.group === groupIndex && prev.item === itemIndex
          ? null
          : groupIndex,
      item:
        prev.group === groupIndex && prev.item === itemIndex ? null : itemIndex,
    }));
  };

  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-[24px] md:text-[42px] font-bold text-[#101828]">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 lg:text-lg md:text-lg sm:text-lg text-[15px] mt-2">
          Everything you need to know about reparv & properties
        </p>
      </div>

      {/* FAQ Wrapper */}
      <div className="max-w-5xl mx-auto w-full">
        {formattedFaqs?.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`${
              group.type === "Getting Started" ? "bg-[#EDEDED]" : "bg-[#F8F9FA]"
            } rounded-[20px] p-3 lg:p-6 md:p-8 mb-10 shadow-sm`}
          >
            {/* Group Title */}
            <h3 className="text-xl md:text-2xl font-semibold text-[#101828] mb-6">
              {group.type}
            </h3>

            {/* FAQ Items */}
            {group.items.map((item, itemIndex) => {
              const isOpen =
                openIndex.group === groupIndex && openIndex.item === itemIndex;

              return (
                <div key={itemIndex} className="mb-3">
                  <button
                    onClick={() => toggleFAQ(groupIndex, itemIndex)}
                    className="w-full bg-white rounded-xl px-5 py-4 flex justify-between items-center shadow-sm text-left"
                  >
                    <span className="font-medium text-[#101828] text-[15px] md:text-base">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <FiMinus className="text-[#5E23DC]" size={22} />
                    ) : (
                      <FiPlus className="text-[#5E23DC]" size={22} />
                    )}
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <div className="mt-2 bg-white rounded-xl px-5 py-4 shadow-sm text-gray-600 text-[15px] leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* STILL HAVE QUESTIONS (Gradient Box) */}
        <div
          className="w-full mt-16 rounded-[24px] px-6 md:px-12 py-10 text-center"
          style={{
            background: "linear-gradient(90deg, #5E23DC47 0%, #5E23DC47 100%)",
          }}
        >
          <h3 className="lg:text-2xl md:text-2xl sm:text-2xl text-xl font-semibold text-[#101828]">
            Still have questions?
          </h3>
          <p className="text-[13px] lg:text-lg md:text-lg text-gray-600 mt-2 mb-6">
            Our support team is here to help you get started
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Contact Support */}
            <button
              onClick={() => setShowContactForm(true)}
              className="px-6 py-3 rounded-xl bg-[#5E23DC] text-white font-medium shadow-md hover:opacity-90"
            >
              Contact Support
            </button>

            {/* Schedule Demo */}
            <button
              onClick={() => setShowScheduleForm(true)}
              className="px-6 py-3 rounded-xl border border-[#5E23DC] text-[#5E23DC] font-medium bg-white shadow-md hover:bg-[#F0FFF8]"
            >
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}

      {showScheduleForm && (
        <ScheduleForm onClose={() => setShowScheduleForm(false)} />
      )}
    </section>
  );
}
