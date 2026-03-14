import z from "zod"
import { Role } from "../../generated/prisma/enums"

export const changeRoleSchema = z.object({
  role: z.enum(Object.values(Role) as [string, ...string[]], {
    error: "Wrong role, only: USER, ADMIN, SUPERADMIN"
  })
})

export type changeRoleDto = z.infer<typeof changeRoleSchema>