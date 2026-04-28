import React, { useEffect, useState } from "react";

// ContactUs_v2.jsx
// Updated: left and right cards are equal width & height on large screens.
// Left card includes icons and a "Chat on WhatsApp" button. Right form's submit button
// is full-width and matches the textarea width. Responsive for mobile/tablet/desktop.

export default function ContactUsV2() {
  useEffect(() => {
    const id = "inter-font-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = (values) => {
    const errs = {};
    if (!values.name.trim()) errs.name = "Please enter your name.";
    if (!values.mobile.trim()) errs.mobile = "Please enter your mobile number.";
    else if (!/^[0-9]{7,15}$/.test(values.mobile.replace(/\\s|[-()]/g, "")))
      errs.mobile = "Enter a valid phone number (7–15 digits).";
    if (!values.email.trim()) errs.email = "Please enter your email.";
    else if (!/^\\S+@\\S+\\.\\S+$/.test(values.email))
      errs.email = "Enter a valid email address.";
    if (!values.message.trim())
      errs.message = "Please tell us how we can help.";
    else if (values.message.trim().length < 10)
      errs.message =
        "Please provide a bit more detail (at least 10 characters).";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));

    setErrors((prev) => {
      const copy = { ...prev };
      const partial = validate({ ...form, [name]: value });
      if (partial[name]) copy[name] = partial[name];
      else delete copy[name];
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(
        "Thanks — your message has been sent. We'll get back to you soon."
      );
      setForm({ name: "", mobile: "", email: "", message: "" });
      setErrors({});
    }, 900);
  };

  return (
    <section className="px-2 sm:px-6 lg:px-8 py-10 sm:bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative bg-white rounded-2xl shadow-sm p-6 md:p-10 overflow-hidden"
          style={{
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
        >
          {/* Header */}
          <div className="mb-6">
            <p className="text-sm font-medium text-emerald-600 tracking-wide">
              CONTACT
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Contact Us
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Have questions about the Project Partner program? Reach out to us
              and our team will get back to you.
            </p>
          </div>

          {/* Two equal columns on large screens; stacked on small */}
          <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-6 items-start">
            {/* LEFT: Get in touch card - equal height using h-full and flex */}
            <div className="h-full">
              <div className="sm:h-[90%] bg-gray-50 border border-slate-200 rounded-2xl p-3 sm:p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">
                    Get in touch
                  </h3>

                  <div className="space-y-4 text-slate-700 text-sm">
                    <div className="flex items-start gap-3">
                      {/* email icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M3 8.5l8.5 5L20 8.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="mt-1 text-slate-600">contact@reparv.in</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      {/* phone icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          d="M22 16.92V21a1 1 0 0 1-1.11 1 19.86 19.86 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 8.74 19.86 19.86 0 0 1 0 1.11 1 1 0 0 1 1 0h4.09a1 1 0 0 1 1 .75c.12.68.33 1.35.62 2a1 1 0 0 1-.24 1L5.7 6.7a16 16 0 0 0 8.6 8.6l2.95-2.95a1 1 0 0 1 1-.24c.65.29 1.32.5 2 .62a1 1 0 0 1 .75 1V22z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <div>
                        <p className="font-medium">Phone / WhatsApp</p>
                        <p className="mt-1 text-slate-600">+91 80108 81965</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      {/* clock icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></circle>
                        <path
                          d="M12 7v5l3 2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <div>
                        <p className="font-medium">Office Hours</p>
                        <p className="mt-1 text-slate-600">
                          Monday to Saturday, 10:00 AM – 7:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* bottom button aligned left like in design */}
                <div className="mt-6">
                  <a
                    href="https://wa.me/918010881965"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full  bg-[#00C950] text-white px-4 py-2 text-sm font-medium shadow-xl hover:bg-emerald-700"
                  >
                    {/* whatsapp icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M21 15.5a5.5 5.5 0 0 0-9.5-3.9L9 15l-1 3 3-1 2.6-2.6A5.5 5.5 0 0 0 21 15.5z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: Form card - equal width and height */}
            <div className="h-full mt-5 sm:mt-0">
              <div className="h-full bg-white sm:p-6">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="h-full flex flex-col"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                          errors.name ? "border-rose-400" : "border-slate-200"
                        }`}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Mobile
                      </label>
                      <input
                        id="mobile"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                        className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                          errors.mobile ? "border-rose-400" : "border-slate-200"
                        }`}
                        aria-invalid={errors.mobile ? "true" : "false"}
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                          errors.email ? "border-rose-400" : "border-slate-200"
                        }`}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex-1 flex flex-col">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us briefly about your query"
                      className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${
                        errors.message ? "border-rose-400" : "border-slate-200"
                      }`}
                      aria-invalid={errors.message ? "true" : "false"}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-600">
                        {errors.message}
                      </p>
                    )}

                    {/* spacer to push button to bottom if needed */}
                    <div className="mt-4" />

                    <div className="mt-auto">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full inline-flex items-center cursor-pointer justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition ${
                          isSubmitting
                            ? "bg-[#00C950] cursor-wait"
                            : "bg-[#00C950] hover:bg-[#00C950]"
                        }`}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>

                    {success && (
                      <p className="mt-4 text-sm text-emerald-700">{success}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
