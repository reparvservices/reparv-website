/**
 * Monthly EMI shown on property cards. Uses the stored `emi` when present,
 * otherwise estimates it the same way the admin panel does when saving a
 * property (9% p.a. for 20 years on the offer price).
 * Returns null when there is nothing to show (never NaN).
 */
export function calculateEMI(principal, rate = 9, years = 20) {
  const p = Number(principal);
  if (!Number.isFinite(p) || p <= 0) return null;
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) return Math.round(p / months);
  const factor = Math.pow(1 + monthlyRate, months);
  return Math.round((p * monthlyRate * factor) / (factor - 1));
}

export function getPropertyEMI(property) {
  const stored = Number(property?.emi);
  if (Number.isFinite(stored) && stored > 0) return Math.round(stored);
  return calculateEMI(property?.totalOfferPrice || property?.totalSalesPrice);
}
