/**
 * Required External Modules
 */
import { Router } from "express";
import { getAllUsers, saveProduct, getAllProducts } from "../controllers";
/**
 * Router Definition
 */
export const router = Router();

/**
 * Controller Definitions
 */

router.get("/shop");

router.get("/users", getAllUsers);

router.post("/user");

router.get("/products", getAllProducts);

router.post("/product", saveProduct);
