import prisma from "../database/db";
import { estado, ProductOrderType } from "../Items/Order.interface";
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
    // if (order.length) {
    //   updateOrder(order[0].id);
    // } else {
    //   createOrder(0);
    // }
  } catch (error) {
    console.log(error);
    return null;
  }
}

// export async function updateOrder(id: string) {
//   const orderUpdate = await prisma.orders.update({
//     where: {
//       id: id,
//     },
//     data: { productsId: { push: "ethan" } },
//   });
//   return orderUpdate;
// }

// export async function createOrder(data: any) {
//   const newOrders = await prisma.orders.create({
//     data: {
//       total: 20,
//       state: 2,
//       shopId: "1233123",
//       productsId: [],
//       cartId: "121312312",
//       userId: "42334534",
//     },
//   });
//   return newOrders;
// }

// export const getOrderByCartId = async (ordersId: string[]) => {
//   try {
//     const orden = await prisma.orders.findMany({
//       where: {
//         id: {
//           in: ordersId,
//         },
//       },
//       select: {
//         productsId: true,
//       },
//     });
//     let arrayProducts;
//     for await (const iterator of orden.map((productsId) =>
//       getInforOfManyProducts(productsId.productsId)
//     )) {
//       arrayProducts = iterator;
//     }
//     //console.log(arrayProducts)
//     return arrayProducts;
//   } catch (error) {}
// };

// export const upsertNewOrden = async (cartId: string) => {
//   try {
//     const orden = await prisma.orders.upsert({
//       where
//     })
//   } catch (error) {

//   }
// }

// ================ ================ ================ ================ ================

export const createNewOrden = async (
  userId: string,
  shopId: string,
  products: any // array de productos
) => {
  try {
    const orden = await prisma.orders.create({
      data: {
        userId,
        shopId,
        total: 0,
        ordenProductsId: [],
        state: estado.pendienteDeProcesamiento,
      },
      select: {
        id: true,
      },
    });

    const productsID = [];
    for await (const iterator of products.map((product: any) =>
      addOrUpdateProductOrder(orden.id, product)
    )) {
      productsID.push(iterator);
    }

    await prisma.orders.update({
      where: {
        id: orden.id
      },
      data: {
        ordenProductsId: productsID
      }
    })

    return orden;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrdenById = async (ordenId: string, products: any) => {
  try {
    const newProducts = []
    for await (const iterator of products.map((product: any) => addOrUpdateProductOrder(ordenId, product))) {
      newProducts.push(iterator)
    }

    return newProducts
  } catch (error) {
    
  }
}

const addOrUpdateProductOrder = async (ordenId: string, product: any) => {
  try {
    const isproductSave = await prisma.orderProducts.findFirst({
      where: {
        AND: [
          {
            ordenId,
          },
          {
            productId: product.id
          },
        ],
      },
      select: {
        id: true
      }
    });
    console.log(isproductSave?.id)
    let id = null
    if(isproductSave?.id) {
      id = await prisma.orderProducts.update({
        where: {
          id: isproductSave.id
        },
        data: {
          cantidad: product.cantidad
        },
        select: {
          id: true
        }
      })
    } else {
      id = await prisma.orderProducts.create({
        data: {
          ordenId,
          productId: product.id,
          cantidad: product.cantidad
        },
        select: {
          id: true
        }
      })
    }

    return id.id
  } catch (error) {
    console.error(error)
  }
};
