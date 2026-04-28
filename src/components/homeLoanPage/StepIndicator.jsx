export default function StepIndicator({ step }) {
  const steps = ["Personal", "Income details", "Documents"];

  return (
    <div className="flex justify-between my-6">
      {steps.map((label, i) => (
        <div key={label} className="flex flex-col items-center gap-2 px-4">
          <div
            className={`w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center text-xl font-medium
              ${step === i + 1
                ? "bg-[#8A38F5] text-white font-semibold"
                : "bg-[#D9D9D9] text-[#868686] "}`}
          >
            {i + 1}
          </div>
          <span className={`${step === i + 1
                ? "text-[#8A38F5] font-bold"
                : "text-[#868686]"} text-sm sm:text-xl`}>{label}</span>
        </div>
      ))}
    </div>
  );
}