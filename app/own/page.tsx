import { auth } from "@clerk/nextjs";
import { NoDataPage } from "@root/components/general/no-data";
import { TournamentCard } from "@root/components/user/home/tournament-card";
import { getXataClient } from "@root/xata";

const xata = getXataClient();

export default async function OwnPage() {
  const { userId } = auth();

  const tournaments =
    (await xata.db.tournaments
      .filter({
        enrollees: {
          $includes: userId!,
        },
      })
      .getMany()) ?? [];

  if (!tournaments.length) {
    return (
      <NoDataPage message="No tournaments registered yet? No worries! Stay tuned for the next opportunity. 🎾" />
    );
  }

  return (
    <main>
      <h1 className="text-2xl font-bold text-center mb-6">Your Tournaments</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tournaments.map((t) => (
          <TournamentCard data={t} key={t.id} />
        ))}
      </section>
    </main>
  );
}
