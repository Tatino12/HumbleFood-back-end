/**
 * Required External Modules and Interfaces
 */
import { Router } from "express";
import { getAllUsers } from "../controllers";

/**
 * Router Definition
 */
export const router = Router();

/**
 * Controller Definitions
 */

router.get('/shop')

router.get('/users', getAllUsers)


