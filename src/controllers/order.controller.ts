import prisma from "../database/db";

export async function getOrders (id: string){
    try {
      const orders: any = await prisma.orders.findMany({
           where: {
              shopId : id
          }
      })
      console.log(orders)
      if(orders) return orders;
    } catch (error) {
        console.log(error)
        return null;
    }
}

