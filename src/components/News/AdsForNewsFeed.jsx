import { useEffect, useRef, useState } from "react";
import { initAdSenseSlot, watchAdFill } from "../../utils/initAdSense";

const AD_CLIENT = "ca-pub-7197621532263972";
const IS_DEV = process.env.NODE_ENV === "development";

const AdsForNewsFeed = () => {
  const adRef = useRef(null);
  const initialized = useRef(false);
  const [filled, setFilled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const ad = adRef.current;
    if (!ad || initialized.current) return;

    initialized.current = true;
    initAdSenseSlot();

    return watchAdFill(ad, {
      onFilled: () => setFilled(true),
      onEmpty: () => {
        if (!IS_DEV) setHidden(true);
      },
    });
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`w-full transition-all ${
        filled ? "my-4" : IS_DEV ? "my-4 max-h-[120px] overflow-hidden" : "my-4"
      }`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-format="fluid"
        data-ad-layout-key="-ez+5q+5e-d4+4m"
        data-ad-client={AD_CLIENT}
        data-ad-slot="4089381871"
      />
    </div>
  );
};

export default AdsForNewsFeed;
