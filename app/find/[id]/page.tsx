import { auth } from "@clerk/nextjs";
import { TournamentCard } from "@root/components/user/home/tournament-card";
import { USD } from "@root/utils";
import { getXataClient } from "@root/xata";
import Image from "next/image";
import { redirect } from "next/navigation";

const xata = getXataClient();

export default async function FindTournamentsPage({
  params,
}: {
  params: { id: string };
}) {
  const tour = await xata.db.tournaments.filter({ id: params.id }).getFirst();

  if (!tour) return redirect("/find");

  const sortedDesc = tour.description!.split(/\r?\n/);

  return (
    <main className="flex gap-x-8 gap-y-4 flex-col lg:flex-row">
      <div className="h-fit sticky top-20">
        <Image
          src={tour.imageUrl!}
          alt={tour.name!}
          width={500}
          height={500}
          className="rounded-md"
        />
        <section className="mt-6 p-4 bg-gray-100 rounded-md">
          <h4 className="font-semibold text-lg">Tournament Info:</h4>
          <div className="flex flex-col gap-2 px-4 font-medium">
            <p>
              {">"} Players Enrolled:{" "}
              <span className="font-normal">{tour.enrollees?.length ?? 0}</span>
            </p>
            <p>
              {">"} Pricing:{" "}
              <span className="font-normal">
                {USD.format(tour.pricing)} USD
              </span>
            </p>
            <p>
              {">"} Status: <span className="font-normal">{tour.status}</span>
            </p>
            <p></p>
          </div>
        </section>
        <form></form>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-extrabold">{tour.name}</h2>
        {sortedDesc.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {sortedDesc.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {sortedDesc.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </main>
  );
}
