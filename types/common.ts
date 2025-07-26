import z from "zod";

import { mealFormSchema } from "@/utils/validation/schemas";

export enum BUCKET {
  MEALS = 'meal-pictures',
}

export type MealFormData = z.infer<typeof mealFormSchema>;

export interface MealFormState {
  values: Omit<MealFormData, 'image'> & {
    image: File | undefined;
  },
  errors: {
    name?: string[];
    email?: string[];
    title?: string[];
    summary?: string[];
    instructions?: string[];
    image?: string[];
  }
}