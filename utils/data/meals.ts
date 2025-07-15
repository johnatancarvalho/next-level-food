import { createClient } from "../supabase/server";

import { Meal } from "@/types/models";


export const getMeals = async () => {
  const supabase = await createClient();

  const { data: meals, error } = await supabase.from("meals").select();
  if (error) {
    // TODO: handle errors
    console.error("Error fetching meals:", error);
    return [];
  }
  if (!meals) {
    return [];
  }
  return meals as Meal[];
};
