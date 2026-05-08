"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Next.js replacement for react-router-dom NavLink.
 * Supports `to` or `href`, `className` as string or ({ isActive }) => string,
 * and `children` as a node or ({ isActive }) => node.
 */
export default function NavLink({
  to,
  href,
  className,
  children,
  ...rest
}) {
  const path = href ?? to ?? "/";
  const pathname = usePathname();
  const isActive =
    pathname === path ||
    (path !== "/" && path.length > 0 && pathname.startsWith(`${path}/`));

  const resolvedClass =
    typeof className === "function" ? className({ isActive }) : className;

  const content =
    typeof children === "function" ? children({ isActive }) : children;

  return (
    <Link href={path} className={resolvedClass} {...rest}>
      {content}
    </Link>
  );
}
