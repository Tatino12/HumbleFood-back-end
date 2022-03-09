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
  getAllOrders,
  updateProduct,
  
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
router.put('/product/update', updateProduct)

router.get("/categories", getAllCategories);
router.post("/category", postCategory);

router.post("/review", addCommentUser);

router.get("/orders/:id", getAllOrders);

