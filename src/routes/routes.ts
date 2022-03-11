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
  // createOrden,
  updateOrderProducts,
  getUser,
  getShop,
  // getCarrito,
  // saveCarrito,
  updateToAdmin,
  getReviews,
  createOrder,
  getEveryOrder,
  updateOrder,
  banUser,
  deleteReview,
  getOrderProducts,
} from "../controllers";

/**
 * Router Definition
 */
export const router = Router();

/**
 * Controller Definitions
 */
router.get("/shops", getAllShops);
router.get("/shop/:shopId", getShop);
router.post("/shop", addShop);

router.get("/users", getAllUsers);
router.get("/user/:userId", getUser);
router.post("/user", addUser);
router.put("/user/:userId", banUser);
router.put("/user/:email", updateToAdmin);

router.get("/products", getAllProducts);
router.get("/productShop/:shopId", getAllProducts);
router.post("/product", saveProduct);
router.delete("/product/delete/:productId", deleteProduct);
router.put("/product/update", updateProduct);

router.get("/categories", getAllCategories);
router.post("/category", postCategory);

router.post("/review", addCommentUser);
router.get("/reviews/:id", getReviews);
router.delete("/review/:id", deleteReview);

router.get("/orders", getEveryOrder);
router.get("/orders/:id", getAllOrders); //id de shops o users o orders
router.get("/orderProducts/:id", getOrderProducts);
router.put("/order", updateOrderProducts); //recibe id, products por body
router.put("/order/:id/:state", updateOrder); // recibe id de la orden
router.post("/order", createOrder);
// router.post("/order", saveOrder);

// router.get("/carrito/:idUser", getCarrito);
// router.post("/carrito/:idUser", saveCarrito);
