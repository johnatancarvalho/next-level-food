import React from "react";

const MealPage = async ({ params }: { params: { mealSlug: string } }) => {
  const { mealSlug } = await params;
  return <h1>Meal: {mealSlug}</h1>;
};

export default MealPage;
