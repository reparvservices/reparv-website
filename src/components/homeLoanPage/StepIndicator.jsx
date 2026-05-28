export default function StepIndicator({ step }) {
  const steps = ["Personal", "Address", "Documents"];

  return (
    <div className="flex items-center justify-center my-4 sm:my-6 px-4">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = step > stepNum;
        const isActive = step === stepNum;

        return (
          <div key={label} className="flex items-center">
            {/* Step Circle + Label */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all
                  ${
                    isActive || isCompleted
                      ? "bg-[#8A38F5] text-white shadow-md shadow-purple-200"
                      : "bg-[#D9D9D9] text-[#868686]"
                  }`}
              >
                {stepNum}
              </div>
              <span
                className={`text-xs sm:text-sm font-semibold mt-1 ${
                  isActive || isCompleted ? "text-[#8A38F5]" : "text-[#868686]"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector Line (between steps) */}
            {i < steps.length - 1 && (
              <div
                className={`h-[2px] w-16 sm:w-24 mx-1 mb-5 rounded-full transition-all ${
                  step > stepNum ? "bg-[#8A38F5]" : "bg-[#D9D9D9]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
