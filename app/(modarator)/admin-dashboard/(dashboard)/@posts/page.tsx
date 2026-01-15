"use client"
import React, { useEffect, useState } from 'react'

const PostsDefault = () => {
const [loading,setLoading] = useState(true);

useEffect(()=>{
  setTimeout(() => {
    setLoading(false)
  }, 8000);
})
  return (
  <div>
     {
    loading ? "loading" :  <div>PostsDefault</div>
   }
  </div>
  )
}

export default PostsDefault