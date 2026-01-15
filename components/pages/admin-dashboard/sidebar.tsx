import { Button } from '@/components/ui/button'
import { FileText, LayoutDashboard, LogOut, MessageSquare, Settings, Users } from 'lucide-react'

const AdminDashboardSideBar = () => {
  return (
   
        
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

export default AdminDashboardSideBar