import { auth } from "@clerk/nextjs";
import { MAX_PLAYERS_ENROLLED } from "@root/const";
import { Tournaments, getXataClient } from "@root/xata";
import { PaymentButton } from "./payment-button";
import { redirect } from "next/navigation";

const xata = getXataClient();

export function PaymentForm({ data }: { data: Tournaments }) {
  const authData = auth();
  const userId = authData.userId!;

  async function action() {
    "use server";

    const enrollees = data.enrollees ? [...data.enrollees, userId] : [userId];

    await xata.db.tournaments.update(data.id, {
      enrollees,
    });

    redirect(`/find/${data.id}?success=1`);
  }

  const isDisabled = data?.enrollees?.length === MAX_PLAYERS_ENROLLED;
  const isEnrolled = !!data.enrollees?.find((p) => p === userId);

  return (
    <form action={action}>
      <PaymentButton isDisabled={isDisabled} isEnrolled={isEnrolled} />
      {isEnrolled && (
        <p className="text-sm flex gap-2 items-center justify-center text-slate-500 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          You are already registered for this tournament.
        </p>
      )}
    </form>
  );
}
