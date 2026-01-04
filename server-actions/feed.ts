"use server"

import { revalidatePath, revalidateTag } from "next/cache";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function refreshData(tag:string) {
  // ডাটাবেজ আপডেট বা রিভ্যালিডেশনের আগে ৩ সেকেন্ড ডিলে
  await delay(1000); 
  console.log("validate");
revalidateTag("blog","max")
  revalidatePath("/feed")

}