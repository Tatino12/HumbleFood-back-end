// routes
import { Request, Response } from "express";
import { Router } from "express";
import { Products } from "../controllers";
import { User } from '../Items/Items'
import { PrismaClient } from "@prisma/client"

export const router = Router()
const prisma: PrismaClient = new PrismaClient()

router.get('/', async (req: Request, res: Response) => {
    await prisma.$connect()
    const users = await prisma.users.findMany()
    console.log(users)
    res.json(users)
})

// class Routes {
//     router : Router
//     products: Products
//     constructor(){
//         this.router = Router()
//         this.products = new Products()
//         this.routes()

//     }
//    async getProducts(req: Request, res: Response){
//        const allProducts = await this.products.getProducts()
//         res.send(allProducts)
//     }
//     routes(){
//         this.router.get("/", this.getProducts)
//     }
// }

// const routes = new Routes()
// routes.routes()
// export default routes.router



// module.exports = router