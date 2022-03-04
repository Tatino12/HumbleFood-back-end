/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { allUsersList } from "./user.controller";
import { allProducts, saveNewProduct } from "./product.controller";
import { Product } from "../Items/Product.interface";

const prisma: PrismaClient = new PrismaClient();
prisma.$connect().then(() => console.log("listo"));

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    let pageBase: number = 0, myPage: string = req.query.page as string;
    const pageAsNumber: number = parseInt(myPage)

    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      pageBase = pageAsNumber
    }

    const userList = await allUsersList(prisma, pageBase);
    if (!userList) throw new Error();


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
        
 
  };
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const products = await allProducts(prisma);

    res.status(200).json(products);
  } catch (error) {
    res.send(error);
  }
};


export const saveProduct = async (req: Request, res: Response) => {
  try {
    const resultado = await saveNewProduct(prisma, req.body)
    console.log(resultado)

    res.json(resultado)
  } catch (error) {
    console.error(error)
    res.status(400).json({msg: "error"})
  }
}
