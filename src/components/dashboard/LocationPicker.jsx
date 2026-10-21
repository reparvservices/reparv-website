"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { MdMyLocation } from "react-icons/md";
import "../../lib/fixLeafletIcon";

// Same tiles and default centre as the Map View page
const TILE = {
  url: "https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  attr: "© Google Maps",
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
};
const DEFAULT_CENTER = [21.1458, 79.0882];

function ClickToPlace({ onPick }) {
  useMapEvents({
    click: (e) => onPick(e.latlng.lat, e.latlng.lng),
  });
  return null;
}

function FlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, Math.max(map.getZoom(), 16), { duration: 0.6 });
  }, [map, position]);
  return null;
}

/**
 * Map pin for a listing. Click the map, drag the pin, or use the current
 * location. value: { latitude, longitude } (strings or numbers, may be empty).
 */
export default function LocationPicker({ latitude, longitude, onChange }) {
  const hasPin = latitude !== "" && longitude !== "" && latitude != null && longitude != null;
  const position = hasPin ? [Number(latitude), Number(longitude)] : null;
  const [flyTarget, setFlyTarget] = useState(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  const pick = (lat, lng) => {
    setGeoError("");
    onChange(lat.toFixed(7), lng.toFixed(7));
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Your browser doesn't support location access");
      return;
    }
    setLocating(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        pick(pos.coords.latitude, pos.coords.longitude);
        setFlyTarget([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setLocating(false);
        setGeoError("Couldn't get your location. Allow location access or tap the map instead.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <p className="text-xs text-[#868686]">
          {hasPin
            ? "Drag the pin or tap the map to adjust it."
            : "Tap the map to drop a pin at the property's location."}
        </p>
        <div className="flex items-center gap-2">
          {hasPin && (
            <button
              type="button"
              onClick={() => onChange("", "")}
              className="text-xs font-semibold text-gray-500 hover:text-gray-800"
            >
              Remove pin
            </button>
          )}
          <button
            type="button"
            onClick={useCurrentLocation}
            disabled={locating}
            className="flex items-center gap-1.5 rounded-lg border border-[#8A38F5] px-3 py-1.5 text-xs font-semibold text-[#8A38F5] hover:bg-[#F7F3FF] disabled:opacity-60"
          >
            <MdMyLocation size={14} />
            {locating ? "Locating..." : "Use my current location"}
          </button>
        </div>
      </div>

      <div className="h-[260px] sm:h-[300px] rounded-xl overflow-hidden border border-[#E0E0E0] relative z-0">
        <MapContainer
          center={position || DEFAULT_CENTER}
          zoom={position ? 16 : 12}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer url={TILE.url} attribution={TILE.attr} subdomains={TILE.subdomains} maxZoom={20} />
          <ClickToPlace onPick={pick} />
          <FlyTo position={flyTarget} />
          {position && (
            <Marker
              position={position}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  pick(lat, lng);
                },
              }}
            />
          )}
        </MapContainer>
      </div>

      {geoError && <p className="text-xs text-red-500 mt-1">{geoError}</p>}
      {hasPin && (
        <p className="text-[11px] text-gray-400 mt-1">
          {Number(latitude).toFixed(5)}, {Number(longitude).toFixed(5)}
        </p>
      )}
    </div>
  );
}
