import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
  const url = request.nextUrl.clone();

  const isAuthPage = ["/sign-in", "/sign-up", "/verify"].some((path) =>
    url.pathname.startsWith(path)
  );

  // Redirect logged-in users away from auth pages
  if (token && isAuthPage) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users trying to access /dashboard or protected routes
  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/verify", "/dashboard/:path*"],
};
