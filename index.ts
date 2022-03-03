import { PrismaClient } from "@prisma/client";
 

const prisma = new PrismaClient()
async function main() {
    await prisma.$connect()
    await prisma.users.create({
   data:  {
     name : "pikachu",
     name_user : "tati",
     email : "elmejor@gmail.com",
     direction : "tucasa 123",
     rol : 3,
    shops : {
        create : [
            {
                name : "asd",
                direction : "lcdth 12",
                image : "asd.png",
                description : "lalala",
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