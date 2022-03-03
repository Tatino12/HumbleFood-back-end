import { PrismaClient } from "@prisma/client"
import { Shop } from "../Items/Shop.interface";
import { User, BaseUser } from "../Items/User.interface";
import { Users } from "../Items/Users.interface";

export const allUsersList = async (prisma: PrismaClient): Promise<null | User[]> => {
    try {
        const usersLis: User[] = await prisma.users.findMany() 
        return usersLis;

    } catch (error) {
        return null
    }
}


export const findAllShops =async (prisma:PrismaClient) => {
    try {
        const shopList: Shop[] = await prisma.shops.findMany()
        return shopList;

    } catch (error) {
        return new Error()
    }
}