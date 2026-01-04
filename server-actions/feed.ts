"use server"
import { revalidatePath } from "next/cache";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function refreshData() {
  // ডাটাবেজ আপডেট বা রিভ্যালিডেশনের আগে ৩ সেকেন্ড ডিলে
  await delay(3000); 
  revalidatePath("/feed");
}