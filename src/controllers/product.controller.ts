import { PrismaClient } from "@prisma/client";
import { Product, ProductOptions } from "../Items/Product.interface";

export const getProducts = async (
  prisma: PrismaClient,
  options: ProductOptions
): Promise<null | Product[]> => {
  try {
    console.log(options)
    const products: any = await prisma.products.findMany({
      where: {
        id: {
          equals: "6222055af23dc2135189343d"
        }
      },
    });
    console.log(products)
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

export const filterByName = (products: any, name: any) => {
  let filteredProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].name === name) {
      filteredProducts.push(products[i]);
    }
  }
  return filteredProducts;
};

export const filterById = (products: any, id: any) => {
let filteredProducts = [];
for (let i = 0; i < products.length; i++) {
  if (products[i].id === id) {
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