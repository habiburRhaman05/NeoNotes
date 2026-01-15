"use client"
import CreatePostForm from '@/components/pages/create-post/CreatePostForm'
import CreatePostHeader from '@/components/pages/create-post/CreatePostHeader'
import PreviewModal from '@/components/pages/create-post/PreviewModal'
import { useApiMutation } from '@/hooks/useApiMutation'
import { authClient } from '@/lib/auth-client'
import React, { useState } from 'react'
import { toast } from 'sonner'
export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
     
      ]
    }
  ]
}
const CreateNewPost = () => {

  const {data:session} = authClient.useSession()
  const [openPreviewModal,setOpenPreviewModal] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    tags: [],
    thumbnail: null,
  });

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
    const postPayload = {
      ...formData,
      isFeatured:false,
      views:0,
      authorId:session?.user.id
    }
  // add data empty validation with error message
    await publishMutation.mutateAsync(postPayload)
    setFormData({
       title: "",
    slug: "",
    content: "",
    tags: [],
    thumbnail: null,
    })
  
  }
  const handleSaveDraft = async(postData:unknown)=>{
  // add data empty validation with error message
  
    await draftMutation.mutateAsync(postData)
    

  }
  const handleSchedule = async(postData:unknown)=>{
  // add data empty validation with error message
  
    await scheduleMutation.mutateAsync(postData)
  
  }
  const handleReset = async()=>{

     setFormData({
       title: "",
    slug: "",
    content: "",
    tags: [],
    thumbnail: null,
    })

  }
  const togglePreview = async(value:boolean)=>{
setOpenPreviewModal(value)
  }

  return (
    <div className=' max-w-6xl mx-auto w-full'>

{/* preview modal */}


  <PreviewModal
data={formData}
onClose={()=>{
  setOpenPreviewModal(false)
}}
isOpen={openPreviewModal}
/>

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


    {/* Pass state and setter to form */}
      <CreatePostForm defaultContent={defaultValue} formData={formData} setFormData={setFormData} />
    </div>
  )
}

export default CreateNewPost

