import prisma from "../database/db";
import { Shops } from "@prisma/client";

export async function saveNewShop(data: any) {
  try {
    let user: any = await prisma.users.findUnique({
      where: {
        id: data.userId,
      },
      select: {
        shopsId: true,
      },
    });
    if (user) {
      const newShop: any = await prisma.shops.create({ data: data });
      user.shopsId.push(newShop.id);

      const users = await prisma.users.update({
        where: {
          id: data.userId,
        },
        data: {
          shopsId: user.shopsId,
          rol: 1,
        },
      });

      return newShop;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function getShops() {
  try {
    const shops: any = await prisma.shops.findMany({});
    if (shops) return shops;
  } catch (error) {
    return null;
  }
}
