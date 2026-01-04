"use client";

import { cn } from "@/lib/utils";

export default function PostCardSkeleton({ index }: { index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "relative py-6 w-full flex flex-col gap-3 px-4 rounded-2xl mb-2 animate-pulse",
      isEven 
        ? "bg-[#fbfbfb] dark:bg-zinc-900/60 border border-transparent" 
        : "bg-white dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/50 shadow-sm"
    )}>
      
      {/* ১. লেখক এবং মেটা ডেটা স্কেলিটন */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-0.5">
          {/* Avatar Circle */}
          <div className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            {/* Name bar */}
            <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            {/* Time bar */}
            <div className="h-3 w-12 bg-zinc-100 dark:bg-zinc-800/50 rounded" />
          </div>
        </div>
        
        {/* Featured Tag Skeleton */}
        <div className="h-4 w-12 bg-yellow-100/30 dark:bg-yellow-900/10 rounded-full" />
      </div>

      {/* ২. মেইন কন্টেন্ট এরিয়া স্কেলিটন */}
      <div className="flex justify-between gap-5 md:gap-8">
        <div className="flex-1 space-y-3">
          {/* Title bars */}
          <div className="space-y-2">
            <div className="h-5 w-[90%] bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            <div className="h-5 w-[40%] bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          </div>
          {/* Content bars */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded" />
            <div className="h-3 w-[80%] bg-zinc-100 dark:bg-zinc-800/50 rounded" />
          </div>
        </div>

        {/* Thumbnail Box Skeleton */}
        <div className="w-20 h-20 md:w-32 md:h-24 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* ৩. স্ট্যাটস এবং ইন্টারেকশন স্কেলিটন */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100/50 dark:border-zinc-800/30">
        <div className="flex items-center gap-5">
          {/* Like & Comment placeholders */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-8 bg-zinc-100 dark:bg-zinc-800/50 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-8 bg-zinc-100 dark:bg-zinc-800/50 rounded" />
          </div>
        </div>

        {/* Action Buttons placeholders */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800/50" />
          <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800/50" />
        </div>
      </div>
    </div>
  );
}