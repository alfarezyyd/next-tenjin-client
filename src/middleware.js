import {NextResponse} from 'next/server';
import {CommonUtil} from '@/common/utils/common-util';

export function middleware(request) {
  const {pathname} = request.nextUrl;
  const token = request.cookies.get('accessToken');

  // Jika sudah memiliki accessToken, larang akses ke halaman login, register, atau forgot password
  if (token && !CommonUtil.isTokenExpired(token)) {
    // Cek apakah user mencoba mengakses halaman login, register, atau forgot password
    if (pathname.startsWith('/auth')) {
      const dashboardUrl = new URL('/admin/dashboard', request.url); // Atur ke halaman yang sesuai
      return NextResponse.redirect(dashboardUrl);
    }
  }

  // Pastikan token berupa string
  if (pathname.startsWith('/admin/mentor')) {
    if (!token || CommonUtil.isTokenExpired(token)) {
      const loginUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(loginUrl);
    }

    const parsedJwt = CommonUtil.parseJwt(token.value);
    if (!parsedJwt || !parsedJwt.mentorId) {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/mentors/register')) {
    if (!token || CommonUtil.isTokenExpired(token)) {
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

// Middleware config
export const config = {
  matcher: ['/admin/:path*', '/admin/mentor/:path*', '/mentors/register', '/checkout', '/auth/:path*'],
};
