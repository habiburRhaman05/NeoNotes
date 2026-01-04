"use client";

import React from "react";
import { 
  MinusCircle, 
  BookmarkPlus, 
  MoreHorizontal, 
  MessageCircle,
  Clock,
  Heart
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";

// index প্রপসটি যোগ করা হয়েছে যা দিয়ে আমরা জোড়/বিজোড় চেক করবো
export default function PostCard({ post, index }: { post: any, index: number }) {
  
  // জোড় এবং বিজোড় পোস্টের জন্য কন্ডিশনাল ব্যাকগ্রাউন্ড কালার
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "group relative py-6 flex flex-col gap-3 transition-all duration-500 px-4 rounded-2xl mb-2",
      // Light Mode: বিজোড় গুলো সাদা, জোড় গুলো হালকা অফ-হোয়াইট
      // Dark Mode: বিজোড় গুলো গাঢ় জিংক, জোড় গুলো হালকা জিংক টিন্ট
      isEven 
        ? "bg-[#fbfbfb] dark:bg-zinc-900/60 border border-transparent" 
        : "bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/50 shadow-sm"
    )}>
      
      {/* ১. লেখক এবং মেটা ডেটা */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="h-5 w-5 rounded-full overflow-hidden shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-700">
            <img 
              src={post.author?.image || "https://github.com/shadcn.png"} 
              alt={post.author?.name} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
              {post.author?.name}
            </span>
            <span className="text-blue-500 text-[8px]">●</span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(post?.createdAt))} ago
            </span>
          </div>
        </div>
        
        {/* Featured Tag (ডান পাশে সরানো হয়েছে লুক ক্লিন রাখতে) */}
        <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-full">
           <span className="text-[9px] text-yellow-700 dark:text-yellow-500 font-bold uppercase tracking-wider italic">✦ Pick</span>
        </div>
      </div>

      {/* ২. মেইন কন্টেন্ট এরিয়া */}
    <Link href={`/feed/${post.id}`}>
      <div className="flex justify-between gap-5 md:gap-8">
        <div className="flex-1 space-y-1.5">
          <h2 className="text-[17px] md:text-[20px] font-black text-zinc-900 dark:text-zinc-100 leading-snug tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            {post?.title}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-[14px] line-clamp-2 leading-relaxed font-normal italic">
            {post.content}
          </p>
        </div>

        {post.thumbnail && (
          <div className="w-20 h-20 md:w-32 md:h-24 relative shrink-0 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:shadow-md transition-shadow">
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
        )}
      </div></Link>

      {/* ৩. স্ট্যাটস এবং ইন্টারেকশন */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100/50 dark:border-zinc-800/30">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 text-zinc-400 hover:text-red-500 transition-all duration-200">
            <Heart className="w-4 h-4" />
            <span className="text-[12px] font-bold">3.7K</span>
          </button>

          <button className="flex items-center gap-1.5 text-zinc-400 hover:text-indigo-500 transition-all duration-200">
            <MessageCircle className="w-4 h-4" />
            <span className="text-[12px] font-bold">{post.comment?.length || 132}</span>
          </button>
        </div>

        {/* অ্যাকশন বাটনগুলো */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <BookmarkPlus className="w-4 h-4" />
          </button>
          <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}