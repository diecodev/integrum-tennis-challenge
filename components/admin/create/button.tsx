"use client";

import { useFormStatus } from "react-dom";

export function CreateTournamentButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="px-3 py-2 rounded-md bg-indigo-500 text-white"
    >
      Create Tournament
    </button>
  );
}
