import { PrismaClient } from "@prisma/client";
import prisma from "../database/db";
import { User } from "../Items/User.interface";
// import { createNewCarrito } from "./cart.controller";
import { Cart } from "../Items/Cart.interface";

export const allUsersList = async (page: number) => {
  try {
    const total = await prisma.users.count();
    const usersLis: any = await prisma.users.findMany({
      skip: 10 * page,
      take: 10,
    });

    const pagesTotal = Math.ceil(total / 10);

    return {
      next: page < pagesTotal - 1 ? true : false,
      prev: page > 0 ? true : false,
      pagesTotal,
      usersLis,
    };
  } catch (error) {
    console.log(error);
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
    const info: any = {
      ...data,
      rol: 0,
      shopsId: [],
      mailingList: false,
    };
    const newUser: any | null = await prisma.users.create({
      data: info,
    });
    if (newUser) {
      // await createNewCarrito(newUser.id);
      return newUser;
    }
  } catch (error) {
    return null;
  }
};

export const getUserId = async (userId: string) => {
  try {
    const encontrado: User[] | null = await prisma.users.findMany({
      where: {
        userId: userId,
      },
    });
    if (encontrado) {
      return encontrado;
    } else return null;
  } catch (error) {
    return null;
  }
};
export const userToAdmin = async (userId: string, makeAdmin: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        userId,
      },
    });
    if (user && makeAdmin === "makeAdmin") {
      const updatedAdmin = await prisma.users.update({
        where: {
          userId,
        },
        data: {
          rol: 2,
        },
      });

      return updatedAdmin;
    } else if (user && makeAdmin === "takeAdmin") {
      const updatedUser = await prisma.users.update({
        where: {
          userId,
        },
        data: {
          rol: 0,
        },
      });

      return updatedUser;
    } else {
      return user;
    }
  } catch (error) {
    return null;
  }
};

export const banUser = async (userId: string, banUnban: string) => {
  try {
    const currentRol: any = await prisma.users.findUnique({
      where: {
        userId,
      },
      select: {
        name: true,
        rol: true,
      },
    });
    if (currentRol.rol === 0 && banUnban === "ban") {
      const bannedUser = await prisma.users.update({
        where: {
          userId,
        },
        data: {
          rol: 3,
        },
      });
      return bannedUser;
    } else if (currentRol.rol === 3 && banUnban === "unban") {
      const unBannedUser = await prisma.users.update({
        where: {
          userId,
        },
        data: {
          rol: 0,
        },
      });
      return unBannedUser;
    }
    return currentRol;
  } catch (error) {
    return null;
  }
};

export const saveFavourite = async (userId: string, shopId: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        userId,
      },
      select: {
        favouriteShops: true,
      },
    });
    const shop: any = await prisma.shops.findUnique({
      where: {
        id: shopId,
      },
      // select:{
      //   id: true
      // }
    });

    user?.favouriteShops.push(shop?.id);

    const updateUserFavourites = await prisma.users.update({
      where: {
        userId,
      },
      data: {
        favouriteShops: user?.favouriteShops,
      },
    });

    return updateUserFavourites;
  } catch (error) {
    return null;
  }
};

export const getFavouriteShops = async (userId: string) => {
  try {
    const shopsId = await prisma.users.findUnique({
      where: {
        userId,
      },
      select: {
        favouriteShops: true,
      },
    });

    const favouriteShops = shopsId?.favouriteShops.map((e) => e);

    const allShops = await prisma.shops.findMany({
      where: {
        id: {
          in: favouriteShops,
        },
      },
    });

    return allShops;
  } catch (error) {
    return null;
  }
};

export const removeFavourite = async (userId: string, shopId: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        userId,
      },
      select: {
        favouriteShops: true,
      },
    });

    const newFavourites = user?.favouriteShops.filter((e) => e !== shopId);

    const updatedUser = await prisma.users.update({
      where: {
        userId,
      },
      data: {
        favouriteShops: newFavourites,
      },
    });

    const allShops = await prisma.shops.findMany({
      where: {
        id: {
          in: newFavourites,
        },
      },
    });

    return allShops;
  } catch (error) {
    return null;
  }
};

export const updateUserMailingState = async (userId: string, boolean: any) => {
  try {
    let bool: boolean;
    if (boolean === "true") bool = true;
    else bool = false;
    const updatedUser: any = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        mailingList: bool,
      },
    });
    return updatedUser;
  } catch (error) {
    return null;
  }
};
