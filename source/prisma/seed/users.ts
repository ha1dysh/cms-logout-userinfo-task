import type { AdminRole, PrismaClient } from "@prisma/client";
import { hashPassword } from "~/.server/shared/utils/auth.util";

export const createUsers = async (prisma: PrismaClient) => {
  console.log("Seeding users");

  Array.from({ length: 30 }, async (_, i) => {
    await prisma.user.createMany(  { data:{
      fullName: `User-${i}`,
      email: `user-${i}@email.com`,
      password: await hashPassword(`12345678${i}`),
      role: ['ADMIN', 'STUFF'][Math.floor(Math.random() * 2)] as AdminRole
    }})
  });
};
