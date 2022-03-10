import prisma from "../database/db";
import { getInforOfManyProducts } from "./product.controller";

export async function getOrders(id: string) {
  try {
    const orders: any = await prisma.orders.findMany({
      where: {
        shopId: id,
      },
    });
    console.log(orders);
    if (orders) return orders;
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

export async function createOrder(data: any) {
  const newOrders = await prisma.orders.create({
    data: {
      total: 20,
      state: 2,
      shopId: "1233123",
      productsId: [],
      cartId: "121312312",
      userId: "42334534",
    },
  });
  return newOrders;
}

export const getOrderByCartId = async (ordersId: string[]) => {
  try {
    const orden = await prisma.orders.findMany({
      where: {
        id: {
          in: ordersId
        }
      },
      select: {
        productsId: true
      }
    });

   
    let arrayProducts
    for await (const iterator of orden.map(productsId => getInforOfManyProducts(productsId.productsId))) {
      arrayProducts = iterator
    }
    //console.log(arrayProducts)
    return arrayProducts

  } catch (error) {}
};
