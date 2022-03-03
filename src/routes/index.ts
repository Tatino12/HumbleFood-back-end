// routes
import { Request, Response } from "express";
import { Router } from "express";
import { Products } from "../controllers";

const router = Router()



class Routes {
    router : Router
    products: Products
    constructor(){
        this.router = Router()
        this.products = new Products()
        this.routes()

    }
   async getProducts(req: Request, res: Response){
       const allProducts = await this.products.getProducts()
        res.send(allProducts)
    }
    routes(){
        this.router.get("/", this.getProducts)
    }
}

const routes = new Routes()
routes.routes()
export default routes.router








module.exports = router