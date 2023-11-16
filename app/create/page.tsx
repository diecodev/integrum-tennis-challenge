import { TournamentForm } from "@root/components/admin/create/form";

export default function CreateTournament() {
  return (
    <main className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold text-center">Create a Torunament</h1>
      <p className="text-center text-sm mb-6">
        Fill out all the fields to create your tournament.
      </p>
      <TournamentForm />
    </main>
  );
}
