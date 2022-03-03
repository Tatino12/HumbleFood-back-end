/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import { allUsersList } from "./user.controller"

const prisma: PrismaClient = new PrismaClient()
prisma.$connect().then(() => console.log('listo'))

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // let { pageBase } = req.query;
        // const pageAsNumber = parseInt(pageBase);

        // if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        //     pageBase = pageAsNumber
        // }


        const userList = await allUsersList(prisma);
        if(!userList) throw new Error()

        res.status(200).json(userList);

    } catch (error) {
        res.status(500).json({msg: "Error"})
    }
}

/**
 * Params
 *      all shops
 * id   un tienda
 * 
 */
export const getShops = async (req: Request, res: Response) => {
    try {
        const { isShop } = req.query;
        if(isShop) {

        }



    } catch (error) {
        
    }
}