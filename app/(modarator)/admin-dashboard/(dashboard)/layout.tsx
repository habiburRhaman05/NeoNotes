import DashboardOverview from "@/components/pages/admin-dashboard/overview"

export default function AdminDashboardLayout({children,posts,users}:{
    children:React.ReactNode
    posts:React.ReactNode
    users:React.ReactNode
}){
    return <div>
       {children}
        {users}
        {posts}
  
    </div>
}