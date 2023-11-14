import Image from "next/image";
import Link from "next/link";

export function LogoLink() {
  return (
    <Link className="flex place-items-center" href="/">
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={32}
        height={32}
        priority
      />
    </Link>
  );
}
