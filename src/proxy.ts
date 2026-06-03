import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path is under /admin
  if (pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('admin_auth');
    const isLoggedIn = authCookie && authCookie.value === 'true';

    // Exact "/admin" or "/admin/" path redirect
    if (pathname === '/admin' || pathname === '/admin/') {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }

    // Exclude /admin/login from check
    if (pathname === '/admin/login') {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // For all other routes, check if logged in
    if (!isLoggedIn) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Match all admin routes including /admin itself
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
