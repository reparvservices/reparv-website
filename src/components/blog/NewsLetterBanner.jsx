import { FiLock, FiMail } from "react-icons/fi";
import { useAuth } from "../../store/auth";
import { useState } from "react";
import { useEffect } from "react";

const NewsLetterBanner = () => {
  const { URI } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Email Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubscribe = async () => {
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${URI}/admin/subscribers/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      setMessage(data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <section className="w-full pt-5 sm:pt-15 py-4">
      <div
        style={{
          backgroundImage: `
            url("/assets/blog/NewsletterBanner.svg"),
            linear-gradient(90deg, #3A1C71 0%, #5E2B97 50%, #7C3AED 100%)
          `,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "contain",
        }}
        className="w-full max-w-[1380px] mx-auto rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="p-4 py-6 sm:p-10 md:p-12 w-full">
          <h2 className="text-xl sm:text-3xl md:text-3xl lg:text-5xl text-center sm:text-left font-bold text-white leading-tight">
            Stay Updated with Real Estate Insights
          </h2>

          <p className="mt-4 w-full sm:w-[50%] text-center sm:text-left text-xs sm:text-base lg:text-2xl text-white/90">
            Get the latest articles, market trends, and expert tips delivered to
            your inbox every week.
          </p>

          {/* INPUT + BUTTON */}
          <div className="mt-6 flex flex-row gap-3 max-w-lg bg-white rounded-full focus:ring-2 focus:ring-violet-300 p-2 text-sm sm:text-lg">
            <div className="relative flex-1">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-xl" />
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-5 py-2 sm:py-3 rounded-full text-gray-800 outline-none"
              />
            </div>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="text-xs sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white bg-[#8A38F5] font-semibold hover:bg-violet-600 transition whitespace-nowrap cursor-pointer active:scale-98 "
            >
              <span className="flex gap-1">
                {loading ? "Subscribing..." : "Subscribe"}
                <span className="hidden sm:block"> Now </span>
              </span>
            </button>
          </div>

          {/* MESSAGE */}
          {message && (
            <p className="mt-3 ml-6 text-xs sm:text-sm font-medium text-white">
              {message}
            </p>
          )}

          {/* PRIVACY NOTE */}
          <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-white/80">
            <FiLock className="text-sm sm:text-base" />
            <span>We respect your privacy. Unsubscribe at any time.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterBanner;
