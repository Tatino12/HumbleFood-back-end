import { PrismaClient } from "@prisma/client";

// CONEXION CON BASE DE DATOS

const prisma: PrismaClient = new PrismaClient();
prisma.$connect().then(() => console.log("listo"));

export default prisma;

/* -------------------------------------------------------------------------------------------- */
