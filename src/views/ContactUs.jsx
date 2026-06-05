"use client"

import React, {useState, useEffect} from "react";
import { useAuth } from "../store/auth";
import SEO from "../components/SEO";
import { GrLocation } from "react-icons/gr";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import GetDirectionsMap from "../components/contactUs/GetDirectionsMap";
import { useMemo } from "react";
import { motion } from "framer-motion";
import AdvertisementCard from "../components/AdvertisementCard";

const ContactUs = () => {
  const { URI } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [seoData, setSeoData] = useState({});
  
  const fetchSeoData = async () => {
    const page = "contact-us";
    try {
      const response = await fetch(`${URI}/frontend/seo-data/${page}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch seo data.");
      const data = await response.json();
      console.log(data);
      setSeoData(data);
    } catch (err) {
      console.error("Error fetching Seo Data:", err);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only digits & max 10 for contact
    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { fullname, email, contact, subject, message } = formData;

    // Trim inputs
    fullname = fullname.trim();
    email = email.trim().toLowerCase();
    contact = contact.trim();
    subject = subject.trim();
    message = message.trim();

    // Required fields
    if (!fullname || !email || !contact || !subject || !message) {
      alert("All fields are required");
      return;
    }

    // Contact validation
    if (!/^\d{10}$/.test(contact)) {
      alert("Contact number must be exactly 10 digits");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(URI + "frontend/contact-us/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          contact,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Message sent successfully");

      setFormData({
        fullname: "",
        email: "",
        contact: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      alert("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Location",
      activity: "Visit at Us",
      desc: "Nagpur, Chandrapur",
      icon: <img src="/assets/contactUs/Icon1.svg" alt="icon" className="w-8 md:w-15 object-cover" />,
    },
    {
      title: "24*7 Service",
      activity: "Call Us on",
      desc: "+91 801 0881 965",
      icon: <img src="/assets/contactUs/Icon2.svg" alt="icon" className="w-8 md:w-15 object-cover" />,
    },
    {
      title: "Drop a line",
      activity: "Email Us on",
      desc: "contact@reparv.in",
      icon: <img src="/assets/contactUs/Icon3.svg" alt="icon" className="w-8 md:w-15 object-cover" />,
    },
    {
      title: "Office Hours",
      activity: "Opening Time",
      desc: "Mon-Fri:  9AM-6PM",
      icon: <img src="/assets/contactUs/Icon4.svg" alt="icon" className="w-8 md:w-15 object-cover" />,
    },
  ];

  const ADDRESS =
    "In front of Shiv Mandir, Sister Colony, Ram Nagar, Chandrapur, Maharashtra 442401";

  const embedUrl = useMemo(() => {
    return `https://www.google.com/maps?q=${encodeURIComponent(
      ADDRESS,
    )}&output=embed`;
  }, []);

  const directionsUrl = useMemo(() => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      ADDRESS,
    )}`;
  }, []);

  return (
    <>
      <SEO
        title={ seoData?.title ||
          "Contact Reparv | Trusted Real Estate Support and Property Assistance"
        }
        description={ seoData?.description ||
          "Reach out to Reparv for expert guidance on verified properties. Buy, sell, rent, or invest with confidence. Call +91 8010881965 today."
        }
        canonical="https://www.reparv.in/contact-us"
      />
      <div className="relative w-full mx-auto max-w-[1440px] flex flex-col items-center justify-center">
        <div className="w-full relative lg:mb-5">
          <motion.img
            src="/assets/contactUs/ContactUsBackImage.webp"
            alt="Contact Reparv"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            loading="eager"
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block min-h-[250px] md:w-full object-cover rounded-bl-4xl md:rounded-bl-none rounded-br-4xl md:rounded-br-none"
          />
          <h1 className="absolute left-[10%] bottom-[15%] text-4xl lg:text-6xl font-bold text-white">
            Contact Us
          </h1>
          <h4 className="absolute hidden lg:block left-[10%] bottom-[-10%] text-[#3F2D62] text-xl">
            Home{">"} Contact Us
          </h4>
        </div>

        <div className="max-w-[1380px] mx-auto p-4 sm:p-6 mb-4">
          {/* Our Values Section */}
          {/* Heading */}
          <p className="text-[#3F2D62] font-medium text-center my-4 md:my-8">
            #Contact Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#3F2D62] mb-4 md:mb-8 text-center">
            Get In Touch With Us.
          </h2>

          <p className="max-w-6xl mx-auto text-[#868686] text-center text-xs md:text-xl leading-relaxed mb-5 md:mb-16">
            We’re here to assist you with all your real estate needs. Whether
            you have questions, need guidance, or require support, our team is
            ready to help. Get in touch with us, and let’s make your property
            journey smooth, transparent, and hassle-free.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
            {cards.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col gap-3 md:gap-5 bg-white rounded-lg md:rounded-2xl p-3 md:p-8 text-left shadow-[0px_3px_11px_0px_#00000026] overflow-hidden"
              >
                <div className="w-full flex items-center gap-2 md:gap-4">
                  <div className="text-white">{item.icon}</div>
                  <div className="fle flex-col gap-2 md:gap-4">
                    {/* Title and Activity */}
                    <h3 className="text-xs sm:text-sm md:text-xl font-bold sm:font-semibold md:mb-2">
                      {item.title}
                    </h3>
                    <h3 className="text-xs sm:text-sm md:text-xl font-bold text-[#8A38F5]">
                      {item.activity}
                    </h3>
                  </div>
                </div>

                <p className="text-black ml-1 text-xs sm:text-base md:text-xl font-bold leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="lg:relative grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-start mt-6 lg:mt-20">
            {/* LEFT CARD */}
            <div className="relative lg:static pb-[36%] sm:pb-[38%] lg:pb-0">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-[#8A38F5] text-white rounded-2xl p-4 md:p-10 max-w-[450px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src="/assets/contactUs/Icon5.svg"
                    alt="Icon"
                    className="w-5 md:w-8 object-cover"
                  />
                  <h3 className="text-xl md:text-3xl font-semibold">
                    Branch Office
                  </h3>
                </div>

                <p className="text-base font-bold md:text-lg leading-relaxed mb-4">REPARV SERVICES PRIVATE LIMITED</p>
                <p className="text-sm font-bold md:text-base leading-relaxed mb-4">
                  PLOT NO. 11, THIRD BUS, STOP, GORLE LAYOUT, Trimurti Nagar, Nagpur, Nagpur- 440022, Maharashtra
                </p>

                <div className="space-y-3 text-sm md:text-base font-bold">
                  <div className="flex items-center gap-3">
                    <IoMail size={20} />
                    <span>contact@reparv.in</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MdOutlinePhoneInTalk size={20} />
                    <span>+91 8010881965</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <GrLocation size={20} />
                    <span>Nagpur</span>
                  </div>
                </div>

                <button
                  onClick={() => window.open(directionsUrl, "_blank")}
                  className="mt-6 bg-white text-base md:text-lg text-[#7E3FF2] font-semibold px-8 py-2 md:py-3 rounded-xl"
                >
                  Get Direction
                </button>
              </motion.div>

              {/* PERSON IMAGE */}
              <img
                src="/assets/contactUs/ContactUsLeftImage.svg"
                alt="Customer Support Reparv"
                className="absolute pointer-events-none bottom-[-24px] lg:bottom-[-40px] right-0 sm:right-[20%] lg:right-1/2 w-[70%] sm:w-[60%] md:w-[60%] lg:w-[450px]"
              />
            </div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white lg:bg-transparent p-4 sm:p-6 lg:p-0 rounded-2xl lg:rounded-0 shadow-[0px_2px_8px_2px_#2E154C17] lg:shadow-none z-10"
            >
              <span className="text-[#3F2D62] text-lg">#Contact now</span>

              <h2 className="text-3xl lg:text-5xl font-bold mt-5 md:mt-8 leading-tight">
                <span className="text-[#8A38F5]">Reach</span> & Get in Touch{" "}
                <br /> with us !
              </h2>

              <form
                onSubmit={handleSubmit}
                className="w-full mt-5 md:mt-10 space-y-4 xl:space-y-8"
              >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <input
                    type="text"
                    name="fullname"
                    required
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Your Name*"
                    className="w-full border border-[#D6C8F8] rounded-xl px-5 py-4 outline-none focus:border-[#7E3FF2]"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email*"
                    className="w-full border border-[#D6C8F8] rounded-xl px-5 py-4 outline-none focus:border-[#7E3FF2]"
                  />

                  <input
                    type="tel"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Your Number*"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    className="w-full border border-[#D6C8F8] rounded-xl px-5 py-4 outline-none focus:border-[#7E3FF2]"
                  />

                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Your Subject*"
                    className="w-full border border-[#D6C8F8] rounded-xl px-5 py-4 outline-none focus:border-[#7E3FF2]"
                  />
                </div>

                <textarea
                  rows="6"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type message here......"
                  className="w-full border border-[#D6C8F8] rounded-xl px-5 py-4 outline-none focus:border-[#7E3FF2] resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#5E2DE2] text-white px-10 py-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <GetDirectionsMap />
      <AdvertisementCard />
    </>
  );
};

export default ContactUs;
