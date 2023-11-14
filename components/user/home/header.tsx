"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LogoLink } from "@root/components/general/logo";

interface Link {
  href: string;
  name: string;
}

const links: Link[] = [
  {
    name: "Get Enroll",
    href: "/find",
  },
  {
    name: "My Tournaments",
    href: "/own",
  },
];

export function UsersHeader() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center">
        <LogoLink />
        {links.map((link) => (
          <li key={link.name}>
            <Link
              className={clsx("px-4 py-2 hover:bg-gray-100 rounded-md", {
                "font-bold text-indigo-500": pathname === link.href,
              })}
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
