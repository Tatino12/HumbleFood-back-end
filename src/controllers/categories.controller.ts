import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const getCategories = async () => {
  try {
<<<<<<< HEAD
    const cat: any = await prisma.categories.findMany();
    
=======
    const cat: any[] = await prisma.categories.findMany();
    console.log(cat);
>>>>>>> main
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
