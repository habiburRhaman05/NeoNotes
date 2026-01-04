import React from 'react'
import { feedServices } from "@/services/feed/feedServices";

const page =async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
      const posts = await feedServices.getAllFeed();
  return (
    <div>
        {posts.data.message}
    </div>
  )
}

export default page