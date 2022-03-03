import { PrismaClient } from "@prisma/client";
import { User } from "../Items/User.interface";

export const allUsersList = async (prisma: PrismaClient): Promise<null | User[]> => {
  try {
    const usersLis: User[] = await prisma.users.findMany();
    return usersLis;
  } catch (error) {
    return null;
  }
};
