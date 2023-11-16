"use client";

import { useFormStatus } from "react-dom";

export function DeleteTournamentButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="px-3 w-full py-2 rounded-md bg-rose-500 text-white"
    >
      Delete Tournament
    </button>
  );
}
