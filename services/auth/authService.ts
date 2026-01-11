import { headers } from "next/headers";

async function getUserSession() {
  try {
    const headerList = await headers();
    const cookie = headerList.get("cookie"); // কুকিটি আলাদাভাবে নিন

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`, {
      method: "GET",
      headers: {
        "Cookie": cookie || "", // সার্ভার টু সার্ভার কুকি পাসিং
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Session Fetch Error:", error);
    return null;
  }
}


export const authServices = {getUserSession}

