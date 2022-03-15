import { PrismaClient } from "@prisma/client";
import { nextTick } from "process";

const prisma: PrismaClient = new PrismaClient();

export const getCategories = async () => {
  try {
    // const products = await prisma.products.findMany({
    //   where: {
    //     shopId,
    //   },
    //   select: {
    //     id: true,
    //   },
    // });
    // const productsId = products.map((e) => e.id);

    const cat = await prisma.categories.findMany({});

    // const categories: any = [];

    // for (let i = 0; i < productsId.length; i++) {
    //   cat.forEach((e) => {
    //     if (e.productId.includes(productsId[i])) {
    //       categories.push(e);
    //     }
    //   });
    // }

    // const uniqueCategories = categories.filter(
    //   (value: any, index: any, self: any) => self.indexOf(value) === index
    // );

    console.log(cat);
    return cat;
  } catch (error) {
    return null;
  }
};

export const saveNewCategory = async (data: any) => {
  try {
    const newCate = await prisma.categories.create({ data: data });
    return newCate;
  } catch (error) {
    return null;
  }
};
