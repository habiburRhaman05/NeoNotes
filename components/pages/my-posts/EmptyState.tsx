import { Button } from '@/components/ui/button'
import { AlertCircle, Search } from 'lucide-react'
import React from 'react'

const EmptyState = () => {
  return (
     <div className="py-24 text-center space-y-6">
            <div className="relative inline-block">
                <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] flex items-center justify-center mx-auto">
                    <Search className="w-10 h-10 text-zinc-300" />
                </div>
                <div className="absolute -top-1 -right-1">
                    <AlertCircle className="w-6 h-6 text-indigo-500 fill-white" />
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">No stories found</h3>
                <p className="text-zinc-500 font-medium max-w-xs mx-auto">
                    We couldn't find any stories matching "{"searchQuery"}". Try a different term or clear filters.
                </p>
            </div>
            <Button 
                // onClick={() => setSearchQuery("")}
                variant="outline" 
                className="rounded-full px-8 border-zinc-200 dark:border-zinc-800 font-bold"
            >
                Clear Search
            </Button>
          </div>
  )
}

export default EmptyState