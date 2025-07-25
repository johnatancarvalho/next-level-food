import React from "react";

import Image from "next/image";
import { notFound } from "next/navigation";

import { getMeal } from "@/utils/data/meals";

import css from "./page.module.css";

interface Props {
  params: Promise<{
    mealSlug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { mealSlug } = await params;

  const meal = await getMeal(mealSlug);

  if (meal) {
    return {
      title: meal.title,
      description: meal.summary,
    };
  }
}

export default async function MealDetailsPage({ params }: Props) {
  const { mealSlug } = await params;

  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  const mealInstructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={css.header}>
        <div className={css.image}>
          <Image fill src={meal.image} alt="Meal Image" />
        </div>
        <div className={css.headerText}>
          <h1>{meal.title}</h1>
          <p className={css.creator}>
            by{" "}
            <>
              <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
            </>
          </p>
          <p className={css.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={css.instructions}
          dangerouslySetInnerHTML={{ __html: mealInstructions }}
        ></p>
      </main>
    </>
  );
}
