import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitbubProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { NextAuthOptions, User, getServerSession } from "next-auth";

import { LoginSubmit, SessionInterface } from "@/common.type";
import { http } from "./utils";
import { isAxiosError } from "axios";

type UserRes = {
  id: string;
  email: string;
  role: string;
  status: string;
  token: string;
};

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitbubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
    async signIn({ user, account, profile }) {
      console.log(profile);

      // if (!account || !account.provider) return false;
      // if (account.provider === "google") {
      //   return true;
      // } else if (account.provider === "github") {
      //   return true;
      // } else if (account.provider === "credentials") {
      //   const credentialUser = user as UserRes;
      //   return credentialUser.status === "ACTIVE";
      // }
      // return user?.status ?? false;
      // const userExist = await prisma.user.findUnique({
      //   where: { email: user.email! },
      // });

      // if (!userExist)
      //   await prisma.user.create({
      //     data: {
      //       email: user.email!,
      //       password: "",
      //       userPreference: {
      //         create: {
      //           username: user.email!,
      //           avatarUrl: user.image!,
      //         },
      //       },
      //     },
      //   });
      return true;
    },
    async jwt({ token, user, account, profile }) {
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
