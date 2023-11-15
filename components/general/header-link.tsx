"use client";

import { HeaderLink } from "@root/types";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderLink({ link }: { link: HeaderLink }) {
  const pathname = usePathname();

  return (
    <Link
      className={clsx("px-4 py-2 hover:bg-gray-100 rounded-md", {
        "font-bold text-indigo-500": pathname === link.href,
      })}
      href={link.href}
    >
      {link.name}
    </Link>
  );
}
