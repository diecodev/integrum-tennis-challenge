import { UserButton, auth } from "@clerk/nextjs";
import { ADMIN_EMAIL } from "@root/const";
import { UsersHeader } from "../user/home/header";

export function HeaderWrapper() {
  const { sessionClaims } = auth();

  const isAdmin = sessionClaims?.primaryEmail === ADMIN_EMAIL;

  return (
    <header className="flex sticky top-0 left-0 bg-white z-10 items-center justify-between lg:px-32 md:px-8 p-4 text-sm font-medium">
      {isAdmin ? null : <UsersHeader />}
      <UserButton afterSignOutUrl="/" showName />
    </header>
  );
}
