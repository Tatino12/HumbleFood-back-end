import { Products } from "@prisma/client";
import prisma from "../database/db";
import { Product, Producto, ProductOptions } from "../Items/Product.interface";
import { sendEmail } from "./email.controller";

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
  shopId?: string,
  category?: string,
  name?: string,
  id?: string,
  discount?: number
) => {
  try {
    let total: number = 0;
    let products: any = [];

    //console.log(`${category} y ${discount}`);

    if (shopId && !category && !name && !id && !discount) {
      //console.log(shopId);
      total = await prisma.products.count({ where: { shopId: shopId } });
      products = await prisma.products.findMany({
        where: { shopId: shopId },
        skip: 9 * page,
        take: 9,
      });
    } else if (shopId && name) {
      products = await filterByName(name, page, shopId);
      total = products.length;
    } else if (shopId && id) {
      console.log("hola");
      products = await filterById(id);
      total = products.length;
    } else if (shopId && category && !discount) {
      products = await filterbyCategory(category, shopId as string);
      total = products.length;
    } else if (shopId && discount && !category) {
      products = await filterByDiscount(page, discount as number, shopId);
      total = products.length;
    } else {
      if (shopId && discount && category) {
        products = await filterByCatDis(
          page,
          discount as number,
          category,
          shopId as string
        );
        total = products.length;
      } else if (!products.length) {
        products = await prisma.products.findMany({
          skip: 9 * page,
          take: 9,
        });
        total = await prisma.products.count({ where: { stock: { not: 0 } } });
      }
      //console.log(total);
    }

    for (let i = 0; i < products.length; i++) {
      let arrCategories: any[] = await namesCategories(products[i]);
      //console.log(arrCategories);

      products[i] = {
        ...products[i],
        categories: arrCategories.map((el) => el.name),
      };
    }

    //console.log(products);

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

const filterByCatDis = async (
  page: number,
  discount: number,
  category: string,
  shopId: string
) => {
  try {
    let products: any = await prisma.products.findMany({
      skip: 9 * page,
      take: 9,
      where: {
        shopId,
        discount,
      },
    });

    for (let i = 0; i < products.length; i++) {
      let arrCategories: any = await namesCategories(products[i]);
      arrCategories.forEach((e: any) => {
        //console.log(e);
        if (e.name.toLowerCase() !== category.toLowerCase()) {
          products[i] = [];
        }
      });
    }
    //console.log(products);
    products = products.filter((elem: any) => !Array.isArray(elem));

    return products;
  } catch (error) {
    //console.log(error, "!=");

    return null;
  }
};
export const filterbyCategory = async (category: any, shopId: string) => {
  const idProduct: any[] = await prisma.categories.findMany({
    where: {
      name: category,
    },
    select: {
      productId: true,
    },
  });

  //console.log(idProduct);
  if (idProduct.length) {
    const filterCategory: any[] = await prisma.products.findMany({
      where: {
        id: { in: idProduct[0].productId },
        shopId: shopId,
      },
    });
    return filterCategory;
  } else {
    return [];
  }
};

export const filterByName = async (name: any, page: number, shopId: string) => {
  const total = await prisma.products.count({
    where: { name: name, shopId: shopId },
  });
  const all: any[] = await prisma.products.findMany({
    // skip: 9 * page,
    // take: 9,
    where: {
      shopId: shopId,
    },
  });

  const filteredByName: any[] = all.filter((e) =>
    e.name.toLowerCase().includes(name.toLowerCase())
  );
  return filteredByName;
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

  return [
    {
      ...filterID,
      shop: shop?.name,
    },
  ];
};
export const filterByDiscount = async (
  page: number,
  discount: number,
  shopId: string
) => {
  try {
    let products: any = await prisma.products.findMany({
      skip: 9 * page,
      take: 9,
      where: {
        shopId,
        discount,
      },
    });
    //console.log(products);
    return products;
  } catch (error) {
    console.log(error, "!=");

    return null;
  }
};

export const saveNewProduct = async (data: any) => {
  // TODO: especificar los datos que se deben de recibir de forma obligatoria
  try {
    notifyMailingList(data.shopId);
    const newProduct: any = await prisma.products.create({
      data: data,
    });
    console.log(newProduct);
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
    //console.error(error);
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
    const prevStock = await prisma.products.findUnique({
      where: {
        id: idProduct,
      },
      select: {
        stock: true,
      },
    });
    const product = await prisma.products.update({
      where: {
        id: idProduct,
      },
      data: producto,
    });
    if (prevStock?.stock === 0 && product.stock > 0) {
      notifyMailingList(product.shopId);
    }

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
      where: {},
    });
  } catch (error) {}
};

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
        shopId: true,
      },
    });
    return product;
  } catch (error) {
    return null;
  }
};

export const getInforOfManyProducts = async (idProducts: string[]) => {
  try {
    let productosInfo = [];

    for await (const iterator of idProducts.map((produc) =>
      getProductoCarrito(produc)
    )) {
      productosInfo.push(iterator);
    }

    let newArra: any = [];
    let index: number;

    for (const produc of productosInfo) {
      index = newArra.findIndex((ele: any) => ele.id === produc?.id);
      if (index >= 0) {
        newArra[index].amount = newArra[index].amount + 1;
      } else {
        newArra.push({
          id: produc?.id,
          name: produc?.name,
          price: produc?.price,
          discount: produc?.discount,
          stock: produc?.stock,
          shopId: produc?.shopId,
          amount: 1,
        });
      }
    }

    return newArra;
  } catch (error) {
    return null;
  }
};

export const getProductsNames = async (shopId: string) => {
  try {
    const products = await prisma.products.findMany({
      where: {
        shopId,
      },
      select: {
        name: true,
      },
    });
    const namesArray = products.map((e) => e.name);
    return namesArray;
  } catch (error) {
    return null;
  }
};

const notifyMailingList = async (shopId: string) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        mailingList: true,
      },
    });
    const usersFavourited = users.filter((e) =>
      e.favouriteShops.includes(shopId)
    );
    const shop = await prisma.shops.findUnique({
      where: {
        id: shopId,
      },
      select: {
        name: true,
      },
    });
    const emails = usersFavourited.map((e) => e.email);
    for (let i = 0; i < emails.length; i++) {
      sendEmail(
        emails[i],
        ` Tu tienda favorita ${shop?.name} ha publicado un nuevo producto!!! \n Ven antes de que se lo lleven! \n https://humblefood.vercel.app/productShop/${shopId}`
      );
    }
  } catch (error) {
    return null;
  }
};
