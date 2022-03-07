import { PrismaClient } from "@prisma/client";
import { User } from "../Items/User.interface";

export const allUsersList = async (
  prisma: PrismaClient,
  page: number
): Promise<null | User[]> => {
  try {
    const usersLis: any = await prisma.users.findMany({
      skip: 10 * page,
      take: 10,
      where: {},
    });

    return usersLis;
  } catch (error) {
    return null;
  }
};

// export const getUsers = async (
//   prisma: PrismaClient
// ): Promise<null | User[]> => {
//   try {
//     const users: any = await prisma.users.findMany();
//     return users;
//   } catch (error) {
//     return null;
//   }
// };
export const saveNewUser = async (prisma: PrismaClient, data: any) => {
  try {
    const newUser = await prisma.users.create({
      data,
    });
    if (newUser) return newUser;
  } catch (error) {
    return null;
  }
};
