
export default function HowReparvCalculatorWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-black">
            How the <span className="text-[#7C3AED]">Reparv</span> Property Cost
            Calculator Works
          </h2>
          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            The following steps explain how the calculator derives the total
            estimated cost based on the inputs provided. This workflow is
            designed for transparency and better understanding of statutory
            charges involved in a property purchase.
          </p>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid grid-cols-[1fr_40px_1fr] gap-8 mt-16">
          {/* LEFT COLUMN */}
          <div className="space-y-20">
            <Step
              number={1}
              title="Agreement Value"
              subtitle="Input"
              description="The agreement value represents the mutually agreed price of the property between the buyer and seller. This value forms the base on which stamp duty, registration charges, and other applicable levies are calculated."
              image="/assets/seopageassets/costcalculator/step1.svg"
            />

            <Step
              number={3}
              title="GST (If Applicable)"
              subtitle="Conditional"
              description="Goods and Services Tax (GST) is applicable only for under-construction properties. Ready-to-move or completed properties are generally exempt from GST under prevailing tax regulations."
              image="/assets/seopageassets/costcalculator/step3.svg"
            />
          </div>

          {/* CENTER LINE */}
          <div className="relative flex justify-center">
            <div className="w-px bg-[#000000] h-full" />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-20">
            <Step
              number={2}
              title="Stamp Duty & Registration"
              subtitle="Government Charges"
              description="Stamp duty and registration fees are levied by the respective State Government. The calculator applies the percentage values and registration caps entered by the user in accordance with applicable state rules."
              image="/assets/seopageassets/costcalculator/step2.svg"
              align="right"
            />

            <Step
              number={4}
              title="Total Estimated Cost"
              subtitle="Output"
              description="All applicable charges including agreement value, government levies, GST (if any), and legal charges are aggregated to display the total estimated cost. This figure is indicative and subject to final government notifications."
              image="/assets/seopageassets/costcalculator/step4.svg"
              align="right"
            />
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden mt-14 space-y-16">
          <MobileStep
            number={1}
            title="Agreement Value"
            subtitle="Input"
            description="The agreement value represents the mutually agreed price of the property between the buyer and seller. This value forms the base on which stamp duty, registration charges, and other applicable levies are calculated."
            image="/assets/seopageassets/costcalculator/step1.svg"
          />

          <MobileStep
            number={2}
            title="Stamp Duty & Registration"
            subtitle="Government Charges"
            description="Stamp duty and registration fees are levied by the respective State Government. The calculator applies the percentage values and registration caps entered by the user in accordance with applicable state rules."
            image="/assets/seopageassets/costcalculator/step2.svg"
          />

          <MobileStep
            number={3}
            title="GST (If Applicable)"
            subtitle="Conditional"
            description="Goods and Services Tax (GST) is applicable only for under-construction properties. Ready-to-move or completed properties are generally exempt from GST under prevailing tax regulations."
            image="/assets/seopageassets/costcalculator/step3.svg"
          />

          <MobileStep
            number={4}
            title="Total Estimated Cost"
            subtitle="Output"
            description="All applicable charges including agreement value, government levies, GST (if any), and legal charges are aggregated to display the total estimated cost. This figure is indicative and subject to final government notifications."
            image="/assets/seopageassets/costcalculator/step4.svg"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Step({ number, title, subtitle, description, image, align }) {
  const isRight = align === "right";

  return (
    <div className={`text-${isRight ? "left" : "right"}`}>
      {/* RIGHT SIDE: Image first */}
      {isRight && (
        <div className="flex justify-center mb-6">
          <img src={image} alt={title} className="max-w-[260px]" />
        </div>
      )}

      {/* Step Number + Subtitle */}
      <div
        className={`flex items-center ${
          number == 1 || number == 3 ? "justify-end" : "justify-start"
        } gap-4 mb-4`}
      >
        <span className="w-10 h-10 rounded-full bg-[#EDE9FE] text-[#7C3AED] font-bold flex items-center justify-center">
          {number}
        </span>
        <span className="text-sm text-gray-500">{subtitle}</span>
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* LEFT SIDE: Image last */}
      {!isRight && (
        <div className="flex justify-center">
          <img src={image} alt={title} className="max-w-[260px]" />
        </div>
      )}
    </div>
  );
}

function MobileStep({ number, title, subtitle, description, image }) {
  return (
    <div className="text-center">
      <img src={image} alt={title} className="mx-auto mb-6 max-w-[260px]" />

      <span className="inline-flex w-10 h-10 rounded-full bg-[#EDE9FE] text-[#7C3AED] font-bold items-center justify-center mb-3">
        {number}
      </span>

      <p className="text-sm text-gray-500 mb-1">{subtitle}</p>
      <h3 className="text-lg font-bold mb-3">{title}</h3>

      <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
        {description}
      </p>
    </div>
  );
}
