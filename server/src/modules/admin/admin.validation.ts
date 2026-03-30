import { Role } from "@prisma/client"
import z from "zod"

export const changeRoleSchema = z.object({
  role: z.enum(Object.values(Role) as [string, ...string[]], {
    error: "Wrong role, only: USER, ADMIN, SUPERADMIN"
  })
})

export type changeRoleDto = z.infer<typeof changeRoleSchema>
