import { PrismaClient } from "@prisma/client";

interface Shops {
  name: string;
  direction: string;
  image: string;
  description: string;
}
const prisma = new PrismaClient();
async function main() {
  await prisma.$connect();
  await prisma.shops.create({
    data: {
      name: "mariano",
      direction: "lasdas 123",
      image: "asd",
      description: "lala",
    },
  });
  const allUsers = await prisma.shops.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
