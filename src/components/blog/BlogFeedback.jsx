import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { FaPaperPlane, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function BlogFeedback() {
  const { URI, setLoading, setSuccessScreen } = useAuth();
  const [helpful, setHelpful] = useState("Yes");

  const [form, setForm] = useState({
    helpful: "Yes",
    fullname: "",
    contact: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, helpful }));
  }, [helpful]);

  const sendFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${URI}/frontend/blog/feedback/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed");

      setSuccessScreen({
        show: true,
        label: "Thank you!",
        description: "Your feedback has been submitted successfully",
      });

      setForm({
        helpful,
        fullname: "",
        contact: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:w-[90%] flex justify-center bg-white">
      <form
        onSubmit={sendFeedback}
        className="relative w-full max-w-4xl bg-[#FAF8FF] sm:m-4 rounded-lg sm:rounded-2xl p-4 sm:p-10 overflow-hidden"
      >
        {/* TITLE */}
        <h2 className="text-xl sm:text-2xl font-bold sm:text-center text-[#3D2C6D] my-4 sm:mb-8">
          Did this article help you?
        </h2>

        {/* YES / NO */}
        <div className="flex justify-center gap-3 sm:gap-6 mb-4 sm:mb-8">
          <button
            type="button"
            onClick={() => setHelpful("Yes")}
            className={`w-[250px] flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition
              ${
                helpful === "Yes"
                  ? "bg-[#7C3AED] text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
          >
            <FaThumbsUp /> Yes, it helped!
          </button>

          <button
            type="button"
            onClick={() => setHelpful("No")}
            className={`w-[250px] flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg font-semibold transition
              ${
                helpful === "No"
                  ? "bg-[#7C3AED] text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
          >
            <FaThumbsDown /> Not really
          </button>
        </div>

        {/* MESSAGE */}
        <div className="mb-4 sm:mb-6">
          <label className="block font-semibold mb-2">
            Share your thoughts
          </label>
          <textarea
            required
            rows={4}
            placeholder="Share your thoughts, questions & feedback"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full p-4 rounded-lg bg-[white] border border-[#D9D9D9] focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* NAME & CONTACT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div>
            <label className="block font-semibold mb-2">Full Name</label>
            <input
              required
              type="text"
              placeholder="Enter your full name"
              value={form.fullname}
              onChange={(e) =>
                setForm({ ...form, fullname: e.target.value })
              }
              className="w-full p-3 bg-white rounded-lg border border-[#D9D9D9] focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Contact Number
            </label>
            <input
              required
              type="tel"
              maxLength={10}
              placeholder="Enter contact number"
              value={form.contact}
              onChange={(e) =>
                setForm({ ...form, contact: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white border border-[#D9D9D9] focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Email Address
          </label>
          <input
            required
            type="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full p-3 bg-white rounded-lg border border-[#D9D9D9] focus:ring-2 focus:ring-purple-400 outline-none"
          />
        </div>

        {/* SUBMIT */}
        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold px-10 py-3 rounded-xl shadow-lg transition"
          >
            <FaPaperPlane />
            Post Comment
          </button>
        </div>
        <div className="hidden sm:block absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-[#EEE0FF]"></div>
        <div className="hidden sm:block absolute bottom-[-50px] left-[-50px] w-[150px] h-[150px] rounded-full bg-[#EEE0FF]"></div>
      </form>
    </div>
  );
}