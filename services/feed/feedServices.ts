
import { httpRequest } from "@/config/axios/axios";
import { Feed } from "@/types/feed";
import axios from "axios";

const getAllFeed = async ():Promise<Feed [] | any> =>{
  try {
     const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/all`,{
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



export const feedServices = {getAllFeed}