"use client"
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SearchBar = () => {
    const router = useRouter();
    
  return (
     <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            onKeyDown={(e)=>{
                // alert()
          if(e.key === "Enter"){
           
         router.push(`/search?${e.currentTarget.value}`)
          }
            }}
            placeholder="Search posts, tags, or authors..."
            className="w-full h-10 pl-10 pr-4 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

  )
}

export default SearchBar