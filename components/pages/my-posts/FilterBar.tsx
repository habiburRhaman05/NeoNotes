"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import QueryProvider from '@/providers/QueryProvider'
import { QueryClient } from '@tanstack/react-query'
import { ArrowUpDown, Search } from 'lucide-react'
import React from 'react'

const FilterBar = () => {
 
  return (
      <div className="sticky top-10 z-30 flex flex-col md:flex-row gap-4 mb-10 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2.2rem] border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
        <Input 
          placeholder="Search in your library..." 
          className="pl-14 h-14 bg-transparent border-none rounded-2xl text-lg font-medium focus-visible:ring-0"
        />
      </div>
      <Button onClick={()=>{
        // client.invalidateQueries({
        //     queryKey:["fetch-user-posts"]
        // })
      }} variant="ghost" className="h-14 rounded-2xl px-6 font-bold flex gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <ArrowUpDown className="w-4 h-4 text-indigo-500" /> Sort
      </Button>
    </div>
  )
}

export default FilterBar