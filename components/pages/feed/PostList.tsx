import { feedServices } from "@/services/feed/feedServices";
import EmptyState from "./EmptyState";
import PostCard from "./PostCard";

export default async function PostList({posts}:{posts:any[]}) {



  // আপনার API বা Database কল এখানে করুন
//   const posts = await prisma.post.findMany({ ... });
// const posts = []


  if (posts?.length === 0) return <EmptyState />;

  return (
    <div className="flex flex-col">
     
      {posts?.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}