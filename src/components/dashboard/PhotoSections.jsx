"use client";

import { useEffect, useRef } from "react";
import { IoMdImages } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { imageSectionsFor, maxPhotosFor, ALL_IMAGE_SECTIONS } from "../../utils/propertyListing";

const PURPLE = "#8A38F5";
export const MAX_PHOTO_BYTES = 15 * 1024 * 1024; // before compression
const ALLOWED = /^image\/(jpeg|png|webp)$/;

/** Photos are held per section: { frontView: [{ file, preview }], hallView: [...] } */
export const emptyPhotos = () => ({});
export const photoCount = (photos) => Object.values(photos || {}).reduce((n, list) => n + list.length, 0);

/**
 * Photo sections for a property type (same sections and limits as the partner and admin apps).
 *
 * photos   : { [sectionKey]: [{ file, preview }] }  photos picked now
 * onChange : (nextPhotos) => void
 * saved    : { [sectionKey]: [url] }                photos already stored (edit). New photos are added to them.
 * removed  : { [sectionKey]: [savedIndex] }         stored photos marked for removal (applied when you save)
 * onToggleSaved(sectionKey, savedIndex) marks / unmarks a stored photo.
 */
export default function PhotoSections({ category, photos, onChange, saved = {}, removed = {}, onToggleSaved, disabled = false, error = "", onError }) {
  const latest = useRef(photos);
  latest.current = photos;

  // Free the preview URLs when the form closes
  useEffect(
    () => () => Object.values(latest.current || {}).flat().forEach((p) => URL.revokeObjectURL(p.preview)),
    [],
  );

  if (!category) {
    return <p className="text-sm text-gray-400">Choose a property type first to add photos.</p>;
  }

  const sections = imageSectionsFor(category);
  const listed = new Set(sections.map((s) => s.key));
  const otherSaved = ALL_IMAGE_SECTIONS.filter((s) => !listed.has(s.key) && (saved[s.key] || []).length > 0);

  const add = (key, fileList) => {
    onError?.("");
    const max = maxPhotosFor(key);
    const current = photos[key] || [];
    const valid = [];
    for (const file of fileList) {
      if (!ALLOWED.test(file.type)) {
        onError?.("Only JPG, PNG or WEBP photos are allowed");
        continue;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        onError?.("Each photo must be smaller than 15 MB");
        continue;
      }
      valid.push(file);
    }
    const keptSaved = (saved[key] || []).length - (removed[key] || []).length; // stored photos that stay use up room
    const room = Math.max(max - current.length - Math.max(keptSaved, 0), 0);
    if (valid.length > room) onError?.(`You can add up to ${max} photos in this section`);
    const added = valid.slice(0, room).map((file) => ({ file, preview: URL.createObjectURL(file) }));
    if (added.length) onChange({ ...photos, [key]: [...current, ...added] });
  };

  const remove = (key, index) => {
    const list = photos[key] || [];
    URL.revokeObjectURL(list[index].preview);
    const next = list.filter((_, i) => i !== index);
    const copy = { ...photos };
    if (next.length) copy[key] = next;
    else delete copy[key];
    onChange(copy);
    onError?.("");
  };

  const makeCover = (key, index) => {
    const list = photos[key] || [];
    onChange({ ...photos, [key]: [list[index], ...list.filter((_, i) => i !== index)] });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sections.map(({ key, label, required }) => {
        const files = photos[key] || [];
        const stored = saved[key] || [];
        const gone = removed[key] || [];
        const kept = stored.length - gone.length; // stored photos that stay
        const max = maxPhotosFor(key);
        const missing = error && required && files.length === 0 && kept <= 0;
        return (
          <div
            key={key}
            className={`rounded-xl border bg-white p-4 ${missing ? "border-red-400" : "border-[#E0E0E0]"}`}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-black">
                {label} {required && <span className="text-red-500">*</span>}
              </p>
              <span className="rounded-full bg-[#F7F3FF] px-2 py-0.5 text-[11px] font-medium text-[#5323DC]">
                {`${kept + files.length}/${max}`}
                {gone.length > 0 ? ` · ${gone.length} to remove` : ""}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {stored.map((src, i) => {
                const isGone = gone.includes(i);
                return (
                  <div
                    key={`saved-${i}`}
                    className={`relative aspect-square overflow-hidden rounded-lg border ${isGone ? "border-red-300" : "border-[#D9D9D9]"}`}
                  >
                    <img loading="lazy" decoding="async" src={src} alt={`${label} saved ${i + 1}`} className={`h-full w-full object-cover ${isGone ? "opacity-30" : ""}`} />
                    <span className={`absolute bottom-1 left-1 rounded px-1.5 py-0.5 text-[9px] font-medium text-white ${isGone ? "bg-red-600" : "bg-black/60"}`}>
                      {isGone ? "Will be removed" : "Saved"}
                    </span>
                    {onToggleSaved && (
                      <button
                        type="button"
                        onClick={() => onToggleSaved(key, i)}
                        disabled={disabled}
                        aria-label={isGone ? `Keep ${label} photo ${i + 1}` : `Remove saved ${label} photo ${i + 1}`}
                        title={isGone ? "Keep this photo" : "Remove this photo"}
                        className={`absolute right-1 top-1 rounded-full p-1 text-white shadow ${isGone ? "bg-gray-700 px-1.5 text-[9px] font-semibold" : "bg-red-500"}`}
                      >
                        {isGone ? "Undo" : <RxCross2 size={10} />}
                      </button>
                    )}
                  </div>
                );
              })}

              {files.map((photo, i) => (
                <div
                  key={photo.preview}
                  className={`relative aspect-square overflow-hidden rounded-lg border ${
                    key === "frontView" && i === 0 ? "border-[#8A38F5] ring-2 ring-[#8A38F5]/30" : "border-[#8A38F5]/40"
                  }`}
                >
                  <img loading="lazy" decoding="async" src={photo.preview} alt={`${label} ${i + 1}`} className="h-full w-full object-cover" />
                  {key === "frontView" && i === 0 && kept <= 0 ? (
                    <span className="absolute bottom-1 left-1 rounded bg-[#8A38F5] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                      Cover
                    </span>
                  ) : key === "frontView" ? (
                    <button
                      type="button"
                      onClick={() => makeCover(key, i)}
                      disabled={disabled}
                      className="absolute bottom-1 left-1 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-[#5323DC] shadow"
                    >
                      Make cover
                    </button>
                  ) : (
                    <span className="absolute bottom-1 left-1 rounded bg-[#8A38F5] px-1.5 py-0.5 text-[9px] font-medium text-white">New</span>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(key, i)}
                    disabled={disabled}
                    aria-label={`Remove ${label} photo`}
                    className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white shadow"
                  >
                    <RxCross2 size={10} />
                  </button>
                </div>
              ))}

              {kept + files.length < max && (
                <label
                  onDrop={(e) => {
                    e.preventDefault();
                    if (!disabled) add(key, Array.from(e.dataTransfer.files));
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed bg-white transition hover:bg-[#F7F3FF] ${
                    missing ? "border-red-400" : "border-[#8A38F5]/60"
                  } ${disabled ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
                >
                  <IoMdImages size={20} color={PURPLE} />
                  <span className="text-[10px] font-medium text-gray-500">Add photos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    disabled={disabled}
                    className="hidden"
                    onChange={(e) => {
                      add(key, Array.from(e.target.files || []));
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>

            {gone.length > 0 && (
              <p className="mt-2 text-[11px] text-red-600">
                {gone.length} saved photo{gone.length === 1 ? "" : "s"} will be removed when you save.
              </p>
            )}
          </div>
        );
      })}

      {otherSaved.map(({ key, label }) => (
        <div key={`other-${key}`} className="rounded-xl border border-dashed border-gray-300 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-black">{label}</p>
            <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-500">{saved[key].length} saved</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {saved[key].map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-[#D9D9D9]">
                <img loading="lazy" decoding="async" src={src} alt={`${label} saved ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-gray-400">Saved earlier. Kept as they are.</p>
        </div>
      ))}
    </div>
  );
}
