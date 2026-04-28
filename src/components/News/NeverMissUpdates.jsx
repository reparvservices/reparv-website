import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";

const NeverMissUpdates = () => {
  const { URI } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Email Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubscribe = async (e) => {
    e.preventDefault();
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
    <section
      className="text-white py-20 px-4 md:px-12 lg:px-24"
      style={{
        background: "linear-gradient(107deg, #5E23DC 1.17%, #8A38F5 98.83%)",
      }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M69.7904 16.666C72.1659 16.6657 74.453 17.5672 76.1893 19.1884C77.9257 20.8095 78.9819 23.0294 79.1445 25.3993L79.1654 26.041V72.916C79.1644 73.4366 79.3584 73.9387 79.7092 74.3234C80.0599 74.7082 80.542 74.9476 81.0605 74.9947C81.5789 75.0417 82.0962 74.8929 82.5105 74.5776C82.9248 74.2623 83.206 73.8033 83.2987 73.291L83.332 72.916V29.2243C85.5068 29.4675 87.528 30.4638 89.0454 32.0405C90.5628 33.6173 91.4808 35.6752 91.6404 37.8577L91.6654 38.541V69.791C91.6656 73.2499 90.3422 76.5778 87.9667 79.092C85.5912 81.6062 82.3437 83.116 78.8904 83.3119L78.1237 83.3327H21.8737C18.4148 83.3329 15.0869 82.0095 12.5727 79.634C10.0586 77.2586 8.54869 74.011 8.35287 70.5577L8.33203 69.791V26.041C8.33174 23.6655 9.23326 21.3784 10.8544 19.642C12.4755 17.9057 14.6954 16.8494 17.0654 16.6868L17.707 16.666H69.7904ZM38.532 45.8327H23.9487C23.1199 45.8327 22.325 46.1619 21.739 46.748C21.1529 47.334 20.8237 48.1289 20.8237 48.9577V63.541C20.8237 65.266 22.2237 66.666 23.9487 66.666H38.532C39.3608 66.666 40.1557 66.3368 40.7417 65.7507C41.3278 65.1647 41.657 64.3698 41.657 63.541V48.9577C41.657 48.1289 41.3278 47.334 40.7417 46.748C40.1557 46.1619 39.3608 45.8327 38.532 45.8327ZM63.5487 60.416H53.1404L52.7154 60.4452C51.931 60.5531 51.2168 60.9547 50.7172 61.5689C50.2175 62.1831 49.9696 62.9641 50.0236 63.754C50.0776 64.5439 50.4294 65.2839 51.0079 65.8245C51.5864 66.365 52.3486 66.6658 53.1404 66.666H63.5487L63.9737 66.6368C64.7581 66.5289 65.4722 66.1273 65.9719 65.5131C66.4716 64.8989 66.7194 64.1179 66.6655 63.328C66.6115 62.5381 66.2597 61.7981 65.6812 61.2576C65.1026 60.717 64.3405 60.4163 63.5487 60.416ZM35.407 52.0827V60.416H27.0737V52.0827H35.407ZM63.5404 45.8327L53.132 45.8535L52.707 45.8785C51.915 45.9788 51.1914 46.3783 50.6847 46.9951C50.178 47.612 49.9265 48.3994 49.982 49.1958C50.0374 49.9922 50.3955 50.7371 50.9828 51.2778C51.5701 51.8185 52.3421 52.114 53.1404 52.1035L63.5529 52.0827L63.9737 52.0535C64.7584 51.9455 65.4729 51.5436 65.9726 50.929C66.4722 50.3143 66.7199 49.5328 66.6653 48.7426C66.6108 47.9524 66.2582 47.2123 65.6789 46.6721C65.0995 46.1319 64.3367 45.8319 63.5445 45.8327M63.5487 31.266H23.9487L23.5237 31.2952C22.7393 31.4031 22.0252 31.8047 21.5255 32.4189C21.0258 33.0331 20.778 33.8141 20.8319 34.604C20.8859 35.3939 21.2377 36.1339 21.8162 36.6745C22.3948 37.215 23.1569 37.5158 23.9487 37.516H63.5487L63.9737 37.491C64.7648 37.3907 65.4876 36.9917 65.9941 36.3758C66.5007 35.7598 66.7525 34.9736 66.6982 34.178C66.6439 33.3824 66.2875 32.6377 65.702 32.0963C65.1164 31.5549 64.3461 31.2579 63.5487 31.266Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[24px] md:text-4xl sm:text-3xl font-bold tracking-tight mb-4">
          Never Miss Important Real Estate Updates
        </h2>

        {/* Subtext */}
        <p
          className="text-white/90 max-w-3xl mx-auto mb-10 text-center"
          style={{
            fontFamily: "Segoe UI, sans-serif",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          <span className="text-[15px] sm:text-[24px]">
            Join 50,000+ readers who get the latest news, market insights, and
            expert analysis delivered to their inbox every morning.
          </span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubscribe} className="flex flex-col items-center justify-center mb-6">
          <div className="flex w-full max-w-[640px] bg-white rounded-[14px] overflow-hidden">
            {/* Email Input */}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email address"
              className="flex-1 h-[56px] px-4 sm:px-5 text-gray-900 focus:outline-none"
            />

            {/* Vertical Line */}
            <div className="w-[1px] h-[32px] bg-[#D0C4ED] self-center"></div>

            {/* Subscribe Button */}
            <button
              type="submit"
              //onClick={handleSubscribe}
              disabled={loading}
              className="flex-shrink-0 h-[56px] px-4 sm:px-8 font-semibold text-purple-700 bg-white hover:bg-gray-100 transition whitespace-nowrap text-sm sm:text-base"
            >
              {loading ? "Subscribing..." : "Subscribe Free"}
            </button>
          </div>
          {/* MESSAGE */}
          {message && (
            <p className="mt-3 ml-6 text-sm sm:text-base font-medium text-white">
              {message}
            </p>
          )}
        </form>

        {/* Checklist */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-white/85">
          {["Daily Newsletter", "Market Reports", "Unsubscribe Anytime"].map(
            (item) => (
              <div key={item} className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="11" fill="white" />
                  <path
                    d="M7 12.5L10.5 16L17 9"
                    stroke="#5E23DC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{item}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default NeverMissUpdates;
