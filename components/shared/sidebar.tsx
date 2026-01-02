"use client";

import * as React from "react";
import { LayoutDashboard, FileText, Bookmark, Search, Settings, Bell, PlusCircle, User, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" className="top-16 lg:block hidden h-[calc(100vh-64px)] border-r border-zinc-200 dark:border-zinc-800">
      <SidebarContent className="bg-[#fbfbfb] dark:bg-zinc-950 ">
        
     

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500">Menu</SidebarGroupLabel>
          <SidebarMenu>
            {[
              { name: "Feed", icon: LayoutDashboard, href: "/feed" },
              { name: "My Posts", icon: FileText, href: "/my-posts" },
              { name: "Saved", icon: Bookmark, href: "/saved" },
            ].map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={pathname === item.href} className="rounded-md p3-5">
                  <Link href={item.href}>
                    <item.icon className="w-5 h-5" />
                    <span className="">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#fbfbfb] dark:bg-zinc-950 p-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 p-2">
          <div className="h-8 w-8 rounded-full bg-zinc-300 dark:bg-zinc-800 overflow-hidden shrink-0">
             <User className="h-full w-full p-1 text-zinc-500" />
          </div>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
            <p className="truncate text-xs font-bold dark:text-zinc-100">John Doe</p>
          </div>
          <LogOut className="h-4 w-4 text-zinc-400 shrink-0 group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}