import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
  return (
    <button className="flex items-center w-full cursor-pointer h-full" 
      onClick={async()=>{
        setLoading(true)
        await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
        toast.success("Logout Successfully")
        setLoading(false)
     
      router.push("/sign-in"); // redirect to login page
    },
  },
});

                  }}
    >
{loading ? <Loader className="animate-spin"/> :      <LogOut className="mr-3 h-4 w-4" />}
      <span className="font-bold">Logout</span>
    </button>
  );
};

export default LogoutButton;
