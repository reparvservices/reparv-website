import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PropertyCard from "../../property/PropertyCard";
import { useAuth } from "../../../store/auth";

const ArrowRightIcon = () => (
  <svg
    className="w-4 h-4 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default function ExploreVerifiedProperties({ loanAmount }) {
  const { URI, selectedCity } = useAuth();
  const [properties, setProperties] = useState([]);

  const budget = useMemo(() => {
    if (!loanAmount || Number.isNaN(Number(loanAmount))) return null;

    const LTV = 0.8;
    const maxPrice = Number(loanAmount) / LTV;

    return {
      minBudget: Math.floor(maxPrice * 0.85),
      maxBudget: Math.floor(maxPrice),
    };
  }, [loanAmount]);

  useEffect(() => {
    if (!selectedCity || !URI) return;

    const fetchProperties = async () => {
      try {
        const fetchList = async (url) => {
          const res = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            throw new Error("Failed to fetch properties");
          }

          const result = await res.json();
          return Array.isArray(result) ? result : [];
        };

        let list = [];

        if (budget) {
          const budgetUrl = `${URI}/frontend/all-properties/budget/${encodeURIComponent(
            selectedCity,
          )}?minBudget=${budget.minBudget}&maxBudget=${budget.maxBudget}`;
          list = await fetchList(budgetUrl);
        }

        if (list.length < 3) {
          const cityUrl = `${URI}/frontend/all-properties/${encodeURIComponent(
            selectedCity,
          )}`;
          const cityList = await fetchList(cityUrl);
          const seen = new Set(list.map((item) => item.propertyid));

          for (const property of cityList) {
            if (seen.has(property.propertyid)) continue;
            list.push(property);
            seen.add(property.propertyid);
            if (list.length >= 3) break;
          }
        }

        setProperties(list.slice(0, 3));
      } catch (err) {
        console.error("Explore verified properties fetch error:", err);
        setProperties([]);
      }
    };

    fetchProperties();
  }, [budget, selectedCity, URI]);

  if (!properties.length) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-16 py-8 lg:pt-16">
      <div className="max-w-[1312px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[24px] sm:text-[28px] lg:text-[32px] tracking-[-0.32px] text-[#151C27]">
            Explore Verified Properties
          </h2>
          <Link
            href="/properties"
            className="flex items-center gap-2 font-jakarta font-bold text-[15px] text-[#4500B4] hover:gap-3 transition-all flex-shrink-0"
          >
            View All Listings <ArrowRightIcon />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.propertyid} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
