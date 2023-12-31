import { LogoLink } from "@root/components/general/logo";
import { HeaderLink as HLink } from "@root/types";
import { HeaderLink } from "@root/components/general/header-link";

const links: HLink[] = [
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
