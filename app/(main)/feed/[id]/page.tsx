"use client";

import React from "react";
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Heart, 
  MessageCircle,
  Clock,
  Calendar,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
// আপনার তৈরি করা সাইডবার
import { cn } from "@/lib/utils";

export default async function BlogDetailsPage() {

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex gap-16">
      
      {/* মেইন কন্টেন্ট এরিয়া (বাম পাশ) */}
      <article className="flex-1   ">
        
        {/* ১. টপ অ্যাকশন বাটন */}
        <div className="flex items-center justify-between mb-10">
          <Button variant="ghost" className="gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-full">
            <ArrowLeft className="w-4 h-4" />
            Back to feed
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full"><Share2 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><Bookmark className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><MoreHorizontal className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* ২. হেডলাইন এবং মেটা */}
        <header className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 leading-[1.15] tracking-tight">
            The Future of Artificial Intelligence: Redefining Human Creativity in 2026
          </h1>
          
          <div className="flex items-center justify-between py-6 border-y border-zinc-100 dark:border-zinc-800/60">
            <div className="flex items-center gap-3">
              <img 
                src="https://github.com/shadcn.png" 
                className="w-12 h-12 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800"
                alt="Author" 
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">Lex Fridman</span>
                  <button className="text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Follow</button>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>12 min read</span>
                  <span>•</span>
                  <span>Jan 4, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ৩. কন্টেন্ট এরিয়া */}
        <div className="mt-10">
          {/* ফিচারড ইমেজ */}
          <div className="aspect-video w-full rounded-3xl overflow-hidden mb-10 border border-zinc-100 dark:border-zinc-800">
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995" 
              className="w-full h-full object-cover" 
              alt="AI Visualization"
            />
          </div>

          {/* টেক্সট বডি */}
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
            <p className="text-xl leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium italic">
              "Technology is best when it brings people together."
            </p>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Artificial Intelligence is no longer just a tool for automation; it has become a collaborator in our creative process. 
              As we move further into 2026, the boundaries between human intuition and machine precision are blurring...
            </p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pt-4">The Neural Connection</h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Synapse represents the bridge between these two worlds. In this article, we explore how neural networks 
              are mimicking the human thought process to generate art, code, and literature that feels authentic.
            </p>
          </div>
        </div>

        {/* ৪. বটম ইন্টারেকশন বার (Sticky on Scroll) */}
        <div className="sticky bottom-8 mt-12 mx-auto w-fit bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 px-6 py-3 rounded-full shadow-2xl flex items-center gap-8 z-50">
          <button className="flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-bold">4.2K</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-500 hover:text-indigo-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-bold">128</span>
          </button>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </article>

   
    </div>
  );
}