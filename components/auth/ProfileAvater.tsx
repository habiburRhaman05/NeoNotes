"use client"
import { authServices } from '@/services/auth/authService';

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
import { Button } from '../ui/button';
const ProfileAvater = ({user}:{user:any}) => {
    
  return (
 <>
 {!user ? <Button>Login</Button> :  <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="outline-none ml-2">
                <Avatar className="h-9 w-9 border-2 border-transparent hover:border-indigo-500 transition-all cursor-pointer shadow-sm">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-64 p-2 mt-2" align="end" sideOffset={8}>
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none text-zinc-900 dark:text-zinc-100">{user.name}</p>
                  <p className="text-xs leading-none text-zinc-500 dark:text-zinc-400 mt-1 italic">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer py-2.5 rounded-lg focus:bg-indigo-50 dark:focus:bg-indigo-950/30">
                  <User className="mr-3 h-4 w-4 text-zinc-500" />
                  <span className="font-medium">Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2.5 rounded-lg focus:bg-indigo-50 dark:focus:bg-indigo-950/30">
                  <CreditCard className="mr-3 h-4 w-4 text-zinc-500" />
                  <span className="font-medium">Billing & Plans</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2.5 rounded-lg focus:bg-indigo-50 dark:focus:bg-indigo-950/30">
                  <Settings className="mr-3 h-4 w-4 text-zinc-500" />
                  <span className="font-medium">Account Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
            
              className="cursor-pointer py-2.5 rounded-lg text-red-600 focus:bg-red-50 dark:focus:bg-red-800/30 focus:text-red-600">
           <LogoutButton/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
 </>
  )
}

export default ProfileAvater