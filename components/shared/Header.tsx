"use client"

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authServices } from "@/services/auth/authService";
import {
  Bell,
  Search
} from "lucide-react";
import ProfileAvater from "../auth/ProfileAvater";
import ToggleTheme from "./toggleTheme";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default  function Header() {

   const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 

  return (
    <header className="w-full h-16 border-b border-zinc-200 dark:border-zinc-800 bg-[#fbfbfb] dark:bg-zinc-950 px-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Left Side: Sidebar Toggle & Logo */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900" ></SidebarTrigger>
        
        <div className="flex items-center gap-2">
       <div className="flex items-center gap-2 group cursor-pointer select-none">
  <div className="relative flex items-center justify-center w-9 h-9 bg-zinc-900 dark:bg-zinc-100 rounded-xl transition-all duration-500 group-hover:rotate-[10deg] group-hover:shadow-lg group-hover:shadow-indigo-500/20">
    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
    <span className="text-white dark:text-zinc-900 font-black text-xl tracking-tighter">
      S
    </span>
  </div>

  <div className="flex flex-col -space-y-1">
    <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-indigo-600 transition-colors group-hover:text-indigo-800 dark:group-hover:text-indigo-400">
      Synapse
    </span>
    <span className="text-[9px] mt-1 font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
      Intellect
    </span>
  </div>
</div>
        </div>
      </div>

      {/* Center: Search Bar (Desktop) */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search posts, tags, or authors..."
            className="w-full h-10 pl-10 pr-4 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Right Side: Theme, Notifications, and Your Previous Avatar Style */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="md:hidden text-zinc-600 dark:text-zinc-400">
          <Search className="h-5 w-5" />
        </Button>

        {/* Theme Toggle */}
      <ToggleTheme />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-zinc-600 dark:text-zinc-400 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
        </Button>

        {/* Your Previous Avatar Style (Better-Auth Look) */}
        {/*  AVATER  */}
<ProfileAvater user={session?.user}/>
      </div>
    </header>
  );
}



