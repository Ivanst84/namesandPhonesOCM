// src/actions/getUsers.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
  "use server";
  try {
    const users = await prisma.user.findMany(); // Obtén todos los usuarios
    console.log(users); // Imprime los usuarios en la consola del servidor
    return users;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return [];
  }
}
