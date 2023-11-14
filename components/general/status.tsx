import { Statuses } from "@root/types";
import clsx from "clsx";

export function StatusLabel({ status }: { status: Statuses }) {
  return (
    <span
      className={clsx("rounded-full px-3 font-medium", {
        "bg-yellow-300": status === "OPEN",
      })}
    >
      {status}
    </span>
  );
}
