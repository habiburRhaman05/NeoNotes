"use client";

import * as React from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Bookmark, 
  User2, 
  ShieldCheck, 
  Users, 
  Settings,
  Loader2,
  Compass
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const MENU_CONFIG = {
  USER: [
    { name: "Feed", icon: LayoutDashboard, href: "/feed" },
    { name: "Profile", icon: User2, href: "/account/profile" },
    { name: "My Posts", icon: FileText, href: "/my-posts" },
    { name: "Reading List", icon: Bookmark, href: "/reading-list" },
  ],
  ADMIN: [
    { name: "Overview", icon: ShieldCheck, href: "/admin-dashboard" },
    { name: "Manage Users", icon: Users, href: "/admin-dashboard/users" },
    { name: "Manage Posts", icon: FileText, href: "/admin-dashboard/posts" },
    { name: "Manage Comments", icon: Settings, href: "/admin-dashboard/settings" },
    { name: "Explore", icon: Compass, href: "/explore" },
  ],
};

export function AppSidebar() {
  const pathname = usePathname();
  const { data, isPending } = useSession();

  // For modern aesthetics, we use a role-based split
  const userRole = data?.user?.role || "USER";
  const menuItems = userRole === "ADMIN" ? MENU_CONFIG.ADMIN : MENU_CONFIG.USER;

  return (
    <Sidebar 
      collapsible="offcanvas" 
      className="top-16 lg:block hidden h-[calc(100vh-64px)] border-r border-zinc-800/50"
    >
      <SidebarContent className="bg-[#1c1c21] text-zinc-400">
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 px-2 mb-4">
            {userRole === "ADMIN" ? "Administrator" : "Menu"}
          </SidebarGroupLabel>

          <SidebarMenu className="gap-1.5">
            {isPending ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-5 h-5 animate-spin text-zinc-600" />
              </div>
            ) : (
              menuItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      className={cn(
                        "relative group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300",
                        "hover:bg-zinc-800/50 hover:text-zinc-100",
                        isActive 
                          ? "bg-zinc-800/80 text-zinc-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                          : "bg-transparent text-zinc-400"
                      )}
                    >
                      <Link href={item.href} className="w-full flex items-center gap-3">
                        {/* Vertical Indicator on Active */}
                        {isActive && (
                          <div className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-full" />
                        )}
                        
                        <item.icon className={cn(
                          "w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110",
                          isActive ? "text-indigo-400" : "text-zinc-500"
                        )} />
                        
                        <span className="text-sm font-medium tracking-tight">
                          {item.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}