/**
 * Required External Modules
 */
import { Router } from "express";
import { getAllUsers, saveProduct, getAllProducts, addUser, getInfoProduct} from "../controllers";
/**
 * Router Definition
 */
export const router = Router();

/**
 * Controller Definitions
 */

router.get("/shop");
router.get("/users", getAllUsers);
router.post("/user", addUser);
router.get("/products", getAllProducts);
router.post("/product", saveProduct);
router.get('/product/info/:idProduct', getInfoProduct)

