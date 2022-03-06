import { Products } from "@prisma/client";
import prisma from "../database/db";
import { Product, ProductOptions } from "../Items/Product.interface";

export const getProducts = async ( options?: ProductOptions ): Promise<null | Product[]> => {
  try {
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



export const saveNewProduct = async (data: any) => {
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

export const infoProduct = async (idProduct: string): Promise<Products | null> => {
  try {
    let product: Products | null = await prisma.products.findUnique({where: {id: idProduct}})
    return product
  } catch (error) {
    return null
  }
}