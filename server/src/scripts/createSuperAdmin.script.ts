// src/scripts/createSuperAdmin.ts
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma"

dotenv.config()

async function main() {
  const existing = await prisma.user.findFirst({
    where: { role: "SUPERADMIN" }
  })

  if (existing) {
    console.log("✅ Superadmin allaqachon mavjud")
    return
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS!, 10)

  const superadmin = await prisma.user.create({
    data: {
      username: process.env.ADMIN_NAME!,
      email: process.env.ADMIN_EMAIL!,
      password: hashedPassword,
      role: "SUPERADMIN"
    }
  })

  console.log("✅ Superadmin yaratildi:", superadmin.username)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())