"use server";
import { getServerAuthSession } from "@/lib/auth";

export const getToken = async () => {
  const session = await getServerAuthSession();
  return session.user.token;
};
