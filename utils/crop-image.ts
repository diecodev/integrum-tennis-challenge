import type { Area } from "react-easy-crop";

const createImage = async (url: string): Promise<HTMLImageElement> =>
  await new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.addEventListener("error", (error) => {
      reject(error);
    });
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  );

  // As a base64 URI
  return scaleDataURL(canvas.toDataURL());
}

function scaleDataURL(dataURL: string, maxWidth = 500, maxHeight = 500) {
  return new Promise<string>((resolve) => {
    var img = new Image();
    img.onload = () => {
      let scale, newWidth, newHeight, canvas, ctx;
      if (img.width < maxWidth) {
        scale = maxWidth / img.width;
      } else {
        scale = maxHeight / img.height;
      }
      newWidth = img.width * scale;
      newHeight = img.height * scale;
      canvas = document.createElement("canvas");
      canvas.height = newHeight;
      canvas.width = newWidth;
      ctx = canvas.getContext("2d")!;
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        newWidth,
        newHeight,
      );
      resolve(canvas.toDataURL());
    };
    img.src = dataURL;
  });
}
