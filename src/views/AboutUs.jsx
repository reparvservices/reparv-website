"use client"

import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import { IoIosDoneAll } from "react-icons/io";
import { motion } from "framer-motion";
import AdvertisementCard from "../components/AdvertisementCard";

const AboutUs = () => {
  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "about-us";
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

  const values = [
    {
      id: 1,
      title: "Truth",
      desc: "Real estate transactions are challenging, but the Reparv platform solves them with honesty and efficiency.",
      icon: (
        <img src="/assets/aboutUs/Icon1.svg" alt="icon" className="w-18 object-cover mr-14 mb-14" />
      ),
    },
    {
      id: 2,
      title: "Trust",
      desc: "Trust in real estate transactions is often uncertain, but Reparv has established a seamless process to solve this problem effortlessly.",
      icon: (
        <img src="/assets/aboutUs/Icon2.svg" alt="icon" className="h-18 object-cover mr-14 mb-14" />
      ),
    },
    {
      id: 3,
      title: "Transparency",
      desc: "The lack of a trackable, technology-driven system keeps most real estate processes manual, making understanding a major challenge.",
      icon: (
        <img src="/assets/aboutUs/Icon3.svg" alt="icon" className="h-18 object-cover mr-14 mb-14" />
      ),
    },
  ];

  return (
    <>
      <SEO
        title={ seoData?.title ||
          "About Reparv | India's Trusted Ecosystem for Verified Real Estate"
        }
        description={ seoData?.description ||
          "Learn how Reparv is transforming real estate in India with verified properties, complete transparency, and expert support. Discover our mission and vision today."
        }
        canonical="https://www.reparv.in/about-us"
      />
      <div className="relative w-full mx-auto max-w-[1440px] flex flex-col items-center justify-center">
        <div className="w-full relative lg:mb-5">
          <motion.img
            src="/assets/aboutUs/AboutUsBackImage.webp"
            alt="About Reparv"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            loading="eager"
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block min-h-[250px] md:w-full object-cover rounded-bl-4xl md:rounded-bl-none rounded-br-4xl md:rounded-br-none"
          />
          <h1 className="absolute left-[10%] bottom-[15%] text-4xl lg:text-6xl font-bold text-white">
            About Us
          </h1>
          <h4 className="absolute hidden lg:block left-[10%] bottom-[-10%] text-[#3F2D62] text-xl">
            Home{">"} About Us
          </h4>
        </div>

        <div className="max-w-7xl mx-auto p-4 sm:p-6 mb-10 sm:mb-15">
          {/* Our Journey Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-20 items-center my-10 lg:my-15">
            <div className="relative w-full flex items-center justify-center pl-[15%]">
              <motion.img
                src="/assets/aboutUs/AboutUsLeftImage.svg"
                alt="Our Journey"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full object-cover"
              />
              <motion.img
                src="/assets/aboutUs/VerifiedTag.svg"
                alt="Verified Tag"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[20px] left-[1%] w-[30%]"
              />
            </div>
            <div className="">
              <p className="text-[#3F2D62] font-medium mb-4 md:mb-8">
                #Get to Know
              </p>
              <h2 className="text-5xl font-semibold text-[#3F2D62]">
                Our Journey
              </h2>
              <ul className="mt-4 space-y-4 text-[#000000] text-xs sm:text-lg">
                <li>
                  <strong className="flex items-center gap-1 text-black font-bold text-xl">
                    {" "}
                    <IoIosDoneAll className="w-10 h-10 md:w-7 md:h-7 text-[#8A38F5]" />{" "}
                    2023
                  </strong>{" "}
                  We will start with offline sales and marketing in real estate
                  to provide clear titled properties.
                </li>
                <li>
                  <strong className="flex items-center gap-1 text-black font-bold text-xl">
                    {" "}
                    <IoIosDoneAll className="w-10 h-10 md:w-7 md:h-7 text-[#8A38F5]" />{" "}
                    2024
                  </strong>{" "}
                  We find a problem where the on-time booking update system is
                  missing in the complete real estate business process.
                </li>
                <li>
                  <strong className="flex items-center gap-1 text-black font-bold text-xl">
                    {" "}
                    <IoIosDoneAll className="w-10 h-10 md:w-7 md:h-7 text-[#8A38F5]" />{" "}
                    2025
                  </strong>{" "}
                  Now we are ready to spread this system PAN India to solve
                  buyer and seller problems.
                </li>
                <li>
                  <strong className="flex items-center gap-1 text-black font-bold text-xl">
                    {" "}
                    <IoIosDoneAll className="w-10 h-10 md:w-7 md:h-7 text-[#8A38F5]" />{" "}
                    2026
                  </strong>{" "}
                  Reparv is targeting expansion to small and big towns with
                  minimal investment.
                </li>
              </ul>
            </div>
          </div>

          {/* Our Values Section */}
          {/* Heading */}
          <p className="text-[#3F2D62] font-medium text-center mb-4 sm:mb-8">
            #What we’re Offering
          </p>

          <h2 className="text-5xl font-bold text-[#3F2D62] mb-4 sm:mb-8 text-center">
            Our Values
          </h2>

          <p className="max-w-6xl mx-auto text-[#868686] text-center text-xs md:text-xl leading-relaxed  mb-8 sm:mb-16">
            We are committed to solving every property buyer&apos;s and
            seller&apos;s needs, from property search to final documentation,
            through a hassle-free, seamless, and transparent process.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-2xl p-8 pt-10 text-left shadow-[0px_3px_11px_0px_#00000026] overflow-hidden"
              >
                {/* Purple Curve */}
                <div className="absolute -bottom-20 -right-20 w-58 h-58 rounded-full bg-[#7E3FF2] flex items-center justify-center">
                  <div className="text-white">{item.icon}</div>
                </div>

                {/* Number + Title */}
                <h3 className="text-3xl font-bold mb-4">
                  {item.id}. {item.title}
                </h3>

                <p className="text-[#868686] text-xl font-normal leading-relaxed mb-28">
                  {item.desc}
                </p>

                
              </div>
            ))}
          </div>

          <AdvertisementCard />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
