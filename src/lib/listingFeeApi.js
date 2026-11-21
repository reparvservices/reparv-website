import { loadRazorpay } from "./venueBookingApi";

/**
 * Listing fee API for website users (first listing is free, later ones are paid).
 * Every call throws an Error with the server's message; `error.status` carries the HTTP status.
 */
export function listingFeeApi(URI) {
  const call = async (path, options = {}) => {
    const res = await fetch(`${URI}/user/listing-fees${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) {
      const err = new Error(res.status === 401 ? "Please log in again." : data.message || "Request failed");
      err.status = res.status;
      throw err;
    }
    return data;
  };
  const post = (path, body) => call(path, { method: "POST", body: JSON.stringify(body || {}) });

  return {
    /** What a listing of this type would cost this user right now */
    quote: async (listingType, category) =>
      (await call(`/quote?listingType=${encodeURIComponent(listingType)}&category=${encodeURIComponent(category)}`)).quote,
    checkout: (propertyId) => post("/checkout", { property_id: propertyId }),
    verify: (payment) => post("/verify", payment),
  };
}

/**
 * Open Razorpay for one unpaid listing. Resolves once the server has confirmed the payment;
 * rejects (with `error.dismissed = true` if the user just closed the window).
 */
export async function payListingFee(api, propertyId, { description = "Listing fee" } = {}) {
  if (!(await loadRazorpay())) throw new Error("Could not load the payment window. Check your connection.");
  const order = await api.checkout(propertyId);
  return new Promise((resolve, reject) => {
    const rz = new window.Razorpay({
      key: order.key,
      order_id: order.order_id,
      amount: order.amount,
      currency: order.currency,
      name: "Reparv",
      description,
      theme: { color: "#8A38F5" },
      handler: async (payment) => {
        try {
          resolve(await api.verify(payment));
        } catch (e) {
          reject(e);
        }
      },
      modal: {
        ondismiss: () => {
          const e = new Error("Payment was not completed.");
          e.dismissed = true;
          reject(e);
        },
      },
    });
    rz.on("payment.failed", (r) => reject(new Error(r?.error?.description || "Payment failed. Please try again.")));
    rz.open();
  });
}
