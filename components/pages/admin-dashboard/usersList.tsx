"use client"

import { useState, useEffect } from "react"
import { UserPlus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


export function LatestUsersWidget() {
  const isDark  = true
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const textPrimaryClass = isDark ? "text-slate-50" : "text-slate-900"
  const textSecondaryClass = isDark ? "text-slate-400" : "text-slate-600"
  const cardBgClass = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"

  const latestUsers = [
    { id: 1, name: "Alex Johnson", email: "alex.j@example.com", status: "pending", avatar: "AJ" },
    { id: 2, name: "Emma Wilson", email: "emma.w@example.com", status: "pending", avatar: "EW" },
    { id: 3, name: "David Brown", email: "david.b@example.com", status: "approved", avatar: "DB" },
  ]

  return (
    <Card className={`${cardBgClass} p-6 lg:col-span-2`}>
      <div className="flex items-center gap-2 mb-4">
        <UserPlus size={20} className="text-blue-500" />
        <h3 className={`font-semibold ${textPrimaryClass}`}>Latest Users</h3>
      </div>
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 items-center">
              <Skeleton
                className={`h-10 w-10 rounded-full ${isDark ? "bg-slate-800" : "bg-slate-200"} animate-pulse`}
              />
              <div className="flex-1 space-y-2">
                <Skeleton className={`h-4 w-24 ${isDark ? "bg-slate-800" : "bg-slate-200"} animate-pulse`} />
                <Skeleton className={`h-3 w-32 ${isDark ? "bg-slate-800" : "bg-slate-200"} animate-pulse`} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {latestUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? "bg-slate-800/50" : "bg-slate-100"}`}
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback
                  className={user.status === "approved" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"}
                >
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${textPrimaryClass} truncate`}>{user.name}</p>
                <p className={`text-xs ${textSecondaryClass} truncate`}>{user.email}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${user.status === "approved" ? "bg-emerald-500/20 text-emerald-500" : "bg-yellow-500/20 text-yellow-500"}`}
              >
                {user.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
