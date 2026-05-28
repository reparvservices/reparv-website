"use client"

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { LuGitCompareArrows } from "react-icons/lu";
import { IoMdImages } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TiLocationOutline } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa";
import {
  FaLightbulb,
  FaLock,
  FaHome,
  FaRupeeSign,
  FaUser,
  FaPhone,
  FaBuilding,
  FaStore,
  FaKey,
  FaWarehouse,
  FaIndustry,
  FaTree,
  FaCity,
  FaArrowLeft,
} from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { GiFarmTractor, GiFamilyHouse } from "react-icons/gi";
import { uploadToS3 } from "../../utils/s3";
import Loader from "../Loader";

const PURPLE = "#8A38F5";
const GRAY = "#868686";

function SellProperty() {
  const router = useRouter();
  const { URI, setLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [propertyTab, setPropertyTab] = useState("rent");

  const [nextButton, setNextButton] = useState(false);
  const [errors, setErrors] = useState({
    propertyName: "",
    projectBy: "",
    contact: "",
    email: "",
  });

  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "propertyName":
        if (!nameRegex.test(value)) {
          error = "Only letters allowed (no numbers)";
        }
        break;

      case "projectBy":
        if (!nameRegex.test(value)) {
          error = "Owner name must contain only letters";
        }
        break;

      case "contact":
        if (!phoneRegex.test(value)) {
          error = "Enter valid 10 digit mobile number";
        }
        break;

      case "email":
        if (value && !emailRegex.test(value)) {
          error = "Enter valid email address";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const [imageFiles, setImageFiles] = useState({
    frontView: [],
    sideView: [],
    kitchenView: [],
    hallView: [],
    bedroomView: [],
    bathroomView: [],
    balconyView: [],
    nearestLandmark: [],
    developedAmenities: [],
  });

  const [newProperty, setNewProperty] = useState({
    propertyCategory: "",
    propertyName: "",
    carpetArea: "",
    totalSalesPrice: "",
    totalOfferPrice: "",
    state: "",
    city: "",
    address: "",
    projectBy: "",
    contact: "",
    email: "",
  });

  const rentalTypes = [
    { label: "Rental Flat", value: "RentalFlat", icon: MdApartment },
    { label: "Rental Plot", value: "RentalPlot", icon: FaCity },
    { label: "Rental Villa", value: "RentalVilla", icon: FaTree },
    { label: "Rental Shop", value: "RentalShop", icon: FaStore },
    { label: "Rental Office", value: "RentalOffice", icon: FaBuilding },
    { label: "Rental House", value: "RentalHouse", icon: FaHome },
    { label: "Rental Godown", value: "RentalGodown", icon: FaCity },
    { label: "Rental Land", value: "RentalOpenLand", icon: FaTree },
    { label: "Rental ShowRoom", value: "RentalShowroom", icon: FaIndustry },
  ];

  const resaleTypes = [
    { label: "Resale Flat", value: "ResaleFlat", icon: MdApartment },
    { label: "Resale Plot", value: "ResalePlot", icon: FaCity },
    { label: "Resale House", value: "ResaleHouse", icon: FaHome },
    { label: "Resale Villa", value: "ResalelVilla", icon: FaTree },
    { label: "Resale Shop", value: "ResaleShop", icon: FaStore },
    { label: "Resale Office", value: "ResaleOffice", icon: FaBuilding },
    {
      label: "Resale Farm House",
      value: "ResaleFarmHouse",
      icon: GiFarmTractor,
    },
    { label: "Resale Godown", value: "ResaleGodown", icon: FaCity },
    { label: "Resale Bunglow", value: "ResaleBunglow", icon: FaBuilding },
    { label: "Resale ShowRoom", value: "ResaleShowroom", icon: FaIndustry },
  ];

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Property Image Selector
  const handleImageChange = (event, category) => {
    const files = Array.from(event.target.files);

    setImageFiles((prev) => {
      const existing = prev[category] || [];
      const newFiles = [...existing, ...files];

      if (newFiles.length > 3) {
        alert("You can only upload up to 3 images per category.");
        return { ...prev, [category]: newFiles.slice(0, 3) }; // keep only 3
      }

      return { ...prev, [category]: newFiles };
    });

    // reset input so same file can be selected again
    event.target.value = "";
  };

  // Property Image Remove
  const removeImage = (category, index) => {
    setImageFiles((prev) => {
      const updated = [...prev[category]];
      updated.splice(index, 1);
      return { ...prev, [category]: updated };
    });
  };

  // **Fetch States from API**
  const fetchStates = async () => {
    try {
      const response = await fetch(URI + "/admin/states", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch States.");
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // **Fetch States from API**
  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${URI}/admin/cities/${newProperty?.state}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch cities.");
      const data = await response.json();
      //console.log(data);
      setCities(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const fetchData = async (id) => {
    try {
      const response = await fetch(URI + `/guest-user/properties/${id}`, {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();
      setNewProperty(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const addOrUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1 Prepare a copy of property data
      const payload = { ...newProperty };

      const imageFields = [
        "frontView",
        "sideView",
        "kitchenView",
        "hallView",
        "bedroomView",
        "bathroomView",
        "balconyView",
        "nearestLandmark",
        "developedAmenities",
      ];

      // 2 Upload images directly to S3
      for (const field of imageFields) {
        if (imageFiles[field] && imageFiles[field].length > 0) {
          const urls = [];

          for (const file of imageFiles[field]) {
            const url = await uploadToS3(file);
            if (url) urls.push(url);
          }

          payload[field] = urls;
        } else {
          payload[field] = [];
        }
      }

      // 3 Determine endpoint
      const endpoint = newProperty.propertyid
        ? `edit/${newProperty.propertyid}`
        : "add";

      // 4 Send property data (without files) to backend
      const response = await fetch(`${URI}/user/properties/${endpoint}`, {
        method: newProperty.propertyid ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 409) {
        const data = await response.json();
        alert(data.message || "Property name already exists!");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      }

      alert(
        newProperty.propertyid
          ? "Property updated successfully!"
          : "Property added successfully!",
      );

      // 5 Reset form
      setNewProperty({
        propertyid: "",
        builderid: "",
        projectBy: "",
        contact: "",
        email: "",
        possessionDate: "",
        propertyCategory: "",
        propertyApprovedBy: "",
        propertyName: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
        location: "",
        distanceFromCityCenter: "",
        latitude: "",
        longitude: "",
        totalSalesPrice: "",
        totalOfferPrice: "",
        stampDuty: "",
        registrationFee: "",
        gst: "",
        advocateFee: "",
        msebWater: "",
        maintenance: "",
        other: "",
        tags: "",
        propertyType: "",
        builtYear: "",
        ownershipType: "",
        builtUpArea: "",
        carpetArea: "",
        parkingAvailability: "",
        totalFloors: "",
        floorNo: "",
        loanAvailability: "",
        propertyFacing: "",
        reraRegistered: "",
        furnishing: "",
        waterSupply: "",
        powerBackup: "",
        locationFeature: "",
        sizeAreaFeature: "",
        parkingFeature: "",
        terraceFeature: "",
        ageOfPropertyFeature: "",
        amenitiesFeature: "",
        propertyStatusFeature: "",
        smartHomeFeature: "",
        securityBenefit: "",
        primeLocationBenefit: "",
        rentalIncomeBenefit: "",
        qualityBenefit: "",
        capitalAppreciationBenefit: "",
        ecofriendlyBenefit: "",
      });

      setStep(1);
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Please check empty fields or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const checkButton = () => {
    if (step === 1) {
      const requiredFieldsStep1 = [
        "propertyCategory",
        "propertyName",
        "address",
        "state",
        "city",
        "carpetArea",
        "totalSalesPrice", // number
        "totalOfferPrice", // number
      ];

      const allFilled = requiredFieldsStep1.every((field) => {
        const value = newProperty[field];
        if (typeof value === "number") {
          return value > -1; // for numbers, must be Positive
        }
        return value && value.toString().trim() !== ""; // for strings
      });

      setNextButton(allFilled);
    }
  };

  useEffect(() => {
    checkButton();
  }, [newProperty, step]);

  useEffect(() => {
    //fetchData(id);
    fetchStates();
  }, []);

  useEffect(() => {
    if (newProperty.state != "") {
      fetchCities();
    }
  }, [newProperty.state]);

  return (
    <div className="w-full min-h-screen bg-[#F7F3FF] px-4 py-6 pt-2 sm:pt-6">
      {/* Back Navigation Section */}
      <div className="md:hidden w-full h-[40px] sm:h-[50px] flex items-center gap-4 px-4 py-2 my-3 sm:my-4 rounded-lg bg-white">
        <FaArrowLeft
          onClick={() => {
            router.back();
          }}
          className="w-5 h-5"
        />
        <span className="w-full text-base sm:text-lg font-bold text-center">
          Add Basic Details
        </span>
      </div>
      <div className="max-w-[1400px] mx-auto flex flex-col-reverse md:flex-row gap-4 sm:gap-6">
        {/* LEFT PANEL */}
        <aside className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] bg-white rounded-2xl p-4 sm:p-6 py-6 h-fit lg:sticky lg:top-6 shadow sm:shadow-[0px_4px_8px_4px_#8A38F51F]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 sm:w-13 h-10 sm:h-13 text-xl sm:text-2xl rounded-full bg-purple-100 flex items-center justify-center">
              <FaLightbulb color={PURPLE} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
                Quick Tips
              </h3>
              <span className="text-[10px]">
                Get the best value for your property
              </span>
            </div>
          </div>

          <ul className="space-y-4 text-sm" style={{ color: GRAY }}>
            <li className="flex gap-2 items-center">
              <IoCheckmarkDoneCircleSharp className="w-5 h-5 text-[#8A38F5]" />{" "}
              Add high-quality photos to get 3x more inquiries
            </li>
            <li className="flex gap-2 items-center">
              <IoCheckmarkDoneCircleSharp className="w-5 h-5 text-[#8A38F5]" />{" "}
              Accurate details help buyers find your property faster
            </li>
            <li className="flex gap-2 items-center">
              <IoCheckmarkDoneCircleSharp className="w-5 h-5 text-[#8A38F5]" />{" "}
              Verified listings get 5x more visibility
            </li>
          </ul>

          <div className="border-t my-6 border-t-[#D9D9D9]" />

          <div className="flex items-center gap-2 text-sm sm:text-base font-bold">
            <FaLock /> 100% Secure & Private
          </div>

          <div className="mt-6 bg-[#EEE1FF] rounded-xl p-4">
            <h4 className="font-semibold text-black">Need Help?</h4>
            <p className="text-sm mt-1 mb-4" style={{ color: GRAY }}>
              Our property experts are here to assist you
            </p>
            <button
              onClick={() => {
                window.location.href = `tel:+918010881965`;
              }}
              className="w-full py-2.5 rounded-lg font-semibold text-white"
              style={{ backgroundColor: "#5323DC" }}
            >
              Talk to Expert
            </button>
          </div>
        </aside>

        {/* RIGHT FORM (65%) */}
        <section className="w-full md:w-[60%] lg:w-[65%] xl:w-[70%] bg-white rounded-2xl p-4 sm:p-6 py-6 shadow-sm">
          <form onSubmit={addOrUpdate} className="w-full">
            {step === 1 && (
              <>
                {/* PROPERTY TYPE */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-black">
                  What type of property are you selling?{" "}
                  <span className="text-red-500">*</span>
                </h2>
                {/* PROPERTY MAIN TABS */}
                <div className="flex gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setPropertyTab("rent");
                      setNewProperty({ ...newProperty, propertyCategory: "" });
                    }}
                    className={`px-6 py-2 rounded-lg font-semibold border ${
                      propertyTab === "rent"
                        ? "bg-[#8A38F5] text-white border-[#8A38F5]"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    Rent
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPropertyTab("resale");
                      setNewProperty({ ...newProperty, propertyCategory: "" });
                    }}
                    className={`px-6 py-2 rounded-lg font-semibold border ${
                      propertyTab === "resale"
                        ? "bg-[#8A38F5] text-white border-[#8A38F5]"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    Resale
                  </button>
                </div>
                {/* PROPERTY TYPE */}
                <h2 className="text-2xl font-semibold mb-1">Property Type *</h2>
                <p
                  className="text-sm hidden sm:block mb-5"
                  style={{ color: GRAY }}
                >
                  Select the category that best describes your property
                </p>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                  {(propertyTab === "rent" ? rentalTypes : resaleTypes).map(
                    (item) => {
                      const Icon = item.icon;
                      const isActive =
                        newProperty.propertyCategory === item.value;

                      return (
                        <button
                          type="button"
                          key={item.value}
                          onClick={() =>
                            setNewProperty({
                              ...newProperty,
                              propertyCategory: item.value,
                            })
                          }
                          className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 px-3 py-2 rounded-lg border text-sm transition
                             ${
                               isActive
                                 ? "bg-[#8A38F5] text-white font-bold border-[#8A38F5]"
                                 : "border-[#D9D9D9] text-[#868686] hover:border-[#8A38F5]"
                             }
                            `}
                        >
                          <Icon
                            size={16}
                            color={isActive ? "#FFFFFF" : "#868686"}
                          />
                          {item.label}
                        </button>
                      );
                    },
                  )}
                </div>

                {/* PROPERTY Name */}
                <div className="mb-8 max-w-[350px]">
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-black">
                    <MdApartment color={PURPLE} /> Property Name{" "}
                    <span className="text-red-500">*</span>
                  </h3>
                  <input
                    type="text"
                    value={newProperty.propertyName}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                      setNewProperty({ ...newProperty, propertyName: value });
                      validateField("propertyName", value);
                    }}
                    placeholder="Property Name"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.propertyName
                        ? "border-red-500"
                        : "border-[#E0E0E0]"
                    }`}
                  />

                  {errors.propertyName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.propertyName}
                    </p>
                  )}

                  <p className="text-xs mt-2 ml-1" style={{ color: GRAY }}>
                    Enter Unique Property Name
                  </p>
                </div>

                {/* ADDRESS DETAILS */}
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-4 text-black">
                    <TiLocationOutline color={PURPLE} className="w-7 h-7" />{" "}
                    Address Details
                  </h3>
                  {/* State & City */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Address Input */}
                    <div className="w-full col-span-2">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter full address (House no, Street, Area)"
                        value={newProperty.address}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border outline-none"
                        style={{ borderColor: "#E0E0E0" }}
                      />
                    </div>
                    {/* State */}
                    <div className="relative w-full">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={newProperty.state}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            state: e.target.value,
                            city: "",
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border outline-none appearance-none"
                        style={{ borderColor: "#E0E0E0", color: GRAY }}
                      >
                        <option value="">Select State</option>
                        {states?.map((state, index) => (
                          <option key={index} value={state.state}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-[38px] pointer-events-none text-sm" />
                    </div>

                    {/* City */}
                    <div className="relative w-full">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={newProperty.city}
                        onChange={(e) =>
                          setNewProperty({
                            ...newProperty,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border outline-none appearance-none"
                        style={{ borderColor: "#E0E0E0", color: GRAY }}
                      >
                        <option value="">Select City </option>
                        {cities?.map((city, index) => (
                          <option key={index} value={city.city}>
                            {city.city}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-[38px] pointer-events-none text-sm" />
                    </div>
                  </div>
                </div>
                {/* Property Area */}
                <div className="mb-8 max-w-[400px]">
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-black">
                    <LuGitCompareArrows color={PURPLE} /> Property Area{" "}
                    <span className="text-red-500">*</span>
                  </h3>

                  <div className="flex gap-3 text-black">
                    <input
                      type="number"
                      placeholder="Enter area"
                      value={newProperty?.carpetArea}
                      onChange={(e) => {
                        setNewProperty({
                          ...newProperty,
                          carpetArea: e.target.value,
                        });
                      }}
                      className="w-full rounded-lg px-4 py-2 border outline-none text-black"
                      style={{ borderColor: "#E0E0E0" }}
                    />
                    <select
                      disabled
                      className="rounded-lg px-4 py-2 border appearance-none"
                      style={{ borderColor: "#E0E0E0" }}
                    >
                      <option>sq.ft</option>
                    </select>
                  </div>
                  <p className="text-xs mt-2 ml-1" style={{ color: GRAY }}>
                    Enter the total carpet area
                  </p>
                </div>

                {/* PRICING */}
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-4 text-black">
                    <FaRupeeSign color={PURPLE} /> Pricing Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">
                        {propertyTab === "rent" ? "Rent" : "Selling Price"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="₹ 00"
                        value={newProperty?.totalSalesPrice}
                        onChange={(e) => {
                          setNewProperty({
                            ...newProperty,
                            totalSalesPrice: e.target.value,
                          });
                        }}
                        className="w-full mt-1 px-4 py-2 rounded-lg border"
                        style={{ borderColor: "#E0E0E0" }}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Expected Offer{" "}
                        {propertyTab === "rent" ? "Rent" : "Price"}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="₹ 00"
                        value={newProperty?.totalOfferPrice}
                        onChange={(e) => {
                          setNewProperty({
                            ...newProperty,
                            totalOfferPrice: e.target.value,
                          });
                        }}
                        className="w-full mt-1 px-4 py-2 rounded-lg border"
                        style={{ borderColor: "#E0E0E0" }}
                      />
                      <p className="text-xs mt-2 ml-1" style={{ color: GRAY }}>
                        Price you’re willing to nigotiate
                      </p>
                    </div>
                  </div>
                </div>

                {/* CONTACT */}
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-4 text-black">
                    <FaUser color={PURPLE} /> Contact Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        Owner Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newProperty.projectBy}
                        onChange={(e) => {
                          const value = e.target.value.replace(
                            /[^A-Za-z\s]/g,
                            "",
                          );
                          setNewProperty({ ...newProperty, projectBy: value });
                          validateField("projectBy", value);
                        }}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.projectBy
                            ? "border-red-500"
                            : "border-[#E0E0E0]"
                        }`}
                      />

                      {errors.projectBy && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.projectBy}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-col">
                        <div className="flex">
                          <span className="px-3 flex items-center border border-[#D9D9D9] rounded-l-lg">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            value={newProperty.contact}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              setNewProperty({
                                ...newProperty,
                                contact: value,
                              });
                              validateField("contact", value);
                            }}
                            className={`w-full px-4 py-2 border rounded-r-lg ${
                              errors.contact
                                ? "border-red-500"
                                : "border-[#E0E0E0]"
                            }`}
                          />
                        </div>

                        {errors.contact && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.contact}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <label className="block text-sm font-medium mb-1 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newProperty.email}
                      onChange={(e) => {
                        setNewProperty({
                          ...newProperty,
                          email: e.target.value,
                        });
                        validateField("email", e.target.value);
                      }}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-[#E0E0E0]"
                      }`}
                    />

                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* SECURITY */}
                <div className="flex items-center gap-2 bg-[#F3EDFF] text-sm p-3 rounded-lg mb-6">
                  <FaLock color={PURPLE} />
                  Your contact details are secure and shared only with verified
                  buyers
                </div>

                {/* CTA */}
                <div className="w-full flex items-center justify-end">
                  <button
                    type="button"
                    disabled={
                      Object.values(errors).some(Boolean) || !nextButton
                    }
                    onClick={() => setStep(2)}
                    className={`px-10 py-3 rounded-xl font-semibold text-white shadow ${
                      Object.values(errors).some(Boolean)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#8A38F5] active:scale-98"
                    }`}
                  >
                    Continue to next Step →
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* IMAGE UPLOAD SECTION */}
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-4 text-black">
                    <IoMdImages color={PURPLE} /> Upload Property Images
                  </h3>

                  <p className="text-sm mb-4" style={{ color: GRAY }}>
                    Add clear images to attract more buyers (Maximum 3 images)
                  </p>

                  {/* Upload Box */}
                  <label className="cursor-pointer block border-2 border-dashed border-[#8A38F5] rounded-xl p-6 text-center bg-[#F7F3FF] sm:bg-[white] hover:bg-[#F7F3FF] transition">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        handleImageChange(e, "frontView");
                      }}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2 sm:gap-4">
                      <IoMdImages size={30} color={PURPLE} />
                      <p className="font-semibold text-black">
                        Click to upload Images
                      </p>
                      <span className="text-xs" style={{ color: GRAY }}>
                        JPG, PNG | Max Size 500kb
                      </span>
                    </div>
                  </label>

                  {/* Preview Grid */}
                  {imageFiles.frontView.length > 0 && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {imageFiles.frontView.map((img, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden border border-[#D9D9D9]"
                        >
                          <img
                            src={URL.createObjectURL(img)}
                            alt="property"
                            className="w-full lg:max-h-[140px] xl:max-h-[180px] object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => removeImage("frontView", index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow"
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* STEP ACTIONS */}
                <div className="flex gap-4 justify-between mt-10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto px-6 py-2 sm:py-3 rounded-lg border font-semibold active:scale-98"
                    style={{ borderColor: PURPLE, color: PURPLE }}
                  >
                    Back
                  </button>
                  <Loader />
                  <button
                    type="submit"
                    className="w-full sm:w-[290px] px-10 py-2 sm:py-3 rounded-lg font-semibold text-white shadow-[0px_4px_11px_2px_#8A38F540] active:scale-98"
                    style={{ backgroundColor: PURPLE }}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

export default SellProperty;
