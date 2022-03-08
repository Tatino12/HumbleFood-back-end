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
  
} from "../controllers";
import { addNewComment } from "../controllers/review.controller";
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
router.post("/product", saveProduct);

router.get("/categories", getAllCategories);
router.post("/category", postCategory);

router.post("/review", addNewComment);