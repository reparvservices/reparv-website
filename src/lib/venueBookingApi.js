/**
 * Booking API for the website venue page.
 * Browsing, availability and price quotes are public (/customerapp/venues).
 * Creating, paying for and cancelling a booking needs the website login (/user/venue-bookings).
 * Every call throws an Error with the server's message; `error.status` carries the HTTP status.
 */
export function venueBookingApi(URI) {
  const call = async (path, options = {}) => {
    const res = await fetch(`${URI}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) {
      const err = new Error(
        res.status === 401 ? "Please log in to book this venue." : data.message || "Request failed",
      );
      err.status = res.status;
      throw err;
    }
    return data;
  };
  const post = (path, body) => call(path, { method: "POST", body: JSON.stringify(body || {}) });

  return {
    availability: (id, from, to) =>
      call(`/customerapp/venues/${id}/availability?from=${from}&to=${to}`),
    quote: (id, stay) => post(`/customerapp/venues/${id}/quote`, stay),
    book: (stay) => post("/user/venue-bookings", stay),
    verify: (payment) => post("/user/venue-bookings/verify", payment),
    list: async () => (await call("/user/venue-bookings")).bookings || [],
    cancel: (id, reason) => post(`/user/venue-bookings/${id}/cancel`, { reason }),
  };
}

/** Load Razorpay's checkout script once. */
export function loadRazorpay() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const addDays = (date, n) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/** True when the chosen dates / slot clash with a booking or an owner block. */
export function stayIsTaken(availability, { start, end, slot }) {
  if (!availability || !start) return false;
  const stay = { start, end: end || addDays(start, 1), slot: slot || "full" };
  const overlaps = (b) =>
    stay.start < b.end && b.start < stay.end && (stay.slot === "full" || b.slot === "full" || stay.slot === b.slot);
  return (
    (availability.booked || []).some(overlaps) ||
    (availability.blocked || []).some((b) => overlaps({ start: b.date, end: addDays(b.date, 1), slot: b.slot }))
  );
}

export { addDays };
