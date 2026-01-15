"use client"
import React, { useEffect, useState } from 'react'

const UsersDefault = () => {
const [loading,setLoading] = useState(true);

useEffect(()=>{
  setTimeout(() => {
    setLoading(false)
  }, 2000);
})
  return (
  <div>
     {
    loading ? "loading" :  <div>UsersDefault</div>
   }
  </div>
  )
}

export default UsersDefault