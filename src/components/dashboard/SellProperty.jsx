"use client"

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../store/auth";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TiLocationOutline } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa";
import {
  FaLightbulb,
  FaLock,
  FaRupeeSign,
  FaUser,
  FaArrowLeft,
  FaCheck,
  FaUndo,
} from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { uploadToS3, uploadToS3WithProgress } from "../../utils/s3";
import PropertyVideoFields from "./PropertyVideoFields";
import PropertyBrochureField from "./PropertyBrochureField";
import { validateVideoLinks } from "../../utils/videoLinks";
import ListingClassification from "./ListingClassification";
import PropertyBasicDetails, { requiredAreaField } from "./PropertyBasicDetails";
import {
  propertyTabFor,
  areaModeFor,
  basicDetailFieldsFor,
  BASIC_DETAIL_KEYS,
  BHK_OPTIONS,
  needsConfiguration,
} from "../../utils/propertyListing";
import { MdNotes } from "react-icons/md";

// Leaflet needs the browser, so the map loads on the client only
const LocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
  loading: () => <div className="h-[260px] sm:h-[300px] rounded-xl bg-gray-100 animate-pulse" />,
});

const PURPLE = "#8A38F5";
const GRAY = "#868686";

const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 15 * 1024 * 1024; // before compression
const PHOTO_MAX_EDGE = 1600; // px, longest side after compression

const PROPERTY_NAME_REGEX = /^[A-Za-z0-9\s\-&.,'()/]+$/;
const OWNER_NAME_REGEX = /^[A-Za-z\s.]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PINCODE_REGEX = /^[1-9]\d{5}$/;
const MAX_DESCRIPTION = 3000;

// The form is split into short steps so it never feels like one endless page
const STEPS = [
  { key: "type", label: "Type", title: "What are you listing?" },
  { key: "location", label: "Location", title: "Where is it?" },
  { key: "details", label: "Price & Details", title: "Price & details" },
  { key: "media", label: "Photos & Videos", title: "Photos & videos" },
];
const STEP_FIELDS = {
  1: ["propertyCategory", "propertyName"],
  2: ["address", "location", "pincode", "state", "city"],
  3: ["area", "propertyType", "totalSalesPrice", "totalOfferPrice", "propertyDescription", "projectBy", "contact", "email"],
};
const stepOfField = (field) => Number(Object.keys(STEP_FIELDS).find((n) => STEP_FIELDS[n].includes(field))) || 1;

// Typed details are kept as a draft so leaving the page doesn't lose them
const DRAFT_KEY = "reparv.listingDraft.v1";

const inputBase = "w-full px-4 py-2 rounded-lg border outline-none focus:border-[#8A38F5]";
const borderFor = (error) => (error ? "border-red-500" : "border-[#E0E0E0]");

/** ₹45,00,000 → "₹45 Lakh" so an extra/missing zero is easy to spot */
const priceInWords = (value) => {
  const n = Number(value);
  if (!n || n < 0) return "";
  if (n >= 1e7) return `₹${+(n / 1e7).toFixed(2)} Crore`;
  if (n >= 1e5) return `₹${+(n / 1e5).toFixed(2)} Lakh`;
  return `₹${n.toLocaleString("en-IN")}`;
};

/** Resize/re-encode large photos in the browser so uploads stay small and fast */
const compressImage = (file) =>
  new Promise((resolve) => {
    if (file.size < 400 * 1024 || !/image\/(jpeg|png|webp)/.test(file.type)) {
      resolve(file);
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, PHOTO_MAX_EDGE / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (!blob || blob.size >= file.size) return resolve(file);
          const name = file.name.replace(/\.\w+$/, "") + ".jpg";
          resolve(new File([blob], name, { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.82,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });

const EMPTY_PROPERTY = (listingType) => ({
  propertyCategory: "",
  listingType,
  propertyKind: "Residential",
  propertyName: "",
  builtUpArea: "",
  carpetArea: "",
  totalSalesPrice: "",
  totalOfferPrice: "",
  state: "",
  city: "",
  address: "",
  location: "",
  pincode: "",
  latitude: "",
  longitude: "",
  propertyType: "",
  propertyDescription: "",
  projectBy: "",
  contact: "",
  email: "",
  videoLink: "",
  instagramReelLink: "",
});

function SellProperty({ initialListingType = "Sell", initialCondition = "new" }) {
  const router = useRouter();
  const { URI, user, setShowLogin, setShowAlert } = useAuth();
  const [step, setStep] = useState(1);
  const [condition, setCondition] = useState(initialCondition);
  const [newProperty, setNewProperty] = useState(() => EMPTY_PROPERTY(initialListingType));
  const [errors, setErrors] = useState({});
  const [photos, setPhotos] = useState([]); // [{ file, preview }]
  const [photoError, setPhotoError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [nameStatus, setNameStatus] = useState("idle"); // idle | checking | available | taken
  const [video, setVideo] = useState(null); // { file, preview }
  const [mediaErrors, setMediaErrors] = useState({});
  const [brochure, setBrochure] = useState(null);
  const [brochureError, setBrochureError] = useState("");
  const [savedDraft, setSavedDraft] = useState(null); // offered on load
  const [draftReady, setDraftReady] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // The auth store loads the user after mount, so also check localStorage directly
  const [sessionChecked, setSessionChecked] = useState(false);
  const [hasStoredUser, setHasStoredUser] = useState(false);
  useEffect(() => {
    try {
      setHasStoredUser(!!localStorage.getItem("guestUser"));
    } catch {
      /* ignore */
    }
    setSessionChecked(true);
  }, []);
  const isLoggedIn = !!user || hasStoredUser;

  const classification = {
    listingType: newProperty.listingType || initialListingType,
    propertyKind: newProperty.propertyKind || "Residential",
    condition,
    propertyCategory: newProperty.propertyCategory,
  };
  const propertyTab = propertyTabFor(classification);
  const isRent = propertyTab === "rent";
  const showConfiguration = needsConfiguration(newProperty);

  const priceLabels = isRent
    ? { total: "Monthly Rent", offer: "Offer Rent", offerHint: "Rent you are willing to settle at (not more than the monthly rent)" }
    : { total: "Total Price", offer: "Offer Price", offerHint: "Price you are willing to settle at (not more than the total price)" };

  const set = (patch) => setNewProperty((prev) => ({ ...prev, ...patch }));
  const clearError = (...keys) =>
    setErrors((prev) => {
      const next = { ...prev };
      keys.forEach((k) => delete next[k]);
      return next;
    });

  /* ---------------- DATA ---------------- */
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(URI + "/admin/states", { credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch States.");
        setStates(await response.json());
      } catch (err) {
        console.error("Error fetching :", err);
      }
    };
    fetchStates();
  }, [URI]);

  useEffect(() => {
    if (!newProperty.state) {
      setCities([]);
      return;
    }
    const fetchCities = async () => {
      try {
        const response = await fetch(`${URI}/admin/cities/${newProperty.state}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch cities.");
        setCities(await response.json());
      } catch (err) {
        console.error("Error fetching :", err);
      }
    };
    fetchCities();
  }, [URI, newProperty.state]);

  // Pre-fill the owner's contact details from the logged-in account
  const prefilled = useRef(false);
  useEffect(() => {
    if (!isLoggedIn || prefilled.current) return;
    prefilled.current = true;
    const prefill = async () => {
      try {
        const res = await fetch(`${URI}/user/profile`, { credentials: "include" });
        if (!res.ok) return;
        const profile = await res.json();
        setNewProperty((prev) => ({
          ...prev,
          projectBy: prev.projectBy || (profile?.fullname || "").replace(/[^A-Za-z\s.]/g, "").trim(),
          contact: prev.contact || String(profile?.contact || "").replace(/\D/g, "").slice(-10),
          email: prev.email || profile?.email || "",
        }));
      } catch {
        /* optional */
      }
    };
    prefill();
  }, [URI, isLoggedIn]);

  // Check the property name is free while the user types (unique name = unique page URL)
  useEffect(() => {
    const name = newProperty.propertyName.trim();
    if (!name || name.length < 3 || !PROPERTY_NAME_REGEX.test(name) || !isLoggedIn) {
      setNameStatus("idle");
      return;
    }
    setNameStatus("checking");
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${URI}/user/properties/check-name?name=${encodeURIComponent(name)}`,
          { credentials: "include", signal: controller.signal },
        );
        if (!res.ok) return setNameStatus("idle");
        const data = await res.json();
        setNameStatus(data?.available ? "available" : "taken");
      } catch (err) {
        if (err.name !== "AbortError") setNameStatus("idle");
      }
    }, 500);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [URI, newProperty.propertyName, isLoggedIn]);

  /* ---------------- PHOTOS ---------------- */
  useEffect(() => {
    return () => photos.forEach((p) => URL.revokeObjectURL(p.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePhotoSelect = (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    setPhotoError("");

    const valid = [];
    for (const file of files) {
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
        setPhotoError("Only JPG, PNG or WEBP photos are allowed");
        continue;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        setPhotoError("Each photo must be smaller than 15 MB");
        continue;
      }
      valid.push(file);
    }

    const room = MAX_PHOTOS - photos.length;
    if (valid.length > room) {
      setPhotoError(`You can add up to ${MAX_PHOTOS} photos`);
    }
    const added = valid.slice(0, Math.max(room, 0)).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    if (added.length) setPhotos((prev) => [...prev, ...added]);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
    setPhotoError("");
  };

  const makeCover = (index) => {
    setPhotos((prev) => [prev[index], ...prev.filter((_, i) => i !== index)]);
  };

  /* ---------------- VALIDATION ---------------- */
  const validateDetails = () => {
    const e = {};
    const p = newProperty;
    const name = p.propertyName.trim();

    if (!p.propertyCategory) e.propertyCategory = "Select a category";

    if (!name) e.propertyName = "Property name is required";
    else if (name.length < 3) e.propertyName = "Use at least 3 characters";
    else if (!PROPERTY_NAME_REGEX.test(name))
      e.propertyName = "Use letters, numbers, spaces and - & . , ' ( ) / only";
    else if (nameStatus === "taken") e.propertyName = "This name is already used. Try adding the area or building number";

    if (!p.address.trim()) e.address = "Address is required";
    if (!p.location.trim()) e.location = "Locality is required";
    if (p.pincode && !PINCODE_REGEX.test(p.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    if (!p.state) e.state = "Select a state";
    if (!p.city) e.city = "Select a city";

    const areaField = requiredAreaField(p);
    if (!String(p[areaField] || "").trim()) e.area = "Area is required";
    if (showConfiguration && !p.propertyType) e.propertyType = "Select the configuration";

    const total = Number(p.totalSalesPrice);
    const offer = Number(p.totalOfferPrice);
    if (!total || total <= 0) e.totalSalesPrice = `${priceLabels.total} is required`;
    if (!offer || offer <= 0) e.totalOfferPrice = `${priceLabels.offer} is required`;
    else if (total > 0 && offer > total)
      e.totalOfferPrice = `${priceLabels.offer} can't be more than the ${priceLabels.total.toLowerCase()}`;

    if (!p.projectBy.trim()) e.projectBy = "Owner name is required";
    else if (!OWNER_NAME_REGEX.test(p.projectBy.trim())) e.projectBy = "Use letters only";
    if (!PHONE_REGEX.test(p.contact)) e.contact = "Enter a valid 10-digit mobile number";
    if (p.email && !EMAIL_REGEX.test(p.email)) e.email = "Enter a valid email address";
    if (p.propertyDescription.length > MAX_DESCRIPTION)
      e.propertyDescription = `Keep the description under ${MAX_DESCRIPTION} characters`;

    return e;
  };

  const FIELD_ORDER = [
    "propertyCategory",
    "propertyName",
    "address",
    "location",
    "pincode",
    "state",
    "city",
    "area",
    "propertyType",
    "totalSalesPrice",
    "totalOfferPrice",
    "propertyDescription",
    "projectBy",
    "contact",
    "email",
  ];

  const focusFirstError = (errs) => {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (!first) return;
    const el = document.getElementById(`field-${first}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.querySelector?.("input,select,button")?.focus?.({ preventScroll: true });
  };

  const requireLogin = () => {
    if (isLoggedIn) return false;
    setShowLogin(true);
    return true;
  };

  /* ---------------- STEPS ---------------- */
  const stepErrors = (n, errs) =>
    Object.fromEntries(Object.entries(errs).filter(([k]) => (STEP_FIELDS[n] || []).includes(k)));

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    const errs = stepErrors(step, validateDetails());
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    goToStep(step + 1);
  };

  const goBack = () => goToStep(Math.max(1, step - 1));

  // A step can be revisited once every earlier step is valid
  const canOpenStep = (n) => {
    if (n <= step) return true;
    const all = validateDetails();
    for (let s = 1; s < n; s++) if (Object.keys(stepErrors(s, all)).length) return false;
    return true;
  };

  /* ---------------- DRAFT ---------------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      const draft = raw ? JSON.parse(raw) : null;
      if (draft?.property && (draft.property.propertyName || draft.property.propertyCategory)) setSavedDraft(draft);
    } catch {
      /* ignore */
    }
    setDraftReady(true);
  }, []);

  useEffect(() => {
    // Don't overwrite a saved draft before the user chose to restore or discard it
    if (!draftReady || savedDraft) return;
    if (!newProperty.propertyName && !newProperty.propertyCategory) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ property: newProperty, condition, step: Math.min(step, 3), savedAt: Date.now() }),
        );
      } catch {
        /* storage full or blocked */
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [draftReady, savedDraft, newProperty, condition, step]);

  const restoreDraft = () => {
    setNewProperty((prev) => ({ ...prev, ...savedDraft.property }));
    if (savedDraft.condition) setCondition(savedDraft.condition);
    setStep(savedDraft.step || 1);
    setSavedDraft(null);
  };

  const discardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setSavedDraft(null);
  };

  /* ---------------- SUBMIT ---------------- */
  const submit = async () => {
    if (submitting || requireLogin()) return;

    const errs = validateDetails();
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = FIELD_ORDER.find((k) => errs[k]);
      setStep(stepOfField(first));
      setTimeout(() => focusFirstError(errs), 50);
      return;
    }
    if (photos.length === 0) {
      setPhotoError("Add at least 1 photo of the property");
      return;
    }
    const mediaErrs = validateVideoLinks(newProperty);
    setMediaErrors(mediaErrs);
    if (Object.keys(mediaErrs).length) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const propertyName = newProperty.propertyName.trim();

      // Re-check the name before spending time on uploads
      setSubmitStatus("Checking details...");
      const nameRes = await fetch(
        `${URI}/user/properties/check-name?name=${encodeURIComponent(propertyName)}`,
        { credentials: "include" },
      );
      if (nameRes.status === 401) {
        setShowLogin(true);
        throw new Error("Your session has expired. Please log in again.");
      }
      if (nameRes.ok && !(await nameRes.json())?.available) {
        setNameStatus("taken");
        setErrors((prev) => ({
          ...prev,
          propertyName: "This name is already used. Try adding the area or building number",
        }));
        setStep(stepOfField("propertyName"));
        setTimeout(() => focusFirstError({ propertyName: true }), 50);
        return;
      }

      // Only send the basic-info fields shown for this property type
      const payload = {
        ...newProperty,
        propertyName,
        address: newProperty.address.trim(),
        location: newProperty.location.trim(),
        propertyDescription: newProperty.propertyDescription.trim(),
        projectBy: newProperty.projectBy.trim(),
        email: newProperty.email.trim(),
        // Stored as a JSON array, e.g. ["2 BHK"], like the rest of the site expects
        propertyType: showConfiguration && newProperty.propertyType ? [newProperty.propertyType] : undefined,
      };
      const shownDetails = new Set(basicDetailFieldsFor(newProperty).map((f) => f.key));
      BASIC_DETAIL_KEYS.forEach((k) => {
        if (!shownDetails.has(k)) delete payload[k];
      });

      // Upload photos (first photo is the cover)
      const urls = [];
      for (let i = 0; i < photos.length; i++) {
        setSubmitStatus(`Uploading photo ${i + 1} of ${photos.length}...`);
        const file = await compressImage(photos[i].file);
        const url = await uploadToS3(file);
        if (!url) throw new Error("A photo failed to upload. Please check your connection and try again.");
        urls.push(url);
      }
      [
        "frontView",
        "sideView",
        "kitchenView",
        "hallView",
        "bedroomView",
        "bathroomView",
        "balconyView",
        "nearestLandmark",
        "developedAmenities",
      ].forEach((field) => {
        payload[field] = [];
      });
      payload.frontView = urls;

      // Optional walkthrough video + links
      if (video) {
        setSubmitStatus("Uploading video... 0%");
        payload.propertyVideo = await uploadToS3WithProgress(video.file, {
          folder: "uploads/videos",
          onProgress: (pct) => setSubmitStatus(`Uploading video... ${pct}%`),
        });
      }
      if (brochure) {
        setSubmitStatus("Uploading brochure... 0%");
        payload.brochureFile = await uploadToS3WithProgress(brochure, {
          folder: "uploads/brochures",
          onProgress: (pct) => setSubmitStatus(`Uploading brochure... ${pct}%`),
        });
      }
      payload.videoLink = newProperty.videoLink.trim();
      payload.instagramReelLink = newProperty.instagramReelLink.trim();

      setSubmitStatus("Saving your listing...");
      const response = await fetch(`${URI}/user/properties/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        setShowLogin(true);
        throw new Error("Your session has expired. Please log in again.");
      }
      if (response.status === 409) {
        setNameStatus("taken");
        setErrors((prev) => ({ ...prev, propertyName: data.message || "Property name already exists" }));
        setStep(stepOfField("propertyName"));
        setTimeout(() => focusFirstError({ propertyName: true }), 50);
        return;
      }
      if (!response.ok) throw new Error(data.message || "Failed to save. Please try again.");

      discardDraft();
      setShowAlert({
        show: true,
        type: "success",
        title: "Listing submitted",
        message: `Your property is under review. It will be visible to ${
          isRent ? "tenants" : "buyers"
        } once our team verifies it.`,
      });

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      router.push(isMobile ? "/my-listings" : "/dashboard?tab=listings");
    } catch (err) {
      console.error("Error saving property:", err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      setSubmitStatus("");
    }
  };

  const stepTitle = STEPS[step - 1].label;
  const progress = Math.round(((step - 1) / STEPS.length) * 100);
  const currentStepErrors = step < 4 ? stepErrors(step, errors) : {};

  /* ---------------- RENDER ---------------- */
  if (!sessionChecked) return <div className="w-full min-h-screen bg-[#F7F3FF]" />;

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-[70vh] bg-[#F7F3FF] flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <MdApartment size={28} color={PURPLE} />
          </div>
          <h1 className="text-2xl font-bold">List your property for free</h1>
          <p className="text-gray-500 mt-2">
            Log in first so your listing is saved to your account and you can track
            enquiries from My Listings.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="mt-6 w-full rounded-lg bg-[#8A38F5] text-white font-semibold py-3 hover:opacity-95"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F3FF] px-4 py-6 pt-2 sm:pt-6">
      {/* Mobile header */}
      <div className="md:hidden w-full h-[44px] flex items-center gap-4 px-4 py-2 my-3 rounded-lg bg-white">
        <FaArrowLeft
          onClick={() => (step > 1 ? goBack() : router.back())}
          className="cursor-pointer w-5 h-5"
        />
        <span className="w-full text-base font-bold text-center pr-9">{stepTitle}</span>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col-reverse md:flex-row gap-4 sm:gap-6">
        {/* LEFT PANEL */}
        <aside className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] bg-white rounded-2xl p-4 sm:p-6 py-6 h-fit md:sticky md:top-[110px] shadow sm:shadow-[0px_4px_8px_4px_#8A38F51F]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 sm:w-13 h-10 sm:h-13 text-xl sm:text-2xl rounded-full bg-purple-100 flex items-center justify-center">
              <FaLightbulb color={PURPLE} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">Quick Tips</h3>
              <span className="text-xs text-gray-500">Get the best value for your property</span>
            </div>
          </div>

          <ul className="space-y-4 text-sm" style={{ color: GRAY }}>
            <li className="flex gap-2 items-center">
              <IoCheckmarkDoneCircleSharp className="w-5 h-5 shrink-0 text-[#8A38F5]" />
              Add clear, bright photos to get more enquiries
            </li>
            <li className="flex gap-2 items-center">
              <IoCheckmarkDoneCircleSharp className="w-5 h-5 shrink-0 text-[#8A38F5]" />
              Accurate details help buyers find your property faster
            </li>
            <li className="flex gap-2 items-center">
              <IoCheckmarkDoneCircleSharp className="w-5 h-5 shrink-0 text-[#8A38F5]" />
              Every listing is verified by our team before it goes live
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
            <a
              href="tel:+918010881965"
              className="block w-full text-center py-2.5 rounded-lg font-semibold text-white bg-[#5323DC]"
            >
              Talk to Expert
            </a>
          </div>
        </aside>

        {/* RIGHT FORM */}
        <section className="w-full md:w-[60%] lg:w-[65%] xl:w-[70%] bg-white rounded-2xl p-4 sm:p-6 py-6 shadow-sm">
          {/* Draft restore */}
          {savedDraft && (
            <div className="mb-6 flex flex-col gap-3 rounded-xl border border-[#E4D8FF] bg-[#FAF8FF] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2 text-sm">
                <FaUndo className="mt-0.5 shrink-0 text-[#8A38F5]" />
                <span>
                  You have an unfinished listing
                  {savedDraft.property.propertyName ? (
                    <> for <span className="font-semibold">{savedDraft.property.propertyName}</span></>
                  ) : null}
                  . Continue where you left off?
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={discardDraft}
                  className="px-3 py-1.5 rounded-lg border border-[#D9D9D9] text-sm font-semibold text-gray-600 hover:bg-white"
                >
                  Start fresh
                </button>
                <button
                  type="button"
                  onClick={restoreDraft}
                  className="px-3 py-1.5 rounded-lg bg-[#8A38F5] text-sm font-semibold text-white hover:opacity-95"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2 text-xs font-semibold">
              <span style={{ color: PURPLE }}>
                Step {step} of {STEPS.length}
              </span>
              <span className="text-gray-400">{progress}% done</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden mb-4">
              <div className="h-full bg-[#8A38F5] transition-all duration-500" style={{ width: `${Math.max(progress, 4)}%` }} />
            </div>
            <ol className="grid grid-cols-4 gap-2">
              {STEPS.map(({ key, label }, i) => {
                const n = i + 1;
                const done = step > n;
                const active = step === n;
                const clickable = !submitting && n !== step && canOpenStep(n);
                return (
                  <li key={key}>
                    <button
                      type="button"
                      disabled={!clickable}
                      onClick={() => goToStep(n)}
                      className="w-full flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center sm:text-left disabled:cursor-default"
                    >
                      <span
                        className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold transition ${
                          done ? "bg-[#8A38F5] text-white" : active ? "bg-[#8A38F5] text-white ring-4 ring-[#8A38F5]/20" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {done ? <FaCheck size={11} /> : n}
                      </span>
                      <span className={`text-[11px] sm:text-sm font-semibold leading-tight ${active ? "text-black" : "text-gray-500"}`}>
                        {label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">{STEPS[step - 1].title}</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 4) goNext();
              else submit();
            }}
            noValidate
            className="w-full"
          >
            {step === 1 && (
              <>
                {/* SELL / BUY / RENT + PROPERTY TYPE */}
                <div id="field-propertyCategory">
                  <ListingClassification
                    value={classification}
                    onChange={({ listingType, condition: nextCondition, propertyKind, propertyCategory }) => {
                      setCondition(nextCondition);
                      const next = { ...newProperty, listingType, propertyKind, propertyCategory };
                      // Area inputs differ by type (sq.ft vs "2.5 Acre") — reset when that changes
                      if (areaModeFor(next) !== areaModeFor(newProperty)) {
                        next.builtUpArea = "";
                        next.carpetArea = "";
                      }
                      setNewProperty(next);
                      if (propertyCategory) clearError("propertyCategory");
                    }}
                  />
                  {errors.propertyCategory && (
                    <p className="-mt-4 mb-6 text-sm text-red-500">{errors.propertyCategory}</p>
                  )}
                </div>

                {/* PROPERTY NAME */}
                <div id="field-propertyName" className="mb-8 max-w-[420px]">
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-black">
                    <MdApartment color={PURPLE} /> Property Name{" "}
                    <span className="text-red-500">*</span>
                  </h3>
                  <input
                    type="text"
                    maxLength={100}
                    value={newProperty.propertyName}
                    onChange={(e) => {
                      set({ propertyName: e.target.value });
                      clearError("propertyName");
                    }}
                    placeholder="e.g. Sai Datta Heights, Wing B"
                    className={`${inputBase} ${borderFor(errors.propertyName || nameStatus === "taken")}`}
                  />
                  {errors.propertyName ? (
                    <p className="text-xs text-red-500 mt-1">{errors.propertyName}</p>
                  ) : nameStatus === "taken" ? (
                    <p className="text-xs text-red-500 mt-1">
                      This name is already used. Try adding the area or building number
                    </p>
                  ) : nameStatus === "available" ? (
                    <p className="text-xs text-green-600 mt-1">✓ Name is available</p>
                  ) : nameStatus === "checking" ? (
                    <p className="text-xs mt-1" style={{ color: GRAY }}>Checking availability...</p>
                  ) : (
                    <p className="text-xs mt-1" style={{ color: GRAY }}>
                      Must be unique. It is used in your listing&apos;s web address.
                    </p>
                  )}
                </div>

              </>
            )}

            {step === 2 && (
              <>
                {/* ADDRESS DETAILS */}
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-4 text-black">
                    <TiLocationOutline color={PURPLE} className="w-7 h-7" /> Address Details
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div id="field-address" className="w-full col-span-2">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="House no, Street, Area"
                        value={newProperty.address}
                        onChange={(e) => {
                          set({ address: e.target.value });
                          clearError("address");
                        }}
                        className={`${inputBase} ${borderFor(errors.address)}`}
                      />
                      {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                    </div>

                    <div id="field-state" className="relative w-full">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newProperty.state}
                        onChange={(e) => {
                          set({ state: e.target.value, city: "" });
                          clearError("state", "city");
                        }}
                        className={`${inputBase} appearance-none pr-9 ${borderFor(errors.state)} ${
                          newProperty.state ? "text-black" : "text-gray-500"
                        }`}
                      >
                        <option value="">Select State</option>
                        {states?.map((state, index) => (
                          <option key={index} value={state.state}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-[38px] pointer-events-none text-sm" />
                      {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                    </div>

                    <div id="field-city" className="relative w-full">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newProperty.city}
                        disabled={!newProperty.state}
                        onChange={(e) => {
                          set({ city: e.target.value });
                          clearError("city");
                        }}
                        className={`${inputBase} appearance-none pr-9 disabled:bg-gray-50 ${borderFor(errors.city)} ${
                          newProperty.city ? "text-black" : "text-gray-500"
                        }`}
                      >
                        <option value="">{newProperty.state ? "Select City" : "Select state first"}</option>
                        {cities?.map((city, index) => (
                          <option key={index} value={city.city}>
                            {city.city}
                          </option>
                        ))}
                      </select>
                      <FaChevronDown className="absolute right-4 top-[38px] pointer-events-none text-sm" />
                      {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                    </div>

                    <div id="field-location" className="w-full col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        Locality / Area <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        placeholder="e.g. Manish Nagar"
                        value={newProperty.location}
                        onChange={(e) => {
                          set({ location: e.target.value });
                          clearError("location");
                        }}
                        className={`${inputBase} ${borderFor(errors.location)}`}
                      />
                      {errors.location ? (
                        <p className="text-xs text-red-500 mt-1">{errors.location}</p>
                      ) : (
                        <p className="text-xs mt-1 ml-1" style={{ color: GRAY }}>
                          Shown on your listing card and used in search
                        </p>
                      )}
                    </div>

                    <div id="field-pincode" className="w-full col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        Pincode <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="e.g. 440015"
                        value={newProperty.pincode}
                        onChange={(e) => {
                          set({ pincode: e.target.value.replace(/\D/g, "") });
                          clearError("pincode");
                        }}
                        className={`${inputBase} ${borderFor(errors.pincode)}`}
                      />
                      {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2 ml-1">
                      Pin on Map <span className="text-gray-400 font-normal">(recommended)</span>
                    </label>
                    <LocationPicker
                      latitude={newProperty.latitude}
                      longitude={newProperty.longitude}
                      onChange={(latitude, longitude) => set({ latitude, longitude })}
                    />
                    <p className="text-xs mt-1 ml-1" style={{ color: GRAY }}>
                      Listings with a map pin appear on Map View and in &quot;near me&quot; searches.
                    </p>
                  </div>
                </div>

              </>
            )}

            {step === 3 && (
              <>
                {/* AREA + DETAILS — change with Residential / Commercial / Agriculture */}
                <div id="field-area">
                  <PropertyBasicDetails
                    newProperty={newProperty}
                    setNewProperty={(next) => {
                      setNewProperty(next);
                      clearError("area");
                    }}
                    showDetails={true}
                  />
                  {errors.area && <p className="-mt-6 mb-8 text-sm text-red-500">{errors.area}</p>}
                </div>

                {/* CONFIGURATION (BHK) — residential flats / houses only */}
                {showConfiguration && (
                  <div id="field-propertyType" className="mb-8">
                    <h3 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold mb-1 text-black">
                      <MdApartment color={PURPLE} /> Configuration <span className="text-red-500">*</span>
                    </h3>
                    <p className="text-xs mb-3 ml-1" style={{ color: GRAY }}>
                      Buyers filter by this, so pick the closest match
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {BHK_OPTIONS.map((option) => {
                        const active = newProperty.propertyType === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              set({ propertyType: option });
                              clearError("propertyType");
                            }}
                            className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                              active
                                ? "bg-[#8A38F5] text-white border-[#8A38F5] font-semibold"
                                : `${errors.propertyType ? "border-red-300" : "border-[#D9D9D9]"} text-gray-700 hover:border-[#8A38F5]`
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {errors.propertyType && <p className="text-xs text-red-500 mt-2">{errors.propertyType}</p>}
                  </div>
                )}

                {/* PRICING */}
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-4 text-black">
                    <FaRupeeSign color={PURPLE} /> Pricing Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: "totalSalesPrice", label: priceLabels.total, hint: isRent ? "Per month" : "" },
                      { key: "totalOfferPrice", label: priceLabels.offer, hint: priceLabels.offerHint },
                    ].map(({ key, label, hint }) => (
                      <div key={key} id={`field-${key}`}>
                        <label className="text-sm font-medium">
                          {label} <span className="text-red-500">*</span>
                        </label>
                        <div className={`mt-1 flex items-center rounded-lg border ${borderFor(errors[key])} focus-within:border-[#8A38F5]`}>
                          <span className="pl-4 text-gray-500">₹</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="0"
                            value={newProperty[key] ? Number(newProperty[key]).toLocaleString("en-IN") : ""}
                            onChange={(e) => {
                              const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
                              set({ [key]: digits });
                              clearError(key);
                            }}
                            className="w-full px-2 py-2 rounded-lg outline-none"
                          />
                        </div>
                        {errors[key] ? (
                          <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
                        ) : (
                          <p className="text-xs mt-1 ml-1" style={{ color: GRAY }}>
                            {priceInWords(newProperty[key]) ? (
                              <span className="font-semibold text-gray-700">{priceInWords(newProperty[key])}</span>
                            ) : null}
                            {priceInWords(newProperty[key]) && hint ? " · " : ""}
                            {hint}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div id="field-propertyDescription" className="mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-1 text-black">
                    <MdNotes color={PURPLE} /> Description{" "}
                    <span className="text-base text-gray-400 font-normal">(optional)</span>
                  </h3>
                  <p className="text-xs mb-3 ml-1" style={{ color: GRAY }}>
                    Highlight what makes it special: nearby schools, metro, view, recent renovation, society amenities.
                  </p>
                  <textarea
                    rows={5}
                    maxLength={MAX_DESCRIPTION}
                    value={newProperty.propertyDescription}
                    onChange={(e) => {
                      set({ propertyDescription: e.target.value });
                      clearError("propertyDescription");
                    }}
                    placeholder="e.g. Spacious east-facing 2 BHK, 5 minutes from Manish Nagar metro station, 24x7 water and power backup."
                    className={`${inputBase} resize-y ${borderFor(errors.propertyDescription)}`}
                  />
                  <div className="flex justify-between mt-1 ml-1">
                    <p className="text-xs text-red-500">{errors.propertyDescription}</p>
                    <p className="text-xs" style={{ color: GRAY }}>
                      {newProperty.propertyDescription.length}/{MAX_DESCRIPTION}
                    </p>
                  </div>
                </div>

                {/* CONTACT */}
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-1 text-black">
                    <FaUser color={PURPLE} /> Contact Details
                  </h3>
                  <p className="text-xs mb-4 ml-1" style={{ color: GRAY }}>
                    Pre-filled from your profile. Change them if someone else handles enquiries.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div id="field-projectBy" className="w-full">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        Owner Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newProperty.projectBy}
                        onChange={(e) => {
                          set({ projectBy: e.target.value.replace(/[^A-Za-z\s.]/g, "") });
                          clearError("projectBy");
                        }}
                        className={`${inputBase} ${borderFor(errors.projectBy)}`}
                      />
                      {errors.projectBy && <p className="text-xs text-red-500 mt-1">{errors.projectBy}</p>}
                    </div>

                    <div id="field-contact" className="w-full">
                      <label className="block text-sm font-medium mb-1 ml-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className={`flex rounded-lg border ${borderFor(errors.contact)} focus-within:border-[#8A38F5]`}>
                        <span className="px-3 flex items-center border-r border-[#E0E0E0] text-gray-600">+91</span>
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          value={newProperty.contact}
                          onChange={(e) => {
                            set({ contact: e.target.value.replace(/\D/g, "") });
                            clearError("contact");
                          }}
                          className="w-full px-4 py-2 rounded-r-lg outline-none"
                        />
                      </div>
                      {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
                    </div>
                  </div>

                  <div id="field-email" className="w-full mt-4">
                    <label className="block text-sm font-medium mb-1 ml-1">
                      Email <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={newProperty.email}
                      onChange={(e) => {
                        set({ email: e.target.value });
                        clearError("email");
                      }}
                      className={`${inputBase} ${borderFor(errors.email)}`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* SECURITY */}
                <div className="flex items-center gap-2 bg-[#F3EDFF] text-sm p-3 rounded-lg mb-6">
                  <FaLock color={PURPLE} className="shrink-0" />
                  Your contact details are secure and shared only with verified{" "}
                  {isRent ? "tenants" : "buyers"}
                </div>

              </>
            )}

            {/* Steps 1-3 footer */}
            {step < 4 && (
              <>
                {Object.keys(currentStepErrors).length > 0 && (
                  <p className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5">
                    Please fix the highlighted fields to continue.
                  </p>
                )}
                <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between mt-8 pt-6 border-t border-gray-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl border font-semibold active:scale-98"
                      style={{ borderColor: PURPLE, color: PURPLE }}
                    >
                      ← Back
                    </button>
                  ) : (
                    <span className="hidden sm:block" />
                  )}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-3 rounded-xl font-semibold text-white shadow bg-[#8A38F5] active:scale-98"
                  >
                    Continue to {STEPS[step].label} →
                  </button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-1 text-black">
                    <IoMdImages color={PURPLE} /> Property Photos <span className="text-red-500">*</span>
                  </h3>
                  <p className="text-sm mb-4" style={{ color: GRAY }}>
                    Add 1 to {MAX_PHOTOS} clear photos. The first photo is the cover shown in search results.
                  </p>

                  {photos.length < MAX_PHOTOS && (
                    <label
                      className={`block border-2 border-dashed rounded-xl p-6 text-center bg-white hover:bg-[#F7F3FF] transition ${
                        photoError ? "border-red-400" : "border-[#8A38F5]"
                      } ${submitting ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoSelect}
                        disabled={submitting}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <IoMdImages size={30} color={PURPLE} />
                        <p className="font-semibold text-black">
                          {photos.length ? "Add more photos" : "Click to upload photos"}
                        </p>
                        <span className="text-xs" style={{ color: GRAY }}>
                          JPG, PNG or WEBP · {photos.length}/{MAX_PHOTOS} added · large photos are compressed automatically
                        </span>
                      </div>
                    </label>
                  )}

                  {photoError && <p className="text-sm text-red-500 mt-2">{photoError}</p>}

                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {photos.map((photo, index) => (
                        <div
                          key={photo.preview}
                          className={`relative rounded-lg overflow-hidden border ${
                            index === 0 ? "border-[#8A38F5] ring-2 ring-[#8A38F5]/30" : "border-[#D9D9D9]"
                          }`}
                        >
                          <img
                            src={photo.preview}
                            alt={`Property photo ${index + 1}`}
                            className="w-full h-[140px] xl:h-[180px] object-cover"
                          />
                          {index === 0 ? (
                            <span className="absolute bottom-1 left-1 rounded bg-[#8A38F5] px-2 py-0.5 text-[11px] font-semibold text-white">
                              Cover
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => makeCover(index)}
                              disabled={submitting}
                              className="absolute bottom-1 left-1 rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#5323DC] shadow"
                            >
                              Make cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            disabled={submitting}
                            aria-label="Remove photo"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow"
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <PropertyVideoFields
                  video={video}
                  onVideoChange={setVideo}
                  links={{ videoLink: newProperty.videoLink, instagramReelLink: newProperty.instagramReelLink }}
                  onLinksChange={set}
                  errors={mediaErrors}
                  setErrors={setMediaErrors}
                  disabled={submitting}
                />

                <PropertyBrochureField
                  file={brochure}
                  onFileChange={setBrochure}
                  error={brochureError}
                  setError={setBrochureError}
                  disabled={submitting}
                />

                {submitError && (
                  <p className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5">
                    {submitError}
                  </p>
                )}

                {/* STEP ACTIONS */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-between mt-10">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg border font-semibold active:scale-98 disabled:opacity-50"
                    style={{ borderColor: PURPLE, color: PURPLE }}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-[290px] px-6 py-3 rounded-lg font-semibold text-white bg-[#8A38F5] shadow-[0px_4px_11px_2px_#8A38F540] active:scale-98 disabled:opacity-70"
                  >
                    {submitting ? submitStatus || "Submitting..." : "Submit for Verification"}
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
