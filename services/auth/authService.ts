import { httpRequest } from "@/config/axios/axios";
import { ProfileData } from "./type";
import { headers } from "next/headers";



async function getUserSession() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`, {
    headers: Object.fromEntries(await headers()), // এটি কুকিগুলো এক্সপ্রেস সার্ভারে পাঠাবে
    cache: "no-store",
  });

  if (!response.ok) return null;
  const data=await  response.json();
 if(data){
   return data.user
 }
 return null

}


export const authServices = {getUserSession}

