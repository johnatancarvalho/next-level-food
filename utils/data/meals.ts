import { Meal } from "@/types/models";

import { createClient } from "../supabase/server";

import slugify from "slugify";
import xss from "xss";
import { MealFormData } from "./actions";
import { BUCKET } from "@/types/common";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Fetches all meals from the database.
 * @returns {Promise<Meal[]>} A promise that resolves to an array of meals.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getMeals = async () => {
  const supabase = await createClient();

  const { data: meals, error } = await supabase.from("meals").select();
  if (error || !meals) {
    throw new Error(`Failed to fetch meals: ${error?.message}`);
  }
  return meals as Meal[];
};

/**
 * Fetches a single meal by its slug.
 * @param {string} mealSlug - The slug of the meal to fetch.
 * @returns {Promise<Meal | undefined>} A promise that resolves to the meal or undefined if not found.
 * @throws Will throw an error if the fetch operation fails.
 */
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
  if (!meal) {
    return undefined;
  }
  return meal as Meal;
};

const handleImageUpload = async (fileName: string, file: File, client?: SupabaseClient) => {
  const supabase = client || (await createClient());

  const { error } = await supabase.storage
    .from(BUCKET.MEALS)
    .upload(fileName, file);

  if (error) {
    throw new Error(`Upload error: ${error?.message}`);
  }
};

const getImageUrl = async (fileName: string, client?: SupabaseClient) => {
  const supabase = client || (await createClient());

  const { data } = supabase.storage
    .from(BUCKET.MEALS)
    .getPublicUrl(fileName);

  return data.publicUrl;
};

export const saveMeal = async (formData: MealFormData) => {
  const slug = slugify(formData.title, { lower: true });
  const extension = formData.image.name.split(".").pop() || "jpeg";
  const filename = `${slug}-${Date.now()}.${extension}`;

  const supabase = await createClient();

  await handleImageUpload(filename, formData.image, supabase);
  const imageUrl = await getImageUrl(filename, supabase);

  const meal: Meal = {
    title: formData.title,
    summary: formData.summary,
    instructions: xss(formData.instructions),
    image: imageUrl,
    slug,
    creator: formData.creator,
    creator_email: formData.creator_email,
  };

  const { error } = await supabase.from("meals").insert(meal);

  if (error) {
    throw new Error(`Failed to save meal: ${error?.message}`);
  }
};
