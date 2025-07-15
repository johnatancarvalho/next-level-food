import React from "react";

interface Props {
  params: Promise<{
    mealSlug: string;
  }>;
}

const MealPage = async ({ params }: Props) => {
  const { mealSlug } = await params;
  return <h1>Meal: {mealSlug}</h1>;
};

export default MealPage;
