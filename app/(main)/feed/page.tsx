
import LinkTab from "@/components/pages/feed/LinkTab";
import PostList from "@/components/pages/feed/PostList";
import Link from "next/link";


export const revalidate = 30 // seconds (ISR)

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post`, {
    next: { revalidate: 30 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch blogs")
  }

  return res.json()
}


const page =async () => {
  
  const posts = await getBlogs();
    
  return (
 
    <div>
     
     <LinkTab/>

     <PostList posts={posts?.data && posts?.data} />
    </div>
  
  )
}

export default page