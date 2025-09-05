// middleware.ts - Update with better logging
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET
  });
  
  const { pathname } = request.nextUrl;

  console.log("Middleware:", { pathname, hasToken: !!token });

  const isAuthPage = pathname.startsWith("/sign-in") || 
                     pathname.startsWith("/sign-up") || 
                     pathname.startsWith("/verify");

  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Redirect authenticated users away from auth pages
  if (token && isAuthPage) {
    console.log("Redirecting authenticated user to dashboard");
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users from protected routes
  if (!token && isProtectedRoute) {
    console.log("Redirecting unauthenticated user to sign-in");
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  console.log("Allowing request to proceed");
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/verify", "/dashboard/:path*"],
};