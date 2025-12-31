// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // আপনার এক্সপ্রেস ব্যাকএন্ডের URL
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
});

// এই হুকগুলো আপনি আপনার কম্পোনেন্টে ব্যবহার করবেন
export const { useSession, signIn, signUp, signOut } = authClient;