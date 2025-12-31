"use client";

import React, { useState } from 'react';
import { 
  User, Lock, Bell, CreditCard, ShieldCheck, 
  ChevronDown, ChevronRight, Mail, Trash2, 
  Fingerprint, Smartphone, Laptop 
} from 'lucide-react';
import { cn } from "@/lib/utils"; // shadcn utility

const MENU_STRUCTURE = [
  {
    id: "account",
    title: "Account",
    icon: <User className="w-4 h-4" />,
    subItems: [
      { id: "profile", label: "Public Profile", icon: <User className="w-3.5 h-3.5" /> },
      { id: "email", label: "Email Settings", icon: <Mail className="w-3.5 h-3.5" /> },
      { id: "danger", label: "Danger Zone", icon: <Trash2 className="w-3.5 h-3.5" />, color: "text-red-500" },
    ]
  },
  {
    id: "security",
    title: "Security",
    icon: <Lock className="w-4 h-4" />,
    subItems: [
      { id: "password", label: "Password", icon: <Fingerprint className="w-3.5 h-3.5" /> },
      { id: "sessions", label: "Active Sessions", icon: <Laptop className="w-3.5 h-3.5" /> },
      { id: "2fa", label: "Two-Factor Auth", icon: <Smartphone className="w-3.5 h-3.5" /> },
    ]
  },
  {
    id: "billing",
    title: "Billing",
    icon: <CreditCard className="w-4 h-4" />,
    subItems: [
      { id: "plan", label: "Current Plan" },
      { id: "payment", label: "Payment Methods" },
    ]
  }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["account"]);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="mx-auto flex flex-col md:flex-row min-h-screen">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-72 border-r border-zinc-100 dark:border-zinc-800 p-6 space-y-8">
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
                        <button
                          key={sub.id}
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
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl">
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "danger" && <DangerSection />}
            {/* Add other sections here */}
          </div>
        </main>
      </div>
    </div>
  );
}

// Sub-component for a clean section
function ProfileSection() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h2 className="text-2xl font-bold">Public Profile</h2>
        <p className="text-zinc-500 text-sm mt-1">This information will be displayed publicly.</p>
      </div>
      <div className="space-y-4 pt-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Username</label>
          <input className="flex h-10 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="@johndoe" />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function DangerSection() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="p-6 border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 rounded-2xl">
        <h2 className="text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
          <Trash2 className="w-5 h-5" /> Delete Account
        </h2>
        <p className="text-sm text-red-500/80 mt-2">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all">
          Permanently Delete
        </button>
      </div>
    </div>
  );
}