"use client";

import React, { useState, useMemo } from "react";
import { 
  Edit3, Trash2, Eye, MessageSquare, Plus, 
  MoreVertical, Search, Calendar, Filter, 
  AlertCircle, ExternalLink, Share2, ArrowUpDown,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

// Dummy Data (Replace with API call)
const INITIAL_POSTS = [
  { id: 33, title: "Designing Scalable Database Schemas with Prisma", status: "PUBLISHED", views: 2640, comments: 12, date: "2026-01-04", thumbnail: "https://picsum.photos/seed/database/600/400" },
  { id: 34, title: "Modern State Management in Next.js 15", status: "DRAFT", views: 0, comments: 0, date: "2026-01-01", thumbnail: null },
];

export default function MyPostsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "views">("newest");
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // ১. সার্চ এবং সর্টিং লজিক
  const filteredPosts = useMemo(() => {
    let result = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "newest") result.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
    if (sortBy === "oldest") result.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
    if (sortBy === "views") result.sort((a, b) => b.views - a.views);

    return result;
  }, [searchQuery, sortBy, posts]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* হেডার */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-[900] tracking-tight text-zinc-900 dark:text-zinc-50">
           Your uploaded posts<span className="text-indigo-500">.</span>
          </h1>
          <p className="text-zinc-500 font-medium">Manage and monitor your content performance.</p>
        </div>
        <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl h-12 px-6 font-bold hover:scale-105 transition-all active:scale-95 shadow-xl shadow-zinc-200 dark:shadow-none">
          <Plus className="w-5 h-5 mr-2" /> New Post
        </Button>
      </div>

      {/* ২. ফিল্টার ও সার্চ বার */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 p-2 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-[2rem] border border-zinc-100 dark:border-zinc-800">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title..." 
            className="pl-12 h-12 bg-white dark:bg-zinc-900 border-none rounded-2xl shadow-sm focus-visible:ring-2 ring-indigo-500/20"
          />
        </div>
        
        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-12 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold px-5 flex gap-2">
                        <ArrowUpDown className="w-4 h-4 text-indigo-500" />
                        Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 border-zinc-100 dark:border-zinc-800">
                    <DropdownMenuItem onClick={() => setSortBy("newest")} className="rounded-xl font-medium">Newest First</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("oldest")} className="rounded-xl font-medium">Oldest First</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("views")} className="rounded-xl font-medium">Most Views</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {/* ৩. পোস্ট লিস্ট ও কার্ড */}
      <div className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className="group relative bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 rounded-[2.5rem] p-4 md:p-6 transition-all duration-500 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/60"
            >
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* ইমেজ উইথ মাইক্রো-ইন্টারঅ্যাকশন */}
                <div className="relative w-full md:w-56 h-36 rounded-[1.8rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  {post.thumbnail ? (
                    <img src={post.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-[10px] font-black tracking-widest uppercase">No Preview</div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={cn(
                        "text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter backdrop-blur-md shadow-sm",
                        post.status === "PUBLISHED" ? "bg-green-500/90 text-white" : "bg-amber-500/90 text-white"
                    )}>
                        {post.status}
                    </span>
                  </div>
                </div>

                {/* কন্টেন্ট */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      {dayjs(post.date).format("MMM D, YYYY")}
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-8 mt-4 md:mt-0">
                    <div className="flex items-center gap-2.5 group/stat">
                        <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover/stat:bg-indigo-500 transition-colors">
                            <Eye className="w-4 h-4 text-zinc-500 group-hover/stat:text-white" />
                        </div>
                        <span className="text-sm font-black text-zinc-700 dark:text-zinc-300">{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2.5 group/stat">
                        <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover/stat:bg-indigo-500 transition-colors">
                            <MessageSquare className="w-4 h-4 text-zinc-500 group-hover/stat:text-white" />
                        </div>
                        <span className="text-sm font-black text-zinc-700 dark:text-zinc-300">{post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* থ্রি ডট মেনু ও অ্যাকশন */}
                <div className="flex md:flex-col items-center justify-end gap-3 shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                <MoreHorizontal className="w-6 h-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 border-zinc-100 dark:border-zinc-800 shadow-2xl">
                            <DropdownMenuItem className="rounded-xl font-bold gap-3 py-2.5">
                                <Edit3 className="w-4 h-4 text-indigo-500" /> Edit Story
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold gap-3 py-2.5">
                                <ExternalLink className="w-4 h-4 text-zinc-400" /> View Post
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold gap-3 py-2.5">
                                <Share2 className="w-4 h-4 text-zinc-400" /> Share stats
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-2 bg-zinc-100 dark:bg-zinc-800" />
                            <DropdownMenuItem className="rounded-xl font-bold gap-3 py-2.5 text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
                                <Trash2 className="w-4 h-4" /> Delete Story
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

              </div>
            </div>
          ))
        ) : (
          /* Empty/Error State */
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
                    We couldn't find any stories matching "{searchQuery}". Try a different term or clear filters.
                </p>
            </div>
            <Button 
                onClick={() => setSearchQuery("")}
                variant="outline" 
                className="rounded-full px-8 border-zinc-200 dark:border-zinc-800 font-bold"
            >
                Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}