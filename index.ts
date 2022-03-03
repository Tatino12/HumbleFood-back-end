import { PrismaClient } from "@prisma/client";
import express, { Router } from "express";
import routes from "./src/routes";



class Server {
  app: express.Application;

  constructor() {
<<<<<<< HEAD
    this.app = express();
    this.config();
=======
    this.app = express()
    this.config()
    this.routes()
>>>>>>> main
  }

  config() {
    this.app.use(express.json());
  }
<<<<<<< HEAD

  start() {
    this.app.listen(3001, () => {
      console.log("servidor en el purto 3001");
    });
=======
  routes(){
    this.app.use("/", routes)
  }

  start() {
    this.app.listen(3000, () => {
      console.log("servidor en el puerto 3000")
    })
>>>>>>> main
  }
}

const prisma = new PrismaClient();
async function main() {
<<<<<<< HEAD
  await prisma.$connect();
  await prisma.users.create({
    data: {
      name: "pikachu2",
      name_user: "tati2",
      email: "elmejo2r@gmail.com",
      direction: "tucasa 1232",
      rol: 3,
      shops: {
        create: [
          {
            name: "asd2",
            direction: "lcdth 122",
            image: "asd2.png",
            description: "lal2ala",
          },
        ],
      },
    },
  });
  const allUsers = await prisma.users.findMany();
  console.log(allUsers);
=======
    await prisma.$connect()
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
const allUsers = await prisma.users.findMany()
console.log(allUsers)
>>>>>>> main
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const server = new Server();
server.start();
