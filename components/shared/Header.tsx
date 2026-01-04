"use client"

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, AlertCircle, Loader2 } from "lucide-react";
import ProfileAvater from "../auth/ProfileAvater";
import ToggleTheme from "./toggleTheme";
import { authClient } from "@/lib/auth-client";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
  const { 
    data: session, 
    isPending, 
    error 
  } = authClient.useSession();

  return (
    <header className="w-full h-16 border-b border-zinc-200 dark:border-zinc-800 bg-[#fbfbfb]/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Left Side: Sidebar Toggle & Logo */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors rounded-xl" />
        
        <Link href="/feed">
          <div className="flex items-center gap-2 group cursor-pointer select-none">
            <div className="relative flex items-center justify-center w-9 h-9 bg-zinc-900 dark:bg-zinc-100 rounded-xl transition-all duration-500 group-hover:rotate-[10deg] group-hover:shadow-lg group-hover:shadow-indigo-500/20">
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
              <span className="text-white dark:text-zinc-900 font-black text-xl tracking-tighter">S</span>
            </div>
            <div className="flex flex-col -space-y-1 hidden sm:flex">
              <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Synapse
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                Intellect
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <SearchBar />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        
        {/* Error State Indicator (Pro Look) */}
        {error && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-full animate-in fade-in slide-in-from-right-2">
            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[10px] font-black uppercase text-red-600 dark:text-red-400 tracking-tight">Sync Error</span>
          </div>
        )}

        <div className="flex items-center border-x border-zinc-100 dark:border-zinc-800 px-2 sm:px-4 gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="md:hidden text-zinc-600 dark:text-zinc-400 rounded-xl">
            <Search className="h-5 w-5" />
          </Button>

          <ToggleTheme />

          <Button variant="ghost" size="icon" className="relative text-zinc-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900">
            <Bell className="h-5 w-5" />
            {!isPending && !error && (
              <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
            )}
          </Button>
        </div>

        {/* Auth State Management */}
        <div className="pl-1 sm:pl-2 min-w-[40px] flex justify-center">
          {isPending ? (
            <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-900 animate-pulse flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
              <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
            </div>
          ) : (
            <div className={cn("transition-all duration-300", error ? "opacity-50 grayscale" : "opacity-100")}>
              <ProfileAvater user={session?.user} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}