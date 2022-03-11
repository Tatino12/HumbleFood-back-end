import { PrismaClient } from "@prisma/client";
import prisma from "../database/db";
import { User } from "../Items/User.interface";
import { createNewCarrito } from "./cart.controller";

export const allUsersList = async (page: number): Promise<null | User[]> => {
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

export const saveNewUser = async (data: any) => {
  try {
    const newUser = await prisma.users.create({
      data,
    });
    if (newUser) {
      await createNewCarrito(newUser.id)
      return newUser
    }
  } catch (error) {
    return null;
  }
};

export const userToAdmin = async (email: any) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const updatedUser = await prisma.users.update({
        where: {
          email,
        },
        data: {
          rol: 2,
        },
      });

      return updatedUser;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
