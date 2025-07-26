"use client";

import { startTransition, useActionState, useEffect, useState } from "react";

import ImagePicker from "@/components/meals/image-picker";
import SubmitButton from "./submit-button";
import { MealFormState } from "@/types/common";
import { shareMeal } from "@/utils/data/actions";

import css from "./page.module.css";

const initialFormState: MealFormState = {
  values: {
    name: "",
    email: "",
    title: "",
    summary: "",
    instructions: "",
    image: undefined,
  },
  errors: {},
};

export default function ShareMealPage() {
  const [formState, formAction] = useActionState(shareMeal, initialFormState);
  const { values, errors } = formState;

  const [name, setName] = useState(values.name);
  const [email, setEmail] = useState(values.email);
  const [title, setTitle] = useState(values.title);
  const [summary, setSummary] = useState(values.summary);
  const [instructions, setInstructions] = useState(values.instructions);
  const [image, setImage] = useState(values.image);

  useEffect(() => {
    setName(values.name);
    setEmail(values.email);
    setTitle(values.title);
    setSummary(values.summary);
    setInstructions(values.instructions);
    if (values.image) setImage(values.image);
  }, [values]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("instructions", instructions);
    formData.set("image", image ?? "");

    startTransition(() => {
      formAction(formData);
    });
  };

  const renderError = (error: string[] | undefined) => {
    if (!error || !error[0]) return null;
    return <span className={css.error}>{error[0]}</span>;
  };

  return (
    <>
      <header className={css.header}>
        <h1>
          Share your <span className={css.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={css.main}>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors?.name && renderError(errors.name)}
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors?.email && renderError(errors.email)}
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors?.title && renderError(errors.title)}
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
            {errors?.summary && renderError(errors.summary)}
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            ></textarea>
            {errors?.instructions && renderError(errors.instructions)}
          </p>
          <ImagePicker
            label="Image"
            name="image"
            setImage={setImage}
            errors={errors?.image}
          />
          <p className={css.actions}>
            <SubmitButton />
          </p>
        </form>
      </main>
    </>
  );
}
