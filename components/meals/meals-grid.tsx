import MealItem from "./meal-item";

import { Meal } from "@/types/models";

import css from "./meals-grid.module.css";

export default function MealsGrid({ meals }: { meals: Meal[] }) {
  return (
    <ul className={css.meals}>
      {meals.map((meal, idx) => (
        <li key={meal.slug + "-" + idx}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
