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
  banUnbanUser,
  deleteReview,
  getOrderProducts,
  banUnbanShop,
  getDiscounts,
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
router.put("/shop/alter/:banUnban/:userId", banUnbanShop); // Funcion para bannear shops, 'ban'/'unban'

router.get("/users", getAllUsers);
router.get("/user/:userId", getUser);
router.post("/user", addUser);
router.put("/user/alter/:banUnban/:userId", banUnbanUser); //Misma funcion para ban/unban -> se define por string :banUnban 'ban', 'unban'
router.put("/user/:makeAdmin/:userId", updateToAdmin); // --> makeAdmin / takeAdmin

router.get("/products", getAllProducts);
router.get("/productShop/:shopId", getAllProducts);
router.get("/productShop/:shopId/discounts", getDiscounts); // --> Devuelte un array con los descuentos contenidos por productos dentro de una misma tienda.
router.post("/product", saveProduct);
router.delete("/product/delete/:productId", deleteProduct);
router.put("/product/update", updateProduct);

router.get("/products/discount/:order"); // --> order: 'asc' / 'des'

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
