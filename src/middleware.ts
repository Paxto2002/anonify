// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Main middleware function
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow access to verify page even if authenticated (needed for verification process)
  if (token && url.pathname.startsWith('/verify')) {
    // Check if user is already verified
    if (token.isVerified) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Allow access to verification page if not verified
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

// Apply withAuth for additional authentication handling
export default withAuth(
  function middleware() {
    // Additional middleware logic if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};