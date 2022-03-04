import { PrismaClient } from "@prisma/client";
import { Product } from "../Items/Product.interface";

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

export const filterbyCategory = (products: any, category: any) => {
  let filteredProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].categoriesId.includes(category)) {
      filteredProducts.push(products[i]);
    }
  }
  return filteredProducts;
};

export const saveNewProduct = async (
  prisma: PrismaClient,
  product: any,
  data: any
) => {
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
