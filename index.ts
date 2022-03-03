import { PrismaClient } from "@prisma/client";
import express from "express";

class Server {
  app: express.Application;

  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  config() {
    this.app.use(express.json())
  }

  routes() {
    this.app.use('/',(req, res) => {
      res.send("hola")
    })
  }
  
  start() {
    this.app.listen(3001, () => {
      console.log("servidor en el purto 3001")
    })
  }
}



const prisma = new PrismaClient()
async function main() {
    await prisma.$connect()
    await prisma.users.create({
   data:  {
     name : "pikachu2",
     name_user : "tati2",
     email : "elmejo2r@gmail.com",
     direction : "tucasa 1232",
     rol : 3,
    shops : {
        create : [
            {
                name : "asd2",
                direction : "lcdth 122",
                image : "asd2.png",
                description : "lal2ala",
            }
        ]
    }
   }  
})
const allUsers = await prisma.users.findMany()
console.log(allUsers)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


const server = new Server()
server.start()
