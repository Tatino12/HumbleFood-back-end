import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { allUsersList } from "./user.controller";
import { allProducts } from "./product.controller";

const prisma: PrismaClient = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();

    const userList = await allUsersList(prisma);
    if (!userList) throw new Error();

    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

/**
 * Params
 *      all shops
 * id   un tienda
 *
 */
export const getShops = async (req: Request, res: Response) => {
  try {
    const { isShop } = req.query;
    if (isShop) {
    }
  } catch (error) {}
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    const products = await allProducts(prisma);

    res.status(200).json(products);
  } catch (error) {
    res.send(error);
  }
};
