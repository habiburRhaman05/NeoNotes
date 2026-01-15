"use client"

import * as React from "react"
import { Moon, Sun, LayoutDashboard, Users, FileText, MessageSquare, Settings, Bell, Search, LogOut, Check, X, TrendingUp, MoreVertical } from "lucide-react"
import { useTheme } from "next-themes"
// Ensure you have this provider setup

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ThemeProvider } from "@/components/shared/theme-provider"

export default function ProfessionalAdminDashboard() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300">
        
        {/* SIDEBAR */}
        <aside className="hidden md:flex w-72 bg-card border-r border-border flex-col sticky top-0 h-screen">
          <div className="p-6 flex items-center gap-3">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              S
            </div>
            <span className="text-xl font-bold tracking-tight">Synapse AI</span>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
            <SidebarItem icon={<Users size={20} />} label="User Directory" />
            <SidebarItem icon={<FileText size={20} />} label="Content Review" />
            <SidebarItem icon={<MessageSquare size={20} />} label="Engagement" />
            <div className="pt-4 pb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">System</div>
            <SidebarItem icon={<Settings size={20} />} label="Site Settings" />
          </nav>

          <div className="p-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
              <LogOut size={20} /> Log out
            </Button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          {/* HEADER / TOP BAR */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center flex-1">
              <div className="relative w-full max-w-md hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Search analytics..." 
                  className="pl-10 bg-muted/50 border-none focus-visible:ring-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" size="icon" className="relative">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </Button>
              <div className="h-8 w-[1px] bg-border mx-2" />
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium leading-none">Alex Rivera</p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* DASHBOARD BODY */}
          <div className="p-8 space-y-8 overflow-y-auto">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
              <p className="text-muted-foreground">Welcome back. Here is what's happening today.</p>
            </div>

            {/* HIGH-LEVEL STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Users" value="24,512" trend="+12.5%" />
              <StatCard title="Active Sessions" value="1,203" trend="+3.1%" />
              <StatCard title="Pending Review" value="42" trend="-5.2%" isNegative />
              <StatCard title="Avg. Engagement" value="68%" trend="+8.4%" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* PRIMARY FEED */}
              <div className="xl:col-span-2 space-y-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Submissions</CardTitle>
                      <CardDescription>You have 12 posts requiring manual approval.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">View Queue</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y divide-border">
                      <ReviewItem title="Building Scalable Microservices" author="Sarah Jenkins" category="Architecture" />
                      <ReviewItem title="The Future of CSS-in-JS" author="David Chen" category="Frontend" />
                      <ReviewItem title="Database Indexing 101" author="Maria Garcia" category="Backend" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-end gap-2 justify-between px-2">
                       {/* Mock Chart Visualization */}
                       {[40, 70, 45, 90, 65, 48, 82].map((h, i) => (
                         <div key={i} className="bg-primary/20 hover:bg-primary transition-colors w-full rounded-t-sm" style={{ height: `${h}%` }} />
                       ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-muted-foreground uppercase tracking-wider">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* SIDEBAR FEED */}
              <div className="space-y-8">
                <Card className="bg-primary text-primary-foreground overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp size={80} />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">99.98%</div>
                    <p className="text-xs opacity-80 mt-1">All services are operating normally.</p>
                    <Button variant="secondary" size="sm" className="mt-4 w-full text-primary font-bold">Check Status</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Leaderboard</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <TopAuthor name="Emma Watson" posts={124} color="bg-orange-500" />
                    <TopAuthor name="Liam Neeson" posts={98} color="bg-blue-500" />
                    <TopAuthor name="Sophia Loren" posts={76} color="bg-emerald-500" />
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

/* SUB-COMPONENTS */

function SidebarItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
      ${active 
        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
        : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
      {icon}
      {label}
    </div>
  )
}

function StatCard({ title, value, trend, isNegative }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-baseline justify-between mt-2">
          <h3 className="text-2xl font-bold">{value}</h3>
          <Badge variant={isNegative ? "destructive" : "secondary"} className="text-[10px]">
            {trend}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewItem({ title, author, category }: any) {
  return (
    <div className="py-4 flex items-center justify-between group">
      <div className="space-y-1">
        <p className="font-semibold text-sm group-hover:text-primary transition-colors">{title}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{author}</span>
          <span>•</span>
          <Badge variant="outline" className="text-[10px] py-0">{category}</Badge>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50">
          <Check size={16} />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/5">
          <X size={16} />
        </Button>
      </div>
    </div>
  )
}

function TopAuthor({ name, posts, color }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-sm font-medium">{name}</span>
      </div>
      <span className="text-xs font-bold">{posts} <span className="text-muted-foreground font-normal">pts</span></span>
    </div>
  )
}

function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}