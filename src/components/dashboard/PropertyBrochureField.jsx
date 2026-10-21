"use client";

import { FaFilePdf, FaFileImage, FaUpload } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { getImageURI } from "../../utils/helper";

const PURPLE = "#8A38F5";
const GRAY = "#868686";

export const BROCHURE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
export const MAX_BROCHURE_BYTES = 20 * 1024 * 1024;

/** Error message for a picked brochure file, or "" when it is fine */
export const brochureFileError = (file) => {
  if (!BROCHURE_TYPES.includes(file?.type)) return "Upload a PDF, JPG, PNG or WEBP file";
  if (file.size > MAX_BROCHURE_BYTES) return "Brochure must be 20 MB or smaller";
  return "";
};

const formatSize = (bytes) =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/**
 * Optional project brochure (PDF or image) for the add / edit listing forms.
 *
 * file          : File picked in this session, or null
 * savedUrl      : already-saved brochureFile (edit form), "" when none/removed
 * onFileChange  : (fileOrNull) => void
 * onRemoveSaved : () => void   (edit form only)
 */
export default function PropertyBrochureField({ file, savedUrl = "", onFileChange, onRemoveSaved, error, setError, disabled }) {
  const pick = (event) => {
    const picked = event.target.files?.[0];
    event.target.value = "";
    if (!picked) return;
    const message = brochureFileError(picked);
    setError(message);
    if (!message) onFileChange(picked);
  };

  const isPdf = file ? file.type === "application/pdf" : /\.pdf$/i.test(savedUrl);
  const Icon = isPdf ? FaFilePdf : FaFileImage;
  const hasBrochure = !!file || !!savedUrl;

  return (
    <div className="mb-8">
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-1 text-black">
        <FaFilePdf color={PURPLE} /> Brochure <span className="text-base text-gray-400 font-normal">(optional)</span>
      </h3>
      <p className="text-sm mb-4" style={{ color: GRAY }}>
        Floor plans, price sheet or project brochure. Buyers can download it, and it is included when the property is shared on WhatsApp.
      </p>

      {hasBrochure ? (
        <div className="flex items-center gap-3 rounded-xl border border-[#D9D9D9] px-4 py-3 max-w-xl">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F6F1FF] text-[#8A38F5]">
            <Icon size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-black">
              {file ? file.name : "Current brochure"}
            </p>
            <p className="text-xs" style={{ color: GRAY }}>
              {file ? `${formatSize(file.size)} · will upload when you submit` : (
                <a href={getImageURI(savedUrl)} target="_blank" rel="noopener noreferrer" className="text-[#5E23DC] hover:underline">
                  View brochure
                </a>
              )}
            </p>
          </div>
          <label className={`shrink-0 text-sm font-semibold text-[#5E23DC] ${disabled ? "pointer-events-none opacity-50" : "cursor-pointer hover:underline"}`}>
            Replace
            <input type="file" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={pick} disabled={disabled} className="hidden" />
          </label>
          <button
            type="button"
            onClick={() => (file ? onFileChange(null) : onRemoveSaved?.())}
            disabled={disabled}
            aria-label="Remove brochure"
            className="shrink-0 rounded-full bg-red-500 p-1 text-white shadow disabled:opacity-50"
          >
            <RxCross2 />
          </button>
        </div>
      ) : (
        <label
          className={`flex max-w-xl items-center gap-3 rounded-xl border-2 border-dashed px-4 py-4 transition ${
            error ? "border-red-400" : "border-[#D9D9D9] hover:border-[#8A38F5]"
          } ${disabled ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F6F1FF] text-[#8A38F5]">
            <FaUpload size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold text-black">Upload brochure</span>
            <span className="block text-xs" style={{ color: GRAY }}>PDF, JPG, PNG or WEBP · up to 20 MB</span>
          </span>
          <input type="file" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={pick} disabled={disabled} className="hidden" />
        </label>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
