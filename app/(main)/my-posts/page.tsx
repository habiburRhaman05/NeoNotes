"use client";

import React from 'react';
import { 
  Plus, Sparkles, Search, ArrowUpDown, Edit3, 
  Eye, MessageSquare, MoreHorizontal, Trash2, 
  Calendar, Share2, AlertCircle, ExternalLink 
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
import { useApiQuery } from '@/hooks/useApiQuery';

// --- ১. মেইন পেজ কম্পোনেন্ট ---
export default function MyPostsPage() {

  const { data: posts, isLoading } = useApiQuery<any[]>(
    ["fetch-user-posts"], 
    "/api/v1/post",
    {
      staleTime: 1000 * 60 * 5, // ৫ মিনিট পর্যন্ত ডেটা ক্যাশ থাকবে (Fresh)
    gcTime: 1000 * 60 * 30,    // ৩০ মিনিট পর মেমোরি থেকে মুছে যাবে
    retry: 2,
    }
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        
        <PageHeader />
        <FilterBar />

        <div className="grid gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
          ) : posts?.data.length > 0 ? (
            <>
            {
              posts?.data.map((post)=>{
                return  <PostCard  post={post} key={post.id}/>
              })
            }
            </>
          ) : (
            <EmptyState />
          )}
        </div>

      </div>
    </div>
  );
}

// --- ২. হেডার কম্পোনেন্ট ---
function PageHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Creator Studio</span>
        </div>
        <h1 className="text-6xl font-[1000] tracking-tighter">
          My Stories<span className="text-indigo-600">.</span>
        </h1>
      </div>
      <Button className="h-14 px-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-[1.5rem] font-bold hover:scale-105 transition-all shadow-xl">
        <Plus className="w-5 h-5 mr-2 stroke-[3]" /> New Story
      </Button>
    </div>
  );
}

// --- ৩. ফিল্টার ও সার্চ বার কম্পোনেন্ট ---
function FilterBar() {
  return (
    <div className="sticky top-10 z-30 flex flex-col md:flex-row gap-4 mb-10 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2.2rem] border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
        <Input 
          placeholder="Search in your library..." 
          className="pl-14 h-14 bg-transparent border-none rounded-2xl text-lg font-medium focus-visible:ring-0"
        />
      </div>
      <Button variant="ghost" className="h-14 rounded-2xl px-6 font-bold flex gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <ArrowUpDown className="w-4 h-4 text-indigo-500" /> Sort
      </Button>
    </div>
  );
}

// --- ৪. ইন্ডিভিজুয়াল পোস্ট dateকার্ড কম্পোনেন্ট ---
function PostCard({ post  }: any) {
  return (
    <div className="group bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 rounded-[2.5rem] p-5 md:p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/5">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Thumbnail Preview */}
        <div className="relative w-full md:w-60 h-36 rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
          <div className="w-full h-full flex items-center justify-center font-black text-zinc-400 text-[10px] tracking-widest uppercase italic">
            Synapse Visuals
          </div>
          <div className="absolute top-4 left-4">
            <span className={cn(
                "text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md border border-white/20",
                status === "PUBLISHED" ? "bg-emerald-500 text-white" : "bg-orange-500 text-white"
            )}>
                {status}
            </span>
          </div>
        </div>

        {/* Post Info */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[11px] font-black text-zinc-400 uppercase tracking-widest">
               <Calendar className="w-3.5 h-3.5" /> {post.createdAt}
            </div>
            <h2 className="text-2xl font-[1000] tracking-tighter leading-none group-hover:text-indigo-600 transition-colors">
              {post.title}
            </h2>
          </div>

          <div className="flex items-center gap-8 mt-6">
            <div className="flex items-center gap-2 group/stat">
               <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover/stat:bg-indigo-600 group-hover/stat:text-white transition-colors">
                 <Eye className="w-4 h-4" />
               </div>
               <span className="text-sm font-black">{post.views}</span>
            </div>
            <div className="flex items-center gap-2 group/stat">
               <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover/stat:bg-indigo-600 group-hover/stat:text-white transition-colors">
                 <MessageSquare className="w-4 h-4" />
               </div>
               <span className="text-sm font-black">{post.comments?.length}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex md:flex-col items-center justify-end gap-3 shrink-0 md:border-l dark:border-zinc-800 md:pl-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <MoreHorizontal className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-2xl p-2 shadow-2xl border-zinc-100 dark:border-zinc-800">
              <DropdownMenuItem className="rounded-xl font-bold gap-3 py-3 cursor-pointer"><Edit3 className="w-4 h-4 text-indigo-500" /> Edit Story</DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl font-bold gap-3 py-3 cursor-pointer"><ExternalLink className="w-4 h-4 text-zinc-400" /> View Live</DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl font-bold gap-3 py-3 cursor-pointer"><Share2 className="w-4 h-4 text-zinc-400" /> Stats</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-xl font-bold gap-3 py-3 text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

// --- ৫. লোডিং স্কেলিটন কম্পোনেন্ট ---
function PostSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60 rounded-[2.5rem] p-5 md:p-6 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Thumbnail Skeleton */}
        <div className="w-full md:w-60 h-36 rounded-[2rem] bg-zinc-200 dark:bg-zinc-800 shrink-0" />

        {/* Post Info Skeleton */}
        <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
          <div className="space-y-3">
            {/* Date Skeleton */}
            <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            {/* Title Skeleton lines */}
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-6 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-lg md:hidden" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="flex items-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            </div>
          </div>
        </div>

        {/* Action Button Skeleton */}
        <div className="hidden md:flex flex-col items-center justify-center shrink-0 border-l dark:border-zinc-800 pl-6">
          <div className="h-12 w-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

// --- ৬. এম্পটি স্টেট কম্পোনেন্ট ---
function EmptyState() {
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

  );
}