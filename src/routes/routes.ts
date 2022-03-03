/**
 * Required External Modules
 */
import { Router } from "express";
import { getAllUsers } from "../controllers";
import { getAllProducts } from "../controllers";

/**
 * Router Definition
 */
export const router = Router();

/**
 * Controller Definitions
 */

router.get("/shop");

router.get("/users", getAllUsers);

router.get("/products", getAllProducts);
