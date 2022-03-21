import prisma from "../database/db";
import { Shops } from "@prisma/client";
import { sendEmail } from "./email.controller";

export async function saveNewShop(data: any) {
  try {
    let user: any = await prisma.users.findUnique({
      where: {
        id: data.userId,
      },
      select: {
        name: true,
        shopsId: true,
        email: true,
      },
    });
    if (user) {
      sendEmail(
        user.email,
        ` Hola ${user.name}! \n  Has registrado una tienda con exito!\n   Empieza a publicar tus productos, nuevos clientes te esperan!`
      );
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
 
export async function getShops(page: number, authorization: boolean, name?: string ) {
  try {
    const total = await prisma.shops.count();
    const users = await prisma.users.findMany({
      where: {
        rol: 3,
      },
      select: {
        userId: true,
      },
    });
    const use = users.map((obj) => obj.userId);
    let shops: any;
    shops = await prisma.shops.findMany({
      where: {
        authorization: authorization,
        userId: {
          notIn: use,
        },
      },
      skip: 9 * page,
      take: 9,
    });
    //console.log(shops);
    if (name) {
      name = name.toLowerCase();
      shops = shops.filter((elem: any) =>
        elem.name.toLowerCase().includes(name)
      );
    }
    const totalPages = Math.ceil(total / 10);
    if (shops)
      return {
        next: page < totalPages - 1 ? true : false,
        pagesTotal: totalPages,
        prev: page > 0 ? true : false,
        shops,
      };
  } catch (error) {
    return null;
  }
}

export async function getShopId(shopId: string) {
  try {
    const shop = await prisma.shops.findMany({
      where: {
        id: shopId,
      },
    });
    if (shop) {
      return shop[0];
    } else return null;
  } catch (error) {}
}

export const banShop = async (userId: string, banUnban: string) => {
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
    if (currentRol.rol === 1 && banUnban === "ban") {
      const bannedShop = await prisma.users.update({
        where: {
          userId,
        },
        data: {
          rol: 3,
        },
      });
      return bannedShop;
    } else if (currentRol.rol === 3 && banUnban === "unban") {
      const unBannedShop = await prisma.users.update({
        where: {
          userId,
        },
        data: {
          rol: 1,
        },
      });
      return unBannedShop;
    }
    return currentRol;
  } catch (error) {
    return null;
  }
};

export const getShopDiscounts = async (shopId: string) => {
  try {
    const products = await prisma.products.findMany({
      where: {
        shopId,
      },
      select: {
        discount: true,
      },
    });
    const arrayDiscount = products.map((e) => e.discount);
    const uniqueDiscount = arrayDiscount.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    return uniqueDiscount.sort();
  } catch (error) {
    return null;
  }
};

export const autorizheShop = async (shopId: string) => {
try {
  const shop = await prisma.shops.update({
    where:{
      id: shopId
    },
    data:{
      authorization: true
    }
  })
  if(shop)  return shop
  else return []
} catch (error) {
  return null;
}
}