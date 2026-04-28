import { useState } from "react";
import faqImg1 from "../../../assets/seopageassets/costcalculator/faq1.svg";
import faqImg2 from "../../../assets/seopageassets/costcalculator/faq2.svg";

const FAQS = [
  {
    question: "What is the process to Buy Property",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Fames odio tincidunt rhoncus vel augue pulvinar aenean pellentesque eu. Ante etiam egestas aenean sapien lacus sed tempus neque. Auctor viverra porttitor euismod blandit elementum dignissim a habitant eu. Vestibulum vitae neque ut vitae non posuere donec in. Orci consequat sed id sit interdum vel. Ipsum cras nam eu enim eget ut pretium. Ac tristique quam accumsan sociis malesuada eget duis",
  },
  { question: "What is the process to Buy Property", answer: "" },
  { question: "What is the process to Buy Property", answer: "" },
  { question: "What is the process to Buy Property", answer: "" },
];

export default function FrequentlyAskedQuestions() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="hidden lg:block relative h-[460px]">
            {/* TOP LEFT IMAGE */}
            <div className="absolute top-0 left-0 bg-[#F3EDFF] rounded-3xl p-5 max-w-[300px]">
              <img
                src={faqImg1}
                alt="FAQ illustration"
                className="w-full max-w-[240px] mx-auto"
              />
            </div>

            {/* BOTTOM RIGHT IMAGE */}
            <div className="absolute bottom-0 right-0 bg-[#EDE5FF] rounded-3xl p-5 max-w-[340px]">
              <img
                src={faqImg2}
                alt="FAQ discussion illustration"
                className="w-full max-w-[280px] mx-auto"
              />
            </div>
          </div>

          {/* RIGHT FAQ */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Frequently Ask Questions
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-lg mb-8">
              Provide Your Details to let us know your Preferences and
              requirements. Our team will get in touch to guide you through the
              process seamlessly.
            </p>

            <div className="space-y-5">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={index}>
                    {/* QUESTION */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="w-full flex justify-between items-center text-left text-lg font-semibold py-3"
                    >
                      {faq.question}
                      <span className="text-2xl font-bold">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {/* ANSWER */}
                    {isOpen && faq.answer && (
                      <div className="bg-[#F7F3FF] rounded-2xl p-6 shadow-[0px_10px_30px_-10px_#8A38F580]">
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
