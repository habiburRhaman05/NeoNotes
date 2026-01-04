
import { httpRequest } from "@/config/axios/axios";
import { Feed } from "@/types/feed";
import axios from "axios";

const getAllFeed = async ():Promise<Feed [] | any> =>{
  try {
     const result = await httpRequest.get("/api/v1/post/all",{
      
     });
    return result  
  } catch (error) {
    console.log(error);
    
  }
  return []
}



export const feedServices = {getAllFeed}