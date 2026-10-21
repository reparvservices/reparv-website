import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose, IoFilter, IoSearchSharp } from "react-icons/io5";
import { MdFormatListBulleted } from "react-icons/md";

import {
  BHK_OPTIONS,
  RADIUS_OPTIONS,
  SEGMENTS,
  SORT_OPTIONS,
  activeFilterPills,
  budgetOptionsFor,
  prettyCategory,
} from "./mapFilters";

function Chip({ active, onClick, children, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-[#8A38F5] bg-[#8A38F5] text-white"
          : "border-gray-200 bg-white text-gray-700 hover:border-[#8A38F5] hover:text-[#8A38F5]"
      }`}
    >
      {children}
      {count != null && (
        <span className={active ? "text-white/80" : "text-gray-400"}>{count}</span>
      )}
    </button>
  );
}

function Section({ title, children, hint }) {
  return (
    <div className="py-3">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">{title}</p>
      {hint ? <p className="text-xs text-gray-400">{hint}</p> : <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

const VISIBLE_TYPES = 8;

function FilterPanel({ filters, set, categories, bhk, resultCount, onReset, onClose }) {
  const [showAllTypes, setShowAllTypes] = useState(false);
  const budgets = budgetOptionsFor(filters.segment);
  // Always keep the selected type visible, even when it is outside the top 8.
  const visibleTypes =
    showAllTypes || categories.length <= VISIBLE_TYPES
      ? categories
      : categories.filter(([c], i) => i < VISIBLE_TYPES || c === filters.category);
  const hiddenTypes = categories.length - visibleTypes.length;
  const showBhk = filters.segment !== "plot" && filters.segment !== "commercial";
  const toggle = (key, value) => set({ [key]: filters[key] === value ? "" : value });

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <p className="text-sm font-bold text-gray-900">Filters</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
        >
          <IoClose size={16} />
        </button>
      </div>

      <div className="max-h-[60vh] divide-y divide-gray-100 overflow-y-auto px-4">
        {categories.length > 1 && (
          <Section title="Property type">
            {visibleTypes.map(([value, count]) => (
              <Chip
                key={value}
                active={filters.category === value}
                count={count}
                onClick={() => toggle("category", value)}
              >
                {prettyCategory(value)}
              </Chip>
            ))}
            {(hiddenTypes > 0 || showAllTypes) && categories.length > VISIBLE_TYPES && (
              <button
                type="button"
                onClick={() => setShowAllTypes((v) => !v)}
                className="px-1 text-xs font-semibold text-[#8A38F5] hover:underline"
              >
                {showAllTypes ? "Show less" : `+${hiddenTypes} more`}
              </button>
            )}
          </Section>
        )}

        {showBhk && Object.keys(bhk).length > 0 && (
          <Section title="BHK">
            {BHK_OPTIONS.filter((o) => bhk[o.value] || filters.bhk === o.value).map((o) => (
              <Chip key={o.value} active={filters.bhk === o.value} onClick={() => toggle("bhk", o.value)}>
                {o.label}
              </Chip>
            ))}
          </Section>
        )}

        <Section
          title={filters.segment === "rent" ? "Monthly rent" : "Budget"}
          hint={budgets.length ? null : "Choose a tab above (e.g. Flats or Rent) to filter by budget."}
        >
          {budgets.map((b) => (
            <Chip key={b.value} active={filters.budget === b.value} onClick={() => toggle("budget", b.value)}>
              {b.label}
            </Chip>
          ))}
        </Section>

        <Section title="Distance from city centre">
          {RADIUS_OPTIONS.map((r) => (
            <Chip key={r.value} active={filters.radius === r.value} onClick={() => set({ radius: r.value })}>
              {r.label}
            </Chip>
          ))}
        </Section>
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl bg-[#8A38F5] py-2.5 text-sm font-semibold text-white hover:bg-[#7a2ee0]"
        >
          Show {resultCount} {resultCount === 1 ? "property" : "properties"}
        </button>
      </div>
    </>
  );
}

export default function MapFilterBar({
  filters,
  onChange,
  onReset,
  categories,
  bhk,
  resultCount,
  listVisible,
  onToggleList,
  showListToggle,
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const sheetRef = useRef(null);
  const pills = activeFilterPills(filters);
  const set = (patch) => onChange({ ...filters, ...patch });

  // Close the desktop popover on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const inside = [panelRef, sheetRef].some((r) => r.current?.contains(e.target));
      if (!inside) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const changeSegment = (segment) =>
    // Category and budget presets depend on the segment, so reset them.
    onChange({ ...filters, segment, category: "", budget: "", bhk: segment === "plot" || segment === "commercial" ? "" : filters.bhk });

  const panel = (
    <FilterPanel
      filters={filters}
      set={set}
      categories={categories}
      bhk={bhk}
      resultCount={resultCount}
      onReset={onReset}
      onClose={() => setOpen(false)}
    />
  );

  return (
    <div className="relative z-[20] shrink-0 border-b border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2.5 sm:flex-nowrap sm:px-4">
        {/* Search */}
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-[#8A38F5] focus-within:bg-white">
          <IoSearchSharp className="shrink-0 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by name or locality"
            value={filters.search}
            onChange={(e) => set({ search: e.target.value })}
            className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
          {filters.search && (
            <button type="button" onClick={() => set({ search: "" })} aria-label="Clear search" className="text-gray-400 hover:text-gray-600">
              <IoClose size={14} />
            </button>
          )}
        </div>

        {/* Segments (desktop inline) */}
        <div className="order-last flex w-full gap-1 overflow-x-auto rounded-xl bg-gray-100 p-1 scrollbar-hide sm:order-none sm:w-auto">
          {SEGMENTS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => changeSegment(s.value)}
              aria-pressed={filters.segment === s.value}
              className={`shrink-0 grow rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors sm:grow-0 sm:px-3 sm:text-sm ${
                filters.segment === s.value ? "bg-white text-[#8A38F5] shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div ref={panelRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
              open || pills.length
                ? "border-[#8A38F5] bg-[#8A38F5]/10 text-[#8A38F5]"
                : "border-gray-200 bg-white text-gray-700 hover:border-[#8A38F5]"
            }`}
          >
            <IoFilter size={15} />
            <span>Filters</span>
            {pills.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8A38F5] px-1 text-[10px] font-bold text-white">
                {pills.length}
              </span>
            )}
          </button>

          {/* Desktop popover */}
          {open && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-[1000] hidden w-[380px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.14)] sm:block">
              {panel}
            </div>
          )}
        </div>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => set({ sort: e.target.value })}
          aria-label="Sort properties"
          className="hidden cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none hover:border-[#8A38F5] sm:block"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {showListToggle && (
          <button
            type="button"
            onClick={onToggleList}
            aria-pressed={listVisible}
            title={listVisible ? "Hide list" : "Show list"}
            className={`hidden h-[38px] w-[38px] items-center justify-center rounded-xl border transition-colors sm:flex ${
              listVisible ? "border-[#8A38F5] text-[#8A38F5]" : "border-gray-200 text-gray-600 hover:border-[#8A38F5]"
            }`}
          >
            <MdFormatListBulleted size={18} />
          </button>
        )}
      </div>

      {/* Active filters */}
      {pills.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto px-3 pb-2.5 scrollbar-hide sm:px-4">
          {pills.map((p) => (
            <span
              key={p.key}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#8A38F5]/10 py-1 pl-3 pr-1.5 text-xs font-medium text-[#8A38F5]"
            >
              {p.label}
              <button
                type="button"
                onClick={() => set({ [p.key]: p.key === "radius" ? 0 : "" })}
                aria-label={`Remove ${p.label}`}
                className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#8A38F5]/20"
              >
                <IoClose size={12} />
              </button>
            </span>
          ))}
          <button type="button" onClick={onReset} className="shrink-0 text-xs font-medium text-gray-500 hover:text-gray-800">
            Clear all
          </button>
        </div>
      )}

      {/* Mobile bottom sheet — portalled so it sits above the site's bottom nav */}
      {open && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[1100] sm:hidden">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div ref={sheetRef} className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
              <span className="text-xs font-semibold text-gray-500">Sort</span>
              <select
                value={filters.sort}
                onChange={(e) => set({ sort: e.target.value })}
                className="flex-1 rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            {panel}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
