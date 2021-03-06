import { PrismaClient } from "@prisma/client";
import { nextTick } from "process";

const prisma: PrismaClient = new PrismaClient();

const getCategoriesByshopId = async (shopId: string) => {
  try {
    let productsCategories: any = await prisma.products.findMany({
      where: {
        shopId,
      },
      select: {
        categoriesId: true,
      },
    });

    let categories: any;
    for (let i = 0; i < productsCategories.length; i++) {
      productsCategories[i] = await prisma.categories.findMany({
        where: {
          id: { in: productsCategories[i].categoriesId },
        },
        select: {
          name: true,
        },
      });
    }
    productsCategories = productsCategories.map((elem: any) => elem[0].name);
    productsCategories = productsCategories.filter(
      (valor: string, indice: number) =>
        productsCategories.indexOf(valor) === indice
    );
    //console.log(productsCategories);
    return productsCategories;
  } catch (error) {
    return null;
  }
};
export const getCategories = async (shopId?: string) => {
  try {
    let cat: any;
    if (shopId) {
      cat = await getCategoriesByshopId(shopId);
    } else {
      cat = await prisma.categories.findMany();
    }
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

export const getCategoriesObject = async () => {
  try {
    const categories = prisma.categories.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return categories;
  } catch (error) {
    return null;
  }
};

export const deleteNamedCategory = async (name: string) => {
  try {
    const deletedCategory = await prisma.categories.delete({
      where: {
        name,
      },
    });
    return deletedCategory;
  } catch (error) {
    return null;
  }
};
