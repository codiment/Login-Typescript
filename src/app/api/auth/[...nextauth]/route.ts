import { prisma } from '@/libs/prisma';
import bcrypt from 'bcrypt';
import NextAuth, { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@something.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined, req) {
        if (!credentials) throw new Error('Credentials are required');

        const { email, password } = credentials;

        const userFound = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!userFound) throw new Error('Invalid credentials');

        const validPassword = await bcrypt.compare(password, userFound.password);

        if (!validPassword) throw new Error('Invalid credentials');

        return {
          id: `${userFound.id}`,
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        (session.user as { id: string }).id = token.sub as string;
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
