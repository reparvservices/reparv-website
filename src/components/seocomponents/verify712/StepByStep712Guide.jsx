
const rightIcon = "/assets/seopageassets/verify712/right-icon.svg";

export default function StepByStep712Guide() {
  const steps = [
    {
      title: "Select District & Taluka",
      description:
        "Choose your district from the dropdown menu, then select the appropriate Taluka (sub-district) where your property is located.",
      noteType: "note",
      noteText:
        "Make sure you select the correct administrative division to access accurate records.",
      image: "/assets/seopageassets/verify712/step1.svg",
    },
    {
      title: "Choose Village",
      description:
        "From the list of villages in your selected Taluka, choose the specific village where the land is registered.",
      noteType: "helpful",
      noteText:
        "If unsure about the village name, check your property documents or contact local authorities.",
      image: "/assets/seopageassets/verify712/step2.svg",
    },
    {
      title: "Enter Search Details",
      description:
        "Input the Survey Number (Gat Number) or owner’s name to search for the specific 7/12 record.",
      noteType: "important",
      noteText:
        "Enter exact details as per your property documents to get accurate results.",
      image: "/assets/seopageassets/verify712/step3.svg",
    },
    {
      title: "View & Verify Details",
      description:
        "Review the displayed 7/12 extract carefully. Check owner names, survey numbers, land area, cultivation details, and any encumbrances.",
      noteType: "critical",
      noteText:
        "Look for discrepancies in ownership, pending dues, or legal notices mentioned in the document.",
      image: "/assets/seopageassets/verify712/step4.svg",
    },
  ];

  return (
    <section className="bg-[#FAF7FF] py-12 sm:py-16">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Step-by-Step Verification Guide
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Follow these simple steps to verify your 7/12 Utara online
          </p>
        </div>

        {/* STEPS */}
        <div className="space-y-10">
          {steps.map((step, index) => {
            const reverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`flex flex-col lg:flex-row ${
                  reverse ? "lg:flex-row-reverse" : ""
                } gap-6 lg:gap-10 bg-white rounded-2xl p-6 sm:p-8 shadow-[0_12px_40px_#8A38F529]`}
              >
                {/* TEXT – 30% */}
                <div className="flex-1 lg:flex-[1]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-black">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* NOTE */}
                  <div className="flex items-start gap-3 bg-[#E2FFEA] rounded-xl px-4 py-4">
                    {/* LEFT ICON */}
                    <div className="flex-shrink-0 rounded-full flex items-center justify-center">
                      <img src={rightIcon} alt="note" className="w-4 h-4" />
                    </div>

                    {/* TEXT */}
                    <p className="text-xs sm:text-sm text-black leading-relaxed">
                      <span className="font-semibold capitalize mr-1">
                        {step.noteType}:
                      </span>
                      {step.noteText}
                    </p>
                  </div>
                </div>

                {/* IMAGE – 70% */}
                <div className="flex-1 lg:flex-[2]">
                  <div className="border border-[#868686] rounded-xl overflow-hidden ">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
