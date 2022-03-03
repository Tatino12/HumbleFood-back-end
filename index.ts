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
  await prisma.users.create({
    data: {
      name: "algo",
      name_user: "fdsa",
      email: "fdsafdsa",
      direction: "asdf",
      rol: 23,
      shops: {
        create: [
          {
            name: "fdsa",
            direction: "fdsa",
            image: "fdsa",
            description: "fdsa",
          },
        ],
      },
    },
  });
  const allUsers = await prisma.users.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
