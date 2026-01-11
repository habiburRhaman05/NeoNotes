"use client"
import CreatePostForm from '@/components/pages/create-post/CreatePostForm'
import CreatePostHeader from '@/components/pages/create-post/CreatePostHeader'
import { useApiMutation } from '@/hooks/useApiMutation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const CreateNewPost = () => {

  const publishMutation = useApiMutation({
    endpoint:"/api/v1/post",
    method:"POST",
    invalidateKeys:["fetch-user-posts"],
    // successMessage:"Your Post Created SuccessFully"
  });
  const draftMutation = useApiMutation({
    endpoint:"/me",
    method:"POST",
    invalidateKeys:["fetch-user-posts"]
  });
  const scheduleMutation = useApiMutation({
    endpoint:"/me",
    method:"POST",
    invalidateKeys:["fetch-user-posts"]
  });


  const dummyPostData = {
  "title": "next.js  gning Scalable Database Schema",
  "content": "This post explains normalization, indexing, and schema design strategies for scalable applications.",
  "thumbnail": "https://picsum.photos/seed/database/600/400",
  "isFeatured": true,
  "status": "PUBLISHED",
  "tags": [
    "database",
    "prisma",
    "postgres"
  ],
  "viwes": 2640,
  "authorId": "1Ro19kUC7lLRafs34GJJmiPZWXzimwBh"
}

  const handlePublish = async(postData:unknown)=>{
  
    await publishMutation.mutateAsync(dummyPostData)
  
  }
  const handleSaveDraft = async(postData:unknown)=>{
  
    await draftMutation.mutateAsync(postData)
    

  }
  const handleSchedule = async(postData:unknown)=>{
  
    await scheduleMutation.mutateAsync(postData)
  
  }
  const handleReset = async()=>{

   

  }
  const togglePreview = async()=>{

  }

  return (
    <div className=' max-w-6xl mx-auto w-full'>
      {/* page Top Bar */}
      <CreatePostHeader 
     loading={
      {
        publish:publishMutation.isPending,
  draft:draftMutation.isPending,
    schedule:scheduleMutation.isPending,
      }
     }
      handlePublish={handlePublish}
      handleSchedule={handleSchedule}
      handleSaveDraft={handleSaveDraft}
      handleReset={handleReset}
      togglePreview={togglePreview}
      />
     {/* write blog-post form */} 
     <CreatePostForm/>
    </div>
  )
}

export default CreateNewPost

