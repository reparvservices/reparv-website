import Link from "next/link";
import React, { useMemo, useState } from "react";
export default function TrendingNowCard({ news = [] }) {
  const [page, setPage] = useState(0);
  const pageSize = 5;

  // Sort by max views (descending)
  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => (b.views || 0) - (a.views || 0));
  }, [news]);

  // Paginated 5 items
  const paginatedNews = useMemo(() => {
    const start = page * pageSize;
    return sortedNews.slice(start, start + pageSize);
  }, [sortedNews, page]);

  const totalPages = Math.ceil(sortedNews.length / pageSize);

  return (
    <div
      className="
        w-full
        sm:max-w-[400px] md:max-w-[480px]
        bg-white
        border border-[#D9D9D9]
        rounded-[16px]
        px-4 pt-4 pb-2
        mx-auto
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[6px] h-[49px] sm:h-[56px] border-l-6 border-[#8A38F5]" />
          <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-black leading-tight sm:leading-8">
            Trending Now
          </h3>
        </div>

        {/* NAVIGATION */}
        {totalPages > 1 && (
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="px-2 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
              className="px-2 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* LIST */}
      <div>
        {paginatedNews?.map((item, i) => (
          <div key={item?.id || i}>
            <Link href={`/news/${item?.seoSlug}`} className="flex gap-4 py-3">
              {/* NUMBER */}
              <span className="text-[18px] sm:text-[20px] md:text-[24px] font-bold text-[#8A38F5] leading-tight sm:leading-8 w-[14px] sm:w-[18px]">
                {page * pageSize + i + 1}
              </span>

              {/* CONTENT */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-[12px] md:text-[14px] font-bold text-black leading-4 sm:leading-5">
                  {item?.title || "Untitled News"}
                </p>
                <p className="text-[10px] sm:text-[12px] md:text-[14px] text-[#868686] leading-4 sm:leading-5 mt-1">
                  {(item?.views || 0).toLocaleString()} views
                </p>
              </div>
            </Link>

            {/* DIVIDER */}
            {i !== paginatedNews.length - 1 && (
              <div className="h-px bg-[#D9D9D9] w-full" />
            )}
          </div>
        ))}

        {/* Empty State */}
        {paginatedNews.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">
            No trending news available
          </p>
        )}
      </div>
    </div>
  );
}
