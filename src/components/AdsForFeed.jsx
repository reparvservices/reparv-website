import { useEffect, useRef, useState } from "react";
import { initAdSenseSlot, watchAdFill } from "../utils/initAdSense";

const AD_CLIENT = "ca-pub-7197621532263972";
const IS_DEV = process.env.NODE_ENV === "development";

const AdComponent = ({ onLoad }) => {
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
      onFilled: () => {
        setFilled(true);
        onLoad?.(true);
      },
      onEmpty: () => {
        if (!IS_DEV) setHidden(true);
      },
    });
  }, [onLoad]);

  if (hidden) return null;

  return (
    <div
      className={`w-full transition-all ${
        filled ? "my-2" : IS_DEV ? "my-2 max-h-[120px] overflow-hidden" : "my-2"
      }`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-6m+eh+16-3z+5g"
        data-ad-client={AD_CLIENT}
        data-ad-slot="6779124390"
      />
    </div>
  );
};

export default AdComponent;
