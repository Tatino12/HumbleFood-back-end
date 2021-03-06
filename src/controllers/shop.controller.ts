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
        ` Hola ${user.name}! \n  Has registrado una tienda con exito!\n   Se encuentra pendiente de autorización por el Admin, te notificaremos por mail cuando puedas empezar a publicar productos!`
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

export async function getShops(
  page: number,
  authorization: boolean,
  name?: string
) {
  try {
    const total = await prisma.shops.count({
      where: {
        authorization,
      },
    });
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

export const autorizheShop = async (shopId: string, authorize: boolean) => {
  try {
    const shop = await prisma.shops.update({
      where: {
        id: shopId,
      },
      data: {
        authorization: authorize,
      },
    });
    if (authorize) email(shopId);
    if (shop) return shop;
    else return [];
  } catch (error) {
    return null;
  }
};

export const email = async (shopId: string) => {
  try {
    const userId = await prisma.shops.findUnique({
      where: {
        id: shopId,
      },
      select: {
        userId: true,
      },
    });

    if (userId) {
      const userEmail = await prisma.users.findUnique({
        where: {
          id: userId.userId,
        },
        select: {
          email: true,
        },
      });
      if (userEmail) {
        sendEmail(
          userEmail.email,
          `Su tienda ha sido autorizada por el admin! \n Empieze a publicar sus productos ya! \n https://humblefood.vercel.app/productShop/${shopId}`
        );
      }
    }
  } catch (error) {
    return null;
  }
};

export const deleteShop = async (shopId: string) => {
  try {
    const deletedShop = await prisma.shops.delete({
      where: {
        id: shopId,
      },
    });
    const user = await prisma.users.update({
      where: {
        id: deletedShop.userId,
      },
      data: {
        shopsId: [],
        rol: 0,
      },
    });
    sendEmail(
      user.email,
      "Su solicitud de tienda fue rechazada, por favor intente nuevamente!"
    );
    return deletedShop;
  } catch (error) {
    return null;
  }
};
