import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export default async function middleware(request: NextRequest) {

  const sessionToken = request.cookies.get("custom_session_id") 
console.log(sessionToken);

  const { pathname } = request.nextUrl;
  
  if (!sessionToken ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (sessionToken && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }


  return NextResponse.next();
}


export const config = {

matcher:["/account/:path*","/saved-posts"]
};