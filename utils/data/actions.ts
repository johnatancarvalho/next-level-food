'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { MealFormData, MealFormState } from "@/types/common";
import { mealFormSchema } from "../validation/schemas";
import { saveMeal } from "./meals";

import z from "zod";


export async function shareMeal(prevState: MealFormState, formData: FormData) {
  const mealFormData = Object.fromEntries(formData.entries()) as MealFormData;
  const validatedFormData = mealFormSchema.safeParse(mealFormData);

  if (!validatedFormData.success) {
    const flattenedErrors = z.flattenError(validatedFormData.error);

    const newFormState: MealFormState = {
      values: mealFormData ?? prevState.values,
      errors: flattenedErrors.fieldErrors,
    };

    return newFormState;
  }

  await saveMeal(mealFormData);

  revalidatePath("/meals");
  redirect("/meals");
}