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

    if (orders.length > 0) {
      return orders;
    } else {
      const userOrders: any = await prisma.orders.findMany({
        where: {
          userId: id,
        },
      });
      if (userOrders.length > 0) {
        return userOrders;
      } else {
        const orderOrder: any = await prisma.orders.findMany({
          where: {
            id,
          },
        });
        return orderOrder;
      }
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


// ================ ================ ================ ================ ================

export const createNewOrden = async (
  userId: string,
  shopId: string,
  products: any, // array de productos
  total: any,
) => {
  try {
    const orden = await prisma.orders.create({
      data: {
        userId,
        shopId,
        total: total,
        ordenProductsId: [],
        state: estado.creado,
      },
      // select: {
      //   id: true,
      // },
    });
    // notify(orden.id, "Se ha registrado su compra");
    const productsID = [];
    for await (const iterator of products.map((product: any) =>
      addOrUpdateProductOrder(orden.id, product)
    )) {
      productsID.push(iterator);
    }

    const finalOrder = await prisma.orders.update({
      where: {
        id: orden.id,
      },
      data: {
        ordenProductsId: productsID,
      },
    });

    return finalOrder;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrdenById = async (ordenId: string, products: any) => {
  try {
    const newProducts = [];
    for await (const iterator of products.map((product: any) =>
      addOrUpdateProductOrder(ordenId, product)
    )) {
      newProducts.push(iterator);
    }

    const existenProducts = await prisma.orders.findUnique({
      where: { id: ordenId },
      select: { ordenProductsId: true },
    });

    const prod = new Set([...newProducts, ...existenProducts!.ordenProductsId]);

    const orden = await prisma.orders.update({
      where: {
        id: ordenId,
      },
      data: {
        ordenProductsId: [...prod],
      },
    });

    return orden;
  } catch (error) {}
};

const addOrUpdateProductOrder = async (ordenId: string, product: any) => {
  try {
    const isproductSave = await prisma.orderProducts.findFirst({
      where: {
        AND: [
          {
            ordenId,
          },
          {
            productId: product.id,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    let id = null;
    if (isproductSave?.id) {
      id = await prisma.orderProducts.update({
        where: {
          id: isproductSave.id,
        },
        data: {
          cantidad: product.cantidad,
        },
        select: {
          id: true,
        },
      });
    } else {
      id = await prisma.orderProducts.create({
        data: {
          ordenId,
          productId: product.id,
          cantidad: product.cantidad,
        },
        select: {
          id: true,
        },
      });
    }

    return id.id;
  } catch (error) {
    console.error(error);
  }
};

// ================ ================ ================ ================ ================

export async function updateInfoOrder(id: string, state: any) {
  const newState: any = estado[state];
  if (newState === 1) {
    notify(id, "Se ha registrado su compra!"); // --> Notifica por mail al user comprador
    await updateProductsStocks(id); // --> Actualiza el stock de los productos comprados.
  }
  if (newState === 3) notify(id, "Su orden ha sido enviada!"); // --> Notifica por mail al user comprador
  const orderUpdate = await prisma.orders.update({
    where: {
      id,
    },
    data: { state: newState },
  });

  return orderUpdate;
}

export async function updateProductsStocks(id: string) {
  // --> Updatea el stock de los productos contenidos dentro de una Order.
  try {
    const orders: any = await prisma.orders.findUnique({
      where: {
        id,
      },
      select: {
        ordenProductsId: true,
      },
    });
    let products: any;
    let product;
    for (let i = 0; i < orders.ordenProductsId.length; i++) {
      product = await prisma.orderProducts.findUnique({
        where: {
          id: orders.ordenProductsId[i],
        },
        select: {
          cantidad: true,
          productId: true,
        },
      });
      if (!products) products = [product];
      else products = [...products, product];
    }
    let prevStock: any;
    let newStock: any;
    for (let j = 0; j < products.length; j++) {
      prevStock = await prisma.products.findUnique({
        where: {
          id: products[j].productId,
        },
        select: {
          stock: true,
        },
      });
      newStock = prevStock.stock - products[j].cantidad;
      await prisma.products.update({
        where: {
          id: products[j].productId,
        },
        data: {
          stock: newStock,
        },
      });
    }
  } catch (error) {
    return null;
  }
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
      id: userId.userId,
    },
    select: {
      email: true,
    },
  });
  sendEmail(email[0].email, message);
}

export async function orderProducts(id: string) {
  try {
    const orderProducts = await prisma.orders.findUnique({
      where: {
        id,
      },
    });
    console.log(orderProducts)
    return orderProducts;
  } catch (error) {
    return null;
  }
}

// export async function createOrder(data: any) {
//   const newOrder = await prisma.orders.create({
//     data,
//   });
//   notify(newOrder.id, "Se ha registrado su compra");
//   return newOrder;
// }
