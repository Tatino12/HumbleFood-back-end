import { Products } from "@prisma/client";
import prisma from "../database/db";
import { Product, ProductOptions } from "../Items/Product.interface";

async function namesCategories(product: any) {
  let arrCategories: any[] = await prisma.categories.findMany({
    where: {
      id: { in: product.categoriesId },
    },
    select: {
      name: true,
    },
  });

  return arrCategories;
}


export const getProducts = async (
  page: number,
  shopId?: string
) => {
  try {
    let total: number;
    //console.log(total)
    let products: any[];
    if(shopId){
      total = await prisma.products.count({where: {shopId: shopId}})
      products = await prisma.products.findMany({
        where: {shopId: shopId},
        skip: 10 * page,
        take: 10
      });
    }
    else{
      total = await prisma.products.count()
      //console.log(total);
      products = await prisma.products.findMany({
        where: {
          stock: {
            not: 0,
          },
        },
        skip: 10 * page,
        take: 10
      });
    }
    
    for (let i = 0; i < products.length; i++) {
      let arrCategories: any[] = await namesCategories(products[i]);
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

    const pagesTotal = Math.ceil(total / 10);
    return {
      next: page < pagesTotal - 1 ? true : false,
      prev: page > 0 ? true : false,
      pagesTotal,
      products
    }
    
  } catch (error) {
    console.error(error);
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
  return {
    products: filterCategory,
  };
};

export const filterByName = async (name: any) => {
  const all: any[] = await prisma.products.findMany();
  const filteredByName: any[] = all.filter((e) =>
    e.name.toLowerCase().includes(name.toLowerCase())
  );
  return {
    products: filteredByName,
  };
};

export const filterById = async (id: any) => {
  let filterID = await prisma.products.findUnique({

    where: {
      id,
    },
  });
  let arrCategories: any[] = await namesCategories(filterID);
  let shop = await prisma.shops.findUnique({
    where: { id: filterID?.shopId },
    select: { name: true },
  });

  return {
    id: filterID?.id,
    name: filterID?.name,
    image: filterID?.image,
    description: filterID?.description,
    price: filterID?.price,
    discount: filterID?.discount,
    stock: filterID?.stock,

    categories: arrCategories.map((el) => el.name),
    shop: shop,
  };
};

export const saveNewProduct = async (data: any) => {
  // TODO: especificar los datos que se deben de recibir de forma obligatoria
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

export const deletePro = async (productId: string) => {
  try {
    let product = await prisma.products.delete({
      where: {
        id: productId
      }
    })
    return product;
  } catch (error) {
    return null;
  }
}