'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export interface MealFormData {
  title: string;
  summary: string;
  instructions: string;
  image: File;
  creator: string;
  creator_email: string;
}

export async function shareMeal(formData: FormData) {
    await saveMeal({
      title: formData.get("title"),
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      image: formData.get("image"),
      creator: formData.get("name"),
      creator_email: formData.get("email"),
    } as MealFormData);
    
    redirect("/meals");
  }