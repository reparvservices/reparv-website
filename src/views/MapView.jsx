"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Link from "next/link";
import { useAuth } from "@/store/auth";
import { usePropertyFilter } from "@/store/propertyFilter";
import { getImageURI } from "@/utils/helper";
import { TiLocationOutline } from "react-icons/ti";
import { FaMapMarkerAlt, FaSatellite, FaMap } from "react-icons/fa";
import { IoFilter, IoClose, IoSearchSharp } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";

// ─── Leaflet CSS (injected once, outside component) ───────────────────────────
if (typeof document !== "undefined" && !document.getElementById("leaflet-css")) {
  const link = document.createElement("link");
  link.id   = "leaflet-css";
  link.rel  = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);
}

// ─── Constants (module-level, never re-created) ───────────────────────────────
const FALLBACK_IMG = "/assets/property/propertyPicture.svg";

const RENTAL_CATEGORIES = ["RentalFlat", "RentalOffice", "RentalShop"];

const CATEGORY_OPTIONS = [
  "NewFlat","NewPlot","NewShop","RowHouse","Lease","FarmLand","FarmHouse",
  "CommercialFlat","CommercialPlot","IndustrialSpace","Resale","ResaleFlat",
  "ResaleHouse","ResaleShop","ResaleOffice","ResaleFarmLand","ResaleRowHouse",
  "ResaleGodown","ResaleBunglow","RentalFlat","RentalShop","RentalHouse","RentalOffice",
];

const SORT_OPTIONS = [
  { value: "", label: "Relevance" },
  { value: "latest",     label: "Latest"   },
  { value: "price_low",  label: "Price ↑"  },
  { value: "price_high", label: "Price ↓"  },
  { value: "area_low",   label: "Area ↑"   },
  { value: "area_high",  label: "Area ↓"   },
];

const TILE = {
  street:    { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",  attr: '©️ <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' },
  satellite: { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", attr: '©️ <a href="https://www.esri.com/">Esri</a>' },
  labels:    { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",  attr: "", opacity: 0.4 },
};

const DEFAULT_CENTER = [21.1458, 79.0882];

// ─── Pure helpers (module-level) ──────────────────────────────────────────────
function formatPrice(price, isRental) {
  if (!price) return "N/A";
  if (isRental)       return `₹${Number(price).toLocaleString("en-IN")} ⁠`;
  if (price >= 1e7)   return `₹${(price / 1e7).toFixed(2)} Cr ⁠`;
  if (price >= 1e5)   return `₹${(price / 1e5).toFixed(2)} L ⁠`;
  return `₹${Number(price).toLocaleString("en-IN")} ⁠`;
}

function shortPrice(price) {
  if (!price) return "N/A";
  if (price >= 1e7) return `₹${(price / 1e7).toFixed(1)}Cr ⁠`;
  if (price >= 1e5) return `₹${(price / 1e5).toFixed(1)}L ⁠`;
  return `₹${Number(price).toLocaleString("en-IN")} ⁠`;
}

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371, toR = Math.PI / 180;
  const dLat = (lat2 - lat1) * toR, dLng = (lng2 - lng1) * toR;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * toR) * Math.cos(lat2 * toR) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getPropertyImage(property) {
  try {
    const imgs = JSON.parse(property?.frontView || "[]");
    if (imgs.length > 0) return getImageURI(imgs[0]);
  } catch {}
  return FALLBACK_IMG;
}

function sortProperties(data, sortBy) {
  const arr = [...data];
  switch (sortBy) {
    case "latest":     return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case "price_low":  return arr.sort((a, b) => a.totalOfferPrice - b.totalOfferPrice);
    case "price_high": return arr.sort((a, b) => b.totalOfferPrice - a.totalOfferPrice);
    case "area_low":   return arr.sort((a, b) => a.builtUpArea - b.builtUpArea);
    case "area_high":  return arr.sort((a, b) => b.builtUpArea - a.builtUpArea);
    default: return arr;
  }
}

async function geocodeCity(city) {
  try {
    const res  = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    if (data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch {}
  return null;
}

function buildPopupHTML(property) {
  const isRental = RENTAL_CATEGORIES.includes(property?.propertyCategory?.trim());
  const price    = formatPrice(property?.totalOfferPrice, isRental);
  const oldPrice = formatPrice(property?.totalSalesPrice, isRental);
  const imgSrc   = getPropertyImage(property);
  return `
    <div style="width:240px;font-family:'Segoe UI',sans-serif;border-radius:12px;overflow:hidden;">
      <div style="position:relative;">
        <img src="${imgSrc}" onerror="this.src='${FALLBACK_IMG}'"
          style="width:100%;height:130px;object-fit:cover;display:block;" loading="lazy"/>
        ${property?.hotDeal === "Active" ? `<div style="position:absolute;top:8px;right:8px;background:#dc2626;color:#fff;font-size:10px;font-weight:700;padding:3px 7px;border-radius:6px;">🔥 Hot Deal</div>`: ""}
        ${property?.reparvAssured?.trim() === "Active" ? `<div style="position:absolute;top:8px;left:8px;background:#8A38F5;color:#fff;font-size:9px;font-weight:700;padding:3px 7px;border-radius:6px;">Reparv Assured</div>` : ""}
      </div>
      <div style="padding:10px 12px;background:#fff;">
        <div style="font-size:10px;color:#868686;margin-bottom:4px;">
          📍 ${property?.location || ""}${property?.distanceFromCityCenter ? ` (${property.distanceFromCityCenter}KM)` : ""}
        </div>
        <div style="font-size:13px;font-weight:700;color:#111;margin-bottom:6px;line-height:1.3;">
          ${(property?.propertyName || "Property").slice(0, 40)}${(property?.propertyName?.length || 0) > 40 ? "…" : ""}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <span style="background:#8a38f520;color:#8A38F5;font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;">${property?.propertyCategory || ""}</span>
          <div style="text-align:right;">
            <div style="font-size:10px;color:#868686;text-decoration:line-through;">${oldPrice}</div>
            <div style="font-size:14px;font-weight:800;color:#111;">${price}</div>
          </div>
        </div>
        <a href="/property-info/${property?.seoSlug}"
          style="display:block;text-align:center;background:#8A38F5;color:#fff;font-size:12px;font-weight:700;padding:7px 0;border-radius:8px;text-decoration:none;">
          View Full Details →
        </a>
      </div>
    </div>`;
}

function makePriceIcon(L, price, isSelected) {
  const label = shortPrice(price);
  const bg    = isSelected ? "#6d28d9" : "#8A38F5";
  return L.divIcon({
    className: "",
    html: `<div style="background:${bg};color:#fff;font-family:'Segoe UI',sans-serif;font-size:11px;font-weight:800;padding:4px 8px;border-radius:20px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.28);border:2px solid #fff;transform:translateX(-50%);position:relative;cursor:pointer;">
      ${label}
      <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid ${bg};"></div>
    </div>`,
    iconSize: [80, 34], iconAnchor: [40, 40], popupAnchor: [0, -44],
  });
}

// ─── Sub-components (stable, memo-ized) ───────────────────────────────────────

const BottomDrawerCard = React.memo(function BottomDrawerCard({ property, onClose }) {
  const isRental = RENTAL_CATEGORIES.includes(property?.propertyCategory?.trim());
  const price    = formatPrice(property?.totalOfferPrice, isRental);
  const oldPrice = formatPrice(property?.totalSalesPrice, isRental);
  const imgSrc   = getPropertyImage(property);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[500] bg-white rounded-t-2xl shadow-2xl border-t border-gray-100" style={{ maxHeight: "55vh" }}>
      <div className="flex justify-center pt-2 pb-1"><div className="w-10 h-1 rounded-full bg-gray-300" /></div>
      <div className="flex gap-3 px-4 pb-2 pt-1">
        <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
          <img src={imgSrc} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
            alt={property?.propertyName} className="w-full h-full object-cover" />
          {property?.hotDeal === "Active" && <span className="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">🔥 Hot</span>}
          {property?.reparvAssured?.trim() === "Active" && <span className="absolute bottom-1 left-1 bg-[#8A38F5] text-white text-[7px] font-bold px-1 py-0.5 rounded">✓ Assured</span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
              <TiLocationOutline size={12} />
              <span className="truncate">{property?.location}{property?.distanceFromCityCenter ? ` · ${property.distanceFromCityCenter}km` : ""}</span>
            </div>
            <button onClick={onClose} className="shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500"><IoClose size={13} /></button>
          </div>
          <p className="text-sm font-bold text-gray-900 leading-tight mb-1 line-clamp-2">{property?.propertyName}</p>
          <span className="inline-block bg-[#8a38f515] text-[#8A38F5] text-[9px] font-bold px-2 py-0.5 rounded-full mb-2">{property?.propertyCategory}</span>
          <div>
            <div className="text-[10px] text-gray-400 line-through leading-none">{oldPrice}</div>
            <div className="text-base font-extrabold text-gray-900">{price}</div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-5">
        {/* Next.js Link — href prop, no "to" */}
        <Link href={`/property-info/${property?.seoSlug}`} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#8A38F5] text-white text-sm font-bold">
          View Full Details →
        </Link>
      </div>
    </div>
  );
});

// Compact desktop card — small 56×56 thumbnail, all info beside it
const MapPropertyCard = React.memo(function MapPropertyCard({ property, isSelected, onClick }) {
  const isRental = RENTAL_CATEGORIES.includes(property?.propertyCategory?.trim());
  const price    = formatPrice(property?.totalOfferPrice, isRental);
  const oldPrice = formatPrice(property?.totalSalesPrice, isRental);
  const imgSrc   = getPropertyImage(property);
  return (
    <div
      onClick={onClick}
      className={`flex gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all duration-150 bg-white
        ${isSelected
          ? "border-[#8A38F5] shadow-md ring-1 ring-[#8A38F5] bg-[#faf6ff]"
          : "border-gray-100 hover:border-[#8A38F5] hover:shadow-sm"}`}
    >
      <div className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
        <img src={imgSrc} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
          alt={property?.propertyName} loading="lazy" className="w-full h-full object-cover" />
        {property?.hotDeal === "Active" && (
          <div className="absolute inset-0 flex items-end justify-center pb-0.5">
            <span className="text-[7px] font-bold bg-red-600 text-white px-1 rounded">🔥</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <p className="text-[11px] font-bold text-gray-900 leading-tight truncate">{property?.propertyName || "Property"}</p>
        <div className="flex items-center gap-0.5 text-[9px] text-gray-400 mt-0.5">
          <TiLocationOutline size={10} className="shrink-0" />
          <span className="truncate">{property?.location}{property?.distanceFromCityCenter ? ` · ${property.distanceFromCityCenter}km` : ""}</span>
        </div>
        <div className="flex items-center justify-between mt-1 gap-1">
          <span className="shrink-0 bg-[#8a38f512] text-[#8A38F5] text-[8px] font-bold px-1.5 py-0.5 rounded-full truncate max-w-[80px]">
            {property?.propertyCategory || ""}
          </span>
          <div className="text-right shrink-0">
            {oldPrice !== "N/A" && <div className="text-[8px] text-gray-300 line-through leading-none">{oldPrice}</div>}
            <div className="text-[11px] font-extrabold text-gray-900 leading-tight">{price}</div>
          </div>
        </div>
      </div>
      {isSelected && <div className="shrink-0 self-center w-1.5 h-1.5 rounded-full bg-[#8A38F5]" />}
    </div>
  );
});

const SkeletonCard = React.memo(function SkeletonCard() {
  return (
    <div className="animate-pulse flex gap-2 p-2.5 rounded-xl border border-gray-100">
      <div className="w-14 h-14 bg-gray-200 rounded-lg shrink-0" />
      <div className="flex-1 space-y-1.5 py-1">
        <div className="h-2.5 bg-gray-200 rounded w-4/5" />
        <div className="h-2 bg-gray-200 rounded w-3/5" />
        <div className="h-2.5 bg-gray-200 rounded w-2/5" />
      </div>
    </div>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MapView() {
  const { URI, selectedCity, propertyType, setPropertyType } = useAuth();
  const { selectedBHKType, setSelectedBHKType, minBudget, maxBudget } = usePropertyFilter();

  // ── UI state ───────────────────────────────────────────────────────────────
  const [properties,       setProperties]      = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [searchTerm,       setSearchTerm]       = useState("");
  const [sortBy,           setSortBy]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState(propertyType || "");
  const [selectedBHK,      setSelectedBHK]      = useState(selectedBHKType || "");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters,      setShowFilters]      = useState(false);
  const [mapReady,         setMapReady]         = useState(false);
  const [listVisible,      setListVisible]      = useState(true);
  const [isSatellite,      setIsSatellite]      = useState(false);
  const [isMobile,         setIsMobile]         = useState(() =>
    // Safe SSR guard — window is undefined on server in Next.js
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  const [kmRange, setKmRange] = useState(50);

  // ── Refs — map state that must NEVER trigger React re-renders ────────────
  const mapRef        = useRef(null);
  const mapElRef      = useRef(null);
  const leafletRef    = useRef(null);
  const markersRef    = useRef([]);
  const tileRef       = useRef(null);
  const labelRef      = useRef(null);
  const circleRef     = useRef(null);
  const mapCenterRef  = useRef(DEFAULT_CENTER);
  const cityCoordRef  = useRef(null);

  // ── Mobile detection (resize only) ────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Fetch properties ───────────────────────────────────────────────────────
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCity?.trim())    params.set("city", selectedCity.trim());
      if (selectedCategory.trim()) params.set("propertyCategory", selectedCategory.trim());
      if (selectedBHK.trim())      params.set("propertyType", selectedBHK.trim());
      const res  = await fetch(`${URI}/frontend/properties/get-all-by-slug?${params}`, {
        method: "GET", credentials: "include", headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("MapView fetch:", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [URI, selectedCity, selectedCategory, selectedBHK]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  // ── Derived lists (memoized) ───────────────────────────────────────────────
  const filteredProperties = useMemo(() => {
    const term   = searchTerm.toLowerCase().trim();
    const center = cityCoordRef.current || mapCenterRef.current;
    const out = properties.filter((p) => {
      if (term) {
        const hit =
          p?.propertyName?.toLowerCase().includes(term) ||
          p?.city?.toLowerCase().includes(term) ||
          p?.location?.toLowerCase().includes(term) ||
          p?.address?.toLowerCase().includes(term) ||
          p?.propertyCategory?.toLowerCase().includes(term);
        if (!hit) return false;
      }
      if (maxBudget && !(p.totalOfferPrice >= minBudget && p.totalOfferPrice <= maxBudget)) return false;
      if (p.latitude && p.longitude) {
        if (haversine(center[0], center[1], parseFloat(p.latitude), parseFloat(p.longitude)) > kmRange) return false;
      }
      return true;
    });
    return sortProperties(out, sortBy);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, searchTerm, sortBy, minBudget, maxBudget, kmRange]);

  const mappableProperties = useMemo(
    () => filteredProperties.filter((p) => p.latitude && p.longitude),
    [filteredProperties]
  );

  // ── Safe flyTo ─────────────────────────────────────────────────────────────
  const safeFlyTo = (map, latlng, zoom, opts) => {
    try {
      const sz = map.getSize();
      if (sz && sz.x > 0 && sz.y > 0) map.flyTo(latlng, zoom, opts || {});
      else map.setView(latlng, zoom);
    } catch { try { map.setView(latlng, zoom); } catch {} }
  };

  // ── Init Leaflet (runs once, client-only) ──────────────────────────────────
  useEffect(() => {
    const boot = (L) => {
      leafletRef.current = L;
      if (!mapElRef.current || mapRef.current) return;

      const map = L.map(mapElRef.current, { center: DEFAULT_CENTER, zoom: 12, zoomControl: false });
      L.control.zoom({ position: "bottomright" }).addTo(map);
      tileRef.current = L.tileLayer(TILE.street.url, { attribution: TILE.street.attr, maxZoom: 19 }).addTo(map);

      map.on("moveend", () => {
        const c = map.getCenter();
        mapCenterRef.current = [c.lat, c.lng];
      });

      mapRef.current = map;
      setTimeout(() => { map.invalidateSize(); setMapReady(true); }, 50);
    };

    if (window.L) { boot(window.L); return; }
    const s  = document.createElement("script");
    s.src    = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.onload = () => boot(window.L);
    document.head.appendChild(s);
  }, []);

  // ── Satellite toggle ───────────────────────────────────────────────────────
  useEffect(() => {
    const L   = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map || !mapReady) return;
    if (tileRef.current)  { map.removeLayer(tileRef.current);  tileRef.current  = null; }
    if (labelRef.current) { map.removeLayer(labelRef.current); labelRef.current = null; }
    if (isSatellite) {
      tileRef.current  = L.tileLayer(TILE.satellite.url, { attribution: TILE.satellite.attr, maxZoom: 19 }).addTo(map);
      labelRef.current = L.tileLayer(TILE.labels.url,    { attribution: "", maxZoom: 19, opacity: TILE.labels.opacity }).addTo(map);
    } else {
      tileRef.current = L.tileLayer(TILE.street.url, { attribution: TILE.street.attr, maxZoom: 19 }).addTo(map);
    }
  }, [isSatellite, mapReady]);

  // ── Geocode city ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedCity?.trim()) return;
    geocodeCity(selectedCity).then((coords) => {
      if (!coords) return;
      cityCoordRef.current = coords;
      mapCenterRef.current = coords;
      const map = mapRef.current;
      if (map) safeFlyTo(map, coords, 12, { duration: 1.2 });
    });
  }, [selectedCity]); // eslint-disable-line

  // ── Markers ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const L   = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map || !mapReady) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (circleRef.current) { circleRef.current.remove(); circleRef.current = null; }

    const center = cityCoordRef.current || mapCenterRef.current;

    const draw = () => {
      try {
        circleRef.current = L.circle(center, {
          radius: kmRange * 1000, color: "#8A38F5", weight: 1.5,
          opacity: 0.5, fillColor: "#8A38F5", fillOpacity: 0.05, dashArray: "6 4",
        }).addTo(map);
      } catch {}

      if (!mappableProperties.length) return;

      const bounds = [];
      mappableProperties.forEach((prop) => {
        const lat = parseFloat(prop.latitude);
        const lng = parseFloat(prop.longitude);
        if (isNaN(lat) || isNaN(lng)) return;

        const isSel = selectedProperty?._id === prop._id;
        const icon  = makePriceIcon(L, prop?.totalOfferPrice, isSel);
        const m     = L.marker([lat, lng], { icon }).addTo(map);

        if (isMobile) {
          m.on("click", () => {
            setSelectedProperty(prop);
            safeFlyTo(map, [lat, lng], 15, { duration: 0.6 });
          });
        } else {
          m.bindPopup(buildPopupHTML(prop), { maxWidth: 260, className: "reparv-popup" });
          m.on("click", () => setSelectedProperty(prop));
        }
        markersRef.current.push(m);
        bounds.push([lat, lng]);
      });

      if (selectedProperty) {
        const lat = parseFloat(selectedProperty.latitude);
        const lng = parseFloat(selectedProperty.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          safeFlyTo(map, [lat, lng], 15, { duration: 0.8 });
          if (!isMobile) {
            const found = markersRef.current.find((mk) => {
              const ll = mk.getLatLng();
              return Math.abs(ll.lat - lat) < 0.0001 && Math.abs(ll.lng - lng) < 0.0001;
            });
            found?.openPopup();
          }
        }
      } else if (bounds.length) {
        try { map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 }); } catch {}
      }
    };

    if (map._loaded) draw(); else map.whenReady(draw);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappableProperties, selectedProperty, mapReady, isMobile, kmRange]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const clearFilters = useCallback(() => {
    setSelectedCategory(""); setSelectedBHK(""); setSortBy("");
    setSearchTerm(""); setPropertyType(""); setSelectedBHKType("");
    setSelectedProperty(null); setKmRange(50);
  }, [setPropertyType, setSelectedBHKType]);

  const recenter = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    try {
      if (mappableProperties.length) {
        map.fitBounds(
          mappableProperties.map((p) => [parseFloat(p.latitude), parseFloat(p.longitude)]),
          { padding: [40, 40] }
        );
      } else if (cityCoordRef.current) {
        map.setView(cityCoordRef.current, 12);
      }
    } catch {}
  }, [mappableProperties]);

  const handleCategoryClick = useCallback((cat) => {
    const next = selectedCategory === cat ? "" : cat;
    setSelectedCategory(next);
    setPropertyType(next);
  }, [selectedCategory, setPropertyType]);

  const handleCardClick = useCallback((property) => {
    setSelectedProperty((prev) => prev?._id === property._id ? null : property);
  }, []);

  const handleMobileCardClick = useCallback((property) => {
    const next = selectedProperty?._id === property._id ? null : property;
    setSelectedProperty(next);
    if (next?.latitude && next?.longitude) {
      safeFlyTo(mapRef.current, [parseFloat(next.latitude), parseFloat(next.longitude)], 15, { duration: 0.8 });
    }
  }, [selectedProperty]); // eslint-disable-line

  const activeFilterCount = useMemo(
    () => [selectedCategory, selectedBHK].filter(Boolean).length,
    [selectedCategory, selectedBHK]
  );

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full flex flex-col overflow-hidden bg-[#f8f3fb] min-h-[80vh]">

      {/* ── FILTER BAR ──────────────────────────────────────────────────── */}
      <div className="shrink-0 z-[10] bg-white border-b border-gray-200 shadow-sm">

        {/* Row 1 */}
        <div className="flex items-center gap-2 px-3 py-2 sm:px-4">
          <div className="flex-1 flex items-center gap-2 bg-[#f8f3fb] border border-gray-200 rounded-xl px-3 py-2">
            <IoSearchSharp className="text-[#8A38F5] shrink-0" size={16} />
            <input
              type="text"
              placeholder="Search property, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-600">
                <IoClose size={14} />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="hidden sm:block text-sm border border-gray-200 bg-[#f8f3fb] rounded-xl px-3 py-2 outline-none text-gray-700 font-medium cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border transition-all
              ${showFilters || activeFilterCount > 0 ? "bg-[#8A38F5] text-white border-[#8A38F5]" : "bg-white text-gray-700 border-gray-200 hover:border-[#8A38F5]"}`}
          >
            <IoFilter size={15} />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setListVisible((v) => !v)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-700 hover:border-[#8A38F5] transition-all"
          >
            {listVisible ? "Hide List" : "Show List"}
          </button>
        </div>

        {/* Row 2: Category chips */}
        <div className={`flex items-center gap-2 px-3 pb-2 overflow-x-auto scrollbar-hide sm:px-4 ${showFilters ? "flex-wrap" : ""}`}>
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border transition-all
                ${selectedCategory === cat ? "bg-[#8A38F5] text-white border-[#8A38F5]" : "bg-white text-gray-600 border-gray-200 hover:border-[#8A38F5] hover:text-[#8A38F5]"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Row 3: KM radius */}
        <div className="flex items-center gap-3 px-3 pb-2.5 sm:px-4">
          <span className="text-xs text-gray-500 font-medium shrink-0">Radius:</span>
          <input
            type="range" min={1} max={200} step={1} value={kmRange}
            onChange={(e) => setKmRange(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full accent-[#8A38F5] cursor-pointer"
          />
          <span className="text-xs font-bold text-[#8A38F5] shrink-0 w-14 text-right">{kmRange} km</span>
          <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-gray-600 font-medium shrink-0">Reset</button>
        </div>
      </div>

      {/* ── BODY ────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col sm:flex-row overflow-hidden">

        {/* Map */}
        <div className="relative overflow-hidden w-full h-[70vh] sm:h-auto sm:flex-1">
          <div ref={mapElRef} style={{ position: "absolute", inset: 0, zIndex: 1 }} />

          {loading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-[#8A38F5] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-semibold text-[#8A38F5]">Loading properties…</p>
              </div>
            </div>
          )}

          {/* Stats pill */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1.5 shadow-sm flex items-center gap-2 z-10">
            <FaMapMarkerAlt className="text-[#8A38F5]" size={11} />
            <span className="text-xs font-semibold text-gray-700">{mappableProperties.length} on map</span>
            {selectedCity && <><span className="text-gray-300">·</span><span className="text-xs text-gray-500">{selectedCity}</span></>}
          </div>

          {/* Satellite toggle */}
          <button
            onClick={() => setIsSatellite((v) => !v)}
            title={isSatellite ? "Street View" : "Satellite View"}
            className={`absolute top-3 right-3 w-10 h-10 rounded-xl border shadow-md flex items-center justify-center transition-all z-10
              ${isSatellite ? "bg-[#8A38F5] border-[#8A38F5] text-white" : "bg-white border-gray-200 text-gray-600 hover:border-[#8A38F5]"}`}
          >
            {isSatellite ? <FaMap size={16} /> : <FaSatellite size={16} />}
          </button>

          {/* Recenter */}
          <button
            onClick={recenter}
            title="Fit all markers"
            className="absolute bottom-25 right-2 w-10 h-10 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center hover:border-[#8A38F5] transition-all z-10"
          >
            <MdMyLocation size={18} className="text-gray-600" />
          </button>
        </div>

        {/* ── DESKTOP SIDEBAR ──────────────────────────────────────────────── */}
        {!isMobile && listVisible && (
          <div className="flex flex-col w-72 shrink-0 bg-white border-l border-gray-100 overflow-hidden" style={{ maxHeight: "70vh" }}>
            <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {loading ? "Loading…" : `${filteredProperties.length} Properties`}
                </p>
                <p className="text-[10px] text-gray-400">{mappableProperties.length} shown on map</p>
              </div>
              {selectedProperty && (
                <button onClick={() => setSelectedProperty(null)} className="text-[10px] text-[#8A38F5] font-semibold hover:underline">
                  Clear
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-2 py-2 space-y-1.5">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : filteredProperties.length === 0
                ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                    <FaMapMarkerAlt size={28} className="mb-2 text-gray-200" />
                    <p className="text-xs font-semibold">No properties found</p>
                    <p className="text-[10px] mt-0.5">Try adjusting filters or radius</p>
                  </div>
                )
                : filteredProperties.map((property) => (
                  <MapPropertyCard
                    key={property._id || property.seoSlug}
                    property={property}
                    isSelected={selectedProperty?._id === property._id}
                    onClick={() => handleCardClick(property)}
                  />
                ))
              }
            </div>

            {selectedProperty && (
              <div className="px-2.5 py-2.5 border-t border-gray-100 bg-white">
                {/* Next.js Link */}
                <Link
                  href={`/property-info/${selectedProperty.seoSlug}`}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#8A38F5] text-white text-xs font-bold hover:bg-purple-700 transition-all"
                >
                  View Full Details →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── MOBILE LIST ──────────────────────────────────────────────────── */}
      {isMobile && (
        <div className="hidden bg-white overflow-y-auto shrink-0" style={{ maxHeight: "40vh" }}>
          <div className="sticky top-0 bg-white px-4 py-2.5 border-b border-gray-100 flex items-center justify-between z-20">
            <div>
              <p className="text-sm font-bold text-gray-900">
                {loading ? "Loading…" : `${filteredProperties.length} Properties`}
              </p>
              <p className="text-[10px] text-gray-400">{mappableProperties.length} on map</p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none font-semibold"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className="px-3 py-2 space-y-2 pb-6">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : filteredProperties.length === 0
              ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                  <FaMapMarkerAlt size={28} className="mb-2 text-gray-200" />
                  <p className="text-xs font-semibold">No properties found</p>
                </div>
              )
              : filteredProperties.map((property) => (
                <MapPropertyCard
                  key={property._id || property.seoSlug}
                  property={property}
                  isSelected={selectedProperty?._id === property._id}
                  onClick={() => handleMobileCardClick(property)}
                />
              ))
            }
          </div>
        </div>
      )}

      {/* Mobile bottom drawer */}
      {isMobile && selectedProperty && (
        <BottomDrawerCard property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}

      <style>{`
        .reparv-popup .leaflet-popup-content-wrapper { padding:0;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.18);border:none; }
        .reparv-popup .leaflet-popup-content { margin:0;width:auto !important; }
        .reparv-popup .leaflet-popup-tip-container { display:none; }
        .reparv-popup .leaflet-popup-close-button { top:8px !important;right:8px !important;background:rgba(0,0,0,0.45) !important;color:white !important;border-radius:50% !important;width:22px !important;height:22px !important;line-height:22px !important;font-size:14px !important;text-align:center !important;padding:0 !important; }
        .leaflet-control-zoom { z-index:10 !important; }
        .leaflet-control-attribution { z-index:10 !important; }
        .scrollbar-hide::-webkit-scrollbar { display:none; }
        .scrollbar-hide { -ms-overflow-style:none;scrollbar-width:none; }
      `}</style>
    </div>
  );
}