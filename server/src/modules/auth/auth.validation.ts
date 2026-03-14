import z from "zod";


export const createUserSchema = z.object({
  username: z.string().min(1, "Username required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const loginShema = z.object({
  username: z.string().min(1, "username required"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export type CreateUserDto = z.infer<typeof createUserSchema>
export type loginDto = z.infer<typeof loginShema>