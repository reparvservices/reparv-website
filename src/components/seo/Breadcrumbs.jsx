import Link from "next/link";
import { buildBreadcrumbListSchema } from "@/lib/seo";

export default function Breadcrumbs({ items = [], className = "" }) {
  if (!items?.length) return null;

  const schema = buildBreadcrumbListSchema(items);

  return (
    <nav aria-label="Breadcrumb" className={className}>
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
      <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.href || ""}-${item.label}`} className="flex items-center gap-1">
              {index > 0 ? (
                <span aria-hidden="true" className="text-gray-400">
                  /
                </span>
              ) : null}
              {!isLast && item.href ? (
                <Link href={item.href} className="hover:text-[#8A38F5]">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-gray-800" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
