import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        const db = await getDatabase();
        const user = await db.collection('users').findOne({
          email: credentials.email
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.name = user.name;
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }) {
    if (token && session.user) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
    }
    return session;
  },
  async redirect({ url, baseUrl }) {
    
    if (url.startsWith('/')) return `${baseUrl}${url}`;
    
    if (url === baseUrl) return `${baseUrl}/login`;
    return url;
  },
},
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
};
