// NewsSection.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import PropertyCard from "../property/PropertyCard";

function BlogFeatureProperties() {
  const navigate = useNavigate();
  const { URI, selectedCity } = useAuth();

  const [properties, setProperties] = useState([]);

  // fetch Properties
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/all-properties/${selectedCity}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity]);

  return (
    <div className="w-full flex flex-col">
      {/* Grid Scroll — 1 Column, 3 Rows */}
      <div className="w-full grid place-items-center grid-cols-1 grid-rows-3 gap-6 pb-4 overflow-scroll scrollbar-hide">
        {(properties?.length ? properties.slice(0,6) : []).map((item) => (
         <PropertyCard key={item?.propertyid} property={item} top={true} />
        ))}
      </div>
    </div>
  );
}

export default BlogFeatureProperties;
