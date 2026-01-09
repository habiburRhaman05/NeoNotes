import PostCardSkeleton from "@/components/pages/feed/PostCardSkeleton"

export default function loading(){
    return <div>
       {
         new Array(5).fill("").map((_,index)=>{
           return <PostCardSkeleton index={index} key={index}/>
         })
       }
        </div>
    
}