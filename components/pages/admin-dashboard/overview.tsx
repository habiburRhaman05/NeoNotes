import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const DashboardOverview = () => {
  return (
<div className=' w-full max-w-7xl mx-auto'>
       <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
              <p className="text-muted-foreground">Welcome back. Here is what's happening today.</p>
            </div>

            {/* HIGH-LEVEL STATS */}
            <div className=" mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Users" value="24,512" trend="+12.5%" />
              <StatCard title="Active Sessions" value="1,203" trend="+3.1%" />
              <StatCard title="Pending Review" value="42" trend="-5.2%" isNegative />
              <StatCard title="Avg. Engagement" value="68%" trend="+8.4%" />
            </div>
</div>
  )
}

export default DashboardOverview

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
