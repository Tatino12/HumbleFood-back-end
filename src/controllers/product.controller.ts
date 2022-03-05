import { PrismaClient } from "@prisma/client";
import { Product } from "../Items/Product.interface";

const prisma: PrismaClient = new PrismaClient();

export const getProducts = async (
  prisma: PrismaClient
): Promise<null | Product[]> => {
  try {
    const products: any = await prisma.products.findMany();
    return products;
  } catch (error) {
    return null;
  }
};

export const filterbyCategory = async (category: any) => {
  const idProduct : any[] = await prisma.categories.findMany({
    where: {
      name: category
    }, 
    select:{
      productId: true
    }
  })
  
  const filterCategory : any[] = await prisma.products.findMany({
    where: {
      id: { in: idProduct}
    }
  })
  return filterCategory
};

export const filterByName = async ( name: any) => {
  const filterName : any[] = await prisma.products.findMany({
      where:{
        name
      }
  })
  return filterName;
};

export const filterById = async (id: any) => {
  const filterID : any[] = await prisma.products.findMany({
    where: {
      id
    }
  })
  return filterID;
};



export const saveNewProduct = async (prisma: PrismaClient, data: any) => {
  try {
    const newProduct = await prisma.products.create({
      data: data,
    });

    if (newProduct) return newProduct;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};