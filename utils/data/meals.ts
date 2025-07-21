import { createClient } from "../supabase/server";

import { Meal } from "@/types/models";


export const getMeals = async () => {
  const supabase = await createClient();

  const { data: meals, error } = await supabase.from("meals").select();
  if (error || !meals) {
    throw new Error(`Failed to fetch meals: ${error?.message}`);
  }
  return meals as Meal[];
};

export const getMeal = async (mealSlug: string) => {
  const supabase = await createClient();

  const { data: meal, error } = await supabase
    .from("meals")
    .select()
    .eq("slug", mealSlug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch meal: ${error?.message}`);
  }
  if(!meal) {
    return undefined;
  }
  return meal as Meal;
};