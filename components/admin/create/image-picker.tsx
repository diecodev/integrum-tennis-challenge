"use client";

import Image from "next/image";
import { type ChangeEvent, useCallback, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Cropper, { type Area } from "react-easy-crop";
import getCroppedImg from "@root/utils/crop-image";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  imageUrl?: string;
}

export function Picker({ imageUrl, ...props }: Props) {
  const [currentImage, setCurrentImage] = useState(imageUrl ?? "");
  const [previousImage, setPreviousImage] = useState(imageUrl ?? "");
  const [isOpen, setIsOpen] = useState<true | undefined>(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [areaPixels, setAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    console.log(croppedAreaPixels);
    setAreaPixels(croppedAreaPixels);
  }, []);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file == null) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviousImage(reader.result as string);
    };
    reader.onloadend = () => {
      setIsOpen(true);
      e.target.value = "";
    };
  };

  const changeImage = async (): Promise<void> => {
    const croppedImage = await getCroppedImg(previousImage, areaPixels!);
    setCurrentImage(croppedImage);
    closeModal();
  };

  const closeModal = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setIsOpen(undefined);
  };

  return (
    <div>
      <input
        onChange={uploadImage}
        type="file"
        className="hidden"
        name="imageurl"
        id="picker"
        accept="image/png, image/jpeg"
      />
      <input
        type="text"
        name="imageUrl"
        value={currentImage}
        className="hidden"
        readOnly
      />
      <Dialog.Root>
        {/* custom trigger */}
        <label htmlFor="picker" className="flex gap-2 items-center" {...props}>
          {previousImage && currentImage ? (
            <div className="grid gap-2">
              <Image
                src={currentImage ?? previousImage}
                priority
                quality={100}
                className="rounded-md cursor-pointer"
                alt="profile image"
                width={500}
                height={500}
              />
              <div
                role="button"
                className="flex overflow-hidden transition-all border-indigo-500 text-indigo-500 px-3 py-1 w-full items-center justify-center rounded-md cursor-pointer border-2"
              >
                Change cover
              </div>
            </div>
          ) : (
            <>
              <p>Tournament cover:</p>
              <div className="flex overflow-hidden transition-all bg-gray-300 px-3 py-1 max-w-[8rem] items-center justify-center rounded-md cursor-pointer">
                Select file
              </div>
            </>
          )}
        </label>
        {/* portal */}
        <Dialog.Portal forceMount={isOpen}>
          <Dialog.Overlay
            onClick={closeModal}
            className="fixed inset-0 z-20 animate-overlay bg-zinc-900/70"
          />
          <Dialog.Content className="fixed z-20 w-11/12 p-2 overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl h-fit max-h-fit text-zinc-700 sm:max-w-md top-1/2 left-1/2 focus:outline-none">
            <div className="relative h-[26rem] border-dashed border-spacing-2 border-4 overflow-hidden rounded-lg border-color-secondary">
              <Cropper
                image={previousImage}
                crop={crop}
                zoom={zoom}
                minZoom={1}
                maxZoom={3}
                cropShape="rect"
                classes={{
                  containerClassName: "rounded-md border border-white",
                }}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="mx-auto mt-4 w-52">
              <input
                className="w-full h-2 bg-gray-200 rounded-lg outline-none appearance-none cursor-pointer"
                type="range"
                name="zoom"
                id="img-zomm"
                min={1}
                max={3}
                value={zoom}
                onInput={(e: any) => {
                  setZoom(e.target.value);
                }}
                step={0.05}
              />
            </div>
            <div className="flex justify-between w-full mt-6 text-white">
              <button
                className="px-4 py-1 rounded-md bg-rose-500"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-1 bg-green-500 rounded-md"
                onClick={changeImage}
              >
                Aceptar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
