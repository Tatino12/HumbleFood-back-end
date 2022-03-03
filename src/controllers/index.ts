// controllers
import { PrismaClient } from "@prisma/client"




export class Products{
    prisma: PrismaClient
    constructor(){
        this.prisma = new PrismaClient()
        this.conection()
        
    }
   async conection(){
        await this.prisma.$connect()
    }
  async getProducts(){
   const allProducts = await this.prisma.products.findMany()
    return allProducts 
   }
}

const products = new Products()
export default products;