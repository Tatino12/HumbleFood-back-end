import { PrismaClient } from "@prisma/client";
import { Product } from "../Items/Product.interface";

const prisma: PrismaClient = new PrismaClient();

export const getProducts = async (
  prisma: PrismaClient
): Promise<null | Product[]> => {
  try {
    let products: any = await prisma.products.findMany();
    for (let i = 0; i < products.length; i++) {
      let arrCategories :any[] = await prisma.categories.findMany({
        where: {
          id: { in: products[i].categoriesId}
        },
        select: {
          name: true
        }
      })
      products[i] = {
        name: products[i].name,
        image: products[i].image,
        description: products[i].description,
        price: products[i].price,
        discount: products[i].discount ,
        stock: products[i].stock,
        categories: arrCategories.map(el => el.name)
      }
      
      //console.log(products[i]);
    }
    
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
    const newProduct : any = await prisma.products.create({
      data: data,
    });

    for (let i = 0; i < data.categoriesId.length; i++) {
      
      let idPro = await prisma.categories.findUnique({
        where: {
          id: data.categoriesId[i] 
        },
        select: {
          productId: true
        }
      })
      idPro?.productId.push(newProduct.id)
      
      
      const category = await prisma.categories.update({
        where: {
          id: data.categoriesId[i]
        },
        data: {
          productId: idPro?.productId
        }
      })

      //console.log(idPro);
      
    }
    if (newProduct) return newProduct;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};