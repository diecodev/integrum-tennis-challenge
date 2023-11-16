import { uploadImage } from "@root/utils";
import { CreateTournamentButton } from "./button";
import { Picker } from "./image-picker";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Tournaments, getXataClient } from "@root/xata";
import { redirect } from "next/navigation";
import { STATUSES } from "@root/const";

const xata = getXataClient();

export function TournamentForm({ data }: { data?: Tournaments }) {
  async function action(form: FormData) {
    "use server";

    let imageUrl: string = form.get("imageUrl")!.toString();

    if (!imageUrl.startsWith("https")) {
      imageUrl = await uploadImage({
        imgUrl: form.get("imageUrl")!.toString(),
      });
    }

    const obj: Partial<Tournaments> = {
      description: form.get("description")!.toString(),
      imageUrl,
      name: form.get("name")!.toString(),
      pricing: Number(form.get("pricing")!.toString()),
      status: form.get("status")?.toString() ?? "OPEN",
    };

    const id = form.get("id")!.toString();

    if (!!id) {
      await xata.db.tournaments.update(id, obj);
    } else {
      await xata.db.tournaments.create(obj);
    }

    redirect("/all");
  }

  return (
    <form action={action} className="px-2 grid gap-6">
      <input type="text" name="id" hidden readOnly value={data?.id ?? ""} />
      <Picker imageUrl={data?.imageUrl ?? ""} />
      <Input
        id="name"
        name="name"
        labelTitle="Name:"
        type="text"
        placeholder="Sub-24 tournament"
        defaultValue={data?.name ?? ""}
        required
      />
      <Textarea
        id="description"
        name="description"
        labelTitle="Description:"
        placeholder="The best tournament to people..."
        rows={10}
        defaultValue={data?.description ?? ""}
        required
      />
      <Input
        id="pricing"
        name="pricing"
        labelTitle="Pricing:"
        type="text"
        min={1}
        step={1}
        pattern="[0-9]+"
        placeholder="50"
        defaultValue={data?.pricing ?? 50}
        inputMode="numeric"
        required
      />
      {data?.status && (
        <fieldset className="flex flex-col-reverse">
          <select
            className="px-3 py-1 rounded-md border-2 outline-none focus-within:border-indigo-500 transition-colors peer"
            name="status"
            id="status"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} selected={s === data.status}>
                {s}
              </option>
            ))}
          </select>
          <label
            className="font-semibold peer-focus-within:text-indigo-500 transition-colors"
            htmlFor="status"
          >
            Status:
          </label>
        </fieldset>
      )}
      {data?.enrollees && (
        <p className="text-sm flex gap-2 items-center justify-center text-slate-500 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          This tournament have {data?.enrollees?.length ?? 0} players enrolled
        </p>
      )}
      <CreateTournamentButton
        title={data?.id ? "Finish Edit Mode" : "Create Tournament"}
      />
    </form>
  );
}
