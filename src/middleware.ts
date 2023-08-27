import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import PocketBase from 'pocketbase';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const pb = new PocketBase('http://127.0.0.1:8090');
  // console.log(JSON.stringify(request.cookies.get('pb_test')))

  var st = request.cookies.get('pb_test')?.value;

  pb.authStore.loadFromCookie(request.cookies.get('pb_test')?.value + "")

  console.log(pb.authStore.isValid);

  if(!pb.authStore.isValid && request.nextUrl.pathname.startsWith('/register')){
    return NextResponse.redirect(new URL('/signin', request.url))

  }

  // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
}