
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

const getFeedDetailsById = async (id:number):Promise<Feed | any> =>{
  try {
     const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${id}`,{
     
     })
   
     const data = await result.json();
    //  console.log(data);
     
    return data 
  } catch (error) {
    console.log(error);
    
  }
  return null
}



export const feedServices = {getAllFeed,getFeedDetailsById,getSearchResult}