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
