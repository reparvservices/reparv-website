/**
 * Venue Booking API for website customers listing their own venue.
 * Every call throws an Error with the server's message on failure.
 */
export function venueApi(URI) {
  const call = async (path = "", options = {}) => {
    const res = await fetch(`${URI}/user/venues${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) throw new Error("Your session has expired. Please log in again.");
    if (!res.ok || data.success === false) throw new Error(data.message || "Request failed");
    return data;
  };

  return {
    list: async () => (await call("")).listings || [],
    get: async (id) => (await call(`/${id}`)).listing,

    /** Create (id empty) or update, then optionally submit a draft / rejected listing for approval */
    action: async (id, action) => (await call(`/${id}/${action}`, { method: "POST" })).listing,

    save: async (id, body, submit = false) => {
      const res = id
        ? await call(`/${id}`, { method: "PUT", body: JSON.stringify(body) })
        : await call("", { method: "POST", body: JSON.stringify(body) });
      let listing = res.listing;
      if (submit && listing && ["draft", "rejected"].includes(listing.status)) {
        listing = (await call(`/${listing.id}/submit`, { method: "POST" })).listing || listing;
      }
      return listing;
    },
  };
}
