import express from "express";
import { router } from "./src/routes/routes";
const morgan = require('morgan');

{
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
//   await prisma.$connect();
//   await prisma.products.create({
//     data: {
//       name: "burguer",
//       image: "string",
//       description: "string",
//       price: 3213,
//       stock: 321,
//       shopId: "6220d4cd519374b7107f5480",
//       categoriesId: "6220d4cd519374b7107f5480",
//       orderId: "6220d4cd519374b7107f5480",
//     },
//   });
// }

// main();
// data: {
//   name: "teinda",
//   direction: "fdskjal",
//   image: "fdfdjsal",
//   description: "fjdklsajofdsa",
//   userId: "62213f79b20237f4350648a6",
// },
//             name      String
// name_user String
// email     String @unique
// direction String
// rol       Int
// shops     Shops[]

//  categories: {
//     create: [
//       {
//         name: 'hot',
//       },
//       {
//         name: 'cold'
//       }
//     ]
//  }

//  export type ShopsCreateInput = {
//   id?: string
//   name: string
//   direction: string
//   image: string
//   description: string
//   user: UsersCreateNestedOneWithoutShopsInput
//   products?: ProductsCreateNestedManyWithoutShopInput
// }

//  export type ProductsCreateInput = {
//   id?: string
//   name: string
//   image: string
//   description: string
//   price: number
//   discount?: string | null
//   stock: number
//   categories?: CategoriesCreateNestedManyWithoutProductsInput
//   categoriesId?: ProductsCreatecategoriesIdInput | Enumerable<string>
//   shop: ShopsCreateNestedOneWithoutProductsInput
//   order?: OrdersCreateNestedOneWithoutProductsInput
// }

// id              String     @id @default(auto()) @map("_id") @db.ObjectId
// name            String
// image           String
// description     String
// price           Int
// discount        String?
// stock           Int
// categories      Categories[]  @relation(fields: [categoriesId], references: [id])
// categoriesId    String[] @db.ObjectId
// shop            Shops @relation(fields: [shopId], references: [id])
// shopId          String @db.ObjectId
// order           Orders? @relation(fields: [orderId], references: [id])
// orderId         String @db.ObjectId

// efault(auto()) @map("_id") @db.ObjectId
// name      String
// products  Products[] @relation(fields: [productId], references: [id])
// productId String[] @db.ObjectId
// const allUsers = await prisma.users.findMany()
// console.log(allUsers)
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

// const server = new Server()
// server.start()
}

const server = express();

// midlewares
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(morgan('dev'));

// routes
server.use("/", router);

server.listen(3001, () => {
  console.log("servidor en el puerto 3001");
});
