import Link from "next/link";

export default function FooterMobileSection({ title, links }) {
  if (!links?.length) return null;

  return (
    <section>
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <ul className="flex flex-col gap-1.5 text-xs text-white/90">
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-white"
              >
                {link.title}
              </a>
            ) : (
              <Link href={link.href} className="hover:underline hover:text-white">
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
