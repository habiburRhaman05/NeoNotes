import FeedRightSidebar from "@/components/feed/FeedRightContent"
import Header from "@/components/shared/Header"
import { AppSidebar } from "@/components/shared/sidebar"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
       
      >
       <main>
         <Header />
        {/* ২. হেডারের নিচের অংশ */}
        <div className="flex flex-1">
          {/* বামে সাইডবার */}
          <AppSidebar />
          
          {/* ডানে মেইন কন্টেন্ট */}
          <div className="flex-1 bg-[#fbfbfb] dark:bg-zinc-950 px-4 py-6">
            {children}
          </div>
                <FeedRightSidebar/>
       
      </div>
       </main>
 
      </body>
    </html>
  )
}
