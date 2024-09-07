// action de newUsers
"use server"

import prisma from '../lib/prisma'

class UserError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'UserError';
    }
  }

export const newUsers = async (email: string, password: string, name: string) => {
// crea un usuario
    try {
    
    const user = await prisma.user.create({
    data:{
      name,  
      email,
        password

    }
    
    });
    
    }catch (error) {
        if (error instanceof Error) {

        if (error.message.includes('Unique constraint failed')) {
            // Error personalizado para violación de unicidad (duplicado)
            throw new UserError('El correo ya está registrado.');
          }
          // Otro tipo de error
          throw new UserError('Error inesperado al registrar el usuario.');
        } else {
          throw new UserError('Error desconocido.');
        }
    }
}
    
    
    