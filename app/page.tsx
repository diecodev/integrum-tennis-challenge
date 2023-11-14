import { auth } from "@clerk/nextjs";
import { ADMIN_EMAIL } from "@root/const";
import { redirect } from "next/navigation";

export default function Home() {
  const { sessionClaims } = auth();

  if (sessionClaims?.primaryEmail !== ADMIN_EMAIL) {
    redirect("/find");
  }

  return (
    <main>
      <h1>Tennis League</h1>
    </main>
  );
}
