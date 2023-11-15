import { Statuses } from "@root/types";
import clsx from "clsx";

export function StatusLabel({ status }: { status: Statuses }) {
  return (
    <span
      className={clsx("rounded-full px-3 font-medium", {
        "bg-green-300": status === "OPEN",
        "bg-gray-300": status === "FINISHED",
        "bg-yellow-300": status === "PLAYING",
      })}
    >
      {status}
    </span>
  );
}
