import { auth } from "@clerk/nextjs";
import { NoDataPage } from "@root/components/general/no-data";
import { TournamentCard } from "@root/components/user/home/tournament-card";
import { ADMIN_EMAIL } from "@root/const";
import { getXataClient } from "@root/xata";
import { redirect } from "next/navigation";

const xata = getXataClient();

export default async function AllTournaments() {
  const { userId, sessionClaims } = auth();

  if (sessionClaims?.primaryEmail !== ADMIN_EMAIL) {
    redirect("/find");
  }

  const tournaments = await xata.db.tournaments.getMany();

  if (!tournaments.length) {
    return (
      <NoDataPage message="Oh no! It seems all tournaments have concluded. Fret not, there's sure to be another one coming up soon. Stay tuned!" />
    );
  }

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tournaments.map((t) => (
          <TournamentCard data={t} key={t.id} edit />
        ))}
      </section>
    </main>
  );
}
