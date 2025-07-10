"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import css from "./index.module.css";

export default function NavLink({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) {
  const path = usePathname();

  const isActive = path.startsWith(href);

  return (
    <Link
      href={href}
      className={isActive ? `${css.active} ${css.link}` : css.link}
    >
      {children}
    </Link>
  );
}
