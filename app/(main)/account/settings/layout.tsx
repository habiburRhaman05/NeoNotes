

"use client";

import React, { useState } from 'react';
import { 
  User, Lock, Bell, CreditCard, ShieldCheck, 
  ChevronDown, ChevronRight, Mail, Trash2, 
  Fingerprint, Smartphone, Laptop 
} from 'lucide-react';
import { cn } from "@/lib/utils"; // shadcn utility
import Link from 'next/link';

const MENU_STRUCTURE = [
//   {
//     id: "account",
//     title: "Account",
//     icon: <User className="w-4 h-4" />,
//     subItems: [
//       { id: "profile", label: "Public Profile", icon: <User className="w-3.5 h-3.5" /> },
//       { id: "email", label: "Email Settings", icon: <Mail className="w-3.5 h-3.5" /> },
//       { id: "danger", label: "Danger Zone", icon: <Trash2 className="w-3.5 h-3.5" />, color: "text-red-500" },
//     ]
//   },
  {
    id: "security",
    title: "Security",
    icon: <Lock className="w-4 h-4" />,
    subItems: [
      { id: "change-password", route:"/change-password", label: "Change Password", icon: <Fingerprint className="w-3.5 h-3.5" /> },
      { id: "forgot-password",  route:"/forgot-password",label: "Forgot Password", icon: <Laptop className="w-3.5 h-3.5" /> },
      { id: "2fa", label: "Two-Factor Auth", icon: <Smartphone className="w-3.5 h-3.5" /> },
    ]
  },

];

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [activeTab, setActiveTab] = useState("profile");
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["account"]);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
    
        {/* SIDEBAR */}
        <aside className=" md:w-80 border-r border-zinc-100 dark:border-zinc-800 p-6 space-y-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight mb-6">Settings</h1>
            <nav className="space-y-2">
              {MENU_STRUCTURE.map((menu) => (
                <div key={menu.id} className="space-y-1">
                  {/* Parent Menu Item */}
                  <button 
                    onClick={() => toggleMenu(menu.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-zinc-500 group-hover:text-indigo-500 transition-colors">
                        {menu.icon}
                      </div>
                      <span className="text-sm font-semibold">{menu.title}</span>
                    </div>
                    {expandedMenus.includes(menu.id) ? (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>

                  {/* Sub Items (Accordion Content) */}
                  {expandedMenus.includes(menu.id) && (
                    <div className="ml-9 space-y-1">
                      {menu.subItems.map((sub:any) => (
                        <Link
                          key={sub.id}
                          href={"/account/settings" + sub.route || ""}
                          onClick={() => setActiveTab(sub.id)}
                          className={cn(
                            "w-full text-left p-2 rounded-lg text-sm transition-all flex items-center gap-2",
                            activeTab === sub.id 
                              ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-medium" 
                              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                          )}
                        >
                          {sub.icon }
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

     
        
     
         {/* MAIN CONTENT AREA */}
        <div className='w-full'>
            {children}
        </div>
    </div>
  );
}
