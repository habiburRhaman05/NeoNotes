import React, { Suspense } from 'react'
import { feedServices } from "@/services/feed/feedServices";
import PostList from '@/components/pages/feed/PostList';


// Next.js অটোমেটিক searchParams প্রপটি সার্ভার কম্পোনেন্টে পাস করে
const Search = async ({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) => {
  
    const query = await searchParams;
    const searchTerm = query.q as string;


    const posts = await feedServices.getSearchResult(searchTerm);

  return (
    <div className="max-w-7xl mx-auto px-4">
    
      <div className="py-6 border-b border-zinc-100 dark:border-zinc-800 mb-8">
        <h1 className='text-2xl font-black tracking-tight'>
          Search Result for: <span className="text-indigo-600">"{searchTerm || 'All'}"</span>
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Found {posts?.data?.posts?.length || 0} matching stories
        </p>
      </div>

      <Suspense fallback={<div className="grid gap-6 animate-pulse">Loading results...</div>}>
     
         <PostList posts={posts?.data?.data} />
      </Suspense>
    </div>
  )
}

export default Search