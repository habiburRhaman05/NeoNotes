
import { createAuthClient } from "better-auth/react";
// Try this path instead
import { nextCookies } from "better-auth/next-js";
export const authClient = createAuthClient({
 
      baseURL: process.env.NEXT_PUBLIC_API_URL, 
      plugins:[nextCookies()]
});

// এই হুকগুলো আপনি আপনার কম্পোনেন্টে ব্যবহার করবেন
export const { useSession, signIn, signUp, signOut,getSession } = authClient;