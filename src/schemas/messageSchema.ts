import { z } from "zod"

export const message = z.object({
    content: z
    .string()
    .min(10, {message: "Content must be at least 10 characters long"})
    .max(10, {message: "Content must be maximum 300 characters long"})
});