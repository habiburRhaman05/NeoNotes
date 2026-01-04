import React, { Suspense } from "react";
import PostCard from "@/components/feed/PostCard";
import FeedFilter from "@/components/feed/FeedFilter";
import PostCardSkeleton from "@/components/feed/PostCardSkeleton";
import PostList from "@/components/feed/PostList";
import FeedRightSidebar from "@/components/feed/FeedRightContent";



export default async function FeedPage({children}) {
  
  return (
    <div className="space-y-8  w-full ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <FeedFilter />
      </div>
<div className="flex items-start">
      {/* Feed Grid */}
      <div className="grid grid-cols-1 min-w-full  gap-6">

     {children}
      </div>




      </div>
    </div>
  );
}