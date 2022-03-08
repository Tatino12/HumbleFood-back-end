import prisma from "../database/db";
import { Shops } from "@prisma/client";

export async function saveNewShop(data: any) {
  try {
    const newShop: any = await prisma.shops.create({ data });
    if (newShop) return newShop;
  } catch (error) {
    return null;
  }
}

export async function getShops() {
  try {
    const shops: any = await prisma.shops.findMany({});
    if (shops) return shops;
  } catch (error) {
    return null;
  }
}
