
import Header from "@/components/shared/Header"
import { AppSidebar } from "@/components/shared/sidebar"

export default function AdminDashboardLayout({children,users}:{
    children:React.ReactNode
    users:React.ReactNode

}){
    return <div>
        <Header/>
         <div className="flex items-center gap-5">
<AppSidebar/>
    
       <div className="w-full">
         {children}
    
       </div>
    </div>
    </div>
}