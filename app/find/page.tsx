import { auth } from "@clerk/nextjs";
import { TournamentCard } from "@root/components/user/home/tournament-card";
import { getXataClient } from "@root/xata";

const xata = getXataClient();

export default async function FindTournamentsPage() {
  const { sessionClaims } = auth();

  // is the user is admin, then redirect to admin panel

  const tournaments = await xata.db.tournaments.getMany();

  return (
    <main>
      <h1>Tennis League</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tournaments.map((t) => (
          <TournamentCard data={t} key={t.id} />
        ))}
      </section>
    </main>
  );
}
