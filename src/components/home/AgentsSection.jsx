import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { useAuth } from "../../store/auth";

// TODO: replace with agents fetched from the backend once the API is ready
const DUMMY_AGENTS = [
  {
    id: 1,
    name: "Rahul Deshmukh",
    agency: "Deshmukh Realty",
    experience: 8,
    dealsClosed: 120,
    rating: 4.8,
    reviews: 86,
    areas: ["Manish Nagar", "Besa"],
    languages: ["Marathi", "Hindi", "English"],
  },
  {
    id: 2,
    name: "Priya Wankhede",
    agency: "Orange City Homes",
    experience: 6,
    dealsClosed: 95,
    rating: 4.9,
    reviews: 72,
    areas: ["Dharampeth", "Civil Lines"],
    languages: ["Marathi", "English"],
  },
  {
    id: 3,
    name: "Amit Agrawal",
    agency: "Agrawal Properties",
    experience: 12,
    dealsClosed: 210,
    rating: 4.7,
    reviews: 140,
    areas: ["Wardha Road", "Jamtha"],
    languages: ["Hindi", "English"],
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    agency: "Kulkarni Estates",
    experience: 5,
    dealsClosed: 64,
    rating: 4.8,
    reviews: 51,
    areas: ["Hingna", "MIHAN"],
    languages: ["Marathi", "Hindi"],
  },
  {
    id: 5,
    name: "Imran Sheikh",
    agency: "Sheikh & Sons Realtors",
    experience: 10,
    dealsClosed: 150,
    rating: 4.6,
    reviews: 98,
    areas: ["Sadar", "Koradi Road"],
    languages: ["Hindi", "Urdu", "English"],
  },
  {
    id: 6,
    name: "Neha Bhoyar",
    agency: "Bhoyar Land Developers",
    experience: 7,
    dealsClosed: 88,
    rating: 4.9,
    reviews: 63,
    areas: ["Pratap Nagar", "Trimurti Nagar"],
    languages: ["Marathi", "English"],
  },
  {
    id: 7,
    name: "Vikas Thakre",
    agency: "Thakre Housing",
    experience: 9,
    dealsClosed: 132,
    rating: 4.7,
    reviews: 104,
    areas: ["Kamptee Road", "Mankapur"],
    languages: ["Marathi", "Hindi"],
  },
  {
    id: 8,
    name: "Kavya Joshi",
    agency: "Joshi Property Advisors",
    experience: 4,
    dealsClosed: 47,
    rating: 4.8,
    reviews: 39,
    areas: ["Ramdaspeth", "Bajaj Nagar"],
    languages: ["Marathi", "English"],
  },
];

const AGENTS_PER_DAY = 4;

// Picks a different set of agents each day (IST), cycling through the full list
const getAgentsForToday = (agents) => {
  if (agents.length <= AGENTS_PER_DAY) return agents;
  const istDate = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
  const dayIndex = Math.floor(Date.parse(istDate) / 86400000);
  const start = (dayIndex * AGENTS_PER_DAY) % agents.length;
  return Array.from(
    { length: AGENTS_PER_DAY },
    (_, i) => agents[(start + i) % agents.length],
  );
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const AgentCard = ({ agent, onContact }) => (
  <div className="h-full flex flex-col bg-white border border-[#00000020] rounded-2xl shadow-md overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
    <div className="h-16 bg-gradient-to-r from-[#5E23DC] to-[#8A38F5]" />

    <div className="flex flex-col items-center px-4 pb-5 -mt-10 flex-1">
      <div className="w-20 h-20 rounded-full border-4 border-white bg-[#FAF8FF] text-[#8A38F5] flex items-center justify-center text-2xl font-bold shadow">
        {getInitials(agent.name)}
      </div>

      <div className="mt-3 flex items-center gap-1">
        <h3 className="text-base sm:text-lg font-bold text-black">
          {agent.name}
        </h3>
        <MdVerified className="text-[#8A38F5] w-5 h-5" title="Verified Agent" />
      </div>
      <p className="text-sm text-gray-500">{agent.agency}</p>

      <div className="mt-2 flex items-center gap-1 text-sm">
        <FaStar className="text-[#FFB800]" />
        <span className="font-semibold">{agent.rating}</span>
        <span className="text-gray-400">({agent.reviews} reviews)</span>
      </div>

      <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center">
        <div className="rounded-xl bg-[#FAF8FF] py-2">
          <p className="text-lg font-bold text-[#5E23DC]">
            {agent.experience}+
          </p>
          <p className="text-xs text-gray-500">Years Exp.</p>
        </div>
        <div className="rounded-xl bg-[#FAF8FF] py-2">
          <p className="text-lg font-bold text-[#5E23DC]">
            {agent.dealsClosed}+
          </p>
          <p className="text-xs text-gray-500">Deals Closed</p>
        </div>
      </div>

      <div className="w-full mt-3 flex items-start gap-2 text-sm text-gray-600">
        <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#8A38F5]" />
        <span>{agent.areas.join(", ")}</span>
      </div>

      <div className="w-full mt-2 flex flex-wrap gap-1.5">
        {agent.languages.map((lang) => (
          <span
            key={lang}
            className="text-xs px-2 py-0.5 rounded-full border border-[#8A38F5]/40 text-[#8A38F5]"
          >
            {lang}
          </span>
        ))}
      </div>

      <div className="w-full mt-auto pt-4">
        <button
          onClick={onContact}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#8A38F5] text-[#8A38F5] font-semibold py-2.5 transition hover:bg-[#8A38F5] hover:text-white"
        >
          <FiPhoneCall />
          Contact Agent
        </button>
      </div>
    </div>
  </div>
);

const AgentsSection = () => {
  const router = useRouter();
  const { selectedCity } = useAuth();
  const agents = useMemo(() => getAgentsForToday(DUMMY_AGENTS), []);

  const handleContact = () => router.push("/contact-us");

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 py-6 lg:py-10">
      {/* Heading */}
      <div className="flex items-center justify-center gap-6 pb-2">
        <div className="flex-1 h-[3px] bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF]" />
        <h2 className="text-lg text-center sm:text-2xl md:text-4xl lg:text-5xl font-bold">
          Meet Our <span className="text-[#8A38F5]">Verified</span> Agents
          <span className="hidden sm:inline"> in {selectedCity}</span>
          <p className="block sm:hidden"> in {selectedCity}</p>
        </h2>
        <div className="flex-1 h-[3px] bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF]" />
      </div>
      <p className="text-center text-sm sm:text-base text-gray-500 pb-6 sm:pb-10">
        Trusted local experts who help you buy, sell and rent with confidence
      </p>

      {/* Mobile Horizontal Scroll */}
      <div className="sm:hidden overflow-x-auto scrollbar-hide flex gap-4 px-1 pb-4 snap-x snap-mandatory">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="min-w-[260px] snap-center"
          >
            <AgentCard agent={agent} onContact={handleContact} />
          </motion.div>
        ))}
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <AgentCard agent={agent} onContact={handleContact} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AgentsSection;
