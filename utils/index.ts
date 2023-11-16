import { IMG_API_KEY } from "@root/const";

export const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const uploadImage = async ({ imgUrl }: { imgUrl: string }) => {
  const url = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`;

  const body = new FormData();
  body.append("image", imgUrl);

  const res = await fetch(url, {
    method: "POST",
    body,
  });

  const { data } = await res.json();

  return data.url as string;
};
