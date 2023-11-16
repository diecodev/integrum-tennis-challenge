import { uploadImage } from "@root/utils";
import { CreateTournamentButton } from "./button";
import { Picker } from "./image-picker";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Tournaments, getXataClient } from "@root/xata";
import { redirect } from "next/navigation";

const xata = getXataClient();

export function TournamentForm({ data }: { data?: Tournaments }) {
  async function action(form: FormData) {
    "use server";

    const imageUrl = await uploadImage({
      imgUrl: form.get("imageUrl")!.toString(),
    });

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
      <CreateTournamentButton />
    </form>
  );
}
