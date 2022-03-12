/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import {
  allUsersList,
  saveNewUser,
  userToAdmin,
  getUserId,
  ban,
} from "./user.controller";
import {
  getProducts,
  saveNewProduct,
  deletePro,
  updateInfoProduct,
} from "./product.controller";
import { getCategories, saveNewCategory } from "./categories.controller";
import { getShops, saveNewShop, getShopId } from "./shop.controller";
import {
  addNewComment,
  deleteReviewId,
  getProductReviews,
} from "./review.controller";
import {
  createNewOrden,
  // createOrder,
  getOrders,
  orderProducts,
  Orders,
  updateInfoOrder,
  updateOrdenById,
} from "./order.controller";
// import { getCarritoUser, getInfoCart } from "./cart.controller";
import { Producto } from "../Items/Product.interface";
import { sendEmail } from "./email.controller";
import { errores } from "../Items/errors";

// SHOPS
export const getAllShops = async (req: Request, res: Response) => {
  try {
    const shops = await getShops();
    res.status(200).send(shops);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const getShop = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;

    const result = await getShopId(shopId);
    if (result) {
      res.status(200).json({ msg: "Tienda Encontrada", shop: result });
    } else {
      res.status(404).json({ msg: "Tienda no Encontrada", shop: null });
    }
  } catch (error) {
    res.status(404).json({ msg: "Error", shop: error });
  }
};

export const addShop = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const shop = await saveNewShop(data);
    if (shop) {
      res.status(201).json(shop);
    } else {
      res.status(401).json({ msg: "Error! no se pudo crear la Tienda" });
    }
    console.log(shop);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

/* -------------------------------------------------------------------------------------------- */

// ORDERS
export const getEveryOrder = async (req: Request, res: Response) => {
  try {
    const orders = await Orders();
    res.status(201).send(orders);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orders = await getOrders(id);
    res.status(201).send(orders);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

// export const saveOrder = async (req: Request, res: Response) => {
//   try {
//     const data = req.body;
//     if (data) {
//       const newOrder = await createOrder(data);
//       res.status(201).send(newOrder);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ msg: "error", error: error });
//   }
// };

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id, state } = req.params;
    const updatedOrder = await updateInfoOrder(id, state);
    res.status(201).send(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, shopId, products } = req.body;
    const respu = await createNewOrden(userId, shopId, products);
    res.json(respu);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const updateOrderProducts = async (req: Request, res: Response) => {
  try {
    const { ordenId, products } = req.body;
    const repu = await updateOrdenById(ordenId, products);

    res.json(repu);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const getOrderProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productOrder = await orderProducts(id);
    res.status(201).send(productOrder);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

/* -------------------------------------------------------------------------------------------- */

// PRODUCTS

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let { category } = req.query; //nombre de la categoria, no el id
    let { name } = req.query;
    let { id } = req.query;
    let { shopId } = req.params;

    //console.log(req.query);
    let pageBase: number = 0,
      myPage: string = req.query.page as string;
    const pageAsNumber: number = parseInt(myPage);

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      pageBase = pageAsNumber;
    }
    
    let products = await getProducts(pageBase, shopId, category as string, name as string, id as string);
    res.status(200).json(products);
    
  } catch (error) {
    res.send(error);
  }
};

export const saveProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const resultado = await saveNewProduct(data);
    console.log(resultado);
    res
      .status(201)
      .json({ msj: "Producto creado correctamente", product: resultado });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const resultado = await deletePro(productId);
    if (resultado) {
      res
        .status(200)
        .json({ msg: "Producto eliminado con exito", deleted: resultado });
    } else {
      res
        .status(401)
        .json({ msg: "Producto no eliminado", deleted: resultado });
    }
  } catch (error) {
    res.status(401).json({ msg: "error", error: error });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      idProduct,
      name,
      image,
      description,
      price,
      discount,
      stock,
      categoriesId,
    } = req.body;
    if (
      !idProduct ||
      !name ||
      !image ||
      !description ||
      !price ||
      !discount ||
      !stock ||
      !categoriesId
    )
      throw (new Error().message = "datos");

    // TODO La misma verificación pero para el producto
    const productoUpdated: Producto = {
      name,
      image,
      description,
      price: Number.parseInt(price),
      discount: Number.parseInt(discount),
      stock: Number.parseInt(stock),
      categoriesId: categoriesId.split(","),
    };

    const respuesta = await updateInfoProduct(idProduct, productoUpdated);

    res.json(respuesta);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Datos requeridos no enviados" });
  }
};

/* -------------------------------------------------------------------------------------------- */

// USERS

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    let pageBase: number = 0,
      myPage: string = req.query.page as string;
    const pageAsNumber: number = parseInt(myPage);

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      pageBase = pageAsNumber;
    }

    const userList = await allUsersList(pageBase);
    //console.log(userList);

    if (!userList) throw new Error();

    res.status(200).json(userList);
  } catch (error) {
    //console.log(error)
    res.status(500).json({ msg: "Error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId as string;
    const user = await getUserId(userId);
    if (user) {
      res.status(200).json({ user: user[0] });
    } else {
      res.status(400).json({ user: null });
    }
  } catch (error) {
    res.status(404).json({ msg: "Error" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { userId, name, name_user, email, direction } = req.body;
    const data: any = { userId, name, name_user, email, direction };
    const user = await saveNewUser(data);
    res.status(201).send({ msj: "Usuario creado correctamente", user: user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const updateToAdmin = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new Error();
    const user = await userToAdmin(userId);
    if (user) {
      res
        .status(201)
        .send({ msg: `Se cambio el rol de ${user.name} a Admin`, user: user });
    } else {
      res.status(401).json({ msg: "No se encontro user con ese Mail" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const banUser = async (req: Request, res: Response) => {
  try {
    let { userId } = req.params;
    const bannedUser = await ban(userId);
    res.status(201).send({
      msg: `El user ${bannedUser?.name} ha sido banneado satisfactoriamente`,
      bannedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

/* -------------------------------------------------------------------------------------------- */

// CATEGORIES

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const info = await getCategories();
    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({ msg: "error", error: error });
  }
};

export const postCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const result = await saveNewCategory({ name });
    res
      .status(201)
      .json({ msj: "Categoria creada correctamente", category: result });
  } catch (error) {
    res.status(401).json({ msg: "error", error: error });
  }
};

/* -------------------------------------------------------------------------------------------- */

// CART

// export const getCart = async (req: Request, res: Response) => {
//   try {
//     const {total, productos, userId} = req.body
//     const cart = await getInfoCart(total, productos, userId)
//     res.status(201).send( {msg: "ok"})
//   } catch (error) {
//     res.status(401).json({ msg: "error", error: error });
//   }
// }

// export const getCarrito = async (req: Request, res: Response) => {
//   try {
//     const { idUser } = req.params;
//     //TODO buscamos el usuario para verificar que el id que pasan por params es válido

//     const carrito = await getCarritoUser(idUser);

//     if (carrito) {
//       return res.json(carrito);
//     }

//     res.status(404).json({ msg: "Carrito no encontrado." });
//   } catch (error) {
//     res.status(500).json({ msg: errores[1] });
//   }
// };

// export const saveCarrito = async (req: Request, res: Response) => {
//   try {
//     const idUser = req.params.idUser;
//     console.log(Array.from(req.body.products));

//     res.json({ msg: "ok" });
//   } catch (error) {}
// };
/* -------------------------------------------------------------------------------------------- */

// REVIEWS

export const addCommentUser = async (req: Request, res: Response) => {
  try {
    const { userId, productId, contentReview, pointProduct } = req.body;
    if (!userId || !productId || !contentReview || !pointProduct)
      throw new Error();

    const review = await addNewComment(req.body);
    res.status(201).send({ msg: "Comentario creado exitosamente", review });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reviews = await getProductReviews(id);
    res.status(201).send(reviews);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReviewId(id);
    res.status(201).send({
      msg: `Se ha eliminado el comentario: ${deletedReview?.contentReview}`,
      deletedReview,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};
