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
  deleteProduct,
  updateProduct,
  //getCart,
  getUser,
  getShopUser,
  getCarrito,
  saveCarrito,
  updateToAdmin,
  // getReviews,
} from "../controllers";

/**
 * Router Definition
 */
export const router = Router();

/**
 * Controller Definitions
 */
router.get("/shops", getAllShops);
router.get("/shop/:idUser", getShopUser);
router.post("/shop", addShop);

router.get("/users", getAllUsers);
router.get("/user/:userId", getUser);
router.post("/user", addUser);
router.put("/user/:email", updateToAdmin);

router.get("/products", getAllProducts);
router.get("/productShop/:shopId", getAllProducts);
router.post("/product", saveProduct);
router.delete("/product/delete/:productId", deleteProduct);
router.put("/product/update", updateProduct);

router.get("/categories", getAllCategories);
router.post("/category", postCategory);

router.post("/review", addCommentUser);
// router.get("/reviews/:id", getReviews)
router.get("/orders/:id", getAllOrders);

router.get("/carrito/:idUser", getCarrito);
router.post("/carrito/:idUser", saveCarrito);
