import prisma from "../database/db";
import { estado } from "../Items/Order.interface";
import { getInforOfManyProducts } from "./product.controller";
import { sendEmail } from "./email.controller";

export async function Orders() {
  try {
    const orders = await prisma.orders.findMany({});
    if (orders) return orders;
  } catch (error) {
    return null;
  }
}

export async function getOrders(id: string) {
  try {
    const orders: any = await prisma.orders.findMany({
      where: {
        shopId: id,
      },
    });

    if (orders.lenght > 0) {
      return orders;
    } else {
      const userOrders = await prisma.orders.findMany({
        where: {
          userId: id,
        },
      });
      return userOrders;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function validateOrder(userId: string, shopId: string) {
  try {
    const order = await prisma.orders.findMany({
      where: {
        AND: [{ userId }, { shopId }],
      },
      select: { id: true },
    });
    if (order.length) {
      updateOrder(order[0].id);
    } else {
      createOrder(0);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateOrder(id: string) {
  const orderUpdate = await prisma.orders.update({
    where: {
      id: id,
    },
    data: { productsId: { push: "ethan" } },
  });
  return orderUpdate;
}

export async function updateInfoOrder(id: string, state: any) {
  const newState: any = estado[state];
  if (newState === 3) notify(id, "Su orden ha sido enviada!");
  const orderUpdate = await prisma.orders.update({
    where: {
      id,
    },
    data: { state: newState },
  });

  return orderUpdate;
}
//Enviar Email cuando state se cambia a Enviando
async function notify(id: string, message: string) {
  const userId: any = await prisma.orders.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });
  const email: any = await prisma.users.findMany({
    where: {
      userId: userId.userId,
    },
    select: {
      email: true,
    },
  });
  sendEmail(email[0].email, message);
}

export async function createOrder(data: any) {
  const newOrder = await prisma.orders.create({
    data,
  });
  notify(newOrder.id, "Se ha registrado su compra");
  return newOrder;
}

export const getOrderByCartId = async (ordersId: string[]) => {
  try {
    const orden = await prisma.orders.findMany({
      where: {
        id: {
          in: ordersId,
        },
      },
      select: {
        productsId: true,
      },
    });

    let arrayProducts;
    for await (const iterator of orden.map((productsId) =>
      getInforOfManyProducts(productsId.productsId)
    )) {
      arrayProducts = iterator;
    }
    //console.log(arrayProducts)
    return arrayProducts;
  } catch (error) {}
};
