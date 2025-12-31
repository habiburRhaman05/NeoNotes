

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  NotebookPen, 
  Settings, 
  LogOut, 
  User, 
  CreditCard,
  Bell,
  Search
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from '../auth/logoutButton';
import { authServices } from '@/services/auth/authService';
import ProfileAvater from '../auth/ProfileAvater';

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Notes", href: "/notes", icon: <NotebookPen className="w-4 h-4" /> },
];

export default  async function Header() {
  // Normally you'd get this from your useAuth() hook
  const user = await authServices.getUserSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
              <span className="text-white font-black text-xl italic">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Neo<span className="text-indigo-600">Notes</span>
            </span>
          </Link>

          {/* DESKTOP MENUS */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ACTIONS SECTION */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
          </button>

{/*  AVATER  */}
<ProfileAvater user={user}/>
         
        </div>
      </div>
    </header>
  );
}