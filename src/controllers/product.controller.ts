import { Products } from "@prisma/client";
import prisma from "../database/db";
import { Product, Producto, ProductOptions } from "../Items/Product.interface";

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

export const getProducts = async (page: number, shopId?: string) => {
  try {
    let total: number;
    //console.log(total)
    let products: any[];
    if (shopId) {
      total = await prisma.products.count({ where: { shopId: shopId } });
      products = await prisma.products.findMany({
        where: { shopId: shopId },
        skip: 10 * page,
        take: 10,
      });
    } else {
      total = await prisma.products.count({where: {stock: {not: 0}}});
      //console.log(total);
      products = await prisma.products.findMany({
        where: {
          stock: {
            not: 0,
          },
        },
        skip: 10 * page,
        take: 10,
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
      products,
    };
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

export const filterByName = async (name: any, page: number) => {
  const total = await prisma.products.count({ where: { name: name } });
  const all: any[] = await prisma.products.findMany({
    skip: 10 * page,
    take: 10,
  });

  console.log(total);
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
        id: productId,
      },
    });
    return product;
  } catch (error) {
    return null;
  }
};
export const updateInfoProduct = async (
  idProduct: string,
  producto: Producto
) => {
  try {
    const product = await prisma.products.update({
      where: {
        id: idProduct,
      },
      data: producto,
    });

    for (let i = 0; i < producto.categoriesId.length; i++) {
      let idPro = await prisma.categories.findUnique({
        where: {
          id: producto.categoriesId[i],
        },
        select: {
          productId: true,
        },
      });
      idPro?.productId.push(product.id);

      const category = await prisma.categories.update({
        where: {
          id: producto.categoriesId[i],
        },
        data: {
          productId: idPro?.productId,
        },
      });

      //console.log(idPro);
    }

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};


const orden = () => {
  try {
    prisma.orders.findUnique({
      where: {
        
      }
    })
  } catch (error) {
    
  }
}


const getProductoCarrito = async (id: string) => {
  try {
    let product = await prisma.products.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        discount: true,
        stock: true,
        shopId: true
      }
    });
    return product;
  } catch (error) {
    return null;
  }
};



export const getInforOfManyProducts = async (idProducts: string[]) => {
  try {
    let productosInfo = []

    for await (const iterator of idProducts.map(produc => getProductoCarrito(produc))) {
      productosInfo.push(iterator)
    }

    let newArra: any = []
    let index: number

    for (const produc of productosInfo) {
      index = newArra.findIndex((ele: any) => ele.id === produc?.id)
      if(index >= 0) {
        newArra[index].amount = newArra[index].amount + 1
      } else {
        newArra.push({
          id: produc?.id,
          name: produc?.name,
          price: produc?.price,
          discount: produc?.discount,
          stock: produc?.stock,
          shopId: produc?.shopId,
          amount: 1,
        })
      }
    }

    return newArra
  } catch (error) {
    return null
  }
}