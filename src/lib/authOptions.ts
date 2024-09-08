import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth'; // Importamos `NextAuthOptions` para tipar `authOptions`
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            passwordExpiry: user.passwordExpiry,
            createdAt: user.createdAt,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.passwordExpiry = user.passwordExpiry;
        token.createdAt = user.createdAt;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.passwordExpiry = token.passwordExpiry as Date;
      session.user.createdAt = token.createdAt as Date;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    signOut: '/auth/signin',  // Aquí defines la ruta de redirección después del logout

  },
  debug: true,
};
