import { DeleteTournamentButton } from "@root/components/admin/create/delete-button";
import { TournamentForm } from "@root/components/admin/create/form";
import { getXataClient } from "@root/xata";
import { redirect } from "next/navigation";

const xata = getXataClient();

export default async function EditTournamentPage({
  params,
}: {
  params: { id: string };
}) {
  const tournamentData = await xata.db.tournaments
    .filter({ id: params.id })
    .getFirst();

  if (!tournamentData) return redirect("/create");

  async function action(form: FormData) {
    "use server";

    const id = form.get("id")!.toString();

    await xata.db.tournaments.delete({ id });

    redirect("/all");
  }

  return (
    <main className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold text-center">Edit your Torunament</h1>
      <p className="text-center text-sm mb-6">
        Fill out all the fields to create your tournament.
      </p>
      <TournamentForm data={tournamentData} />
      <form action={action} className="px-2 mt-6">
        <input
          type="text"
          name="id"
          hidden
          readOnly
          value={tournamentData.id}
        />
        <DeleteTournamentButton />
      </form>
    </main>
  );
}
