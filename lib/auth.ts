import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions, getServerSession } from "next-auth";

import { LoginSubmit, SessionInterface } from "@/common.type";
import { http } from "./utils";

interface UserRes {
  id: string;
  email: string;
  role: string;
  status: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { email, password } = credentials as LoginSubmit;
          const { data } = await http.post<{
            message: string;
            user: UserRes;
          }>("/auth/signin", { email, password });
          return data.user;
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token, user }) {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          ...user,
          ...token,
        },
      };
      return newSession;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getServerAuthSession() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
