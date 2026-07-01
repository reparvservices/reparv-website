import Link from "next/link";

export default function FooterLinkColumn({ title, links, className = "" }) {
  if (!links?.length) return null;

  return (
    <nav
      aria-label={title}
      className={`flex flex-col gap-2 text-sm lg:text-base ${className}`}
    >
      <h3 className="text-base lg:text-lg font-semibold text-white">{title}</h3>
      <ul className="flex flex-col gap-1.5">
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white hover:underline transition-colors"
              >
                {link.title}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-white/90 hover:text-white hover:underline transition-colors"
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
