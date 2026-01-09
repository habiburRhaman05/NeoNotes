"use client"
import { useApiQuery } from '@/hooks/useApiQuery';
import React from 'react'
import PostCardSkeleton from '../feed/PostCardSkeleton';
import PostCard from '../feed/PostCard';
import EmptyState from './EmptyState';
import { Feed } from '@/types/feed';
import { authClient } from '@/lib/auth-client';

const MyPostsList = () => {
    const {data} = authClient.useSession()
      const { data: posts , isLoading } = useApiQuery<{
        data:Feed[]
      }>(
    ["fetch-user-posts"], 
    `/api/v1/post/user/${data?.user.id}`,
    {
      staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30,   
    retry: 2,
    }
  );
  return (
      <div className="grid gap-6">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <PostCardSkeleton index={i} key={i} />)
          ) : posts?.data.length! > 0 ? (
            <>
            {
              posts?.data.map((post)=>{
                return post.isFeatured && <PostCard index={post.id}  post={post} key={post.id}/>
              })
            }
            </>
          ) : (
            <EmptyState />
          )}
        </div>

  )
}

export default MyPostsList