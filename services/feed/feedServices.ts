
import { httpRequest } from "@/config/axios/axios";
import { Feed } from "@/types/feed";
import axios from "axios";

const getAllFeed = async ():Promise<Feed [] | any> =>{
  try {
     const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/all?search=next.js`,{
      next:{
        tags:["blog"]
      }
     })
   
     const data = await result.json();
    //  console.log(data);
     
    return data 
  } catch (error) {
    console.log(error);
  }
  return []
}

const getSearchResult = async (query:string):Promise<Feed [] | any> =>{
  await new Promise((reslove)=> setTimeout(reslove,1000));
  try {
     const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/all?search=${query}`,{
      next:{
        tags:["blog"]
      } 
     })
   
     const data = await result.json();
    //  console.log(data);
     
    return data 
  } catch (error) {
    console.log(error);
    
  }
  return []
}

const getFeedDetailsBySlug = async (slug:string):Promise<Feed | any> =>{
  try {
     const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${slug}`,{
     
     })
   
     const data = await result.json();
    //  console.log(data);
     
    return data 
  } catch (error) {
    console.log(error);
    
  }
  return null
}



export const feedServices = {getAllFeed,getFeedDetailsBySlug,getSearchResult}