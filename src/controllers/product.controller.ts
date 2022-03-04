import { PrismaClient } from "@prisma/client";
import { Product } from "../Items/Product.interface";
import { Products } from "../Items/Products.interface";

export const allProducts = async (
  prisma: PrismaClient
): Promise<null | Products[]> => {
  try {
    const productList: Products[] = await prisma.products.findMany();
    return productList;
  } catch (error) {
    return null;
  }
};

export const filterbyCategory = (products: any, category: any) => {
  let filteredProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].name === category) {
      filteredProducts.push(category);
    }
  }
  return filteredProducts;
};
