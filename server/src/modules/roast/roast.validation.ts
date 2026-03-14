import z from "zod";


export const roastSchema = z.object({
  content: z.string().min(1)
})

export type roastDto = z.infer<typeof roastSchema> 