"use client";

import React from "react";
import Image from "next/image";

import css from "./image-picker.module.css";

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
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
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const res = fileReader.result;
      if (typeof res !== "string") {
        return;
      }
      setPickedImage(res);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={css.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={css.controls}>
        <div className={css.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
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
