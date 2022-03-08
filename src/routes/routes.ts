/**
 * Required External Modules
 */
import { Router } from "express";
import {
  getAllUsers,
  saveProduct,
  getAllProducts,
  addUser,
  getAllCategories,
  postCategory,
  addShop,
  getAllShops,
  addCommentUser,
  
} from "../controllers";

/**
 * Router Definition
 */
export const router = Router();

/**
 * Controller Definitions
 */
router.get("/shops", getAllShops);
router.post("/shop", addShop);

router.get("/users", getAllUsers);
router.post("/user", addUser);

router.get("/products", getAllProducts);
router.get("/productShop/:shopId", getAllProducts)
router.post("/product", saveProduct);

router.get("/categories", getAllCategories);
router.post("/category", postCategory);

router.post("/review", addCommentUser);