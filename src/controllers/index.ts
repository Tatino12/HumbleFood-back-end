/**
 * Required External Modules and Interfaces
 */
import { Request, Response } from "express";
import { allUsersList, saveNewUser} from "./user.controller";
import {
  getProducts,
  saveNewProduct,
  filterbyCategory,
  filterByName,
  filterById,
} from "./product.controller";
import { getCategories, saveNewCategory } from "./categories.controller";
import { getShops, saveNewShop } from "./shop.controller";
import { addNewComment } from "./review.controller";

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

export const addShop = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const shop = await saveNewShop(data);
    res.status(200).send(shop);
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

/* -------------------------------------------------------------------------------------------- */

// PRODUCTS

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let filteredProducts = {};
    let { category } = req.query; //nombre de la categoria, no el id
    let { name } = req.query;
    let { id } = req.query;
    //  console.log(req.query);
    let pageBase: number = 0,
      myPage: string = req.query.page as string;
    const pageAsNumber: number = parseInt(myPage);

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      pageBase = pageAsNumber;
    }

    const products = await getProducts(pageBase);
    if (category) {
      filteredProducts = await filterbyCategory(category);
      res.status(200).json(filteredProducts);
    } else if (name) {
      filteredProducts = await filterByName(name);
      res.status(200).json(filteredProducts);
    } else if (id) {
      filteredProducts = await filterById(id);
      res.status(200).json(filteredProducts);
    } else {
      res.status(200).json(products);
    }
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

export const addUser = async (req: Request, res: Response) => {
  try {
    const { userId, name, name_user, email, direction, rol, shopsId } =
      req.body;
    const data = { userId, name, name_user, email, direction, rol, shopsId };
    const user = await saveNewUser(data);
    res.status(201).send({ msj: "Usuario creado correctamente", user: user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "error", error: error });
  }
};

export const addCommentUser = async (req: Request, res: Response) => {
  try {
    console.log("hola")
    const { userId, productId, contentReview, pointProduct } = req.body;
     if (!userId || !productId || !contentReview || !pointProduct) 
     throw new Error()

    const user = await addNewComment(req.body);
    res.status(201).send({ msg : "Comentario creado exitosamente", user: user });
  } catch (error) {
    console.error(error)
    res.status(401).json({ msg: "error", error: error });
  }
}
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
