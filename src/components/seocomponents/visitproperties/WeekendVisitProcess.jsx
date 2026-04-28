// TIMELINE ICONS
import timelineIcon1 from "../../../assets/seopageassets/visitproperties/timeline1.svg";
import timelineIcon2 from "../../../assets/seopageassets/visitproperties/timeline2.svg";
import timelineIcon3 from "../../../assets/seopageassets/visitproperties/timeline3.svg";
import timelineIcon4 from "../../../assets/seopageassets/visitproperties/timeline4.svg";
import timelineIcon5 from "../../../assets/seopageassets/visitproperties/timeline5.svg";

export default function WeekendVisitZigZagTimeline() {
  const steps = [
    {
      id: 1,
      title: "Property Shortlist Review",
      description:
        "Share your shortlisted properties with us. Our local experts review location, amenities, and builder reputation. We create a custom weekend visit plan based on your priorities.",
      timeline: "24 hours before visit",
      icon: timelineIcon1,
    },
    {
      id: 2,
      title: "Weekend Morning Traffic Check",
      description:
        "We start early (8–10 AM) to test morning commute patterns. Experience real traffic to key destinations like offices, schools, or markets.",
      timeline: "Saturday/Sunday 8–10 AM",
      icon: timelineIcon2,
    },
    {
      id: 3,
      title: "Property & Amenity Inspection",
      description:
        "Detailed walkthrough of the property and complex. Check water pressure, noise levels, natural light, ventilation.",
      timeline: "10 AM – 1 PM",
      icon: timelineIcon3,
    },
    {
      id: 4,
      title: "Neighborhood Reality Walk",
      description:
        "Walk the neighborhood to check proximity to shops, medical facilities, parks and assess overall livability.",
      timeline: "Afternoon",
      icon: timelineIcon4,
    },
    {
      id: 5,
      title: "Evening Commute & Report",
      description:
        "Test the return journey during evening hours and receive a detailed report within 24 hours.",
      timeline: "24 hours after visit",
      icon: timelineIcon5,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1100px] mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-2xl sm:text-4xl font-bold text-black">
            How <span className="text-[#7C3AED]">Reparv</span> Manages Your{" "}
            <br />
            Weekend Visit
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3">
            A structured 5-step process to ensure you see everything that
            matters
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">
          {/* CENTER LINE */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-[#000000] -translate-x-1/2" />

          <div className="space-y-28">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.id}
                  className="relative grid grid-cols-1 md:grid-cols-2 items-center"
                >
                  {/* LEFT COLUMN */}
                  {isLeft ? (
                    <TextBlock step={step} align="right" />
                  ) : (
                    <TimelineCard step={step} align="right" />
                  )}

                  {/* RIGHT COLUMN */}
                  {isLeft ? (
                    <TimelineCard step={step} align="left" />
                  ) : (
                    <TextBlock step={step} align="left" />
                  )}

                  {/* MOBILE TIMELINE */}
                  <div className="md:hidden mt-4">
                    <TimelineCard step={step} mobile />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =======================
   SUB COMPONENTS
======================= */

function TextBlock({ step, align }) {
  return (
    <div
      className={`${
        align === "right" ? "text-right pr-12" : "text-left pl-12"
      }`}
    >
      {/* STEP NUMBER */}
      <div className="mb-3">
        <div
          className={`w-9 h-9 rounded-full bg-[#EDE4FF] text-[#7C3AED] font-semibold flex items-center justify-center ${
            align === "right" ? "ml-auto" : ""
          }`}
        >
          {step.id}
        </div>
      </div>

      <h4 className="font-semibold text-black">{step.title}</h4>

      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

function TimelineCard({ step, align, mobile }) {
  return (
    <div
      className={`${
        mobile
          ? ""
          : align === "left"
            ? "pl-12 flex justify-center"
            : "pr-12 flex justify-center"
      }`}
    >
      <div className="bg-white shadow-lg rounded-xl px-5 py-4 flex items-center gap-3 min-w-[240px]">
        <div className="w-9 h-9 rounded-full bg-[#EDE4FF] flex items-center justify-center">
          <img src={step.icon} alt="" className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-black">Timeline</p>
          <p className="text-xs text-gray-500">{step.timeline}</p>
        </div>
      </div>
    </div>
  );
}
