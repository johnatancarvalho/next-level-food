import Link from "next/link";

import MealsGrid from "@/components/meals/meals-grid";

import { Meal } from "@/common/types";

import css from "./page.module.css";

export default function MealsPage() {
  const meals: Meal[] = [];
  return (
    <>
      <header className={css.header}>
        <h1>
          Delicious meals, created <span className={css.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={css.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={css.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
