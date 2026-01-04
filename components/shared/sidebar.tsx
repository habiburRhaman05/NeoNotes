"use client";

import * as React from "react";
import { LayoutDashboard, FileText, Bookmark, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Feed", icon: LayoutDashboard, href: "/feed" },
    { name: "Profile", icon: User2, href: "/account/profile" },
    { name: "My Posts", icon: FileText, href: "/my-posts" },
    { name: "Reading List", icon: Bookmark, href: "/saved-posts" },
  ];

  return (
    <Sidebar collapsible="offcanvas" className="top-16 lg:block hidden h-[calc(100vh-64px)] border-r border-zinc-200 dark:border-zinc-800">
      <SidebarContent className="bg-[#fbfbfb] dark:bg-zinc-950">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 px-4 mb-2">
            Menu
          </SidebarGroupLabel>
          <SidebarMenu className="px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive} 
                    className={`
                      transition-all duration-200 flex items-center gap-3 px-3 py-2 rounded-lg
                      ${isActive 
                        ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm font-medium" 
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                      }
                    `}
                  >
                    <Link href={item.href}>
                      <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#fbfbfb] dark:bg-zinc-950 p-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="text-xs text-zinc-400">Sidebar Footer</div>
      </SidebarFooter>
    </Sidebar>
  );
}