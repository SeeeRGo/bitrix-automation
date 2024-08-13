"use server";

import { createSession } from "../app/lib/session";
import { signIn as authSignIn } from "../auth";

export const signIn = async (data: any) => {
  const userId = await authSignIn('credentials', data);
  await createSession(userId)
};