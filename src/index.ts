import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Crear el usuario administrador sin fecha de expiración de contraseña
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      password: 'admin123', // En un entorno real, asegúrate de encriptar las contraseñas
      role: 'ADMIN', // El rol de administrador
      // No agregamos la fecha de expiración para el administrador
    },
  });

  console.log('Admin created:', admin);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
