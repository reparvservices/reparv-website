
export default function HowToUseEmiCalculator() {
  const steps = [
    {
      id: "01",
      title: "Enter loan amount",
      desc: "Start by selecting the home loan amount you want to borrow.",
    },
    {
      id: "02",
      title: "Set interest rate",
      desc: "Adjust the interest rate offered by your preferred bank.",
    },
    {
      id: "03",
      title: "Choose loan tenure",
      desc: "Select the repayment duration that suits your monthly budget.",
    },
    {
      id: "04",
      title: "View instant EMI",
      desc: "Instantly see your EMI amount and interest breakup.",
    },
  ];

  return (
    <section className="w-full py-10 sm:py-14">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT CONTENT */}
            <div className="text-white">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                How to Use the Home Loan <br className="hidden sm:block" />
                EMI Calculator?
              </h2>

              <div className="relative">
                {/* Vertical line (desktop only) */}
                <div className="hidden sm:block absolute left-4 top-0 h-full w-[2px] bg-white/30" />

                <div className="space-y-6">
                  {steps.map((step) => (
                    <div key={step.id} className="flex gap-4 items-start">
                      {/* Number */}
                      <div className="relative z-10">
                        <div className="w-8 h-8 rounded-full bg-white text-[#6D28D9] font-bold flex items-center justify-center text-sm">
                          {step.id}
                        </div>
                      </div>

                      {/* Text */}
                      <div>
                        <p className="font-semibold">
                          {step.title}:{" "}
                          <span className="font-normal text-white/90">
                            {step.desc}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
