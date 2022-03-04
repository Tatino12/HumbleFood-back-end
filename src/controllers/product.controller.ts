import { PrismaClient } from "@prisma/client";
import { Product } from "../Items/Product.interface";
import { Products } from "../Items/Products.interface";


export const allProducts = async (prisma: PrismaClient ): Promise<null | Products[]> => {
  try {
    const productList: Products[] = await prisma.products.findMany();
    return productList;
  } catch (error) {
    return null;
  }
};

export const saveNewProduct = async (prisma: PrismaClient, product: any) => {
  try {
    let name = "mariano"
    const newProduct = await prisma.products.create({
      data: {
        name: "ethan",
        image: "http://",
        description: "un producto",
        price: 34,
        discount: "10",
        stock: 3,
        categoriesId: "",
        shopId: "",
        orderId: ""
      }
    })

    if(newProduct) return newProduct

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}