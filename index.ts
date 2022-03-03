//import { PrismaClient } from "@prisma/client";
import express from "express";
//import routes from "./src/routes";
import {router } from './src/routes/routes'


// class Server {
//   app: express.Application;

//   constructor() {
//     this.app = express()
//     this.config()
//     this.routes()
//   }

//   config() {
//     this.app.use(express.json())
//   }
//   routes(){
//     this.app.use("/", routes)
//   }

//   start() {
//     this.app.listen(3000, () => {
//       console.log("servidor en el puerto 3000")
//     })
//   }
// }



// const prisma = new PrismaClient()
// async function main() {
//     await prisma.$connect()
  //   await prisma.users.create({
  //  data:  {
  //    name : "pikachu2",
  //    name_user : "tati2",
  //    email : "elmejo2r@gmail.com",
  //    direction : "tucasa 1232",
  //    rol : 3,
  //   shops : {
  //       create : [
  //           {
  //               name : "asd2",
  //               direction : "lcdth 122",
  //               image : "asd2.png",
  //               description : "lal2ala",
  //           }
  //       ]
  //   }
  //  }  
//  })
// const allUsers = await prisma.users.findMany()
// console.log(allUsers)
// }

// main()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })


// const server = new Server()
// server.start()


const server = express()

// midlewares
server.use(express.json())

// routes
server.use('/',router)

server.listen(3000, () => {
  console.log("servidor en el puerto 3000")
})

