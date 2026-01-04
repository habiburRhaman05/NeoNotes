"use client";

import React from "react";
import { 
  Bookmark, 
  Search, 
  Trash2, 
  Clock, 
  ChevronRight, 
  BookOpen,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";

// আপনার API থেকে আসা ডামি ডাটা (Saved Posts)
const SAVED_POSTS = [
  { 
    id: 1, 
    title: "The Impact of Quantum Computing on Modern Cryptography", 
    author: "Dr. Aris Thorne",
    authorImage: "https://github.com/shadcn.png",
    readTime: "8 min read",
    date: "2026-01-03",
    category: "Technology"
  },
  { 
    id: 2, 
    title: "Minimalist Living: How to Declutter Your Digital Life", 
    author: "Sarah Jenkins",
    authorImage: "https://github.com/shadcn.png",
    readTime: "5 min read",
    date: "2025-12-28",
    category: "Lifestyle"
  },
];

export default function SavedPostsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      
      {/* ১. হেডার সেকশন */}
      <header className="mb-12 space-y-6">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
          <Bookmark className="w-6 h-6 fill-current" />
          <span className="text-sm font-black uppercase tracking-[0.2em]">Reading List</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Saved Stories
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              You have {SAVED_POSTS.length} stories waiting to be read.
            </p>
          </div>

          {/* সার্চবার */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input 
              placeholder="Search in saved..." 
              className="pl-11 h-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 rounded-2xl w-full md:w-[260px] focus-visible:ring-indigo-500"
            />
          </div>
        </div>
      </header>

      {/* ২. লিস্ট এরিয়া */}
      <div className="space-y-4">
        {SAVED_POSTS.length > 0 ? (
          SAVED_POSTS.map((post) => (
            <div 
              key={post.id} 
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 rounded-[2rem] hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex flex-col gap-3 flex-1">
                {/* মেটা ইনফো */}
                <div className="flex items-center gap-3">
                  <img src={post.authorImage} alt={post.author} className="w-6 h-6 rounded-full border border-zinc-200 dark:border-zinc-800" />
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{post.author}</span>
                  <span className="text-[10px] text-zinc-400">•</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">{post.category}</span>
                </div>

                {/* টাইটেল */}
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight cursor-pointer">
                  {post.title}
                </h3>

                {/* রিড টাইম এবং ডেট */}
                <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  <span>{dayjs(post.date).format("MMM D, YYYY")}</span>
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="flex items-center gap-2 mt-4 sm:mt-0 self-end sm:self-center">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                  <Trash2 className="w-4.5 h-4.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-zinc-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                  <BookOpen className="w-4.5 h-4.5" />
                </Button>
                <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] flex items-center justify-center mb-6 border border-dashed border-zinc-200 dark:border-zinc-800">
              <Bookmark className="w-8 h-8 text-zinc-300" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Reading list is empty</h2>
            <p className="text-zinc-500 text-sm mt-2 max-w-xs">
              Save stories from your feed to read them later at your own pace.
            </p>
            <Button className="mt-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 font-bold">
              Find something to read
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}