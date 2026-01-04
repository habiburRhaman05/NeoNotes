import React, { Suspense } from 'react'
import { feedServices } from "@/services/feed/feedServices";
import FeedFilter from '@/components/feed/FeedFilter';
import FeedRightSidebar from '@/components/feed/FeedRightContent';
import PostList from '@/components/feed/PostList';
import PostCardSkeleton from '@/components/feed/PostCardSkeleton';

const page =async () => {
      const posts = await feedServices.getAllFeed();

    
  return (
 
    <div>
      <div>
        <h1 className='my-2 font-bold text-lg'>For You</h1>
      </div>
     <PostList posts={posts?.data && posts?.data} />
    </div>
  
  )
}

export default page