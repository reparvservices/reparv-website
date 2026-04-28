import { useEffect, useRef, useState } from "react";

const AdsForNewsFeed = () => {
  const adRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let timer;

    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error("Adsense error:", err);
    }

    // Check if ad actually loaded
    timer = setTimeout(() => {
      if (adRef.current && adRef.current.innerHTML.trim() !== "") {
        setLoaded(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Avoid empty blank space in grid/feed
  if (!loaded) return null;

  return (
    <div className="w-full my-4 flex justify-center">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minHeight: "120px",
        }}
        data-ad-format="fluid"
        data-ad-layout-key="-ez+5q+5e-d4+4m"
        data-ad-client="ca-pub-8914733371473026"
        data-ad-slot="4089381871"
      />
    </div>
  );
};

export default AdsForNewsFeed;