import { StatusLabel } from "@root/components/general/status";
import { Statuses } from "@root/types";
import { USD } from "@root/utils";
import { Tournaments } from "@root/xata";
import Image from "next/image";
import Link from "next/link";

export function TournamentCard({ data }: { data: Tournaments }) {
  return (
    <article>
      <Link
        className="flex p-4 shadow-lg rounded-3xl text-sm flex-col gap-4 h-full"
        href={`/find/${data.id}`}
      >
        <div className="rounded-3xl overflow-hidden">
          <Image
            src={data.imageUrl!}
            width={500}
            height={500}
            alt={`${data.name} cover`}
          />
        </div>
        <main className="flex gap-4 flex-col justify-between flex-1">
          <h3 className="text-base font-bold">{data.name}</h3>
          <p className="line-clamp-4">{data.description}</p>
          <div className="flex items-center justify-between">
            <p className="bg-green-300 font-medium px-3 rounded-full">
              {USD.format(data.pricing)}
            </p>
            <StatusLabel status={data.status as Statuses} />
          </div>
        </main>
      </Link>
    </article>
  );
}
