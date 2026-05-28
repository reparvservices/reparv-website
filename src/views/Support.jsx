"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AdvertisementCard from "@/components/AdvertisementCard";
import {
  IoSearchOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoChatbubblesOutline,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

/* ─── Data ─────────────────────────────────────────────── */

const categories = [
  {
    id: 1,
    icon: <IoHomeOutline className="w-7 h-7" />,
    title: "Property Listings",
    desc: "Help with searching, filtering, and understanding property details.",
    color: "#7E3FF2",
  },
  {
    id: 2,
    icon: <IoDocumentTextOutline className="w-7 h-7" />,
    title: "Documentation",
    desc: "Guidance on legal documents, title verification, and paperwork.",
    color: "#3F2D62",
  },
  {
    id: 3,
    icon: <IoShieldCheckmarkOutline className="w-7 h-7" />,
    title: "Trust & Verification",
    desc: "Understanding Reparv's property verification and trust process.",
    color: "#7E3FF2",
  },
  {
    id: 4,
    icon: <IoPeopleOutline className="w-7 h-7" />,
    title: "Partner Program",
    desc: "Join as a sales partner and learn about commission structures.",
    color: "#3F2D62",
  },
  {
    id: 5,
    icon: <IoChatbubblesOutline className="w-7 h-7" />,
    title: "Booking Updates",
    desc: "Track your booking status and get real-time notifications.",
    color: "#7E3FF2",
  },
  {
    id: 6,
    icon: <IoCallOutline className="w-7 h-7" />,
    title: "Account & Access",
    desc: "Login issues, profile management, and account settings.",
    color: "#3F2D62",
  },
];

const faqs = [
  {
    id: 1,
    q: "How does Reparv verify properties?",
    a: "Every property listed on Reparv undergoes a rigorous multi-step verification process — title check, site inspection, builder credential validation, and RERA compliance review — before it goes live on our platform.",
  },
  {
    id: 2,
    q: "How do I track my booking status?",
    a: "Once your booking is confirmed, you receive a unique booking ID. Log in to your dashboard and visit 'My Bookings' to see real-time status updates, payment milestones, and document stages.",
  },
  {
    id: 3,
    q: "What documents are needed to register as a partner?",
    a: "You need a government-issued ID (Aadhaar / PAN), a selfie for KYC, and your bank account details for commission payouts. The entire onboarding process is digital and takes under 10 minutes.",
  },
  {
    id: 4,
    q: "Is Reparv available outside major cities?",
    a: "We are actively expanding across Tier-2 and Tier-3 towns in 2025–26. If your city isn't listed yet, you can sign up for an early-access notification and we will reach out when we go live there.",
  },
  {
    id: 5,
    q: "How do I report an incorrect property listing?",
    a: "Open the property page, scroll to the bottom, and click 'Report an Issue'. Describe the discrepancy and our team will investigate within 48 hours and update the listing accordingly.",
  },
  {
    id: 6,
    q: "Can I get a refund if a deal falls through?",
    a: "Refund eligibility depends on the stage of the transaction and the builder's policy. Reparv's support team can mediate on your behalf. Contact us with your booking ID and we will guide you step by step.",
  },
];

const contactChannels = [
  {
    icon: <IoCallOutline className="w-8 h-8" />,
    label: "Call Us",
    value: "+91 801 0881 965",
    sub: "Mon – Sat, 9 AM – 6 PM",
    href: "tel:+918010881965",
    cta: "Call Now",
  },
  {
    icon: <IoMailOutline className="w-8 h-8" />,
    label: "Email Us",
    value: "contact@reparv.in",
    sub: "We reply within 24 hours",
    href: "mailto:contact@reparv.in",
    cta: "Send Mail",
  },
  {
    icon: <IoLocationOutline className="w-8 h-8" />,
    label: "Visit Us",
    value: "Chandrapur, Maharashtra",
    sub: "By appointment only",
    href: "https://maps.google.com/?q=Chandrapur+Maharashtra",
    cta: "Get Directions",
  },
];

/* ─── Sub-components ────────────────────────────────────── */

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setOpen((p) => !p)}
      className="cursor-pointer border border-[#E5DFF5] rounded-2xl bg-white shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-5 gap-4">
        <span className="text-[#3F2D62] font-semibold text-base md:text-lg">
          {item.q}
        </span>
        <span className="shrink-0 text-[#7E3FF2]">
          {open ? (
            <IoChevronUpOutline className="w-5 h-5" />
          ) : (
            <IoChevronDownOutline className="w-5 h-5" />
          )}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-[#555] text-sm md:text-base leading-relaxed border-t border-[#F0EBF9] pt-4">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.fullname.trim()) e.fullname = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.contact))
      e.contact = "Enter a valid 10-digit number";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/frontend/contact-us/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname: form.fullname.trim(),
            email: form.email.trim().toLowerCase(),
            contact: form.contact.trim(),
            subject: form.subject.trim(),
            message: form.message.trim(),
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }
      setSent(true);
    } catch {
      alert("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSent(false);
    setForm({ fullname: "", email: "", contact: "", subject: "", message: "" });
    setErrors({});
  };

  if (sent)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <IoCheckmarkCircleOutline className="w-16 h-16 text-[#7E3FF2]" />
        <h3 className="text-2xl font-bold text-[#3F2D62]">
          Message Received!
        </h3>
        <p className="text-[#868686] max-w-sm">
          Our support team will get back to you within 24 hours. Thank you for
          reaching out to Reparv.
        </p>
        <button
          onClick={reset}
          className="mt-2 px-6 py-2 rounded-full border border-[#7E3FF2] text-[#7E3FF2] text-sm font-medium hover:bg-[#7E3FF2] hover:text-white transition-colors"
        >
          Send Another
        </button>
      </motion.div>
    );

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border bg-[#FAFAFA] text-[#3F2D62] placeholder-[#BBBBBB] outline-none focus:ring-2 transition
    ${errors[field] ? "border-red-400 focus:ring-red-200" : "border-[#E5DFF5] focus:ring-[#7E3FF2]/30 focus:border-[#7E3FF2]"}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <input
          name="fullname"
          type="text"
          placeholder="Your Full Name *"
          value={form.fullname}
          onChange={handleChange}
          autoComplete="name"
          className={inputClass("fullname")}
        />
        {errors.fullname && (
          <p className="text-red-500 text-xs ml-1">{errors.fullname}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <input
          name="email"
          type="email"
          placeholder="Email Address *"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          className={inputClass("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs ml-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <input
          name="contact"
          type="tel"
          placeholder="Phone Number *"
          value={form.contact}
          onChange={handleChange}
          inputMode="numeric"
          maxLength={10}
          autoComplete="tel"
          className={inputClass("contact")}
        />
        {errors.contact && (
          <p className="text-red-500 text-xs ml-1">{errors.contact}</p>
        )}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1">
        <input
          name="subject"
          type="text"
          placeholder="Subject *"
          value={form.subject}
          onChange={handleChange}
          className={inputClass("subject")}
        />
        {errors.subject && (
          <p className="text-red-500 text-xs ml-1">{errors.subject}</p>
        )}
      </div>

      {/* Category select */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="sm:col-span-2 px-4 py-3 rounded-xl border border-[#E5DFF5] bg-[#FAFAFA] text-[#3F2D62] outline-none focus:ring-2 focus:ring-[#7E3FF2]/30 focus:border-[#7E3FF2] transition"
      >
        <option value="">Select a Category (optional)</option>
        {categories.map((c) => (
          <option key={c.id} value={c.title}>
            {c.title}
          </option>
        ))}
      </select>

      {/* Message */}
      <div className="sm:col-span-2 flex flex-col gap-1">
        <textarea
          name="message"
          rows={5}
          placeholder="Describe your issue or question…"
          value={form.message}
          onChange={handleChange}
          className={`sm:col-span-2 resize-none ${inputClass("message")}`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs ml-1">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 w-full py-3.5 rounded-xl bg-[#7E3FF2] text-white font-semibold text-base hover:bg-[#3F2D62] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Sending…
          </>
        ) : (
          "Submit Request"
        )}
      </button>
    </form>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function Support() {
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(
    () =>
      faqs.filter(
        (f) =>
          search.trim() === "" ||
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <>
      <div className="relative w-full mx-auto max-w-[1440px] flex flex-col items-center justify-center">

        {/* ── Hero Banner ── */}
        <div className="w-full relative lg:mb-5">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-[250px] md:w-full rounded-bl-[2rem] md:rounded-bl-none rounded-br-[2rem] md:rounded-br-none overflow-hidden"
          >
            <Image
              src="/assets/aboutUs/AboutUsBackImage.webp"
              alt="Reparv Support"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3F2D62CC] to-transparent rounded-bl-[2rem] md:rounded-bl-none rounded-br-[2rem] md:rounded-br-none pointer-events-none" />

          <div className="absolute left-[10%] bottom-[15%] flex flex-col gap-3">
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              Support
            </h1>
            <p className="hidden md:block text-white/80 text-lg max-w-md">
              Have a question? We've got you covered — search below or choose a
              topic.
            </p>

            {/* Search bar */}
            <div className="relative mt-2 w-full max-w-md">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7E3FF2] w-5 h-5" />
              <input
                type="search"
                placeholder="Search FAQs…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search FAQs"
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white text-[#3F2D62] placeholder-[#AAA] text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7E3FF2]"
              />
            </div>
          </div>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="absolute hidden lg:flex items-center gap-1 left-[10%] bottom-[-10%] text-[#3F2D62] text-xl"
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-1">{">"}</span>
            <span>Support</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 mb-10 sm:mb-15">

          {/* ── Help Categories ── */}
          <section className="my-12 lg:my-20">
            <p className="text-[#3F2D62] font-medium text-center mb-3">
              #Browse by Topic
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#3F2D62] text-center mb-10">
              How Can We Help?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="relative bg-white rounded-2xl p-7 shadow-[0px_3px_11px_0px_#00000026] overflow-hidden cursor-pointer group"
                >
                  {/* Accent blob */}
                  <div
                    className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ background: cat.color }}
                  />
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 text-white"
                    style={{ background: cat.color }}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#3F2D62] mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-[#868686] text-sm leading-relaxed">
                    {cat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── FAQs ── */}
          <section className="my-12 lg:my-20">
            <p className="text-[#3F2D62] font-medium text-center mb-3">
              #Quick Answers
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#3F2D62] text-center mb-10">
              Frequently Asked Questions
            </h2>

            {filteredFaqs.length === 0 ? (
              <div className="text-center text-[#868686] py-10 text-lg">
                No FAQs match your search. Try different keywords or{" "}
                <a href="#contact-form" className="text-[#7E3FF2] underline">
                  contact us
                </a>
                .
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-w-4xl mx-auto">
                {filteredFaqs.map((item) => (
                  <FAQItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>

          {/* ── Contact Channels ── */}
          <section className="my-12 lg:my-20">
            <p className="text-[#3F2D62] font-medium text-center mb-3">
              #Reach Out
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#3F2D62] text-center mb-10">
              Contact Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {contactChannels.map((ch, i) => (
                <motion.a
                  key={ch.label}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-[0px_3px_11px_0px_#00000026] gap-3 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#F3EEFF] flex items-center justify-center text-[#7E3FF2] group-hover:bg-[#7E3FF2] group-hover:text-white transition-colors duration-200">
                    {ch.icon}
                  </div>
                  <p className="text-[#3F2D62] font-bold text-lg">{ch.label}</p>
                  <p className="text-[#3F2D62] font-semibold">{ch.value}</p>
                  <p className="text-[#868686] text-sm">{ch.sub}</p>
                  <span className="mt-2 px-5 py-2 rounded-full bg-[#F3EEFF] text-[#7E3FF2] text-sm font-medium group-hover:bg-[#7E3FF2] group-hover:text-white transition-colors duration-200">
                    {ch.cta}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-[0px_3px_24px_0px_#00000020] p-8 md:p-12 max-w-3xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-[#3F2D62] mb-2">
                Send Us a Message
              </h3>
              <p className="text-[#868686] mb-8 text-sm md:text-base">
                Fill in the form below and our support team will get back to you
                as soon as possible.
              </p>
              <ContactForm />
            </motion.div>
          </section>

          <AdvertisementCard />
        </div>
      </div>
    </>
  );
}