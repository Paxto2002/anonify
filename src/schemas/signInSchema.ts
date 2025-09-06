// src/schemas/signInSchema.ts
import { z } from "zod"

export const signInSchema = z.object({
    identiier: z.string(),
    password: z.string()
});