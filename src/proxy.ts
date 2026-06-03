import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path is under /admin
  if (pathname.startsWith('/admin')) {
    // Redirect old /admin/menu route to /admin
    if (pathname === '/admin/menu') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Exclude /admin/login from check
    if (pathname === '/admin/login') {
      // If user is already logged in, redirect them to /admin instead of showing login again
      const authCookie = request.cookies.get('admin_auth');
      if (authCookie && authCookie.value === 'true') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Check for the admin_auth cookie
    const authCookie = request.cookies.get('admin_auth');

    if (!authCookie || authCookie.value !== 'true') {
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
