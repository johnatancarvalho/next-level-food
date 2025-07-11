import Link from "next/link";
import Image from "next/image";

import { Meal } from "@/types/models";

import css from "./meal-item.module.css";

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
}: Meal) {
  return (
    <article className={css.meal}>
      <header>
        <div className={css.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={css.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={css.content}>
        <p className={css.summary}>{summary}</p>
        <div className={css.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
