

import FilterBar from '@/components/pages/my-posts/FilterBar';
import MyPostsList from '@/components/pages/my-posts/MyPostsList';
import { Button } from "@/components/ui/button";
import {
  Plus,
  Sparkles
} from "lucide-react";
import Link from 'next/link';

// --- ১. মেইন পেজ কম্পোনেন্ট ---
export default function MyPostsPage() {



  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 pb-20">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Creator Studio</span>
        </div>
        <h1 className="text-6xl font-[1000] tracking-tighter">
          My Posts<span className="text-indigo-600">.</span>
        </h1>
      </div>
     <Link href={"/my-posts/create-post"}>
      <Button className="h-14 px-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-[1.5rem] font-bold hover:scale-105 transition-all shadow-xl">
        <Plus className="w-5 h-5 mr-2 stroke-[3]" /> New Post
      </Button>
     </Link>
    </div>
        <FilterBar />
        <MyPostsList/>

      </div>
    </div>
  );
}
