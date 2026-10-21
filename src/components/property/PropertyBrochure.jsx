"use client";

import { FaFilePdf, FaFileImage, FaDownload } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { getImageURI } from "../../utils/helper";
import { usePropertyLock } from "./PropertyLock";

/** Project brochure download card. Locked like the other details. */
export default function PropertyBrochure({ propertyInfo }) {
  const { locked, unlock } = usePropertyLock();
  const file = propertyInfo?.brochureFile;
  if (!file) return null;

  const url = getImageURI(file);
  const isPdf = /\.pdf(?:$|\?)/i.test(file);
  const Icon = isPdf ? FaFilePdf : FaFileImage;

  return (
    <section className="bg-white rounded-xl p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F6F1FF] text-[#8A38F5]">
            <Icon size={26} />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold">Project Brochure</h2>
            <p className="text-sm text-[#868686]">
              Floor plans, specifications and price details of {propertyInfo?.propertyName || "this property"}
              {isPdf ? " (PDF)" : ""}
            </p>
          </div>
        </div>

        {locked ? (
          <button
            type="button"
            onClick={unlock}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#8A38F5]/30 px-5 py-2.5 text-sm font-semibold text-[#5E23DC] transition hover:bg-[#F6F1FF]"
          >
            <FiLock size={14} /> Book a site visit to download
          </button>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#8A38F5] px-5 py-2.5 text-sm font-semibold text-white shadow-[0px_7px_13px_0px_#8A38F540] transition hover:bg-[#7a2ee6]"
          >
            <FaDownload size={14} /> Download Brochure
          </a>
        )}
      </div>
    </section>
  );
}
