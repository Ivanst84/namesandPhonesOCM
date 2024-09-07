// next-auth.d.ts
import NextAuth from 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  // Extendemos el tipo `User` para incluir `role` y `passwordExpiry`
  interface User extends DefaultUser {
    role: string;
    passwordExpiry: Date;
    createdAt: Date;
  }

  // Extendemos el tipo `Session` para incluir `user` con nuestros campos personalizados
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      passwordExpiry: Date;
      createdAt: Date;
    };
  }
}

declare module 'next-auth/jwt' {
  // Extendemos el tipo `JWT` para incluir los campos personalizados
  interface JWT {
    id: string;
    role: string;
    passwordExpiry: Date;
    createdAt: Date;
  }
}
