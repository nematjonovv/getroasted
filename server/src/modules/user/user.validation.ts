
import z, { string } from "zod";


export const profileUpdateSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  secondname: z.string().optional(),
  techstack: z.array(z.string()).optional(),
  profession: z.string().optional(),
  bio: z.string().optional()
})

export const changePassworSchema = z.object({
  oldPassword: z.string().min(6, "At least 6 characters"),
  newPassword: z.string().min(6, "At least 6 characters")
})


export type profileUpdateDto = z.infer<typeof profileUpdateSchema>
export type changePaswordDto = z.infer<typeof changePassworSchema>