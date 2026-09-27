/**
 * Remembers which properties this visitor has booked a site visit for.
 * Full property details are shown only after an (OTP-verified) booking enquiry.
 */
const STORAGE_KEY = "reparv_unlocked_properties";
export const PROPERTY_UNLOCKED_EVENT = "reparv:property-unlocked";
const JUST_UNLOCKED_PREFIX = "reparv_just_unlocked_";

function readIds() {
  try {
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(ids) ? ids.map(String) : [];
  } catch {
    return [];
  }
}

export function isPropertyUnlocked(propertyId) {
  if (typeof window === "undefined" || propertyId == null) return false;
  return readIds().includes(String(propertyId));
}

export function markPropertyUnlocked(propertyId) {
  if (typeof window === "undefined" || propertyId == null) return;
  try {
    const ids = readIds();
    if (!ids.includes(String(propertyId))) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, String(propertyId)]));
    }
    // Show a one-time "details unlocked" note when they next open the property
    sessionStorage.setItem(`${JUST_UNLOCKED_PREFIX}${propertyId}`, "1");
    window.dispatchEvent(new CustomEvent(PROPERTY_UNLOCKED_EVENT, { detail: { propertyId } }));
  } catch {
    // storage unavailable (private mode etc.) — details stay locked
  }
}

/** True once after a property was unlocked in this tab (then cleared). */
export function consumeJustUnlocked(propertyId) {
  if (typeof window === "undefined" || propertyId == null) return false;
  try {
    const key = `${JUST_UNLOCKED_PREFIX}${propertyId}`;
    const hit = sessionStorage.getItem(key) === "1";
    if (hit) sessionStorage.removeItem(key);
    return hit;
  } catch {
    return false;
  }
}
