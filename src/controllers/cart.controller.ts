import prisma from "../database/db";
import { validateOrder } from "./order.controller";

export async function getInfoCart (total: any , productos: any , userId: any) {
    try {
        const cart = await prisma.cart.upsert({
                where: {
                  userId
                },
                update: {},
                create: {
                  userId,
                  ordersId: [],
                  total: 2
                }

        })
       await validateOrder(userId, cart.id)
    } catch (error) {
        console.log(error);
        return null;
    }
}