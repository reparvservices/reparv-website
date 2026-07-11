export function initAdSenseSlot() {
  if (typeof window === "undefined") return;

  const push = () => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.warn("Adsense error:", error);
    }
  };

  if (window.adsbygoogle) {
    push();
    return;
  }

  let attempts = 0;
  const interval = window.setInterval(() => {
    attempts += 1;
    if (window.adsbygoogle) {
      window.clearInterval(interval);
      push();
    } else if (attempts >= 50) {
      window.clearInterval(interval);
    }
  }, 200);
}

export function watchAdFill(element, { onFilled, onEmpty, timeoutMs = 6000 }) {
  if (!element) return () => {};

  let filled = false;

  const markFilled = () => {
    if (filled) return;
    filled = true;
    onFilled?.();
  };

  const observer = new ResizeObserver(() => {
    if (element.offsetHeight > 20 || element.querySelector("iframe")) {
      markFilled();
    }
  });

  observer.observe(element);

  const timer = window.setTimeout(() => {
    if (!filled && element.offsetHeight <= 20 && !element.querySelector("iframe")) {
      onEmpty?.();
    }
  }, timeoutMs);

  return () => {
    observer.disconnect();
    window.clearTimeout(timer);
  };
}
