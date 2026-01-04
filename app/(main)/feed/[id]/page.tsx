import { Button } from "@/components/ui/button";
import { feedServices } from "@/services/feed/feedServices";
import {
  Bookmark,
  Calendar,
  Clock,
  Heart, MessageCircle,
  MoreHorizontal,
  Share2
} from "lucide-react";

import dayjs from "dayjs";

import BakcButton from "@/components/shared/BakcButton";

export default async function BlogDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string } 
}) {
  // ১. Params থেকে ID নেওয়া
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // ২. API থেকে ডাটা ফেচ করা
  const blogResponse = await feedServices.getFeedDetailsById(parseInt(id));
  
  if (!blogResponse?.success || !blogResponse.data) {
    return <div className="py-20 text-center">Post not found!</div>;
  }

  // ৩. ডাটা Destructuring
  const { 
    title, 
    content, 
    thumbnail, 
    tags, 
    viwes, 
    createdAt, 
    author 
  } = blogResponse.data;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex gap-16">
      
      {/* মেইন কন্টেন্ট এরিয়া */}
      <article className="flex-1 w-full lg:mx-0">
        
        {/* ১. টপ অ্যাকশন বাটন */}
        <div className="flex items-center justify-between mb-10">
       <BakcButton
       text="Back to feed"
       
       />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full"><Share2 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><Bookmark className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full"><MoreHorizontal className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* ২. হেডলাইন এবং মেটা (Dynamic) */}
        <header className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 leading-[1.15] tracking-tight">
            {title}
          </h1>
          
          <div className="flex items-center justify-between py-6 border-y border-zinc-100 dark:border-zinc-800/60">
            <div className="flex items-center gap-3">
              <img 
                src={author?.image || "https://github.com/shadcn.png"} 
                className="w-12 h-12 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800 object-cover"
                alt={author?.name} 
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{author?.name}</span>
                  <button className="text-[12px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Follow</button>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> 8 min read</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3"/> 
                    {dayjs(createdAt).format("MMM D, YYYY")}
                  </span>
                </div>
              </div>
            </div>
            
            {/* ভিউ কাউন্ট */}
            <div className="hidden sm:block text-xs font-medium text-zinc-400">
               {viwes.toLocaleString()} views
            </div>
          </div>
        </header>

        {/* ৩. কন্টেন্ট এরিয়া (Dynamic) */}
        <div className="mt-10">
          {/* ফিচারড ইমেজ */}
          {thumbnail && (
            <div className="aspect-video w-full rounded-3xl overflow-hidden mb-10 border border-zinc-100 dark:border-zinc-800 shadow-xl">
              <img 
                src={thumbnail} 
                className="w-full h-full object-cover" 
                alt={title}
              />
            </div>
          )}

          {/* ট্যাগস */}
          <div className="flex gap-2 mb-6">
            {tags?.map((tag:string) => (
              <span key={tag} className="text-xs font-bold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>

          {/* টেক্সট বডি */}
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <div className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
              {content}
            </div>
          </div>
        </div>

        {/* ৪. বটম ইন্টারেকশন বার */}
        <div className="sticky bottom-8 mt-12 mx-auto w-fit bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 px-6 py-3 rounded-full shadow-2xl flex items-center gap-8 z-50">
          <button className="flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors group">
            <Heart className="w-5 h-5 group-active:scale-125 transition-transform" />
            <span className="text-sm font-bold">Like</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-500 hover:text-indigo-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-bold">{blogResponse.data.comment?.length || 0}</span>
          </button>
          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
          <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </article>
    </div>
  );
}