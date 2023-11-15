import { auth } from "@clerk/nextjs";
import { NoDataPage } from "@root/components/general/no-data";
import { TournamentCard } from "@root/components/user/home/tournament-card";
import { getXataClient } from "@root/xata";

const xata = getXataClient();

export default async function FindTournamentsPage() {
  const { userId } = auth();

  const tournaments = await xata.db.tournaments
    .filter({
      $not: {
        enrollees: { $includes: userId! },
      },
    })
    .getMany();

  if (!tournaments.length) {
    return (
      <NoDataPage message="Oh no! It seems all tournaments have concluded. Fret not, there's sure to be another one coming up soon. Stay tuned!" />
    );
  }

  return (
    <main>
      <h1 className="text-2xl font-bold text-center">
        Find The Best Tournaments
      </h1>
      <p className="text-center mb-6">
        Serve up the excitement! Register now for our tennis tournaments and ace
        your way to victory!
      </p>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tournaments.map((t) => (
          <TournamentCard data={t} key={t.id} />
        ))}
      </section>
    </main>
  );
}
