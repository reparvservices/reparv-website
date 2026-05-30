"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "../store/auth";
import SEO from "../components/SEO";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AdvertisementCard from "../components/AdvertisementCard";
import GetDirectionsMap from "../components/contactUs/GetDirectionsMap";
import { useRouter } from "next/navigation"; 

/* lucide-react */
import {
  Phone,
  Mail,
  MapPin,
  Home,
  FileText,
  ShieldCheck,
  Handshake,
  Package,
  UserCog,
  ChevronRight,
  Search,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Download,
  Star,
  Lock,
  Zap,
  ClipboardList,
  Building2,
  BadgeCheck,
  CreditCard,
  Info,
  MessageSquare,
  Send,
  Loader2,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

/* react-icons */
import { GrLocation } from "react-icons/gr";
import { FaApple } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdVerified, MdOutlineSupportAgent } from "react-icons/md";
import { BsPersonBadge, BsStarFill } from "react-icons/bs";

/* ══════════════════════════════════════════════════════════
   CONSTANTS & DATA
══════════════════════════════════════════════════════════ */

const SUPPORT_CHANNELS = [
  {
    id: "call",
    Icon: Phone,
    label: "Call Support",
    value: "+91 801 0881 965",
    meta: "Mon – Sat · 9 AM – 6 PM",
    href: "tel:+918010881965",
    cta: "Call Now",
    tag: "Fastest",
  },
  {
    id: "email",
    Icon: Mail,
    label: "Email Support",
    value: "contact@reparv.in",
    meta: "Reply within 24 hours",
    href: "mailto:contact@reparv.in",
    cta: "Send Mail",
    tag: null,
  },
  {
    id: "visit",
    Icon: MapPin,
    label: "Branch Office",
    value: "Nagpur, Maharashtra",
    meta: "By prior appointment",
    href: "https://maps.google.com/?q=Nagpur+Maharashtra",
    cta: "Get Directions",
    tag: null,
  },
];

const HELP_TOPICS = [
  {
    id: 1,
    Icon: Home,
    title: "Property Search",
    faqKey: "Property Search",
    desc: "Filtering listings, map search, shortlisting verified properties.",
  },
  {
    id: 2,
    Icon: FileText,
    title: "Legal & Documents",
    faqKey: "Legal & Documents",
    desc: "Title verification, RERA checks, sale deed and registration queries.",
  },
  {
    id: 3,
    Icon: ShieldCheck,
    title: "Trust & Safety",
    faqKey: "Trust & Safety",
    desc: "How Reparv verifies builders, properties, and protects your money.",
  },
  {
    id: 4,
    Icon: Handshake,
    title: "Partner Program",
    faqKey: "Partner Program",
    desc: "Becoming a sales partner, commission structure, and onboarding.",
  },
  {
    id: 5,
    Icon: Package,
    title: "Booking & Tracking",
    faqKey: "Booking & Tracking",
    desc: "Booking status, payment milestones, and real-time updates.",
  },
  {
    id: 6,
    Icon: UserCog,
    title: "Account Settings",
    faqKey: "All",
    desc: "Login help, profile changes, KYC, and notification preferences.",
  },
];

const FAQS = [
  {
    id: 1,
    topic: "Trust & Safety",
    q: "How does Reparv ensure a property is safe to buy?",
    a: "Every listing passes a multi-step verification: government title check, on-site physical inspection, builder RERA credential review, and encumbrance certificate validation. Only properties that clear all four stages appear on the platform.",
  },
  {
    id: 2,
    topic: "Booking & Tracking",
    q: "How do I check my booking progress after payment?",
    a: "Log in and go to My Bookings. You'll see a live timeline showing payment confirmation, document collection, registration, and handover stages — with timestamps and assigned team contact at each step.",
  },
  {
    id: 3,
    topic: "Partner Program",
    q: "What do I need to join as a Reparv sales partner?",
    a: "Just an Aadhaar or PAN card, a selfie for KYC, and your bank details for payouts. Digital onboarding takes under 10 minutes. No prior real estate experience is required — we provide full training.",
  },
  {
    id: 4,
    topic: "Property Search",
    q: "Can I buy property in cities not yet listed on Reparv?",
    a: "We're expanding across Tier 2 and Tier 3 cities through 2026. Register your interest and you'll get an early-access notification the moment your city goes live. No commitment needed.",
  },
  {
    id: 5,
    topic: "Legal & Documents",
    q: "What happens if I find incorrect details in a listing?",
    a: "Scroll to the bottom of the property page and tap 'Report an Issue'. Our verification team investigates within 48 hours and either corrects the listing or removes it pending re-inspection.",
  },
  {
    id: 6,
    topic: "Legal & Documents",
    q: "Are refunds possible if a transaction doesn't go through?",
    a: "Refund eligibility depends on the transaction stage and the builder's agreement. Reparv's support team actively mediates on your behalf. Reach us with your booking ID and we handle the follow-up.",
  },
];

const IOS_STEPS = [
  {
    step: "01",
    Icon: Smartphone,
    title: "Open App Store",
    desc: "Launch the App Store on your iPhone or iPad. Make sure you're signed in with your Apple ID.",
  },
  {
    step: "02",
    Icon: Search,
    title: "Search 'Reparv'",
    desc: "Type Reparv in the search bar. Look for the official Reparv – Real Estate app with our purple logo.",
  },
  {
    step: "03",
    Icon: Download,
    title: "Download & Install",
    desc: "Tap Get and authenticate with Face ID, Touch ID, or your Apple ID password to install.",
  },
  {
    step: "04",
    Icon: CheckCircle2,
    title: "Verify Your Account",
    desc: "Open the app, enter your mobile number, and confirm the OTP sent to your registered number to activate your account.",
  },
];

const ADDRESS =
  "REPARV SERVICES PRIVATE LIMITED, PLOT NO. 11, THIRD BUS STOP, GORLE LAYOUT, Trimurti Nagar, Nagpur – 440022, Maharashtra";

/* ══════════════════════════════════════════════════════════
   STAT COUNTER
══════════════════════════════════════════════════════════ */
function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════
   FAQ ACCORDION ITEM
══════════════════════════════════════════════════════════ */
function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full text-left flex items-start justify-between gap-4 py-5 px-6 rounded-2xl bg-white border border-[#EAE3FC] hover:border-[#7E3FF2] hover:shadow-[0_0_0_3px_#7E3FF220] transition-all duration-200"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-xs font-bold text-[#7E3FF2] bg-[#F4F0FE] px-2 py-0.5 rounded-full whitespace-nowrap">
            {item.topic}
          </span>
          <span className="text-[#1E1340] font-semibold text-sm md:text-base leading-snug">
            {item.q}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-6 h-6 rounded-full bg-[#F4F0FE] text-[#7E3FF2] flex items-center justify-center mt-0.5"
        >
          <Plus size={14} strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pt-3 pb-5 text-[#4B4268] text-sm md:text-base leading-relaxed border-l-2 border-[#7E3FF2] ml-6 mt-1">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════════ */
function SupportForm() {
  const { URI } = useAuth();
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.fullname.trim()) e.fullname = "Name is required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Valid email required";
    if (!/^\d{10}$/.test(formData.contact)) e.contact = "Enter a 10-digit number";
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (!formData.message.trim()) e.message = "Message cannot be empty";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    try {
      setLoading(true);
      const res = await fetch(URI + "frontend/contact-us/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.fullname.trim(),
          email: formData.email.trim().toLowerCase(),
          contact: formData.contact.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message || "Something went wrong"); return; }
      setStep("success");
    } catch {
      alert("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("form");
    setFormData({ fullname: "", email: "", contact: "", subject: "", message: "" });
    setErrors({});
  };

  const Field = ({ name, type = "text", placeholder, half }) => (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        inputMode={name === "contact" ? "numeric" : undefined}
        maxLength={name === "contact" ? 10 : undefined}
        className={`w-full bg-[#FAF8FF] border rounded-xl px-4 py-3.5 text-[#1E1340] placeholder-[#B0A8CC] text-sm outline-none transition-all duration-200
          focus:bg-white focus:shadow-[0_0_0_3px_#7E3FF230]
          ${errors[name] ? "border-red-400 focus:border-red-400" : "border-[#DDD6F8] focus:border-[#7E3FF2]"}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 ml-1">{errors[name]}</p>
      )}
    </div>
  );

  if (step === "success")
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center gap-5"
      >
        <div className="w-20 h-20 rounded-full bg-[#F4F0FE] flex items-center justify-center">
          <CheckCircle2 size={40} className="text-[#7E3FF2]" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold text-[#1E1340]">We've got your message!</h3>
        <p className="text-[#6B5F8A] max-w-xs text-sm leading-relaxed">
          Our support team typically responds within 24 hours on business days.
          We'll reach out on the email or number you provided.
        </p>
        <button
          onClick={reset}
          className="mt-2 px-7 py-2.5 rounded-full bg-[#7E3FF2] text-white text-sm font-semibold hover:bg-[#3F2D62] transition-colors"
        >
          Submit Another
        </button>
      </motion.div>
    );

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <Field name="fullname" placeholder="Full Name *" half />
      <Field name="email" type="email" placeholder="Email Address *" half />
      <Field name="contact" placeholder="Phone Number *" half />
      <Field name="subject" placeholder="Subject *" half />
      <div className="col-span-2">
        <textarea
          name="message"
          rows={5}
          placeholder="Describe your issue or question in detail…"
          value={formData.message}
          onChange={handleChange}
          className={`w-full bg-[#FAF8FF] border rounded-xl px-4 py-3.5 text-[#1E1340] placeholder-[#B0A8CC] text-sm outline-none resize-none transition-all duration-200
            focus:bg-white focus:shadow-[0_0_0_3px_#7E3FF230]
            ${errors.message ? "border-red-400 focus:border-red-400" : "border-[#DDD6F8] focus:border-[#7E3FF2]"}`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>
        )}
      </div>
      <div className="col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-[#7E3FF2] text-white font-bold text-sm tracking-wide hover:bg-[#3F2D62] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Submit Request
              <Send size={14} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function Support() {
  const { URI } = useAuth();
  const router = useRouter();
  const [seoData, setSeoData] = useState({});
  const [activeFilter, setActiveFilter] = useState("All");

  const directionsUrl = useMemo(
    () => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`,
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${URI}/frontend/seo-data/support`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        setSeoData(await res.json());
      } catch {}
    })();
  }, [URI]);

  const topics = ["All", ...Array.from(new Set(FAQS.map((f) => f.topic)))];

  const filteredFaqs = FAQS.filter((f) => {
    const matchesTopic = activeFilter === "All" || f.topic === activeFilter;
    return matchesTopic;
  });

  const handleTopicClick = (faqKey) => {
    setActiveFilter(faqKey);
    document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title={seoData?.title || "Support Center | Reparv — Real Estate Help & Assistance"}
        description={
          seoData?.description ||
          "Get expert help with property listings, legal documents, booking tracking, and partner programs. Reparv support is available 6 days a week."
        }
        canonical="https://www.reparv.in/support"
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden min-h-[420px] md:min-h-[500px]">
        <motion.img
          src="/assets/aboutUs/AboutUsBackImage.webp"
          alt="Reparv Support"
          loading="eager"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1340]/90 via-[#1E1340]/70 to-[#1E1340]/30" />

        {/* Floating verified tag */}
        <motion.img
          src={"/assets/aboutUs/tag.svg"}
          alt="Verified"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute top-[12%] right-[6%] md:right-[12%] w-[110px] md:w-[170px] z-10 pointer-events-none"
        />

        {/* Hero text */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 pt-28 flex flex-col justify-end min-h-[420px] md:min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block text-[#C4B0F8] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Reparv Support Center
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl mb-6">
              How can we <br />
              <span className="text-[#C4B0F8]">help you today?</span>
            </h1>

            <div className="flex flex-wrap gap-4 mt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#7E3FF2] text-white font-bold text-sm tracking-wide shadow-[0_4px_24px_#7E3FF250] hover:bg-[#6B2FD9] transition-all duration-200"
              >
                Browse FAQs <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("contact-form-section")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-sm tracking-wide hover:bg-white/20 backdrop-blur transition-all duration-200"
              >
                Contact Us <MessageSquare size={15} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BREADCRUMB ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-0">
        <p className="text-[#9B93B8] text-sm">
          <span
            className="text-[#3F2D62] cursor-pointer hover:underline"
            onClick={() => router.push("/")}
          >
            Home
          </span>
          <span className="mx-2 text-[#C4B0F8]">/</span>
          Support
        </p>
      </div>

      {/* ── STATS STRIP ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: 98,   suffix: "%",    label: "Resolution Rate" },
            { value: 24,   suffix: "h",    label: "Email Response" },
            { value: 1000, suffix: "+",    label: "Queries Resolved" },
            { value: 6,    suffix: " days",label: "Weekly Availability" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#F4F0FE] rounded-2xl px-6 py-5 flex flex-col gap-1"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-[#3F2D62]">
                <Counter to={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[#6B5F8A] text-xs font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT CHANNELS ─────────────────────────────── */}
      <section className="bg-[#7E3FF2] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#C4B0F8] text-xs tracking-widest uppercase font-semibold mb-2">
              Reach Us Directly
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pick the fastest lane
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SUPPORT_CHANNELS.map((ch, i) => (
              <motion.a
                key={ch.id}
                href={ch.href}
                target={ch.id === "visit" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 rounded-2xl p-7 flex flex-col gap-3 transition-all duration-200 cursor-pointer"
              >
                {ch.tag && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold bg-white/15 text-white px-2.5 py-0.5 rounded-full tracking-wide border border-white/20">
                    {ch.tag}
                  </span>
                )}
                {/* Icon circle */}
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-200">
                  <ch.Icon size={22} className="text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest font-medium">{ch.label}</p>
                  <p className="text-white text-lg font-bold mt-0.5">{ch.value}</p>
                  <p className="text-white/40 text-xs mt-1">{ch.meta}</p>
                </div>
                <span className="mt-1 inline-flex items-center gap-1.5 text-white/70 text-sm font-semibold group-hover:text-white transition-colors">
                  {ch.cta} <ChevronRight size={15} />
                </span>
              </motion.a>
            ))}
          </div>

          {/* Address strip */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-white/70 text-xs">
            <GrLocation size={15} className="shrink-0" />
            <span className="text-center sm:text-left">{ADDRESS}</span>
            <button
              onClick={() => window.open(directionsUrl, "_blank")}
              className="shrink-0 text-white underline underline-offset-2 hover:text-[#C4B0F8] transition-colors font-medium"
            >
              Get Directions
            </button>
          </div>
        </div>
      </section>

      {/* ── HELP TOPICS GRID ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[#7E3FF2] text-xs tracking-widest uppercase font-semibold mb-2">Browse by Topic</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1340]">What do you need help with?</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {HELP_TOPICS.map((topic, i) => (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => handleTopicClick(topic.faqKey)}
              whileHover={{ y: -3 }}
              className="text-left bg-white border border-[#EAE3FC] hover:border-[#7E3FF2] hover:shadow-[0_4px_24px_#7E3FF215] rounded-2xl p-6 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F4F0FE] flex items-center justify-center mb-4 group-hover:bg-[#7E3FF2] transition-colors duration-200">
                <topic.Icon
                  size={20}
                  className="text-[#7E3FF2] group-hover:text-white transition-colors duration-200"
                  strokeWidth={1.8}
                />
              </div>
              <h3 className="font-bold text-[#1E1340] text-sm md:text-base mb-1">{topic.title}</h3>
              <p className="text-[#9B93B8] text-xs leading-relaxed">{topic.desc}</p>
              <span className="inline-flex items-center gap-1 text-[#7E3FF2] text-xs font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View FAQs <ChevronRight size={12} />
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── FAQ SECTION ──────────────────────────────────── */}
      <section id="faq-section" className="bg-[#FAF8FF] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#7E3FF2] text-xs tracking-widest uppercase font-semibold mb-2">Quick Answers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1340]">Frequently Asked Questions</h2>
          </div>

          {/* Topic filter pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setActiveFilter(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeFilter === t
                    ? "bg-[#7E3FF2] text-white shadow-[0_2px_12px_#7E3FF240]"
                    : "bg-white text-[#3F2D62] border border-[#DDD6F8] hover:border-[#7E3FF2]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {filteredFaqs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-14 text-[#9B93B8]"
                >
                  <Search size={36} className="mx-auto mb-3 text-[#C4B0F8]" strokeWidth={1.5} />
                  <p className="font-semibold text-[#3F2D62] mb-1">No results found</p>
                  <p className="text-sm">Try selecting a different topic.</p>
                </motion.div>
              ) : (
                filteredFaqs.map((item, i) => (
                  <FAQItem key={item.id} item={item} index={i} />
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Redirect CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white border border-[#EAE3FC] rounded-2xl px-8 py-6"
          >
            <p className="text-[#3F2D62] font-semibold text-sm text-center sm:text-left">
              Didn't find what you were looking for?
            </p>
            <button
              onClick={() => document.getElementById("contact-form-section")?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#7E3FF2] text-white text-sm font-bold hover:bg-[#3F2D62] transition-colors shadow-[0_2px_16px_#7E3FF230]"
            >
              Ask Us Directly <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── iOS VERIFICATION SECTION ─────────────────────── */}
      <section className="hidden bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-[#7E3FF2] text-xs tracking-widest uppercase font-semibold mb-2">
              iOS App
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1340] mb-3">
              Get Reparv on your iPhone
            </h2>
            <p className="text-[#6B5F8A] text-sm md:text-base max-w-xl mx-auto">
              Download from the App Store and complete full account verification in under 10 minutes — right from your iPhone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* LEFT — numbered steps with connecting line */}
            <div className="relative flex flex-col gap-0">
              {/* Vertical connector line */}
              <div className="absolute left-[27px] top-14 bottom-28 w-[2px] bg-gradient-to-b from-[#7E3FF2] via-[#C4B0F8] to-transparent rounded-full" />

              {IOS_STEPS.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="relative flex items-start gap-5 pb-8 last:pb-0 group"
                >
                  {/* Step bubble */}
                  <div className="shrink-0 z-10 w-14 h-14 rounded-2xl bg-[#F4F0FE] border-2 border-[#EAE3FC] group-hover:border-[#7E3FF2] group-hover:bg-[#7E3FF2] shadow-[0_2px_12px_#7E3FF210] flex flex-col items-center justify-center gap-0.5 transition-all duration-200">
                    <s.Icon
                      size={20}
                      className="text-[#7E3FF2] group-hover:text-white transition-colors duration-200"
                      strokeWidth={1.8}
                    />
                    <span className="text-[9px] font-extrabold text-[#7E3FF2] group-hover:text-white/80 leading-none transition-colors">
                      {s.step}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="pt-2 flex-1">
                    <h3 className="font-extrabold text-[#1E1340] text-base mb-1 group-hover:text-[#7E3FF2] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[#6B5F8A] text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Requirement badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
                className="mt-6 flex items-center gap-3 bg-[#F4F0FE] border border-[#EAE3FC] rounded-2xl px-5 py-4"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-[#EAE3FC] flex items-center justify-center shrink-0">
                  <Info size={17} className="text-[#7E3FF2]" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[#1E1340] font-bold text-xs">iOS Requirements</p>
                  <p className="text-[#9B93B8] text-xs mt-0.5">
                    Requires iPhone running iOS 14.0 or later. Compatible with iPad.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — App Store card */}
            <motion.div
              initial={{ opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="sticky top-6"
            >
              {/* Dark app card */}
              <div className="bg-[#1E1340] rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-[-50px] right-[-50px] w-[220px] h-[220px] rounded-full bg-[#7E3FF2] opacity-15" />
                <div className="absolute bottom-[-40px] left-[-40px] w-[160px] h-[160px] rounded-full bg-[#3F2D62] opacity-50" />

                <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                  {/* App icon */}
                  <div className="w-24 h-24 rounded-[26px] bg-gradient-to-br from-[#7E3FF2] to-[#3F2D62] flex items-center justify-center shadow-[0_12px_40px_#7E3FF260]">
                    <Building2 size={44} className="text-white" strokeWidth={1.4} />
                  </div>

                  <div>
                    <h3 className="text-white font-extrabold text-2xl mb-1">Reparv</h3>
                    <p className="text-[#C4B0F8] text-xs tracking-wide">Real Estate · Verified Properties</p>
                  </div>

                  {/* Stars */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((n) => (
                        <BsStarFill key={n} size={16} className="text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/50 text-xs">4.8 out of 5 · App Store</p>
                  </div>

                  {/* Feature pills */}
                  <div className="flex flex-wrap justify-center gap-2 w-full">
                    {[
                      { label: "Secure Login",  Icon: Lock },
                      { label: "Instant OTP",   Icon: Zap },
                      { label: "KYC In-App",    Icon: ClipboardList },
                      { label: "Live Listings", Icon: Home },
                    ].map(({ label, Icon: I }) => (
                      <span key={label} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#C4B0F8] bg-white/8 border border-white/10 px-3 py-1.5 rounded-full">
                        <I size={11} strokeWidth={2} />
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* App Store button */}
                  <motion.a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full inline-flex items-center justify-center gap-3 bg-white text-[#1E1340] px-6 py-4 rounded-2xl font-extrabold text-sm shadow-[0_6px_24px_rgba(0,0,0,0.25)] hover:bg-[#F4F0FE] transition-all duration-200"
                  >
                    <FaApple size={22} />
                    Download on the App Store
                  </motion.a>

                  <p className="text-white/25 text-[10px]">Free · Requires iOS 14.0 or later</p>
                </div>
              </div>

              {/* Verification trust strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-4 grid grid-cols-3 gap-3"
              >
                {[
                  { Icon: BsPersonBadge,           label: "Aadhaar / PAN",  sub: "Accepted for KYC" },
                  { Icon: IoShieldCheckmarkOutline, label: "End-to-End",     sub: "Encrypted data" },
                  { Icon: MdVerified,               label: "RERA Verified",  sub: "Properties only" },
                ].map(({ Icon: I, label, sub }) => (
                  <div key={label} className="bg-[#F4F0FE] border border-[#EAE3FC] rounded-2xl px-3 py-3.5 flex flex-col items-center gap-1.5 text-center">
                    <I size={22} className="text-[#7E3FF2]" />
                    <p className="text-[#1E1340] font-bold text-[11px] leading-tight">{label}</p>
                    <p className="text-[#9B93B8] text-[10px]">{sub}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM SECTION ─────────────────────────── */}
      <section id="contact-form-section" className="bg-[#FAF8FF] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#7E3FF2] text-xs tracking-widest uppercase font-semibold mb-3">
                Still need help?
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E1340] leading-tight mb-4">
                Send us a message <br />
                <span className="text-[#7E3FF2]">we'll handle the rest.</span>
              </h2>
              <p className="text-[#6B5F8A] text-sm md:text-base leading-relaxed mb-8 max-w-md">
                Whether it's a property query, a legal document question, or a booking issue — fill in the form and your dedicated support agent will follow up within one business day.
              </p>

              {/* Promise cards */}
              <div className="flex flex-col gap-3">
                {[
                  { Icon: Zap,                  title: "Fast Response",      body: "Most queries resolved within 24 hours" },
                  { Icon: Lock,                 title: "100% Confidential",  body: "Your information is never shared with third parties" },
                  { Icon: MdOutlineSupportAgent, title: "Dedicated Agent",    body: "One person handles your case start to finish" },
                ].map(({ Icon: I, title, body }) => (
                  <div key={title} className="flex items-start gap-3 bg-white border border-[#EAE3FC] rounded-xl px-5 py-4">
                    <div className="w-9 h-9 rounded-lg bg-[#F4F0FE] flex items-center justify-center shrink-0 mt-0.5">
                      <I size={18} className="text-[#7E3FF2]" />
                    </div>
                    <div>
                      <p className="text-[#1E1340] font-bold text-sm">{title}</p>
                      <p className="text-[#6B5F8A] text-xs mt-0.5">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — form card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white border border-[#EAE3FC] rounded-3xl p-8 shadow-[0_8px_40px_#7E3FF212]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#7E3FF2] flex items-center justify-center">
                  <MessageSquare size={18} className="text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1340] text-lg leading-tight">Support Request</h3>
                  <p className="text-[#9B93B8] text-xs">We'll get back to you within 24h</p>
                </div>
              </div>
              <SupportForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP ──────────────────────────────────────────── */}
      <GetDirectionsMap />

      {/* ── ADS ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AdvertisementCard />
      </div>
    </>
  );
}