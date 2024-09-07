import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
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

        // Aseguramos que el usuario contenga los campos que necesitamos
        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            passwordExpiry: user.passwordExpiry,
            createdAt: user.createdAt,
          } as NextAuthUser & { role: string; passwordExpiry: Date; createdAt: Date };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Callback para manejar el token JWT
    async jwt({ token, user }) {
      // Añadimos los atributos personalizados si el usuario está presente
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;  // Forzar el tipo role
        token.passwordExpiry = (user as any).passwordExpiry;
        token.createdAt = (user as any).createdAt;
      }
      return token;
    },
    // Callback para manejar la sesión del usuario
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
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
