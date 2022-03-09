import prisma from "../database/db";

export async function getOrders (){
    try {
      const orders: any = await prisma.cart.findMany({
        //   where: {
        //       id : ordersId
        //   }
      })
      console.log(orders)
      if(orders) return orders;
    } catch (error) {
        console.log(error)
        return null;
    }
}

