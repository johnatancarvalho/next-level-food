"use client";

import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import css from "./image-picker.module.css";

export default function ImagePicker({
  setImage,
  label,
  name,
  errors,
}: {
  setImage: Dispatch<SetStateAction<File | undefined>>;
  label: string;
  name: string;
  errors?: string[] | undefined;
}) {
  const [pickedImage, setPickedImage] = React.useState<string>();
  const pickerRef = React.useRef<HTMLInputElement>(null);

  function handlePickClick() {
    pickerRef.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(undefined);
      setImage(undefined);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const res = fileReader.result;
      if (typeof res !== "string") {
        return;
      }
      setPickedImage(res);
      setImage(file);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={css.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={css.controls}>
        <div>
          <div className={css.preview}>
            {!pickedImage && (
              <div onClick={!pickedImage ? handlePickClick : undefined}>
                No image picked yet.
              </div>
            )}
            {pickedImage && (
              <Image
                src={pickedImage}
                alt="The image selected by the user"
                fill
              />
            )}
          </div>
          {!!errors?.[0] && <span className={css.error}>{errors[0]}</span>}
        </div>
        <input
          type="file"
          id={name}
          className={css.input}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          ref={pickerRef}
          required
        />
        <button type="button" className={css.button} onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
