import { PrismaClient } from "@prisma/client";
import prisma from "../database/db";
import { User } from "../Items/User.interface";
import { Cart } from "../Items/Cart.interface";

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

export const saveNewUser = async (data: User) => {
  try {
    const newUser: any = await prisma.users.create({
      data,
    });
    const cart = await prisma.cart.create({data:{
      total: 0,
      ordersId: [],
      userId: newUser.id
    }})
    if (newUser) return newUser;
  } catch (error) {
    return null;
  }
};

export const getUserId = async (userId :string) => {
  try {
    const encontrado: User | null = await prisma.users.findUnique({
      where: {
        userId
      }
    })
    if(encontrado){
      return encontrado
    }
    else return null
  } catch (error) {
    return null
  }
}