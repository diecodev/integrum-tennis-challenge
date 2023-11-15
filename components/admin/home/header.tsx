import { LogoLink } from "@root/components/general/logo";
import { HeaderLink as Hlink } from "@root/types";
import { HeaderLink } from "@root/components/general/header-link";

const links: Hlink[] = [
  {
    name: "Create Tournament",
    href: "/create",
  },
  {
    name: "All Tournaments",
    href: "/all",
  },
];

export function AdminHeader() {
  return (
    <nav>
      <ul className="flex items-center">
        <LogoLink />
        {links.map((link) => (
          <li key={link.name}>
            <HeaderLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
