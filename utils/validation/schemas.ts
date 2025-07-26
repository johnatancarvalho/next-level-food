import z from "zod";

export const mealFormSchema = z.object({
  name: z.string().trim().nonempty({error: "Name field is required"})
            .min(3, { error: "Name must be at least 3 characters long" }),
  email: z.email({ error: "Invalid email address" }),
  title: z.string().trim().nonempty({error: "Title field is required"}),
  summary: z.string().trim().nonempty({error: "Summary field is required"}),
  instructions: z.string().trim().nonempty({error: "Instructions field is required"}),
  image: z.instanceof(File, { error: "Image file is required" }).refine((file) => file.size > 0, {
    error: "Image file is required",
  })
});