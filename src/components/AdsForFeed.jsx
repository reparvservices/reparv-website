import { useEffect, useRef, useState } from "react";

const AdComponent = ({ onLoad }) => {
  const adRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.log("Adsense error", e);
    }

    const timer = setTimeout(() => {
      if (adRef.current && adRef.current.innerHTML.trim() !== "") {
        setLoaded(true);
        onLoad && onLoad(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Prevent empty space
  if (!loaded) return null;

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="fluid"
      data-ad-layout-key="-6m+eh+16-3z+5g"
      data-ad-client="ca-pub-8914733371473026"
      data-ad-slot="6779124390"
    />
  );
};

export default AdComponent;