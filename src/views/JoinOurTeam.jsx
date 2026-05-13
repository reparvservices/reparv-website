"use client"

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

import { Element, Link } from "react-scroll";

const benefits = [
  {
    icon: "/assets/joinOurTeam/icon1.svg",
    title: "Lucrative Commission",
    description:
      "Earn what you deserve with our competitive commission structure.",
  },
  {
    icon: "/assets/joinOurTeam/icon2.svg",
    title: "Become a free promoter",
    description:
      "Showcase your skills and build your personal brand with freedom to shine.",
  },
  {
    icon: "/assets/joinOurTeam/icon3.svg",
    title: "Fresh Inquiries",
    description:
      "Access to a constant stream of potential clients to fuel your success.",
  },
  {
    icon: "/assets/joinOurTeam/icon4.svg",
    title: "Be Your Own Boss",
    description:
      "Take charge of your career and unlock endless opportunities in the real estate world.",
  },
  {
    icon: "/assets/joinOurTeam/icon5.svg",
    title: "Verified Properties",
    description:
      "Explore properties that are thoroughly vetted for authenticity and quality.",
  },
  {
    icon: "/assets/joinOurTeam/icon6.svg",
    title: "Sales Support & Training",
    description:
      "Boost your skills with expert training and round-the-clock support for success.",
  },
];

function JoinOurTeam() {
  const { URI, setLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        `${URI}/frontend/joinourteam/add`,
        formData,
      );
      setResponseMessage(response.data.message);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setResponseMessage(
        error.response?.data?.error || "Failed to submit form.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="joinOurTeam w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="w-full my-4 gap-6 flex items-center justify-center">
        <div className="image hidden sm:flex w-[45%]">
          <img src="/assets/joinOurTeam/image.svg" alt="" className="w-full object-cover" />
        </div>

        <div className="w-full sm:w-[55%] sm:p-4 sm:px-6 flex flex-col md:gap-6 gap-2">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#076300]">
            Are you curious about Real Estate sales?
          </h2>
          <p className="max-w-lg text-xs md:text-base text-[#00000066] ">
            Explore exciting opportunities in real estate sales with expert
            guidance. Unlock your potential and take the first step toward
            rewarding growth!
          </p>
          <img
            src="/assets/joinOurTeam/responsiveImage.svg"
            alt=""
            className="w-full sm:hidden block object-cover"
          />
          <Link to="contact">
            <button className="w-[250px] my-4 mx-auto sm:mx-0 bg-[#0BB501] active:scale-95 cursor-pointer text-white font-semibold py-3 px-4 rounded-lg">
              Become A Professional
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 flex flex-col items-center justify-center">
        <h3 className="text-2xl mt-4 md:mb-3 md:text-4xl font-semibold text-[#076300]">
          Benefits of Joining Our Team!
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative max-w-[350px] min-h-[280px] flex gap-2 flex-col items-center justify-center border border-[#00000033] p-6 rounded-xl rounded-tl-none text-center shadow-sm"
            >
              <div className="absolute top-[-1px] left-0 w-[150px] h-[1px] bg-gradient-to-r from-[#0BB501] to-transparent"></div>
              <div className="absolute top-[-1px] left-[-1px] w-[1px] h-[150px] bg-gradient-to-b from-[#0BB501] to-transparent"></div>
              <div className="text-green-600 text-4xl mb-2">
                <img src={benefit.icon} className="w-15 h-15" alt="" />
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-black ">
                {benefit.title}
              </h4>
              <p className="text-[#00000066] text-sm sm:text-lg mt-2">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Element className="bg-white py-12 px-4 sm:px-6 lg:px-8" name="contact">
        <div className="max-w-7xl mx-auto text-center flex gap-2 flex-col">
          <h2 className="text-2xl md:text-4xl font-semibold text-[#076300]">
            Join Our Team! Become A Professional
          </h2>
          <p className="text-[#00000066] text-sm sm:text-lg max-w-lg mx-auto my-2">
            Fill out the form, Our team will contact you soon!
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-4 md:mt-12 flex flex-col lg:flex-row items-center justify-center md:gap-15">
          <div className="sm:w-[50%] xl:block hidden md:block lg:hidden lg:w-[340px] lg:h-[497px] h-full">
            <img
              src="/assets/joinOurTeam/formImage.svg"
              alt="Professional Person"
              className="w-full xl:w-[340px] xl:h-[490px] rounded-lg shadow-md object-cover"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 w-full flex flex-col gap-4 max-w-3xl border border-[#0000001A] rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
              <div>
                <label className="block text-base font-semibold ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="w-full mt-2 py-4 px-5 border rounded-md border-[#0000001A] focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-base font-semibold ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="w-full mt-2 py-4 px-5 border rounded-md border-[#0000001A] focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-6 gap-4">
              <div>
                <label className="block text-base font-semibold ml-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="w-full mt-2 py-4 px-5 border rounded-md border-[#0000001A] focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-base font-semibold ml-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  placeholder="Enter Phone Number"
                  className="w-full mt-2 py-4 px-5 border rounded-md border-[#0000001A] focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) {
                      setFormData({ ...formData, phone: input });
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold ml-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your Message here.."
                className="w-full mt-2 py-4 px-5 border rounded-md border-[#0000001A] focus:outline-none focus:ring-1 focus:ring-green-500"
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-[200px] mx-auto bg-[#2ECD24] active:scale-95 text-white font-medium py-2 rounded-lg"
            >
              Submit
            </button>

            {responseMessage && (
              <p className="text-center text-green-600 mt-2">
                {responseMessage}
              </p>
            )}
          </form>
        </div>
      </Element>
    </div>
  );
}

export default JoinOurTeam;
