import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      passwordExpiry: Date;
      createdAt: Date;
    } & DefaultSession['user'];
  }

  interface JWT {
    id: string;
    role: string;
    passwordExpiry: Date;
    createdAt: Date;
  }
}
