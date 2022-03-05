/**
 * Required External Modules
 */
import { Router } from "express";
import { getAllUsers, saveProduct, getAllProducts, addUser, getAllCategories, postCategory} from "../controllers";
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
router.get("/categories", getAllCategories);
router.post("/category", postCategory);

