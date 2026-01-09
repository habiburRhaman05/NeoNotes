import { NextResponse } from "next/server"

export const dynamic = 'force-static'
 
export async function POST() {
 

 
  return NextResponse.json({ url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhxtx5uOH2FwWtC_-HAnN75PQqBFgfLF9D2w&s" ,message:"upload true" })
}