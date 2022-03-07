import { Products } from "@prisma/client";
import prisma from "../database/db";
import { Product, ProductOptions } from "../Items/Product.interface";

export const getProducts = async (
  options?: ProductOptions
): Promise<null | Product[]> => {
  try {
    let products: any = await prisma.products.findMany();
    for (let i = 0; i < products.length; i++) {
      let arrCategories: any[] = await prisma.categories.findMany({
        where: {
          id: { in: products[i].categoriesId },
        },
        select: {
          name: true,
        },
      });
      products[i] = {
        id: products[i].id,
        name: products[i].name,
        image: products[i].image,
        description: products[i].description,
        price: products[i].price,
        discount: products[i].discount,
        stock: products[i].stock,
        categories: arrCategories.map((el) => el.name),
      };

      //console.log(products[i]);
    }

    return products;
  } catch (error) {
    return null;
  }
};

export const filterbyCategory = async (category: any) => {
  const idProduct: any[] = await prisma.categories.findMany({
    where: {
      name: category,
    },
    select: {
      productId: true,
    },
  });

  const filterCategory: any[] = await prisma.products.findMany({
    where: {
      id: { in: idProduct },
    },
  });
  return filterCategory;
};

export const filterByName = async (name: any) => {
  const all: any[] = await prisma.products.findMany();
  const filteredByName: any[] = all.filter((e) =>
    e.name.toLowerCase().includes(name.toLowerCase())
  );
  console.log(filteredByName);
  return filteredByName;
};

export const filterById = async (id: any) => {
<<<<<<< HEAD
  const filterID: any[] = await prisma.products.findMany({
    where: {
      id,
    },
  });
  return filterID;
=======

  let filterID = await prisma.products.findUnique({
    where: {
      id
    }
  })
  let arrCategories :any[] = await prisma.categories.findMany({
    where: {
      id: { in: filterID?.categoriesId}
    },
    select: {
      name: true
    }
  })
  let shop = await prisma.shops.findUnique({where: {id: filterID?.shopId}, select: {name: true}})
  return {
    id: filterID?.id,
    name: filterID?.name,
    image: filterID?.image,
    description: filterID?.description,
    price: filterID?.price,
    discount: filterID?.discount ,
    stock: filterID?.stock,
    categories: arrCategories.map(el => el.name),
    shop: shop
  }

  
>>>>>>> main
};

export const saveNewProduct = async (data: any) => {
  try {
    const newProduct: any = await prisma.products.create({
      data: data,
    });

    for (let i = 0; i < data.categoriesId.length; i++) {
      let idPro = await prisma.categories.findUnique({
        where: {
          id: data.categoriesId[i],
        },
        select: {
          productId: true,
        },
      });
      idPro?.productId.push(newProduct.id);

      const category = await prisma.categories.update({
        where: {
          id: data.categoriesId[i],
        },
        data: {
          productId: idPro?.productId,
        },
      });

      //console.log(idPro);
    }
    if (newProduct) return newProduct;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const infoProduct = async (
  idProduct: string
): Promise<Products | null> => {
  try {
    let product: Products | null = await prisma.products.findUnique({
      where: { id: idProduct },
    });
    return product;
  } catch (error) {
    return null;
  }
};
